import React, { useState } from "react";
import { navigate } from "hookrouter";
import { useQuery } from "@apollo/react-hooks";

import { GAMES } from "../queries";

const LIMIT = 25;

const GameRow = ({game}) => {
  const sanitizeDate = game => `${game.year}.${sanitize(game.month)}.${sanitize(game.day)}`;

  const sanitize = value => value ? ("00" + value).slice(-2) : "??";

  const renderPlayer = player => {
    let result = player.lastName;
    if(player.firstName) { result += ` ${player.firstName}`}
    return result;
  }

  return (
    <tr 
      title={game.pgn} 
      onClick={() => navigate(`/games/${game.internalId}`)}>
      <td>{game.whiteElo}</td>
      <td>{renderPlayer(game.whitePlayer)}</td>
      <td>{game.blackElo}</td>
      <td>{renderPlayer(game.blackPlayer)}</td>
      <td>{game.event}</td>
      <td>{game.site}</td>
      <td>{game.round}</td>
      <td>{game.result}</td>
      <td>{sanitizeDate(game)}</td>
    </tr>
  )
}

const Games = () => {
  const [filter, setFilter] = useState({});
  const [hasMore, setHasMore] = useState(true);

  const offset = 0;
  const order = "DESC";

  const { loading, error, data, fetchMore } = useQuery(GAMES, {
    variables: {offset, limit: LIMIT, filter, order}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {games} = data;

  if (games.length < LIMIT && hasMore) {
    setHasMore(false);
  }

  const renderGames = () => {
    if(games.length <= 0) { return <p>Records not found.</p> }
    return (
      <>
      <table className="table table-sm table-hover">
        <thead>
          <tr>
          <th>Elo</th>
            <th>White</th>
            <th>Elo</th>
            <th>Black</th>
            <th>Event</th>
            <th>Site</th>
            <th>Round</th>
            <th>Result</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => <GameRow key={game.id} game={game} />)}        
        </tbody>
      </table>
      {
        hasMore &&
        <button
          className="btn btn-light"
          onClick={() => (
            fetchMore({
              variables: {
                offset: games.length
              },
              updateQuery: (previousResult, {fetchMoreResult}) => {
                if (!fetchMoreResult) return previousResult;
                if (fetchMoreResult.games.length < LIMIT) {
                  setHasMore(false);
                }
                return {
                  games: [
                    ...previousResult.games,
                    ...fetchMoreResult.games
                  ]
                }
              }
            })
          )}
          >Load more...
        </button>
      }
      </>
    )
  }

  return (
    <>
    <h1>Games</h1>
    {renderGames()}
    </>
  );
};

export default Games;

// import React from "react";
// import {graphql, QueryRenderer} from "react-relay";

// import environment from "../environment";

// const renderQuery = ({error, props}) => {
//   if (error) {
//     return <div>{error.message}</div>;
//   } else if (props) {
//     console.log("PROPS: ", props);
//     return (
//       <div className="row">
//         Games
//       </div>
//     );
//   } 
//   return <div>Loading...</div>;
// }

// const Games = () => {
//   const offset = 0;
//   const limit = 10;
//   const filter = {};
//   const order = "DESC";

//   return (
//     <QueryRenderer
//       environment={environment}
//       query={graphql`
//         query games_Query(
//           $offset: Int!
//           $limit: Int!
//           $filter: GameFilter!
//           $order: SortOrder!
//         ) {
//           games(
//             offset: $offset 
//             limit: $limit 
//             filter: $filter 
//             order: $order
//           ) {
//             year
//           }
//         }
//       `}
//       variables={{
//         offset: offset,
//         limit: limit,
//         filter: filter,
//         order: order,
//       }}
//       render={renderQuery} 
//     />
//   );
// };

// export default Games;
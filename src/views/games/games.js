import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Filter from "./filter";
import Table from "./table";

const QUERY = gql`
query Games($limit: Int!, $offset: Int, $filter: GameFilter) {
  games(limit: $limit, offset: $offset, filter: $filter) {
    id
    internalId
    whitePlayer {
      lastName
      firstName
    }
    whiteElo
    blackPlayer {
      lastName
      firstName
    }
    blackElo
    event
    round
    site
    year
    result
    pgn
  }
}
`

const LIMIT = 25;

const Games = () => {
  const [filter, setFilter] = useState({});
  const [hasMore, setHasMore] = useState(true);

  const { loading, error, data, fetchMore } = useQuery(QUERY, {
    variables: { limit: LIMIT, filter: filter }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log(data);

  if (data.games.length < LIMIT && hasMore) {
    setHasMore(false);
  }

  // Remove empty keys
  const sanitizeFilter = filter => {
    let copy = {};
    Object.keys(filter).forEach(key => {
      if (filter[key]) { copy[key] = filter[key] }
    });
    return copy;
  }

  const renderGames = games => {
    if (games.length <= 0) return <p>Records not found.</p>;
    return (
    <>
      <Table games={games} />
      {
        hasMore &&
        <button
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
    );
  }

  return (
    <>
      <h1>Games</h1>
      <Filter 
        submit={data => setFilter(sanitizeFilter(data))} 
        cancel={() => setFilter({})} 
        />
      { renderGames(data.games) }
    </>
  )
};

export default Games;

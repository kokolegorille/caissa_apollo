import React from "react";
import {navigate} from "hookrouter";

const Table = ({games}) => {
  return (
    <table className="table">
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
        {
          games.map(game => (
            <tr key={game.id} onClick={() => navigate(`/games/${game.internalId}`)}>
              <td>{game.whiteElo}</td>
              <td>{game.whitePlayer.firstName} {game.whitePlayer.lastName}</td>
              <td>{game.blackElo}</td>
              <td>{game.blackPlayer.firstName} {game.blackPlayer.lastName}</td>
              <td>{game.event}</td>
              <td>{game.site}</td>
              <td>{game.round}</td>
              <td>{game.result}</td>
              <td>{game.year}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Table;
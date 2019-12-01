import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import FenViewer from "../../components/fen_viewer";
import Properties from "../../components/properties";
import ScoreSheet from "./score_sheet";

const QUERY = gql`
query Game($id: ID!) {
  game(id: $id) {
    id
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
    gameInfo
    positions {
      moveIndex
      move
      fen
      zobrist_hash
    }
  }
}
`

const Game = ({id}) => {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const next = () => {
    if (currentMoveIndex < lenGame) {
      setCurrentMoveIndex(currentMoveIndex + 1)
    }
  }

  const previous = () => {
    if (currentMoveIndex > 0) {
      setCurrentMoveIndex(currentMoveIndex - 1)
    }
  }

  const isFirst = () => currentMoveIndex == 0;
  const isLast = () => currentMoveIndex == (lenGame - 1);

  // console.log(data);

  const game = data.game;
  const {
    whitePlayer,
    blackPlayer,
    result,
    positions,
    gameInfo
  } = game;
  const currentPosition = positions[currentMoveIndex] || {};
  const lenGame = positions.length;
  const properties = JSON.parse(gameInfo);
  const moves = positions
    .map(position => position.move)
    .filter(el => el);

  const renderPlayer = player => {
    let result = player.lastName.toUpperCase();
    if(player.firstName) { result += ` ${player.firstName}`}
    return result;
  }

  return (
    <>
    <h3>
      {renderPlayer(whitePlayer)} - {renderPlayer(blackPlayer)} : {result}
    </h3>
    <div className="flex">
      <div>
        <div className="board">
          <FenViewer fen={currentPosition.fen} />
        </div>          
        <button 
          onClick={() => setCurrentMoveIndex(0)}
          disabled={isFirst()}>first</button>
        <button 
          onClick={previous}
          disabled={isFirst()}>previous</button>
        <button 
          onClick={next}
          disabled={isLast()}>next</button>
        <button 
          onClick={() => setCurrentMoveIndex(lenGame - 1)}
          disabled={isLast()}>last</button>
      </div>      
      <ScoreSheet moves={moves} currentMoveIndex={currentMoveIndex} handleClick={setCurrentMoveIndex}/>
      <Properties properties={properties} />
    </div>
    </>
  )
}

export default Game;
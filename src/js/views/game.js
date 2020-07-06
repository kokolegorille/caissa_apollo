import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GAME_BY_ID } from "../queries";
import FenViewer from "./fen_viewer";
import ScoreSheet from "./score_sheet";
import Properties from "../components/properties";

const Game = ({id}) => {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const { loading, error, data } = useQuery(GAME_BY_ID, {
    variables: {id}
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

  const {game} = data;
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
    <div className="d-flex">
      <div className="mr-4">
        <FenViewer fen={currentPosition.fen} />
        <div className="mt-4">
          <button 
            className="btn btn-sm btn-light"
            onClick={() => setCurrentMoveIndex(0)}
            disabled={isFirst()}>first</button>
          <button 
            className="btn btn-sm btn-light"
            onClick={previous}
            disabled={isFirst()}>previous</button>
          <button 
            className="btn btn-sm btn-light"
            onClick={next}
            disabled={isLast()}>next</button>
          <button 
            className="btn btn-sm btn-light"
            onClick={() => setCurrentMoveIndex(lenGame - 1)}
            disabled={isLast()}>last</button>
        </div>
      </div>
      <ScoreSheet 
        moves={moves} 
        currentMoveIndex={currentMoveIndex} 
        handleClick={setCurrentMoveIndex} />
      <Properties properties={properties} />
    </div>
    </>
  )
}

export default Game;
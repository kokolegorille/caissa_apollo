import React from "react";

const ScoreSheet = ({moves, currentMoveIndex, handleClick}) => {
  const maxRow = 20;
  const lenMoves = moves.length;

  if(lenMoves === 0) { return null };

  const columnsNumber = Math.ceil(lenMoves/(2 * maxRow));

  const getCssClass = index => {
    let cssClass = index === currentMoveIndex ? "move active" : "move";
    cssClass += index % 2 === 1 ? " white" : " black";
    return cssClass;
  }

  return (
    <table id="scoreSheet">
      <tbody>
        {
          // Iterate over a range of 0..maxRow
          [...Array(maxRow).keys()].map(rowIndex => (
              <tr key={rowIndex}>
                {
                  // Iterate over a range of 0..columnsNumber
                  [...Array(columnsNumber).keys()].map(colIndex => {
                    const whiteIndex = 2 * rowIndex + (colIndex * 2 * maxRow);
                    const blackIndex = 2 * rowIndex + 1 + (colIndex * 2 * maxRow);
                    return (
                      // Wrap into an array, to allow multiple elements not in a root
                      [
                        <td 
                          key={`colA_${colIndex}_${rowIndex}`}
                          className="moveIndex">
                          {rowIndex + 1 + (colIndex * maxRow)}.
                        </td>,
                        <td 
                          key={`colB_${colIndex}_${rowIndex}`}
                          className={getCssClass(whiteIndex + 1)}
                          onClick={() => handleClick(whiteIndex + 1)} >
                          {moves[whiteIndex]}
                        </td>,
                        <td 
                          key={`colC_${colIndex}_${rowIndex}`}
                          className={getCssClass(blackIndex + 1)}
                          onClick={() => handleClick(blackIndex + 1)} >
                          {moves[blackIndex]}   
                        </td>
                      ]
                    )
                  })
                }
              </tr>
            )
          )
        }
      </tbody>
    </table>
  )
}

export default ScoreSheet;
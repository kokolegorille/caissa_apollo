
import React, {Component} from "react";

// const chunk = (array, size) => {
//   const chunked_arr = [];
//   let index = 0;
//   while (index < array.length) {
//     chunked_arr.push(array.slice(index, size + index));
//     index += size;
//   }
//   return chunked_arr;
// }

export default class ScoreSheet extends Component {
  render() {
    // The number of moves (white and black) per column
    const maxRow = 20;
    const {moves} = this.props;
    const lenMoves = moves.length;

    if(lenMoves === 0) { return null };

    const columnsNumber = Math.ceil(lenMoves/(2 * maxRow));

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
                            className={this.getCssClass(whiteIndex + 1)}
                            onClick={this.onHandleClick.bind(null, whiteIndex + 1)} >
                            {moves[whiteIndex]}
                          </td>,
                          <td 
                            key={`colC_${colIndex}_${rowIndex}`}
                            className={this.getCssClass(blackIndex + 1)}
                            onClick={this.onHandleClick.bind(null, blackIndex + 1)} >
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
    );
  }

  getCssClass = (index) => {
    let cssClass = index === this.props.currentMoveIndex ? "move active" : "move";
    cssClass += index % 2 === 1 ? " white" : " black";
    return cssClass;
  }

  onHandleClick = (value) => {
    this.props.handleClick(value);
  }
}

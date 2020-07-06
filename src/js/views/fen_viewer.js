import React from "react";

// Simplified version of chessground
// Just render, no interactivity

const FenViewer = ({fen}) => {
  if (!fen) return null;

  const splitRow = row => {
    return row
    .split("")
    .flatMap(char => {
      switch (char) {
        case "1":
          return ".";
        case "2":
          return ".".repeat(2).split("");
        case "3":
          return ".".repeat(3).split("");
        case "4":
          return ".".repeat(4).split("");
        case "5":
          return ".".repeat(5).split("");
        case "6":
          return ".".repeat(6).split("");
        case "7":
          return ".".repeat(7).split("");
        case "8":
          return ".".repeat(8).split("");
        default:
          return char;
      }
    })
  }

  const board = fen
    .split(" ")[0]
    .split("/")
    .map(row => splitRow(row));

  const pieceClass = piece => {
    switch (piece) {
      case "p":
        return "black pawn";
      case "r":
        return "black rook";
      case "n":
        return "black knight";
      case "b":
        return "black bishop";
      case "q":
        return "black queen";
      case "k":
        return "black king";
      case "P":
        return "white pawn";
      case "R":
        return "white rook";
      case "N":
        return "white knight";
      case "B":
        return "white bishop";
      case "Q":
        return "white queen";
      case "K":
        return "white king";
      default: 
        return null;
    }
  }

  // The use of custom element trigger...
  // react warning the tag is unrecognized in this browser
  // -> replace piece by cg-piece
  // And adjust css accordingly
  // NB: Use class instead of className for custom element!
  // https://github.com/facebook/react/issues/11184#issuecomment-335942439

  const renderBoard = (board) => {
    const result = board.map(
      (row, i) => row.map((p, j) => {
        const css={top: `${i * 40}px`, left: `${j * 40}px`}
        // console.log(p, i, j);

        if (p!=".") {
          return <cg-piece key={`${i}-${j}`} class={pieceClass(p)} style={css}></cg-piece>
        }
      })
    )
    return result;
  }

  return (
    <div className="board">
      <div className="cg-wrap">
        <cg-helper>
          <cg-container>
            <cg-board>
              {renderBoard(board)}
            </cg-board>
            <cg-coords class="ranks">
              <cg-coord>1</cg-coord>
              <cg-coord>2</cg-coord>
              <cg-coord>3</cg-coord>
              <cg-coord>4</cg-coord>
              <cg-coord>5</cg-coord>
              <cg-coord>6</cg-coord>
              <cg-coord>7</cg-coord>
              <cg-coord>8</cg-coord>
            </cg-coords>
            <cg-coords class="files">
              <cg-coord>a</cg-coord>
              <cg-coord>b</cg-coord>
              <cg-coord>c</cg-coord>
              <cg-coord>d</cg-coord>
              <cg-coord>e</cg-coord>
              <cg-coord>f</cg-coord>
              <cg-coord>g</cg-coord>
              <cg-coord>h</cg-coord>
            </cg-coords>
          </cg-container>
        </cg-helper>
      </div>
    </div>
  )
};

export default FenViewer;
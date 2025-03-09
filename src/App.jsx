import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import PlayersDetails from "./components/players.jsx";
import Log from "./components/log.jsx";
import { WINNING_COMBINATIONS } from "./components/winning.jsx";
import GameOver from "./components/gameOver.jsx";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveactiveplayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  // const [selectedPlayer, setSelectedPlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = [...initialGameBoard.map(array=>[...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleRematch(){
    setGameTurns([]);
  }
  const selectedPlayer = deriveactiveplayer(gameTurns);

  const hasDraw= gameTurns.length=== 9 && !winner;
  function handleActivePlayer(rowIndex, colIndex) {
    // setSelectedPlayer((currActive) => (currActive === "X" ? "O" : "X"));
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveactiveplayer(prevTurn);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayersDetails
            name="Player 1"
            symbol="X"
            isActive={selectedPlayer === "X"}
          ></PlayersDetails>
          <PlayersDetails
            name="Player 2"
            symbol="O"
            isActive={selectedPlayer === "O"}
          ></PlayersDetails>
        </ol>
        {(winner|| hasDraw) && <GameOver winner={winner} onStart={handleRematch}></GameOver>}
      <GameBoard
        onSelectSquare={handleActivePlayer}
        board={gameBoard}
      ></GameBoard>
      </div>
      
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;

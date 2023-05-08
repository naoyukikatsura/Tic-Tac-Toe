import Board from './Board'
import { useState } from 'react'
import calculateWinner from './calculate-winner';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);

  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  type Player = 'X' | 'O'
  const nextPlayerName: Player = xIsNext ? 'X' : 'O'
  const status = winner ? `Winner: ${winner}` : `NextPlayer: ${nextPlayerName}`;


  // const handleClick = (i: number) => {
  // winnerがいる
  // 埋まってる
  // if (squares[i] || winner) {
  //   return;
  // }
  // const squaresCopy = squares.slice();
  // // squaresCopy[i] = "X";
  // squaresCopy[i] = xIsNext ? "X" : "O";
  // setSquares(squaresCopy);

  // setXIsNext(!xIsNext);
  // };

  const handleClick = (i: number) => {
    const historyStep = history.slice(0, stepNumber + 1);
    const current = historyStep[historyStep.length - 1];

    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    setHistory(historyStep.concat([{ squares: squares }]));
    setStepNumber(historyStep.length);

    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    // TrueかFalse
  };

  const moves = history.map((_, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => {
            jumpTo(move);
          }}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <Board squares={current.squares} onClick={(i) => { handleClick(i) }} />
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
};

export default Game
import { useState } from "react";
interface SquareProps {
  number: string;
  handleClick: () => void;
}

const Square: React.FC<SquareProps> = ({ number, handleClick }) => {
  return (
    <div className="square" onClick={handleClick}>
      {number}
    </div>
  );
};

interface BoardProps {}

const App: React.FC<BoardProps> = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [history, setHistory] = useState<number[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(0);

  const winner = calculateWinner(squares);

  const handleClick = (index: number) => {
    if (winner || squares[index]) return;
    let _squares = squares.slice(0);
    if (currentRound % 2 === 0) {
      _squares[index] = "X";
    } else {
      _squares[index] = "O";
    }
    setSquares(_squares);
    setCurrentRound(() => currentRound + 1);
    let _history = history.slice(0, currentRound);
    _history.push(index);
    setHistory(_history);
  };

  const goHistory = (index: number) => {
    console.log(history, index);
    let historySquares = Array(9).fill("");
    for (let i = 0; i < index + 1; i++) {
      if (i % 2 === 0) {
        historySquares[history[i]] = "X";
      } else {
        historySquares[history[i]] = "O";
      }
    }
    setCurrentRound(index + 1);
    setSquares(historySquares);
  };
  return (
    <div>
      {!winner ? (
        <p>
          Player {currentRound % 2 === 0 ? "X" : "O"} {currentRound}
        </p>
      ) : (
        <p>Winner:{winner}</p>
      )}
      <div className="sauare-box">
        {squares.map((item, index) => {
          return (
            <Square
              key={index}
              number={item}
              handleClick={() => handleClick(index)}
            />
          );
        })}
      </div>
      <div>
        <p onClick={() => goHistory(-1)}>Go to game start</p>
        {history.map((item, index) => {
          return (
            <p key={"histoy" + index} onClick={() => goHistory(index)}>
              Go to step {index + 1}
            </p>
          );
        })}
      </div>
    </div>
  );
};

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      !!squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default App;

import { useState } from 'react'

export default function Game () {
  // const [IsNext, setIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  
  const IsNext = currentMove % 2 === 0
  const currentSqures = history[currentMove]

  const handlePlay = (nextSquares) => {
    const nextHistory = ([...history.slice(0, currentMove + 1), nextSquares])
    setHistory(nextHistory)

    setCurrentMove(nextHistory.length - 1)
    // setIsNext(!IsNext)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    // setIsNext(nextMove % 2 === 0)
  }

  const moves = history.map((squares, move) => {
    let description;

    (move > 0) ? description = `Ir al movimiento # ${move}` : description = 'Ir al incio del juego' 
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{ description }</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board isNext={IsNext} squares={currentSqures} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}


/* eslint-disable react/prop-types */
function Board({ isNext, squares, onPlay }) {
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return
  
    const nextSquares = squares.slice()
    isNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O'

    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) status = `Ganador: ${winner}`
  else status = `Siguiente jugador: ${isNext ? 'X' : 'O'}`

  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
  
  </>
  )
}

function Square({ value, onSquareClick }) {
  return (
    <>
      <button 
        className="square"
        onClick={onSquareClick}
      >
        { value }
      </button>
    </>
  )
}

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}
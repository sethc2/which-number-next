import { useEffect, useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const maxNumber = 23;
const getNextSet = () => {
  const nextAnswer = getRandomInt(maxNumber) + 5;
  const fourth = nextAnswer + 1;
  const third = nextAnswer;
  const second = nextAnswer - 1;
  const first = nextAnswer - 2;

  const hints = [first, second, third, fourth];
  const indexToGuess = getRandomInt(4);

  const guesses = [
    hints[indexToGuess],
    first - 1,
    fourth + 1,
    getRandomInt(2) ? fourth + 2 : first - 2,
  ];

  return {
    hints,
    guesses: guesses.sort((a, b) => a - b),
    indexToGuess,
  };
};

function App() {
  const [currentSet, setCurrentSet] = useState(getNextSet());

  const { hints, guesses, indexToGuess } = currentSet;

  const [numberCorrect, setNumberCorrect] = useState(0);

  const [numberWrong, setNumberWrong] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const nextQuestion = () => {
    setCurrentSet(getNextSet());
  };

  useEffect(() => {
    if (selectedAnswer !== null) {
      setTimeout(
        () => {
          setSelectedAnswer(null);
          nextQuestion();
        },
        selectedAnswer === hints[indexToGuess] ? 100 : 2000
      );
    }
  }, [selectedAnswer]);
  return (
    <div className="App">
      <div className="word">
        {hints.map((hint, idx) => (
          <span style={{ margin: 10 }}>
            {idx === indexToGuess ? "_" : hint}
          </span>
        ))}
      </div>
      <div className="answers">
        {guesses.map((guess) => (
          <button
            style={{
              background:
                selectedAnswer === null
                  ? "lightgrey"
                  : guess === hints[indexToGuess]
                  ? "green"
                  : guess === selectedAnswer
                  ? "red"
                  : "lightgrey",
            }}
            onClick={() => {
              if (guess === hints[indexToGuess]) {
                setNumberCorrect(numberCorrect + 1);
              } else {
                setNumberWrong(numberWrong + 1);
              }

              setSelectedAnswer(guess);
            }}
            key={guess}
          >
            {guess}
          </button>
        ))}
      </div>
      <div className="stats">
        <div>Number correct: {numberCorrect}</div>
        <div>Number wrong: {numberWrong}</div>
      </div>
    </div>
  );
}

export default App;

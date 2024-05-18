import { useState } from "react";
import { imgs } from "../data";
import { useEffect } from "react";
import { Card } from "./Card";
import { GameOver } from "./GameOver";
import { Loader } from "./Loader";

const shuffleArray = (array) => {
  let arrayBarajado = array.slice(); // Copia el array original para no modificarlo
  for (let i = arrayBarajado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Intercambiar elementos arrayBarajado[i] y arrayBarajado[j]
    [arrayBarajado[i], arrayBarajado[j]] = [arrayBarajado[j], arrayBarajado[i]];
  }
  return arrayBarajado;
};

export const Board = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const initBoard = () => {
    const duplicateCards = imgs.flatMap((img) => {
      const duplicate = {
        ...img,
        id: img.id + imgs.length,
      };
      return [img, duplicate];
    });

    const shuffledCards = shuffleArray(duplicateCards);

    const newCards = shuffledCards.map((card) => ({
      ...card,
      flipped: false,
      matched: false,
    }));

    setCards(newCards);
  };

  useEffect(() => {
    setTimeout(() => {
      initBoard();
      setGameStarted(true);
      setStartTime(Date.now());
    }, 2500);
  }, []);

  const handleCardClick = (id) => {
    if (isDisabled) return;

    const [currentCard] = cards.filter((card) => card.id === id);

    if (!currentCard.flipped && !currentCard.matched) {
      currentCard.flipped = true;

      const newFlippedCards = [...flippedCards, currentCard];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        setIsDisabled(true);
        const [firstCard, secondCard] = newFlippedCards;

        if (firstCard.img === secondCard.img) {
          firstCard.matched = true;
          secondCard.matched = true;
          setIsDisabled(false);
        } else {
          setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;
            setCards(cards);
            setIsDisabled(false);
          }, 800);
        }

        setFlippedCards([]);
        setMoves(moves + 1);
      }

      setCards(cards);
    }

    if (cards.every((card) => card.matched)) {
      setGameOver(true);
      setIsDisabled(true);
      setEndTime(Date.now());
    }
  };

  const resetGame = () => {
    initBoard();
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
    setIsDisabled(false);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 relative">
      <h1 className="text-4xl text-blue-700 md:text-7xl text-center font-bold mb-4 ">
        Memory Game
      </h1>
      <div className="grid grid-cols-4 gap-2 max-w-3xl mx-auto ">
        {cards.map((card, index) => (
          <Card key={index} card={card} handleCardClick={handleCardClick} />
        ))}
      </div>
      {!gameStarted && <Loader />}

      {gameOver && (
        <GameOver
          time={(endTime - startTime) / 1000}
          moves={moves}
          resetGame={resetGame}
        />
      )}
      {gameStarted && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetGame}
        >
          ResetGame
        </button>
      )}
    </div>
  );
};

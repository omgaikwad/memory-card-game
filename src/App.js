import { useEffect, useState } from "react";
import "./App.css";
import CardFlip from "./CardFlip.json";
import { v4 as uuidv4 } from "uuid";
import SingleCard from "./component/SingleCard/SingleCard";

function App() {
  const [cards, setCards] = useState([]);
  const [totalTurns, setTotalTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [score, setScore] = useState(0);

  const [cardArrayData, setCardArrayData] = useState(
    CardFlip.CardFlip[0].imageSet
  );

  const [showInitialCards, setShowInitialCards] = useState(true);

  const shuffleCards = (cardArr) => {
    // We'll need duplicate of each card and then give them unique id and then shuffle them
    const cardSet = [...cardArr, ...cardArr]
      .map((card) => ({
        ...card,
        _id: uuidv4(),
        isMatched: false,
      }))
      .sort((a, b) => 0.5 - Math.random());

    return cardSet;
  };

  const resetGameHandler = () => {
    setCards(shuffleCards(cardArrayData));
    setTotalTurns(0);
    setScore(0);
    setShowInitialCards(true);
  };

  const cardClickHandler = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTotalTurns((prev) => prev + 1);
  };

  const playStationaryCardHandler = () => {
    setCardArrayData(CardFlip.CardFlip[1].imageSet);
    setCards(shuffleCards(cardArrayData));
    setTotalTurns(0);
    setScore(0);
    setShowInitialCards(true);
  };

  const playAnimalCardHandler = () => {
    setCardArrayData(CardFlip.CardFlip[0].imageSet);
    setCards(shuffleCards(cardArrayData));
    setTotalTurns(0);
    setScore(0);
    setShowInitialCards(true);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.img === choiceTwo.img) {
        setScore((prev) => prev + 5);
        setCards((prevCards) => {
          return prevCards.map((obj) => {
            return obj.img === choiceOne.img
              ? { ...obj, isMatched: true }
              : obj;
          });
        });
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    setTimeout(() => {
      setShowInitialCards(false);
    }, 3000);
  }, [cards]);

  useEffect(() => {
    setCards(shuffleCards(cardArrayData));
  }, [cardArrayData]);

  return (
    <div className="App">
      <div className="heading-container">
        <div className="navbar-container">
          <div className="logo-container">
            <img className="flip-logo" src="/assets/logo/logo.png" alt="logo" />
            <h1 className="flip-heading">Flip</h1>
          </div>
        </div>
        <div className="btn-container">
          <button onClick={resetGameHandler} className="btn-new-game">
            New Game
          </button>
          <button onClick={playAnimalCardHandler} className="btn-new-game">
            Animal Cards
          </button>
          <button onClick={playStationaryCardHandler} className="btn-new-game">
            Stationary Cards
          </button>
        </div>
      </div>

      <div className="score-container">
        <p>Turns: {totalTurns} </p>
        <p>Score: {score} </p>
      </div>

      <div className="flip-cards-container">
        {cards.map((card) => {
          return (
            <SingleCard
              card={card}
              cardClickHandler={cardClickHandler}
              flipped={
                card === choiceOne ||
                card === choiceTwo ||
                showInitialCards ||
                card.isMatched
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

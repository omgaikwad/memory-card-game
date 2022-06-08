import { useState } from "react";
import "./App.css";
import CardFlip from "./CardFlip.json";

function App() {
  console.log(CardFlip.CardFlip[0].imageSet);

  const [cards, setCards] = useState(CardFlip.CardFlip[0].imageSet);

  return (
    <div className="App">
      <div className="heading-container">
        <div className="logo-container">
          <img className="flip-logo" src="/assets/logo/logo.png" alt="logo" />
          <h1 className="flip-heading">Flip</h1>
        </div>
        <button className="btn-new-game">New Game</button>
      </div>

      <div className="flip-cards-container">
        {cards.map((card) => {
          return (
            <div className="cards-container">
              <div className="front-card-container">
                <img
                  src={card.img}
                  alt="front card img"
                  className="front-card-img"
                />
              </div>
              <div className="back-card"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

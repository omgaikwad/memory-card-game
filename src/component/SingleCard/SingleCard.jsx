import React from "react";
import "./SingleCard.css";

const SingleCard = ({ card, cardClickHandler, flipped }) => {
  return (
    <div
      className={`cards-container ${flipped ? "border-md" : null}`}
      key={card._id}
    >
      <div
        className={`front-card-container ${flipped ? null : "display-none"}`}
      >
        <img src={card.img} alt="front card img" className="front-card-img" />
      </div>
      <div
        onClick={() => cardClickHandler(card)}
        className={`back-card-container ${flipped ? "display-none" : null}`}
      >
        <img
          className="flip-card-img"
          src="/assets/flipCardImg.png"
          alt="back-card-img"
        />
      </div>
    </div>
  );
};

export default SingleCard;

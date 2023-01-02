import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dateFormat from "dateformat";
import "../Card.css";

const Card = ({ images, item, selectedCards, setSelectedCards }) => {
  function trim(str) {
    return str.length > 16 ? str.substring(0, 16) + "..." : str;
  }

  function handleClick(card) {
    card.isSelected ? (card.isSelected = false) : (card.isSelected = true);
    if (card.isSelected) {
      setSelectedCards([
        ...new Set(images.filter((elem) => elem.isSelected === true)),
      ]);
    } else {
      setSelectedCards(
        selectedCards.filter((elem) => elem.isSelected === true)
      );
    }
  }
  return (
    <>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className={`card__wrapper ${item.isSelected ? "card__selected" : ""}`}
        onClick={() => handleClick(item)}
      >
        <div className="img__wrapper">
          <img src={item.urls.small_s3} alt={item.alt_description} />
        </div>
        <div className="text__content">
          <h1 style={{ fontSize: "0.7rem", textTransform: "capitalize" }}>
            {item.alt_description === null
              ? "name not found !"
              : trim(item.alt_description)}
          </h1>
          <p style={{ fontSize: "0.7rem" }}>
            {dateFormat(item.created_at, "mmm d")}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Card;

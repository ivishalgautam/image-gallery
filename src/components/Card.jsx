import React, { useState } from "react";
import { motion } from "framer-motion";
import dateFormat from "dateformat";
import "../Card.css";
// import { preview } from "vite";

const Card = ({ images, item, selectedCards, setSelectedCards }) => {
  const [isSelected, setIsSelected] = useState(false);

  function trim(str) {
    return str.length > 16 ? str.substring(0, 16) + "..." : str;
  }

  function handleClick(e, id) {
    if (e.ctrlKey === true) {
      if (!isSelected) {
        setSelectedCards([
          ...new Set(
            selectedCards.concat(images.filter((item) => item.id === id))
          ),
        ]);
        setIsSelected(true);
      } else {
        setSelectedCards(selectedCards.filter((elem) => elem.id !== id));
        setIsSelected(false);
      }
    }
    // console.log(selectedCards);
  }
  return (
    <>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className={`card__wrapper ${isSelected ? "card__selected" : ""}`}
        onClick={(e) => handleClick(e, item.id)}
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

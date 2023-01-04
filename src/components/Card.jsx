import React from "react";
import { motion } from "framer-motion";
import dateFormat from "dateformat";
import "../Card.css";

const Card = ({ item, image }) => {
  function trimStr(str) {
    if (str.length > 15) {
      return str.substring(0, 15) + "...";
    }
    return str;
  }
  // console.log(images);

  async function handleClick(e, item) {
    const { id, isSelected } = item;
    await image.update(id, { isSelected: !isSelected });
  }
  return (
    <>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className={`card__wrapper ${item?.isSelected ? "card__selected" : ""}`}
        onClick={(e) => handleClick(e, item)}
      >
        <div className="img__wrapper">
          <img src={item?.url} alt={item?.caption} />
        </div>
        <div className="text__content">
          <h1 style={{ fontSize: "0.7rem", textTransform: "capitalize" }}>
            {trimStr(item?.caption)}
          </h1>
          <p style={{ fontSize: "0.7rem" }}>{item?.date}</p>
        </div>
      </motion.div>
    </>
  );
};

export default Card;

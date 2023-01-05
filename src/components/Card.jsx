import React from "react";
import { motion } from "framer-motion";
import "../Card.css";

const Card = ({ item, image }) => {
  function trimStr(str) {
    if (str.length > 15) {
      return str.substring(0, 15) + "...";
    }
    return str;
  }

  async function handleClick(item) {
    /**
     * When the user clicks on an image, the image's isSelected property is toggled to the opposite of
     * what it was before.
     */
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
        onClick={() => handleClick(item)}
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

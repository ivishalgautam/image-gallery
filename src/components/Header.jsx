import React from "react";
import "../header.css";

const Header = ({ images, setImages, selectedCards, setSelectedCards }) => {
  const filterValues = selectedCards.map((item) => item.id);
  function handleRemove() {
    setImages(images.filter((elem) => !filterValues.includes(elem.id)));
    setSelectedCards([]);
  }

  const imageDownloadURL = selectedCards.map((item) => item.links.download);
  function handleDownload() {
    if (imageDownloadURL.length) {
      window.open(imageDownloadURL, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <>
      <div className="header">
        <div className="selectedCards__count">
          unselect {selectedCards.length} images
        </div>
        <div className="action__btns">
          <button className="btn btn__remove" onClick={() => handleRemove()}>
            Remove
          </button>
          <button
            className="btn btn__download"
            onClick={() => {
              handleDownload();
            }}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;

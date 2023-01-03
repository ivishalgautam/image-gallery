import axios from "axios";
import React from "react";
import "../header.css";

const Header = ({ images, setImages, selectedCards, setSelectedCards }) => {
  const filterValues = selectedCards.map((item) => item.id);
  function handleRemove() {
    setImages(images.filter((elem) => !filterValues.includes(elem.id)));
    setSelectedCards([]);
  }

  function handleDownload() {
    const imageDownloadURL = selectedCards.map((item) => item.urls.regular);
    if (imageDownloadURL.length) {
      for (var i = 0; i < imageDownloadURL.length; i++) {
        axios({
          url: imageDownloadURL[i],
          method: "GET",
          responseType: "blob",
        }).then((response) => {
          let imageStr = response.config.url;
          let imgName = imageStr
            .slice(imageStr.indexOf("photo"), imageStr.indexOf("="))
            .substring(0, 15);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${imgName}.jpeg`);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
        });
      }
    }
  }

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    let newImages = images.map((elem) => elem);
    if (checked) {
      for (let i = 0; i < images.length; i++) {
        newImages[i].isSelected = true;
      }
      setImages(newImages);
      setSelectedCards(newImages);
    } else {
      for (let i = 0; i < images.length; i++) {
        newImages[i].isSelected = false;
      }
      setImages(newImages);
      setSelectedCards([]);
    }
  };

  return (
    <>
      <div className="header">
        <div className="selectedCards__count">
          unselect {selectedCards.length} images
        </div>

        <div className="action__btns">
          {selectedCards.length > 0 && (
            <>
              <button
                className="btn btn__remove"
                onClick={() => handleRemove()}
              >
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
            </>
          )}
          <label htmlFor="selectAll" className="checkbox__label">
            <input
              type="checkbox"
              name="selectAll"
              id="SelectAll"
              onClick={(e) => {
                handleSelectAll(e);
              }}
            />
            <span>Select All</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default Header;

import axios from "axios";
import React from "react";
import "../header.css";

const Header = ({ allImages, images, image }) => {
  // const filterValues = selectedCards.map((item) => item.id);
  const selectedCardsId = allImages
    ?.filter((item) => item.isSelected == true)
    .map((item) => item.id);
  // console.log(selectedCards);
  function handleRemove() {
    image
      .bulkDelete(selectedCardsId)
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
  }

  function handleDownload() {
    const imageDownloadUrl = selectedCards.map((item) => item.url);
    console.log(imageDownloadUrl);
    if (imageDownloadUrl.length) {
      for (var i = 0; i < imageDownloadUrl.length; i++) {
        axios({
          url: imageDownloadUrl[i],
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

  const handleSelectAll = async (e) => {
    const { checked } = e.target;
    const { id, isSelected } = item;
    await image.update(id, { isSelected: !isSelected });
  };

  const handleImage = async (e) => {
    let file = e.target.files[0];
    // console.log(file);
    await image.add({
      url: await getBase64(file),
      date: new Date().toLocaleDateString(),
      caption: file.name,
      isSelected: false,
    });
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="header">
        <div className="selectedCards__count">
          unselect {selectedCardsId?.length} images
        </div>

        {selectedCardsId?.length > 0 ? (
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
        ) : (
          <label htmlFor="upload__myImage">
            <input
              type="file"
              name="myImage"
              id="upload__myImage"
              onChange={(e) => {
                handleImage(e);
              }}
            />
            Upload Image
          </label>
        )}
      </div>
    </>
  );
};

export default Header;

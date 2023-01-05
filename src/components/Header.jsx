import axios from "axios";
import React from "react";
import dateFormat from "dateformat";

import "../header.css";

const Header = ({ allImages, image }) => {
  const selectedCardsId = allImages
    ?.filter((item) => item.isSelected == true)
    .map((item) => item.id);
  function handleRemove() {
    /**
     * It takes the selected cards and deletes them from the database.
     */
    image
      .bulkDelete(selectedCardsId)
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
    document.querySelector("#SelectAll").checked = false;
  }

  function handleDownload() {
    /**
     * It takes the image url from the state, filters out the ones that are selected, and then downloads
     * them.
     */
    let imageDownloadUrl = allImages
      ?.filter((item) => item.isSelected === true)
      .map((item) => item.url);
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
    /**
     * If the checkbox is checked, then update all the images to have isSelected set to true, otherwise set
     * it to false.
     */
    const selectedAllCardsIds = allImages?.map((item) => item.id);
    const { checked } = e.target;
    if (checked) {
      for (let i = 0; i < selectedAllCardsIds.length; i++) {
        await image.update(selectedAllCardsIds[i], { isSelected: true });
      }
    } else {
      for (let i = 0; i < selectedAllCardsIds.length; i++) {
        await image.update(selectedAllCardsIds[i], { isSelected: false });
      }
    }
  };

  const handleImage = async (e) => {
    /**
     * When the user selects an image, get the base64 representation of the image and add it to the image
     * array.
     */
    let file = e.target.files[0];
    console.log(file);
    await image.add({
      id: allImages?.length + 1,
      url: await getBase64(file),
      date: dateFormat(new Date().toLocaleDateString(), "mmm d"),
      caption: file.name,
      isSelected: false,
    });
  };

  const getBase64 = (file) => {
    /**
     * It takes a file and returns a promise that resolves to the base64 representation of the file (image in our case).
     * @returns A promise that resolves to a base64 encoded string.
     */
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
        ) : (
          <div className="upload__conatainer">
            <label htmlFor="upload__myImage">
              <input
                type="file"
                name="myImage"
                id="upload__myImage"
                onChange={(e) => {
                  handleImage(e);
                }}
              />
              <p>
                <span className="upload__icon">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </span>
                Upload Image
              </p>
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

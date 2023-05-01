import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../../../styling/Pages.css";
import Modal from "react-modal";
import Masonry from "react-masonry-css";
import ArrowKeysReact from "arrow-keys-react";

import rightArrow from "../../../Images/icons/right-arrow.png";
import leftArrow from "../../../Images/icons/left-arrow.png";
import exit from "../../../Images/icons/remove.png";

export default function Test(props) {
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:5001/itsshubhaofficial/us-central1/returnDocs`,
          {
            params: {
              folderName: props.folderName,
            },
          }
        );
        console.log("response :>> ", response.data);
        let data = response.data;
        setAllImages([...allImages, ...data]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      {console.log("allImages :>> ", allImages)}
      <PhotoRender allImages={allImages} title={props.title} />
    </>
  );
}

function PhotoRender(props) {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  const modal = useRef(null);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const afterOpenModal = () => {
    modal.current.focus();
  };

  const enlargeImage = (index, photoSrc) => {
    setCurrentIndex(index);
    setCurrentImage(props.allImages[index]["unCompressedLink"]);
    openModal();
  };

  const nextImg = () => {
    if (currentIndex < props.allImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentImage(props.allImages[currentIndex + 1]["unCompressedLink"]);
    } else {
      setCurrentIndex(0);
      setCurrentImage(props.allImages[0]["unCompressedLink"]);
    }
    console.log("nextImage Pressed :>> ", currentImage);
  };

  const prevImg = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentImage(props.allImages[currentIndex - 1]["unCompressedLink"]);
    } else {
      setCurrentIndex(props.allImages.length - 1);
      setCurrentImage(
        props.allImages[props.allImages.length - 1]["unCompressedLink"]
      );
    }
  };

  return (
    <>
      <div
        className="dynamic-img"
        ref={modal}
        {...ArrowKeysReact.events}
        tabIndex="1"
      >
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={() => closeModal()}
          onAfterOpen={() => afterOpenModal()}
          className="modal-class"
        >
          <img src={exit} className="x-btn" onClick={() => closeModal()} />
          <img
            src={rightArrow}
            className="right-btn"
            onClick={() => {
              nextImg();
            }}
          />
          <img src={leftArrow} className="left-btn" onClick={() => prevImg()} />
          <div id="dynamic-modal">
            <img className="modal-img" src={currentImage} />
          </div>
        </Modal>
        <div id="title">
          <p id="heading">{props.title}</p>
          <p id="sub-heading">PHOTOGRAPHY</p>
        </div>
        <div className="image-grid">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {props.allImages.map((photoSrc, index) => {
              return (
                <img
                  src={photoSrc["compressedLink"]}
                  key={index}
                  onClick={() => enlargeImage(index, photoSrc)}
                />
              );
            })}
          </Masonry>
        </div>
      </div>
    </>
  );
}

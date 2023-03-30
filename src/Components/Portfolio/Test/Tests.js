import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../../../styling/Pages.css";
import Modal from "react-modal";
import Masonry from "react-masonry-css";
import ArrowKeysReact from "arrow-keys-react";

export default function () {
  const [compressedImages, setCompImages] = useState([]);
  const [unCompressedImages, setUnCompImages] = useState([]);

  const fetchImages = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:5001/itsshubhaofficial/us-central1/returnDocs`,
        {
          params: {
            collection: "people",
            document: "graduation",
          },
        }
      );
      let data = response.data;
      setCompImages([...compressedImages, ...data.compressed]);
      setUnCompImages([...unCompressedImages, ...data.uncompressed]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <PhotoRender
        compImages={compressedImages}
        unCompImages={unCompressedImages}
      />
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

  const enlargeImage = (index) => {
    setCurrentImage(props.unCompImages[index]);
    setCurrentIndex(index);
    openModal();
  };

  const nextImg = () => {
    if (currentIndex < props.unCompImages.length - 1)
      setCurrentIndex(currentIndex + 1);
    else setCurrentIndex(0);
  };

  const prevImg = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else setCurrentIndex(props.unCompImages.length - 1);
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
          <img
            src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fremove.png?alt=media&token=4673b7c0-25d9-4567-8520-a74bb7a03015"
            className="x-btn"
            onClick={() => closeModal()}
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fright-arrow.png?alt=media&token=12a0aaae-4678-491a-94db-223d402e1549"
            className="right-btn"
            onClick={() => nextImg()}
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fleft-arrow.png?alt=media&token=9f465127-5ae0-4504-bb29-27b1915c7760"
            className="left-btn"
            onClick={() => prevImg()}
          />
          <div id="dynamic-modal">
            <img className="modal-img" src={props.unCompImages[currentIndex]} />
          </div>
        </Modal>

        <div className="image-grid">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {props.compImages.map((photoSrc, index) => {
              return (
                <img
                  src={photoSrc}
                  key={index}
                  onClick={() => enlargeImage(index)}
                />
              );
            })}
          </Masonry>
        </div>
      </div>
    </>
  );
}

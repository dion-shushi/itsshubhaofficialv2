import axios from "axios";
import { useEffect, useRef, useState } from "react";

import Masonry from "react-masonry-css";
import Modal from "react-modal";
import ArrowKeysReact from "arrow-keys-react";

import "../../styling/Section.css";
import "../../styling/Pages.css";

// This class is used to render each prodcut section
// Check Components/Products.js

function Section(props) {
  const [compressedImages, setCompImages] = useState([]);
  const [unCompressedImages, setUnCompImages] = useState([]);

  const [modalIsOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  const fetchImages = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:5001/itsshubhaofficial/us-central1/returnDocs`,
        {
          params: {
            collection: props.collection,
            document: props.document,
          },
        }
      );
      let data = response.data;
      console.log(data);
      setCompImages([...compressedImages, ...data.compressed]);
      setUnCompImages([...unCompressedImages, ...data.uncompressed]);
    } catch (err) {
      console.error(err);
    }
  };

  const breakpointColumnsObj = {
    default: 1,
    1100: 1,
    700: 1,
    500: 1,
  };

  const modal = useRef();

  useEffect(() => {
    fetchImages();
  }, []);

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
    setCurrentIndex(index);
    openModal();
  };

  const nextImg = () => {
    if (currentIndex < compressedImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  };

  const prevImg = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else setCurrentIndex(compressedImages.length - 1);
  };

  const UseMasonary = () => {
    if (props.isMasonary) {
      return (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid ruleOfThirds"
          columnClassName="my-masonry-grid_column"
        >
          {compressedImages.map((photoSrc, index) => (
            <img
              className="productImages"
              src={photoSrc}
              key={index}
              onClick={() => enlargeImage(index)}
            />
          ))}
        </Masonry>
      );
    } else {
      return compressedImages.map((photoSrc, index) => (
        <img
          className="productImages"
          src={photoSrc}
          key={index}
          onClick={() => enlargeImage(index)}
        />
      ));
    }
  };

  return (
    <>
      <div
        className="section"
        ref={modal}
        {...ArrowKeysReact.events}
        tabIndex="1"
      >
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onAfterOpen={afterOpenModal}
          className="modal-class"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fremove.png?alt=media&token=4673b7c0-25d9-4567-8520-a74bb7a03015"
            className="x-btn"
            onClick={closeModal}
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fright-arrow.png?alt=media&token=12a0aaae-4678-491a-94db-223d402e1549"
            className="right-btn"
            onClick={nextImg}
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fleft-arrow.png?alt=media&token=9f465127-5ae0-4504-bb29-27b1915c7760"
            className="left-btn"
            onClick={prevImg}
          />
          <div id="dynamic-modal">
            <img className="modal-img" src={unCompressedImages[currentIndex]} />
          </div>
        </Modal>
        <div
          className={
            props.image ? "descriptionSection" : "descriptionSectionNullImage"
          }
        >
          <div>
            {props.image ? (
              <img className="sectionImage" src={props.image} alt="" />
            ) : (
              <></>
            )}
          </div>

          <div className="textSection">
            <div className="text">
              <p className="sectionTitle">{props.title}</p>
              <p className="shortDesc">{props.shortDescription}</p>
            </div>
          </div>
        </div>
        <div>
          <UseMasonary />
        </div>
      </div>
    </>
  );
}

export default Section;

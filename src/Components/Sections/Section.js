import { getDownloadURL, listAll } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

import Masonry from "react-masonry-css";
import Modal from "react-modal";
import ArrowKeysReact from "arrow-keys-react";

import "../../styling/Section.css";
import "../../styling/Pages.css";

function Section(props) {
  const [listOfImages, setImages] = useState([]);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  const breakpointColumnsObj = {
    default: 1,
    1100: 1,
    700: 1,
    500: 1,
  };

  const modal = useRef();

  useEffect(() => {
    loadImages(props.storageRef);
    console.log("being called twice?");

    return () => {
      setImages([]);
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const afterOpenModal = () => {
    // document.getElementById(
    //   "dynamic-modal"
    // ).innerHTML = `<img class="modal-img" src=${
    //   this.state.listOfImages[this.state.currentIndex]
    // }/>`;
    modal.current.focus();
  };

  const enlargeImage = (image, index) => {
    setCurrentImage(image.default);
    setCurrentIndex(index);
    openModal();
  };

  const nextImg = () => {
    if (currentIndex < listOfImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  };

  const prevImg = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else setCurrentIndex(listOfImages.length - 1);
  };

  const loadImages = (storageRef) => {
    listAll(storageRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          // let newAr = [...listOfImages];
          // newAr.push(url);
          setImages((listOfImages) => [...listOfImages, url]);
        });
      });
    });
  };

  const UseMasonary = () => {
    if (props.isMasonary) {
      return (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid ruleOfThirds"
          columnClassName="my-masonry-grid_column"
        >
          {listOfImages.map((image, index) => (
            <img
              className="productImages"
              onClick={() => enlargeImage(image, index)}
              key={index}
              src={image}
              alt="info"
            />
          ))}
        </Masonry>
      );
    } else {
      return listOfImages.map((image, index) => (
        <img
          className="productImages"
          onClick={() => enlargeImage(image, index)}
          key={index}
          src={image}
          alt="info"
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
            <img className="modal-img" src={listOfImages[currentIndex]} />
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

          {/* <img className="sectionImage" src={props.image} alt="" /> */}
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

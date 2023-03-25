import { useRef, useState, useEffect } from "react";
import "../../styling/Pages.css";
import Modal from "react-modal";
import Masonry from "react-masonry-css";
import ArrowKeysReact from "arrow-keys-react";

import { getDownloadURL, listAll } from "firebase/storage";

export default function PagesFunc(props) {
  const [images, setImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [scrollPostion, setScrollPosition] = useState(0);

  const storageRef = props.storageRef;

  const modal = useRef(null);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    loadImages();
    console.log("DOM updated");
  }, []);

  //   ArrowKeysReact.config({
  //     left: () => {
  //       prevImg();
  //     },
  //     right: () => {
  //       nextImg();
  //     },
  //   });

  const openModal = () => {
    setModalIsOpen(true);
  };

  //   const closeModal = () => {
  //     setModalIsOpen(false);
  //   };

  //   const afterOpenModal = () => {
  //     // modal.current.focus();
  //   };

  const enlargeImage = (image, index) => {
    setCurrentImage(image.default);
    setCurrentIndex(index);
    openModal();
  };

  //   const nextImg = () => {
  //     if (currentIndex < images.length - 1) {
  //       setCurrentIndex(currentIndex + 1);
  //     } else setCurrentIndex(0);
  //   };

  //   const prevImg = () => {
  //     if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  //     else setCurrentIndex(images.length - 1);
  //   };

  const loadImages = async () => {
    //gets all the files from that folder
    console.log("loadImages() function is being called");
    const tempImageList = [];
    listAll(storageRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          tempImageList.push(url);
        });
      });

      setImages(tempImageList);
      console.log(images);
    });
  };

  return (
    <div
      className="dynamic-img"
      ref={modal}
      {...ArrowKeysReact.events}
      tabIndex="1"
    >
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        // onRequestClose={closeModal()}
        // onAfterOpen={afterOpenModal()}
        className="modal-class"
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fremove.png?alt=media&token=4673b7c0-25d9-4567-8520-a74bb7a03015"
          className="x-btn"
          //   onClick={closeModal()}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fright-arrow.png?alt=media&token=12a0aaae-4678-491a-94db-223d402e1549"
          className="right-btn"
          //   onClick={nextImg()}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fleft-arrow.png?alt=media&token=9f465127-5ae0-4504-bb29-27b1915c7760"
          className="left-btn"
          //   onClick={prevImg()}
        />
        <div id="dynamic-modal">
          <img className="modal-img" src={images[currentIndex]} />
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
          {images.map((image, index) => (
            <img
              onClick={() => enlargeImage(image, index)}
              key={index}
              src={image}
              alt="info"
            />
          ))}
        </Masonry>
      </div>
    </div>
  );
}

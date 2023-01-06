import { Component } from "react";
import React from "react";
import "../../styling/Pages.css";
import Modal from "react-modal";
import Masonry from "react-masonry-css";
import ArrowKeysReact from "arrow-keys-react";
// import "react-lazy-load-image-component/src/effects/opacity.css";

// TESTING

import axios from "axios";

import { getDownloadURL, listAll } from "firebase/storage";

class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      currentIndex: 0,
      currentImage: "",
      scrollPosition: 0,
      storageRef: this.props.storageRef,
      listOfImages: [],
      breakpointColumnsObj: {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
      },
    };

    this.modal = React.createRef();

    ArrowKeysReact.config({
      left: () => {
        this.prevImg();
      },
      right: () => {
        this.nextImg();
      },
    });

    this.enlargeImage = this.enlargeImage.bind(this);
    this.nextImg = this.nextImg.bind(this);
    this.prevImg = this.prevImg.bind(this);
    this.loadImages = this.loadImages.bind(this);
  }

  componentDidMount() {
    this.testResize();
    this.loadImages();
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  afterOpenModal = () => {
    // document.getElementById(
    //   "dynamic-modal"
    // ).innerHTML = `<img class="modal-img" src=${
    //   this.state.listOfImages[this.state.currentIndex]
    // }/>`;
    this.modal.current.focus();
  };

  enlargeImage = (image, index) => {
    this.setState({ currentImage: image.default, currentIndex: index });
    this.openModal();
  };

  nextImg = () => {
    if (this.state.currentIndex < this.state.listOfImages.length - 1) {
      this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
        console.log(this.state.currentIndex);
      });
    } else this.setState({ currentIndex: 0 });
  };

  prevImg = () => {
    if (this.state.currentIndex > 0)
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    else
      this.setState({
        currentIndex: this.state.listOfImages.length - 1,
      });
  };

  loadImages() {
    //gets all the files from that folder
    listAll(this.state.storageRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          this.setState({
            listOfImages: [...this.state.listOfImages, url],
          });
        });
      });
    });
  }

  render() {
    // document.addEventListener("scroll", () => {
    //   this.setState({ scrollPosition: document.documentElement.scrollTop });
    // });

    return (
      <div
        className="dynamic-img"
        ref={this.modal}
        {...ArrowKeysReact.events}
        tabIndex="1"
      >
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          onAfterOpen={this.afterOpenModal}
          className="modal-class"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fremove.png?alt=media&token=4673b7c0-25d9-4567-8520-a74bb7a03015"
            className="x-btn"
            onClick={this.closeModal}
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fright-arrow.png?alt=media&token=12a0aaae-4678-491a-94db-223d402e1549"
            className="right-btn"
            onClick={this.nextImg}
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/icons%2Fleft-arrow.png?alt=media&token=9f465127-5ae0-4504-bb29-27b1915c7760"
            className="left-btn"
            onClick={this.prevImg}
          />
          <div id="dynamic-modal">
            <img
              className="modal-img"
              src={this.state.listOfImages[this.state.currentIndex]}
            />
          </div>
        </Modal>
        <div id="title">
          <p id="heading">{this.props.title}</p>
          <p id="sub-heading">PHOTOGRAPHY</p>
        </div>
        <div className="image-grid">
          <Masonry
            breakpointCols={this.state.breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {this.state.listOfImages.map((image, index) => (
              <img
                onClick={() => this.enlargeImage(image, index)}
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
}

export default Pages;

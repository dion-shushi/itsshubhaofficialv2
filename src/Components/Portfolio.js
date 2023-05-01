import "./Portfolio.css";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <>
      <div id="title">
        <p id="heading">Portfolio </p>
      </div>
      <div className="pictureDiv">
        <div className="pictures graduation">
          <span className="picture-text">Graduation</span>
          <Link
            to="/graduation"
            className="image-button"
            id="portrait-button"
            style={{ textDecoration: "none" }}
          >
            View
          </Link>
        </div>
        <div className="pictures lifestyle">
          <span className="picture-text">Lifestyle</span>
          <Link
            to="/lifestyle"
            className="image-button"
            id="portrait-button"
            style={{ textDecoration: "none" }}
          >
            View
          </Link>
        </div>
        <div className="pictures events">
          <span id="portrait-text" className="picture-text">
            Events
          </span>
          <Link
            to="/events"
            className="image-button"
            id="portrait-button"
            style={{ textDecoration: "none" }}
          >
            View
          </Link>
        </div>
      </div>
    </>
  );
}

export default Portfolio;

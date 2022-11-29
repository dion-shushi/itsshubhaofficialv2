import "./Portfolio.css";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <>
      <div id="title">
        <p id="heading"> portfolio </p>
      </div>
      <div className="pictureDiv">
        <div className="pictures portraits">
          <span className="picture-text">People</span>
          <Link
            to="/people"
            className="image-button"
            id="portrait-button"
            style={{ textDecoration: "none" }}
          >
            View
          </Link>
        </div>
        <div className="pictures graduation">
          <span id="portrait-text" className="picture-text">
            Products
          </span>
          <Link
            to="/products"
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

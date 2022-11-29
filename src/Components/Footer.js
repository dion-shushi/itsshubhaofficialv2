import "../styling/Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="social_links">
        <a href="https://www.instagram.com/itsshubhaofficial/" target="_blank">
          <img
            className="ig_icon"
            src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/ig.png?alt=media&token=73c8dc85-7cc9-4b65-abc8-022f48310d1c"
          ></img>
        </a>
      </div>
      <div className="copyright_section">
        <p>
          Copyright @ 2021 itsshubhaofficial <i className="far fa-copyright" />
        </p>
      </div>
    </div>
  );
}

export default Footer;

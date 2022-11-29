import { Component } from "react";
import "../styling/About.css";

class About extends Component {
  render() {
    return (
      <div className="about-page">
        <div>
          <h2 className="universal_font about-us-text">ABOUT US</h2>
        </div>
        <div className="about-content1">
          <div className="about-shubha">
            <div className="about-shubha-child shubha-picture">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/contacts%2FShubha%20Joshi-min.jpg?alt=media&token=b5596b34-1b87-4d97-a03d-9fd0ecbc6332"
                alt=""
              ></img>
            </div>
            <div className="about-shubha-child shubha-content">
              <h2 className="name">My name is Shubha Joshi</h2>
              <p>
                I'm a Photographer and a Videographer. I'm a creative
                sotryteller that demonstrates visual narrative thorugh the lens.
                I'm currently based in Houston, Texas but am able to travel
                anywhere to get the job done.{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="about-content2">
          <div className="main-msg-content">
            <div className="msg-content-child">
              <p>
                Precious moments are what matters, to me its more about the
                journey then the end. So help me help you capture those moments
                and preserve your memories of a lifetime.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;

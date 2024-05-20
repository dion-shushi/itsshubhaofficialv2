import { useEffect } from "react";
import "../styling/About.css";
import me from "../Images/self.webp";

function About() {
  useEffect(() => {});

  return (
    <div className="about-page">
      <div>
        <h2 className="universal_font title">WHO IS SHUBHA?</h2>
      </div>
      <div className="about-content">
        <img className="self-picture" src={me} />
        <p className="about-text">
          As a professional photographer based in Houston, Texas, I am deeply
          passionate about the craft and art behind it. My goal is to capture
          unforgettable moments and create breathtaking stories through my lens.
          Whether I am photographing my relatives' birthdays or working with
          clients, my aim is to produce the best possible images. Preserving
          precious memories is a source of pride for me as a photographer,
          freezing those special moments in time for generations to cherish.
        </p>
      </div>
    </div>
  );
}

export default About;

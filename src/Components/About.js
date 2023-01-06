import { useEffect } from "react";
import "../styling/About.css";

function About() {
  useEffect(() => {});

  return (
    <div className="about-page">
      <div>
        <h2 className="universal_font title">WHO IS SHUBHA JOSHI</h2>
      </div>
      <div className="about-text">
        I’m a professional photographer based in Houston, Texas. Photography is
        my passion and I think my true calling. I strive to capture incredible
        moments and tell breathtaking stories. Whether I’m documenting my
        relatives birthdays or working for my clients, I strive to create the
        best image possible. Memories are precious and as a photographer, I take
        pride in freezing those precious moments in time for generations to see.
      </div>
    </div>
  );
}

export default About;

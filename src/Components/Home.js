import "../styling/Home.css";
import { Button } from "./Button";

function Home() {
  return (
    <>
      <div className="strip_one">
        <div className="hero-container">
          <h1>JUST CREATE</h1>
          <div className="hero-btns">
            <Button path="/contact" buttonStyle="btn--outline">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

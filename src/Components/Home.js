import "../App.css";
import "../styling/Home.css";
import { Button } from "./Button";

function Home() {
  return (
    <>
      <div className="strip_one">
        <div className="hero-container">
          <h1>ITSSHUBHAOFFICIAL</h1>
          <p>Professional Done Properly</p>
          <div className="hero-btns">
            <Button
              className="btns lifestyle-btn"
              buttonStyle="btn--primary"
              buttonSize="btn--large"
              path="/people"
            >
              People
            </Button>
            <Button
              className="btns grad-btn"
              buttonStyle="btn--primary"
              buttonSize="btn--large"
              path="/products"
            >
              Products
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

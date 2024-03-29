import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styling/App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";

import Navbar from "./Components/Navbar";
import Portfolio from "./Components/Portfolio";
import People from "./Components/Portfolio/People/People";
import Graduation from "./Components/Portfolio/People/Graduation";
import Products from "./Components/Portfolio/Products/Products";
import Footer from "./Components/Footer";
import Lifestyle from "./Components/Portfolio/People/Lifestyle";
import Events from "./Components/Portfolio/People/Events";

function App() {
  return (
    <div className="whole-page" id="variableBackground">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/people" element={<People />} />
        <Route path="/graduation" element={<Graduation />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/events" element={<Events />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;

import React from "react";
import "../../Portfolio.css";
import Section from "../../Sections/Section";

import bmwMLogo from "../../../Images/BMW-M-Logo.png";
import dodgeLogo from "../../../Images/Dodge.png";

import "../../../styling/Products.css";

function Products() {
  return (
    <>
      <div className="productsPage">
        <div id="title">
          <p id="heading">PRODUCTS</p>
          <p id="sub-heading">PHOTOGRAPHY</p>
        </div>
        <Section
          collection="products"
          document="dodge"
          isMasonary={false}
          title="Dodge Challenger"
          shortDescription=""
          image={dodgeLogo}
        />
        <Section
          collection="products"
          document="bmw"
          isMasonary={false}
          title="BMW M440i"
          shortDescription="For small social media campaign to showcase the BMW M440i"
          image={bmwMLogo}
        />
        <Section
          collection="products"
          document="hamoery"
          isMasonary={true}
          title="Hamoery Bracelets"
          shortDescription="Showcasing the Tiger Eye Stone Bead bracelets"
          image=""
        />
      </div>
    </>
  );
}
export default Products;

import React from "react";
import { productsStorageRef } from "../../../firebase/config";
import "../../Portfolio.css";
import Section from "../../Sections/Section";
import { ref } from "firebase/storage";

import bmwMLogo from "../../../Images/BMW-M-Logo.png";
import dodgeLogo from "../../../Images/Dodge.png";

import "../../../styling/Products.css";

function Products() {
  const dodgeChallengerRef = ref(productsStorageRef, "Dodge Challenger");
  const bmwRef = ref(productsStorageRef, "BMW M4401");
  const braceletRef = ref(productsStorageRef, "Hamoery Bracelets");
  return (
    <>
      <div className="productsPage">
        <div id="title">
          <p id="heading">PRODUCTS</p>
          <p id="sub-heading">PHOTOGRAPHY</p>
        </div>
        <Section
          storageRef={dodgeChallengerRef}
          isMasonary={false}
          title="Dodge Challenger"
          shortDescription=""
          image={dodgeLogo}
        />
        <Section
          storageRef={bmwRef}
          isMasonary={false}
          title="BMW M440i"
          shortDescription="For small social media campaign to showcase the BMW M440i"
          image={bmwMLogo}
        />
        <Section
          storageRef={braceletRef}
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

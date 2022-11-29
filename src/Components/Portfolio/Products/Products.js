import React from "react";
import Pages from "../../pages/Pages";
import { productsStorageRef } from "../../../firebase/config";
import "../../Portfolio.css";

function Products() {
  return (
    <>
      {/* <Pages list={this.state.listOfUrl} title="LIFESTYLE" /> */}
      <Pages list={[]} storageRef={productsStorageRef} title="PRODUCTS" />
    </>
  );
}
export default Products;

import React from "react";
import Pages from "../../pages/Pages";
import { peopleStorageRef } from "../../../firebase/config";
import "../../Portfolio.css";

function People() {
  return (
    <>
      {/* <Pages list={this.state.listOfUrl} title="LIFESTYLE" /> */}
      <Pages list={[]} storageRef={peopleStorageRef} title="PEOPLE" />
    </>
  );
}
export default People;

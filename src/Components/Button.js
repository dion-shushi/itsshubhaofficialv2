import React from "react";
import "../styling/Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline", "btn--aboutpage"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  path,
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const default_img =
    "url(https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/background.jpg?alt=media&token=81851afb-0242-41b9-8b24-10f09c93f38b)";
  const lifestyle_img =
    "url(https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/portraits%2FIMG_6883-Edit-Edit.webp?alt=media&token=2ff34a03-5c58-45e9-bb0d-83fa89a84b3e)";
  const grad_img =
    "url(https://firebasestorage.googleapis.com/v0/b/itsshubhaofficial.appspot.com/o/events%2Fgraduations%2FIMG_5169.jpg?alt=media&token=6ce86bdb-0592-438e-ab89-05a8bf20ce2a)";
  const events_img = "";

  let final_background_img = "";

  if (children === "Lifestyle") {
    final_background_img = lifestyle_img;
  } else if (children === "Events") {
    final_background_img = events_img;
  } else if (children === "Grad") {
    final_background_img = grad_img;
  }

  return (
    <Link to={path} className="btn-mobile">
      <button
        onMouseEnter={() => {
          document.getElementById("variableBackground").setAttribute(
            "style",
            `background-image: ${final_background_img}; animation: 0.2s ease-in-out 0.2s;
                animation-fill-mode: forwards;`
          );
        }}
        onMouseLeave={() => {
          document
            .getElementById("variableBackground")
            .setAttribute("style", `background-image: ${default_img};`);
        }}
        onMouseDown={() => {
          document
            .getElementById("variableBackground")
            .setAttribute(
              "style",
              `background-image: ${default_img}; animation: ease-out 0.1s;`
            );
        }}
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};

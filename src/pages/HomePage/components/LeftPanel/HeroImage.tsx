import React from "react";
import "./HeroImage.styles.css";

export default function HeroImage() {
  return (
    <div className="hero-image-container">
      <img
        className="hero-image"
        src="/me/Avatar.png" // update this path to your actual image
        alt="Craig Stueber"
      />
    </div>
  );
}

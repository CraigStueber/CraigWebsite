import React, { useState } from "react";
import "./Locations.styles.css";

import KhrunGrunn from "../KhrunGrunn/KhrunGrunn";
import AboutBraeforge from "../AboutBraeforge/AboutBraeforge";

function Locations() {
  const [activeLocation, setActiveLocation] = useState("braeforge");

  const renderContent = () => {
    switch (activeLocation) {
      case "braeforge":
        return <AboutBraeforge />;
      case "khrungrunn":
        return <KhrunGrunn />;
      default:
        return null;
    }
  };

  return (
    <div className="locations">
      <h2>Locations</h2>
      <div className="location-buttons">
        <button
          className={activeLocation === "braeforge" ? "active" : ""}
          onClick={() => setActiveLocation("braeforge")}
        >
          Braeforge
        </button>
        <button
          className={activeLocation === "khrungrunn" ? "active" : ""}
          onClick={() => setActiveLocation("khrungrunn")}
        >
          Khrun Grunn
        </button>
      </div>
      <div className="location-content">{renderContent()}</div>
    </div>
  );
}

export default Locations;

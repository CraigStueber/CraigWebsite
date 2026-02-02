import React from "react";
import "./LeftPanel.styles.css";
import HeroImage from "./HeroImage";
import IntroText from "./IntroText";
import BadgeList from "./BadgeList";
import PersonaToggle from "./PersonaToggle";
import { Link } from "react-router-dom";
export default function LeftPanel() {
  return (
    <div className="left-panel">
      <HeroImage />
      <IntroText />
      <PersonaToggle />
      <BadgeList />
      <div className="left-panel-footer">
        <Link to="/pp">Privacy Policy</Link>
        <span>·</span>
        <Link to="/contact">Contact Craig</Link>
      </div>
    </div>
  );
}

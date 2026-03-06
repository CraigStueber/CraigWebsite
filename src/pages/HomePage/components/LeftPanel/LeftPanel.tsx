import React from "react";
import "./LeftPanel.styles.css";
import "../RoleFitModal/RoleFitModal.styles.css";
import HeroImage from "./HeroImage";
import IntroText from "./IntroText";
import PersonaToggle from "./PersonaToggle";
import RoleFitModal from "../RoleFitModal/RoleFitModal";
import SignalList from "./SignalList";
import WritingLinks from "./WritingLinks";
import { Link } from "react-router-dom";

export default function LeftPanel() {
  return (
    <div className="left-panel">
      <div className="profile-lockup">
        <HeroImage />
        <IntroText />
      </div>
      <SignalList />
      <WritingLinks />
      <PersonaToggle />
      <RoleFitModal />
      <a
        href="https://coderisk.craigstueber.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="role-fit-trigger"
        style={{ display: "block", textDecoration: "none" }}
      >
        CodeRisk Advisor
      </a>
      <div className="left-panel-footer">
        <Link to="/pp">Privacy Policy</Link>
        <span>·</span>
        <Link to="/contact">Contact Craig</Link>
      </div>
    </div>
  );
}

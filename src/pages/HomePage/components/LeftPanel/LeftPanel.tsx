import React from "react";
import "./LeftPanel.styles.css";
import HeroImage from "./HeroImage";
import IntroText from "./IntroText";
import BadgeList from "./BadgeList";

export default function LeftPanel() {
  return (
    <div className="left-panel">
      <HeroImage />
      <IntroText />
      <BadgeList />
    </div>
  );
}

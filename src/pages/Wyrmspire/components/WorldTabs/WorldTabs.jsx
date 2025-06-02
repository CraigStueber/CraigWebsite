import React, { useState } from "react";
import AboutBraeforge from "../AboutBraeforge/AboutBraeforge";
import NPC from "../NPC/NPC";
import PC from "../PC/PC";
import WantedBoard from "../WantedBoard/WantedBoard";
import "./WorldTabs.styles.css";

export default function WorldTabs() {
  const [activeTab, setActiveTab] = useState("braeforge");

  return (
    <div className="world-tabs-container">
      <div className="world-tabs-nav">
        <button
          className={activeTab === "braeforge" ? "active" : ""}
          onClick={() => setActiveTab("braeforge")}
        >
          Braeforge
        </button>
        <button
          className={activeTab === "npcs" ? "active" : ""}
          onClick={() => setActiveTab("npcs")}
        >
          NPCs
        </button>
        <button
          className={activeTab === "pcs" ? "active" : ""}
          onClick={() => setActiveTab("pcs")}
        >
          PCs
        </button>
        <button
          className={activeTab === "wanted" ? "active" : ""}
          onClick={() => setActiveTab("wanted")}
        >
          Wanted Board
        </button>
      </div>

      <div className="world-tabs-content">
        {activeTab === "braeforge" && <AboutBraeforge />}
        {activeTab === "npcs" && <NPC />}
        {activeTab === "pcs" && <PC />}
        {activeTab === "wanted" && <WantedBoard />}
      </div>
    </div>
  );
}

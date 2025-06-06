import React, { useState } from "react";
import AboutBraeforge from "../AboutBraeforge/AboutBraeforge";
import NPC from "../NPC/NPC";
import PC from "../PC/PC";
import WantedBoard from "../WantedBoard/WantedBoard";
import LastTimeOn from "../LastTimeOn/LastTimeOn";
import NotableFinds from "../NotableFinds/NotableFinds";
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
        <button
          className={activeTab === "lastTimeOn" ? "active" : ""}
          onClick={() => setActiveTab("lastTimeOn")}
        >
          Last Time On
        </button>
        <button
          className={activeTab === "notable" ? "active" : ""}
          onClick={() => setActiveTab("notable")}
        >
          Notable Finds
        </button>
      </div>

      <div className="world-tabs-content">
        {activeTab === "braeforge" && <AboutBraeforge />}
        {activeTab === "npcs" && <NPC />}
        {activeTab === "pcs" && <PC />}
        {activeTab === "wanted" && <WantedBoard />}
        {activeTab === "lastTimeOn" && <LastTimeOn />}
        {activeTab === "notable" && <NotableFinds />}
      </div>
    </div>
  );
}

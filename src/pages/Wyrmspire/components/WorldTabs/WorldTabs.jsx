import React, { useState, useEffect } from "react";
import AboutBraeforge from "../AboutBraeforge/AboutBraeforge";
import Locations from "../Locations/Locations";
import NPC from "../NPC/NPC";
import PC from "../PC/PC";
import WantedBoard from "../WantedBoard/WantedBoard";
import LastTimeOn from "../LastTimeOn/LastTimeOn";
import NotableFinds from "../NotableFinds/NotableFinds";
import TravelingMerchant from "../TravelingMerchant/TravelingMerchant";
import CharacterCard from "../CharacterCard/CharacterCard";
import "./WorldTabs.styles.css";

export default function WorldTabs() {
  const [activeTab, setActiveTab] = useState("locations");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 900);
    if (window.innerWidth > 900) setMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabs = [
    { id: "locations", label: "Locations" },
    { id: "npcs", label: "NPCs" },
    { id: "pcs", label: "PCs" },
    { id: "wanted", label: "Wanted Board" },
    { id: "lastTimeOn", label: "Last Time On" },
    { id: "notable", label: "Notable Finds" },
    { id: "travelingMerchant", label: "Traveling Merchant" },
    { id: "character", label: "My Character" },
  ];

  return (
    <div className="world-tabs-container">
      <div className="world-tabs-nav">
        {isMobile ? (
          <div className="mobile-nav-wrapper">
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰ Menu
            </button>
            {menuOpen && (
              <div className="mobile-dropdown">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={activeTab === tab.id ? "active" : ""}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMenuOpen(false);
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))
        )}
      </div>

      <div className="world-tabs-content">
        {activeTab === "locations" && <Locations />}
        {activeTab === "npcs" && <NPC />}
        {activeTab === "pcs" && <PC />}
        {activeTab === "wanted" && <WantedBoard />}
        {activeTab === "lastTimeOn" && <LastTimeOn />}
        {activeTab === "notable" && <NotableFinds />}
        {activeTab === "travelingMerchant" && <TravelingMerchant />}
        {activeTab === "character" && <CharacterCard />}
      </div>
    </div>
  );
}

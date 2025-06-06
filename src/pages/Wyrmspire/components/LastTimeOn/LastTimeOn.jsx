import { useState } from "react";
import "./LastTimeOn.styles.css";
import recapData1 from "./recapDataSession1";
import encounters1 from "./encounterSession1";

function LastTimeOn() {
  const [activeTab, setActiveTab] = useState("recap");

  const data = activeTab === "recap" ? recapData1 : encounters1;

  return (
    <div className="last-time-on">
      <h2>Last Time On</h2>

      <div className="button-group">
        <button
          className={activeTab === "recap" ? "active" : ""}
          onClick={() => setActiveTab("recap")}
        >
          Recap
        </button>
        <button
          className={activeTab === "encounter" ? "active" : ""}
          onClick={() => setActiveTab("encounter")}
        >
          Encounters
        </button>
      </div>

      {data.map((item, index) => (
        <div
          className="recap-section"
          style={{
            flexDirection:
              window.innerWidth > 768
                ? index % 2 === 0
                  ? "row"
                  : "row-reverse"
                : "column",
          }}
          key={index}
        >
          <img src={item.image} alt={item.title} className="recap-image" />
          <div className="recap-text">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LastTimeOn;

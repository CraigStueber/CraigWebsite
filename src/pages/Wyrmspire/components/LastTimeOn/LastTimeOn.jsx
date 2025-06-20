import { useState } from "react";
import "./LastTimeOn.styles.css";
import { recapData, recapDataSession2 } from "./recapDataSession1";
import encounters1 from "./encounterSession1";
import encounters2 from "./encounterSession2"; // new import

function LastTimeOn() {
  const [activeTab, setActiveTab] = useState("recap");
  const [activeSession, setActiveSession] = useState("session1");

  const getData = () => {
    if (activeTab === "recap") {
      return activeSession === "session1" ? recapData : recapDataSession2;
    } else {
      return activeSession === "session1" ? encounters1 : encounters2;
    }
  };

  const data = getData();

  return (
    <div className="last-time-on">
      <h2>Last Time On</h2>

      <div className="button-group">
        <button
          className={activeSession === "session1" ? "active" : ""}
          onClick={() => setActiveSession("session1")}
        >
          Session 1
        </button>
        <button
          className={activeSession === "session2" ? "active" : ""}
          onClick={() => setActiveSession("session2")}
        >
          Session 2
        </button>
      </div>

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

import { useState } from "react";
import "./LastTimeOn.styles.css";
import {
  recapData,
  recapDataSession2,
  recapDataSession3,
} from "./recapDataSession1";
import encounters1 from "./encounterSession1";
import encounters2 from "./encounterSession2";
import encounters3 from "./encounterSession3"; // new import

function LastTimeOn() {
  const [activeTab, setActiveTab] = useState("recap");
  const [activeSession, setActiveSession] = useState("session3");

  const getData = () => {
    if (activeTab === "recap") {
      if (activeSession === "session1") return recapData;
      if (activeSession === "session2") return recapDataSession2;
      if (activeSession === "session3") return recapDataSession3;
    } else {
      if (activeSession === "session1") return encounters1;
      if (activeSession === "session2") return encounters2;
      if (activeSession === "session3") return encounters3;
    }
    return []; // fallback
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
        </button>{" "}
        <button
          className={activeSession === "session3" ? "active" : ""}
          onClick={() => setActiveSession("session3")}
        >
          Session 3
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

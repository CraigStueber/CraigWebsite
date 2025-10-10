import { useState } from "react";
import "./LastTimeOn.styles.css";
import {
  recapData,
  recapDataSession2,
  recapDataSession3,
  recapDataSession4,
  recapDataSession5,
  recapDataSession6,
  recapDataSession7,
} from "./recapDataSession1";
import encounters1 from "./encounterSession1";
import encounters2 from "./encounterSession2";
import encounters3 from "./encounterSession3"; // new import
import encounters4 from "./encounterSession4"; // new import
import encounters5 from "./ecncounterSession5";
import encounters6 from "./encounterSession6"; // new import
import encounters7 from "./encounterSession7"; // new import
function LastTimeOn() {
  const [activeTab, setActiveTab] = useState("recap");
  const [activeSession, setActiveSession] = useState("session7");

  const getData = () => {
    if (activeTab === "recap") {
      if (activeSession === "session1") return recapData;
      if (activeSession === "session2") return recapDataSession2;
      if (activeSession === "session3") return recapDataSession3;
      if (activeSession === "session4") return recapDataSession4;
      if (activeSession === "session5") return recapDataSession5;
      if (activeSession === "session6") return recapDataSession6;
      if (activeSession === "session7") return recapDataSession7;
    } else {
      if (activeSession === "session1") return encounters1;
      if (activeSession === "session2") return encounters2;
      if (activeSession === "session3") return encounters3;
      if (activeSession === "session4") return encounters4;
      if (activeSession === "session5") return encounters5;
      if (activeSession === "session6") return encounters6;
      if (activeSession === "session7") return encounters7;
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
        <button
          className={activeSession === "session4" ? "active" : ""}
          onClick={() => setActiveSession("session4")}
        >
          Session 4
        </button>
        <button
          className={activeSession === "session5" ? "active" : ""}
          onClick={() => setActiveSession("session5")}
        >
          Session 5
        </button>
        <button
          className={activeSession === "session6" ? "active" : ""}
          onClick={() => setActiveSession("session6")}
        >
          Session 6
        </button>
        <button
          className={activeSession === "session7" ? "active" : ""}
          onClick={() => setActiveSession("session7")}
        >
          Session 7
        </button>
      </div>

      <div className="button-group tabs">
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

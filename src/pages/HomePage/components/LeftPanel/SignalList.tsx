import React from "react";
import "./SignalList.styles.css";

const signals = [
  { stat: "3+ years", label: "production LLM systems" },
  { stat: "Doctoral research", label: "AI-generated code security" },
  { stat: "Forthcoming Novel", label: "The Comfortable Apocalypse" },
];

export default function SignalList() {
  return (
    <div className="signal-list">
      {signals.map((item) => (
        <div key={item.stat} className="signal-item">
          <span className="signal-stat">{item.stat}</span>
          <span className="signal-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

import React from "react";
import "./NowSection.styles.css";

const items = [
  { label: "Role", value: "Senior AI Engineer, enterprise energy sector" },
  {
    label: "Research",
    value:
      "Doctoral dissertation — AI-generated code security & behavioral reliability",
  },
  { label: "Book", value: "The Comfortable Apocalypse — forthcoming 2026" },
];

export default function NowSection() {
  return (
    <div className="now-section">
      <span className="now-heading">Currently</span>
      <div className="now-list">
        {items.map((item) => (
          <div key={item.label} className="now-item">
            <span className="now-label">{item.label}</span>
            <span className="now-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

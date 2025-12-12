import React from "react";
import "./BadgeList.styles.css";

export default function BadgeList() {
  const badges = [
    "AI Safety",
    "AI Alignment",
    "Prompt Engineering",
    "LLM Behavior",
    "AI Systems Engineering",
    "React",
    "TypeScript",
    "Next.js",
    "Python",
  ];

  return (
    <div className="badge-list">
      {badges.map((badge) => (
        <div key={badge} className="badge">
          {badge}
        </div>
      ))}
    </div>
  );
}

import React from "react";
import "./BadgeList.styles.css";

export default function BadgeList() {
  const badges = [
    "React",
    "TypeScript",
    "Real-Time UI Systems",
    "Next.js",
    "Design Systems",
    "Python",
    "AI Integration",
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

import React from "react";
import "./BadgeList.styles.css";

export default function BadgeList() {
  const badges = [
    "React",
    "TypeScript",
    "React Native",
    "Next.js",
    "Python",
    "AI Integration",
    "Prompt Engineering",
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

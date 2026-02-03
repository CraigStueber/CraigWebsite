import React from "react";
import "./BadgeList.styles.css";

export default function BadgeList() {
  const badges = [
    "Senior Front-End Engineering",
    "React",
    "TypeScript",
    "Front-End Architecture",
    "Performance Optimization",
    "Real-Time UI Systems",
    "Next.js",
    "Accessibility (WCAG/ADA)",
    "Design Systems",
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

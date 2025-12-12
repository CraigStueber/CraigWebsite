import React from "react";
import "./BadgeList.styles.css";

export default function BadgeList() {
  const badges = [
    "React",
    "TypeScript",
    "Cloudflare",
    "Supabase",
    "AI Ethics",
    "React Native",
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

import { useState } from "react";
import "./Experience.styles.css";
import experienceData from "./experience.json";

function Experience() {
  const [showAll, setShowAll] = useState(false);

  // Only show first 4 unless "See More" clicked
  const displayedJobs = showAll ? experienceData : experienceData.slice(0, 3);

  return (
    <section
      id="experience"
      className="experience-section"
      aria-labelledby="experience-heading"
    >
      <div className="experience-heading-container">
        <h2 id="experience-heading" className="experience-heading">
          Professional Experience
        </h2>
        <p className="experience-intro">
          Over the past 7+ years, I’ve delivered front-end solutions that scale
          from consumer-facing campaigns to enterprise platforms, always with a
          focus on performance, accessibility, and long-term impact.
        </p>
      </div>

      {displayedJobs.map((job, index) => (
        <div key={index} className="experience-card">
          <div className="experience-left">
            <h3 className="experience-role">{job.role}</h3>
            <p className="experience-company">{job.company}</p>
            <span className="experience-meta">
              {job.dates} | {job.location}
            </span>
            <p className="experience-subheader">{job.subHeader}</p>
          </div>
          <div className="experience-right">
            <ul>
              {job.highlights.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {!showAll && experienceData.length > 4 && (
        <div className="experience-button-container">
          <button
            className="experience-button"
            onClick={() => setShowAll(true)}
          >
            See More Experience
          </button>
        </div>
      )}
    </section>
  );
}

export default Experience;

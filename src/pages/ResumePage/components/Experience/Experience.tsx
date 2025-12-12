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
          Across 7+ years of engineering, I’ve worked at the intersection of
          user experience, AI-assisted systems, and reliable model behavior. My
          experience spans consumer apps, enterprise platforms, and
          AI-integrated workflows—where I design system prompts, build
          behavioral evaluations, and collaborate across teams to ensure
          technology behaves predictably and safely in real-world use.
        </p>
      </div>

      {displayedJobs.map((job, index) => (
        <div key={index} className="experience-card">
          <div className="experience-logo">
            <img src={job.image} alt={`${job.company} logo`} />
          </div>

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

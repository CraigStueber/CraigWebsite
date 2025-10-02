import { useState } from "react";
import "./Projects.styles.css";
import projectsData from "./projects.json";

function Projects() {
  const [showAll, setShowAll] = useState(false);

  // Show only first 4 unless "See More" clicked
  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 4);

  return (
    <section
      id="projects"
      className="projects-section"
      aria-labelledby="projects-heading"
    >
      <div className="projects-heading-container">
        <h2 id="projects-heading" className="projects-heading">
          Projects
        </h2>
      </div>

      {visibleProjects.map((project, index) => (
        <div
          key={index}
          className={`project-card ${
            index % 2 === 0 ? "left-image" : "right-image"
          }`}
        >
          <div className="project-image">
            <img src={project.image} alt={project.title} />
          </div>

          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <p className="project-impact">
              <strong>Impact:</strong> {project.businessImpact}
            </p>

            <ul className="project-highlights">
              {project.highlights.map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            <div className="project-tech">
              {project.technologies.map((tech: string, i: number) => (
                <span key={i} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {!showAll && projectsData.length > 4 && (
        <div className="see-more-container">
          <button className="see-more-btn" onClick={() => setShowAll(true)}>
            See More Projects
          </button>
        </div>
      )}
    </section>
  );
}

export default Projects;

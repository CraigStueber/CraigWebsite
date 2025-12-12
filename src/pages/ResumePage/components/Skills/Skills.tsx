"use client";

import { useState } from "react";
import skillsData from "./skills.json";
import "./Skills.styles.css";

interface Skill {
  name: string;
  level: number;
  years: number;
  description: string;
}

type SkillsData = {
  [category: string]: Skill[];
};

function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const closeModal = () => setSelectedSkill(null);

  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-heading">Skills</h2>

      {Object.entries(skillsData as SkillsData).map(([category, skills]) => (
        <div key={category} className="skills-category">
          <h3 className="skills-category-title">{category}</h3>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-card"
                onClick={() => setSelectedSkill(skill)}
              >
                <h4 className="skill-name">{skill.name}</h4>
                <p className="skill-meta">
                  <span className="skill-rating">⭐ {skill.level}/5</span>
                  <span className="skill-years">{skill.years} yrs</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedSkill && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button className="modal-close-x" onClick={closeModal}>
              &times;
            </button>
            <h3>{selectedSkill.name}</h3>
            <p>
              <strong>Rating:</strong> {selectedSkill.level}/5
            </p>
            <p>
              <strong>Years Experience:</strong> {selectedSkill.years}
            </p>
            <p>{selectedSkill.description}</p>
            <button className="modal-close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
export default Skills;

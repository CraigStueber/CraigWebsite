import educationData from "./education.json";
import "./Education.styles.css";
function Education() {
  return (
    <section id="education" className="education-section">
      <h2 className="education-heading">Education</h2>
      {educationData.map((edu, index) => (
        <div key={index} className="education-card">
          <div className="education-left">
            <h3 className="education-degree">{edu.degree}</h3>
            <p className="education-school">{edu.school}</p>
            <span className="education-meta">{edu.dates}</span>
            <p className="education-subheader">{edu.subHeader}</p>
          </div>
          <div className="education-right">
            <ul>
              {edu.highlights.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Education;

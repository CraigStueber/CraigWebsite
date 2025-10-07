import educationData from "./education.json";
import "./Education.styles.css";
function Education() {
  return (
    <section id="education" className="education-section">
      <h2 className="education-heading">Education</h2>
      <p className="education-intro">
        I’ve spent the last ten years not just growing my career but also
        continuing my education. Online learning has taught me discipline and
        time management, and I never stop pushing myself—whether it’s earning my
        Bachelor’s and Master’s degrees, working toward my Ph.D. dissertation,
        or diving into every promising Udemy class I can find.
      </p>
      {educationData.map((edu, index) => (
        <div key={index} className="education-card">
          <div className="education-logo">
            <img src={edu.logo} alt={`${edu.school} logo`} />
          </div>

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

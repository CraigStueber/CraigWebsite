import "./MainSection.styles.css";

function MainSection() {
  return (
    <div className="main-section">
      <img
        src="/me/craigVar.jpg"
        alt="Picture of Craig smiling"
        className="about-me-image"
      />
      <h1 className="main-section-title">
        Craig <br /> Stueber
      </h1>
      <p className="main-section-subtitle">AI Behavior & Prompt Engineer</p>
      <p className="main-section-subtitle">
        Senior Front-End Engineer • PhD Candidate in AI Safety • Author of The
        Comfortable Apocalypse
      </p>
      <p className="main-section-description">
        I design and evaluate AI systems so they behave reliably, safely, and
        usefully in real products—through structured prompting, behavioral
        evaluations, and cross-functional collaboration.
      </p>
    </div>
  );
}
export default MainSection;

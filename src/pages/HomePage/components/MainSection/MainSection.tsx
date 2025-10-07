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
      <p className="main-section-subtitle">Senior Front-End Engineer</p>
      <p className="main-section-description">
        I’m a Senior React Developer specializing in building scalable,
        accessible, and user-centered apps with React, TypeScript, and Next.js.
        From enterprise platforms at Berkshire Hathaway Energy to launching my
        own mobile app DanceCard, I thrive at the intersection of clean code,
        great UX, and meaningful impact.
      </p>
    </div>
  );
}
export default MainSection;

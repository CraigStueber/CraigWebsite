import "./QuickStats.styles.css";

function QuickStats() {
  return (
    <div className="quick-stats-card" aria-labelledby="quick-stats-heading">
      <h3 id="quick-stats-heading" className="quick-stats-title">
        Quick Stats
      </h3>
      <div className="quick-stats-grid">
        <div className="stat">
          <span className="stat-number">7+</span>
          <span className="stat-label">Years Experience</span>
        </div>
        <div className="stat">
          <span className="stat-number">30K+</span>
          <span className="stat-label">Users Engaged</span>
        </div>
        <div className="stat">
          <span className="stat-number">1</span>
          <span className="stat-label">
            Startup <br /> Co-Founded
          </span>
        </div>
        <div className="stat">
          <span className="stat-number">Ph.D.</span>
          <span className="stat-label">
            Candidate <br />
            (AI Ethics)
          </span>
        </div>
        <div className="stat">
          <span className="stat-number">100%</span>
          <span className="stat-label">Remote Ready</span>
        </div>
        <div className="stat">
          <span className="stat-number">4</span>
          <span className="stat-label">Continents Explored</span>
        </div>
      </div>
    </div>
  );
}

export default QuickStats;

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
          <span className="stat-label">Years Engineering Experience</span>
        </div>

        <div className="stat">
          <span className="stat-number">100+</span>
          <span className="stat-label">
            Prompts <br /> Engineered
          </span>
        </div>

        <div className="stat">
          <span className="stat-number">25+</span>
          <span className="stat-label">
            Behavioral <br /> Evaluations Built
          </span>
        </div>

        <div className="stat">
          <span className="stat-number">15+</span>
          <span className="stat-label">
            Model Failure <br /> Analyses Conducted
          </span>
        </div>

        <div className="stat">
          <span className="stat-number">10+</span>
          <span className="stat-label">
            Incident <br /> Responses Led
          </span>
        </div>

        <div className="stat">
          <span className="stat-number">Ph.D.</span>
          <span className="stat-label">
            Candidate <br /> (AI Safety)
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuickStats;

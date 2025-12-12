import "./About.styles.css";
import QuickStats from "./_components/QuickStats";

function About() {
  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="about-heading"
    >
      <div className="about-heading-container">
        <h2 id="about-heading" className="about-heading">
          About Me
        </h2>

        <p>
          I’m an AI behavior–minded engineer who works at the intersection of
          front-end systems, prompt design, and model reliability. I focus on
          how large language models behave in real workflows—and how to guide
          them toward safe, consistent, and beneficial outputs.
        </p>

        <p>
          My background blends 7+ years of engineering with a Ph.D. focus in AI
          safety, giving me a practical and research-driven understanding of
          model behavior, alignment, and evaluation. Whether I’m designing a
          user interface or authoring system prompts, my goal is the same: build
          technology people can trust.
        </p>

        <img
          src="/me/BannerMe.jpg"
          alt="Cartoon of Craig sitting in a coffee cup with computer screens all around"
          className="about-me-banner"
        />
      </div>

      <div className="about-grid">
        <div className="about-main">
          <h3 className="about-subheading">
            The Power of Crafting Intelligent Experiences
          </h3>

          <p>
            Great engineering isn’t just about shipping features—it’s about
            shaping how systems behave, how users experience intelligence, and
            how reliably an AI assistant responds under real-world conditions.
            My work centers on designing prompts, interfaces, and evaluations
            that ensure AI behaves predictably, ethically, and in alignment with
            product intent.
          </p>

          <p>
            At Berkshire Hathaway Energy, I lead prompt engineering initiatives,
            design behavior-constrained prompts for internal tools, evaluate
            model drift, and teach engineers how to work with AI safely. At
            Sauer Brands, I built AI-augmented dashboards and authored internal
            prompting standards. At DanceCard, I co-founded and engineered a
            social app with a focus on trust, clarity, and safe interaction
            patterns. Across every project, I combine human-centered design with
            behavioral reasoning to create intelligent systems people can rely
            on.
          </p>

          <div className="beyond-code" aria-labelledby="beyond-code-heading">
            <h3 id="beyond-code-heading" className="beyond-code-title">
              Beyond Code
            </h3>

            <ul className="beyond-code-list">
              <li>
                <strong>AI & Ethics</strong> – My Ph.D. research explores
                alignment, behavioral reliability, and vulnerability analysis in
                AI systems.
              </li>
              <li>
                <strong>Mentorship & Teaching</strong> – I lead prompt
                engineering workshops and help teams develop intuition for safe,
                structured prompting.
              </li>
              <li>
                <strong>Board Games & Strategy</strong> – A lifelong love of
                systems thinking, incentives, and pattern recognition.
              </li>
              <li>
                <strong>Travel & Curiosity</strong> – Exploring new perspectives
                keeps me grounded in the human side of technology.
              </li>
              <li>
                <strong>Family Time</strong> – A reminder that the purpose of
                technology is to elevate people, not overshadow them.
              </li>
              <li>
                <strong>Painting Models</strong> – A creative discipline that
                sharpens attention to detail—useful in engineering and AI
                behavior work alike.
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar Cards */}
        <aside className="about-sidecards">
          <div className="about-card" aria-labelledby="drives-me-heading">
            <h3 id="drives-me-heading" className="about-subheading">
              What Drives Me
            </h3>
            <ul>
              <li>
                Designing safe, interpretable, and predictable AI behaviors
              </li>
              <li>
                Translating ethical principles into prompt-layer constraints
              </li>
              <li>
                Building evaluations that detect drift, regressions, and failure
                modes
              </li>
              <li>Mentoring teams and scaling responsible AI practices</li>
              <li>
                Creating technology that enhances human agency—not replaces it
              </li>
            </ul>
          </div>

          <QuickStats />
        </aside>
      </div>

      {/* My Approach Section */}
      <div className="about-approach">
        <img
          src="/me/Avatar.png"
          alt="Cartoon of Craig with laptop, dog beside him, cat with cape, Roman ruins behind"
          className="about-me-image"
        />

        <div className="about-approach-text">
          <h3 className="about-subheading">My Approach to Development</h3>

          <p>
            Whether I’m designing an interface or a system prompt, I take a
            principles-first approach: clarity, reliability, reproducibility,
            and respect for the user. I care deeply about how intelligent
            systems behave, and I build evaluations and guardrails that ensure
            that behavior serves human goals.
          </p>

          <p>
            I plan carefully, experiment boldly, and iterate with intention.
            Good engineering should elevate people—help them think better, work
            smarter, and feel confident trusting the systems they rely on.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;

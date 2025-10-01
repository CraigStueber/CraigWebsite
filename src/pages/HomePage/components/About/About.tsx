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
          Practical front-end engineer who thrives at the intersection of
          creativity, accessibility, and clean code.
        </p>
      </div>
      <div className="about-grid">
        <div className="about-main">
          <h3 className="about-subheading">
            The Power of Crafting Experiences
          </h3>
          <p>
            Over the past 7+ years, I've learned that great engineering is more
            than solving tickets — it's about creating experiences that feel
            seamless for the user and maintainable for the team. From consumer
            marketing platforms that reached tens of thousands of users in a
            matter of days, to enterprise-level tools at Berkshire Hathaway
            Energy, I've built systems that balance performance, scalability,
            and accessibility.
          </p>
          <p>
            At Sauer Brands, I delivered interactive campaigns like Hot Tomato
            Summer and built marketing dashboards that empowered non-technical
            teams to manage content in real time. At DanceCard, I co-founded and
            developed a mobile app focused on human connection — not
            doom-scrolling, but actually finding people who share your passions.
            And now at BHE, I'm shaping the future of energy management
            platforms with React, Next.js, and TypeScript, mentoring teammates,
            and championing WCAG/ADA compliance every step of the way.
          </p>

          <div className="beyond-code" aria-labelledby="beyond-code-heading">
            <h3 id="beyond-code-heading" className="beyond-code-title">
              Beyond Code
            </h3>
            <ul className="beyond-code-list">
              <li>
                <strong>Family Time</strong> – Balancing career and family keeps
                me grounded and reminds me why building meaningful, accessible
                technology matters.
              </li>
              <li>
                <strong>Traveling</strong> – Exploring new places and cultures
                fuels my curiosity and reminds me how connected we all are. I
                love experiencing the world firsthand and learning that we
                aren’t so different after all.
              </li>
              <li>
                <strong>Board Games & Tabletop Strategy</strong> – From
                cooperative challenges to competitive play, board games fuel my
                love of systems, mechanics, and team dynamics.
              </li>

              <li>
                <strong>Mentorship & Growth</strong> – I thrive on helping
                developers grow, whether through code reviews, pairing, or
                career guidance.
              </li>
              <li>
                <strong>AI & Ethics</strong> – As a Ph.D. candidate, I’m
                researching how we can build AI that is powerful yet
                transparent, fair, and trustworthy.
              </li>
              <li>
                <strong>Painting Models</strong> – I enjoy painting miniatures,
                a hobby that sharpens creativity, patience, and attention to
                detail.
              </li>
            </ul>
          </div>
        </div>

        {/* Make the cards side by side on mobile */}
        <aside className="about-sidecards">
          <div className="about-card" aria-labelledby="drives-me-heading">
            <h3 id="drives-me-heading" className="about-subheading">
              What Drives Me
            </h3>
            <ul>
              <li>Championing accessibility & ADA compliance</li>
              <li>Building apps that connect people in meaningful ways</li>
              <li>Mentoring developers and fostering team growth</li>
              <li>Balancing performance with sustainable code</li>
              <li>Exploring ethical questions in AI & technology</li>
            </ul>
          </div>
          <QuickStats />
        </aside>
      </div>
      <h3 className="about-subheading">My Approach to Development</h3>
      <p>
        To me, great engineering isn’t defined by frameworks or libraries, but
        by the difference it makes for people. From consumer apps that spread
        quickly to enterprise platforms built to last, I focus on creating
        technology that feels natural to use and reliable behind the scenes.
      </p>
      <p>
        I bring the same mindset to my personal projects as well: plan
        carefully, experiment boldly, and never lose sight of the fact that
        technology should elevate human experience, not overshadow it.
      </p>
    </section>
  );
}

export default About;

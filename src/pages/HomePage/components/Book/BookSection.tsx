import { useState } from "react";
import "./BookSection.css"; // optional, for styling
import Cover from "../../../../assets/CACover.png";
export default function BookSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="book-section" id="Book">
      <img
        src={Cover}
        alt="The Comfortable Apocalypse Cover"
        className="book-cover"
      />
      <div>
        <h2>The Comfortable Apocalypse</h2>
        <h4 className="subtitle">
          When Survival Isn’t the Problem — Irrelevance Is
        </h4>
        <h4 className="comingSoon">Coming Soon</h4>
        {!expanded ? (
          <>
            <p>
              We feared machines would end us.
              <br />
              Instead, they made us comfortable.
            </p>
            <p>
              This book explores how convenience became captivity—how every
              small “yes” to automation erodes a little of our agency. It’s not
              about the end of humanity, but the quiet fading of attention, and
              how we can still choose to wake up before comfort finishes the
              job.
            </p>
            <button onClick={() => setExpanded(true)} className="book-button">
              Read More →
            </button>
          </>
        ) : (
          <>
            <p>
              We used to fear that machines would destroy us. Instead, they made
              us comfortable.
              <br />
              <br />
              This book began with a question that wouldn’t leave me alone:{" "}
              <em>
                What happens when technology stops serving us and starts
                defining us?
              </em>{" "}
              I started to notice the quiet ways I was disappearing—how my tools
              finished my thoughts, how convenience replaced curiosity, how
              “help” became habit.
            </p>
            <p>
              <em>The Comfortable Apocalypse</em> is my attempt to trace that
              surrender. It’s about the moment relief turns into dependence,
              when comfort becomes captivity, and when our tools stop asking
              what we want and start teaching us what to want.
            </p>
            <p>
              But it’s also about resistance—the kind that begins with noticing.
              We can still design a world that deepens our attention instead of
              dulling it, one that values friction, imperfection, and choice.
              The apocalypse I’m writing about isn’t the end of the world—it’s
              the end of our attention.
            </p>
            <p>
              <strong>And all it asks of us is to look up again.</strong>
            </p>
            <button onClick={() => setExpanded(false)} className="book-button">
              Show Less ↑
            </button>
          </>
        )}
      </div>
    </section>
  );
}

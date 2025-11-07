import { useState } from "react";
import "./BookSection.css"; // optional, for styling
import Cover from "../../../../assets/BookCover.png";
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
              When survival isn't the problem - Irrelevance is. We don't end
              with fire and flood. We end with convenience. In a world where
              algorthims anticipate every need and attention is the last human
              resource. We have to ask ourselves - What happens when the
              machines don't need to rise - because we've already knelt?
            </p>
            <button onClick={() => setExpanded(true)} className="book-button">
              Read More →
            </button>
          </>
        ) : (
          <>
            <p>
              When survival isn't the problem - Irrelevance is. We don't end
              with fire and flood. We end with convenience. In a world where
              algorthims anticipate every need and attention is the last human
              resource. We have to ask ourselves - What happens when the
              machines don't need to rise - because we've already knelt?
            </p>
            <p>
              Blending technology, philosophy, and the cultrual critiqu.{" "}
              <em>The Comfortable Apocalypse</em> traces how humanity's pursuit
              of ease led to its quiet surrender. Drawing on thinkers from E.M.
              Forster to Yuival Harari, <em>The Comfortable Apocalypse</em>{" "}
              explores AI ethics, digital dependence, and the slow erosion of
              agency that defines modern life.
            </p>
            <p>
              This is not a book about dystopia - its a mirror held up to the
              present.
            </p>
            <p>
              <strong>And the reflection is far too comfortable.</strong>
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

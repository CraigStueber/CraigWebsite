import { useState } from "react";
import "./HomePageHeader.styles.css";
import CS from "../../../../assets/CS.png";

function HomePageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="hpHeader">
      <div className="hpHeader-LogoTitle">
        <img src={CS} alt="CS Logo" className="hpHeader-logo" />
        <h1 className="hpHeader-title">Craig A. Stueber</h1>
      </div>

      <nav className={`hpHeader-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>

          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#blog">Blog</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Hamburger Button with SVG */}
      <button
        className="hpHeader-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {!menuOpen ? (
          // Hamburger Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          // Close Icon (X)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </header>
  );
}

export default HomePageHeader;

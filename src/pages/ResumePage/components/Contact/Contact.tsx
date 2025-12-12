import "./Contact.styles.css";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-heading-container">
        <img
          src="/me/Me.jpg"
          alt="Picture of Craig smiling"
          className="about-me-image"
        />
        <h2 id="contact-heading" className="contact-heading">
          Contact Me
        </h2>
        <p className="contact-intro">
          Let’s connect! Feel free to reach out via LinkedIn or email.
        </p>
      </div>

      <div className="contact-links">
        <a
          href="https://www.linkedin.com/in/craigstueber/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <FaLinkedin className="contact-icon" />
          LinkedIn
        </a>

        <div className="contact-inline">
          <FaEnvelope className="contact-icon" />
          <span>Craigstueber@gmail.com</span>
        </div>
      </div>
    </section>
  );
}

export default Contact;

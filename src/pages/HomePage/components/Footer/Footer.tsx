import "./Footer.styles.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Craig A. Stueber
        </p>

        <div className="footer-links">
          <a href="/wyrmspire" className="footer-link">
            Doom of Wyrmspire
          </a>
          <a href="/meganslist" className="footer-link">
            Megan’s List
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

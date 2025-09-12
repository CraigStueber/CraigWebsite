import "./HomePage.styles.css";
import CS from "../../assets/CS.png"; // Assuming you have an image for the homepage
function HomePage() {
  return (
    <div className="homepage-container">
      <img src={CS} alt="CS Logo" className="homepage-logo" />
      <h1 className="homepage-title">
        Thanks for Visiting — Will Build My Portfolio Site One Day
      </h1>

      <h2 className="homepage-subtitle">Are you here for Doom of Wyrmspire?</h2>
      <p className="homepage-text">
        If so, please click the button below and go look at what is going on in
        Wyrmspire.
      </p>
      <a href="/wyrmspire" className="homepage-link">
        Go to Wyrmspire
      </a>
      <h2 className="homepage-subtitle">Megan's List</h2>
      <p className="homepage-text">
        If you are here for Megan's List, please click the button below to go to
      </p>
      <a href="/meganslist" className="homepage-link">
        Go to Megan's List
      </a>
    </div>
  );
}

export default HomePage;

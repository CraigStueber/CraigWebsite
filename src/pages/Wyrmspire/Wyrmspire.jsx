import AboutBraeforge from "./components/AboutBraeforge/AboutBraeforge";
import WantedBoard from "./components/WantedBoard/WantedBoard";
import "./Wyrmspire.styles.css";
function Wyrmspire() {
  return (
    <div className="wyrmspire">
      <h1>The Doom of Wyrmspire</h1>
      <AboutBraeforge />

      <WantedBoard />
    </div>
  );
}
export default Wyrmspire;

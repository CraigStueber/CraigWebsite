import { useNavigate } from "react-router-dom";
import WorldTabs from "./components/WorldTabs/WorldTabs";
import "./Wyrmspire.styles.css";

function Wyrmspire() {
  const navigate = useNavigate();

  return (
    <div className="wyrmspire">
      <div className="wyrmspire-header">
        <button
          className="casino-button"
          onClick={() => navigate("/longrock-casino")}
        >
          🎲 Longrock Casino
        </button>
        <button
          className="casino-button"
          onClick={() => navigate("/arm-wrestling-game")}
        >
          Arm Wrestling Challenge
        </button>
        <h1 className="wyrmspire-title">The Doom of Wyrmspire</h1>
      </div>
      <WorldTabs />
    </div>
  );
}

export default Wyrmspire;

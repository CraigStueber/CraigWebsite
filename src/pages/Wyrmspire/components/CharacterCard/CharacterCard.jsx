import { useCharacter } from "../../../../context/CharacterContext";
import { useNavigate } from "react-router-dom";
import CharacterInventory from "./components/CharacterInventory";
import "./CharacterCard.styles.css";
function CharacterCard() {
  const { character, loading } = useCharacter();
  const navigate = useNavigate();
  if (loading)
    return <div className="character-card">Loading character...</div>;
  if (!character)
    return (
      <div className="character-card">
        <p>No character found.</p>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    );

  return (
    <div className="character-card">
      <div className="character-card-inner">
        <img
          src={character.image}
          alt={character.name}
          className="character-img"
        />
        <div className="character-info">
          <h3>{character.name}</h3>
          <p>
            <strong>Gold:</strong> {character.gold} gp
          </p>
          <p>
            <strong>Backstory:</strong> {character.description}
          </p>
        </div>
      </div>
      <CharacterInventory />
    </div>
  );
}

export default CharacterCard;

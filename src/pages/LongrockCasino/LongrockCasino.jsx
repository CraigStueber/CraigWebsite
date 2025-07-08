import { useState, useEffect } from "react";
import "./LongrockCasino.styles.css";
import { spinReel } from "./spinLogic";
import { useCharacter } from "../../context/CharacterContext";
import supabase from "../../client";
import { useNavigate } from "react-router-dom";

const SYMBOLS = ["🍀", "🔥", "🐉", "💀", "⚔️", "🧿"];

// Store interval reference outside component
let spinInterval = null;

export default function LongrockCasino() {
  const [displayReels, setDisplayReels] = useState(["❓", "❓", "❓"]);
  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [resultType, setResultType] = useState("");
  const { character, loading, refreshCharacter } = useCharacter();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSpinning) {
      spinInterval = setInterval(() => {
        setDisplayReels([
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ]);
      }, 100);
    }
    return () => {
      if (spinInterval) clearInterval(spinInterval);
    };
  }, [isSpinning]);

  const handleSpin = async () => {
    setResultType("");
    if (betAmount > character.gold) {
      setMessage("You don't have enough gold to make that bet.");
      return;
    }

    if (isSpinning) return;

    setMessage("");
    setIsSpinning(true);

    setTimeout(async () => {
      if (spinInterval) clearInterval(spinInterval); // stop animation

      const result = spinReel(betAmount);
      if (result.reels.every((s) => s === "🧿")) {
        setResultType("jackpot");
      } else if (result.win > 0) {
        setResultType("win");
      } else if (result.win < 0) {
        setResultType("loss");
      } else {
        setResultType(""); // partial match or no animation
      }
      setDisplayReels(result.reels); // show final symbols
      setMessage(result.message);

      const newGold = character.gold + result.win;

      const { error } = await supabase
        .from("Characters")
        .update({ gold: newGold })
        .eq("id", character.id);

      if (!error) {
        await refreshCharacter();
      } else {
        console.error("Failed to update gold:", error);
        setMessage("An error occurred while updating your gold.");
      }

      await supabase.from("CasinoPlays").insert({
        character_id: character.id,
        bet: betAmount,
        results: result.reels.join(""),
        win_amount: result.win,
        jackpot: result.reels.every((s) => s === "🧿"),
      });

      setIsSpinning(false);
    }, 1000);
  };

  if (!character && !loading) {
    return (
      <div className="casino-page">
        <button className="back-button" onClick={() => navigate("/wyrmspire")}>
          ← Back to Wyrmspire
        </button>
        <h2>🎲 Longrock Casino</h2>
        <p>You must be logged in to play.</p>
      </div>
    );
  }

  return (
    <div className="casino-page">
      <button className="back-button" onClick={() => navigate("/wyrmspire")}>
        ← Back to Wyrmspire
      </button>
      <h1 className="casino-title">🎲 Longrock Casino 🎲</h1>

      <label className="bet-label">
        Bet Amount:
        <input
          type="number"
          min="1"
          max="1000"
          step="1"
          value={betAmount}
          onChange={(e) => setBetAmount(parseInt(e.target.value) || 1)}
          className="bet-input"
        />
        gold
      </label>

      {character && (
        <p className="casino-gold">
          Current Gold: <strong className="goldStrong">{character.gold}</strong>
        </p>
      )}

      <div className={`reel-box ${resultType}`}>
        {displayReels.map((r, i) => (
          <span key={i} className="reel">
            {r}
          </span>
        ))}
      </div>

      <button
        className="spin-button"
        onClick={handleSpin}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : `Pull the Lever (${betAmount}g)`}
      </button>

      <div className={`result-message ${resultType}`}>{message}</div>

      <div className="payout-table">
        <h3>🎁 Payout Rules</h3>
        <ul>
          <li>
            <strong className="goldStrong">🧿🧿🧿 Jackpot</strong> – Win{" "}
            <strong className="goldStrong">100×</strong> your bet
          </li>
          <li>
            <strong className="goldStrong">⚔️⚔️⚔️ Blade Bonus</strong> – Win{" "}
            <strong className="goldStrong">25×</strong> your bet
          </li>
          <li>
            <strong className="goldStrong">🐉🐉🐉 Wyrm Prize</strong> – Win{" "}
            <strong className="goldStrong">10×</strong> your bet
          </li>
          <li>
            <strong className="goldStrong">Any other three of a kind</strong> –
            Win <strong className="goldStrong">2×</strong> your bet
          </li>
          <li>
            <strong className="goldStrong">Any two matching symbols</strong> –
            Break even
          </li>
          <li>
            <strong className="goldStrong">No match</strong> – Lose your bet
          </li>
          <li>
            <strong>💀💀💀</strong> – Lose{" "}
            <strong className="goldStrong">double</strong> your bet
          </li>
        </ul>
      </div>
    </div>
  );
}

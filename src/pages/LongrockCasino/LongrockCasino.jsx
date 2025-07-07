import { useState, useEffect } from "react";
import "./LongrockCasino.styles.css";
import { spinReel } from "./spinLogic";
import { useCharacter } from "../../context/CharacterContext"; // adjust path
import supabase from "../../client";
import { useNavigate } from "react-router-dom";
const SYMBOLS = ["🍀", "🔥", "🐉", "💀", "⚔️", "🧿"];

export default function LongrockCasino() {
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(1); // default
  const { character, loading, refreshCharacter } = useCharacter();
  const navigate = useNavigate();

  useEffect(() => {
    let spinInterval;
    if (isSpinning) {
      spinInterval = setInterval(() => {
        setReels([
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ]);
      }, 100);
    }
    return () => clearInterval(spinInterval);
  }, [isSpinning]);
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
  const handleSpin = async () => {
    if (betAmount > character.gold) {
      setMessage("You don't have enough gold to make that bet.");
      return;
    }

    if (isSpinning) return;
    setMessage("");
    setIsSpinning(true);

    setTimeout(async () => {
      const result = spinReel(betAmount);
      setReels(result.reels);
      setMessage(result.message);

      // New gold total
      const newGold = character.gold + result.win;

      // Update gold in Supabase
      const { error } = await supabase
        .from("Characters")
        .update({ gold: newGold })
        .eq("id", character.id);

      if (error) {
        console.error("Failed to update gold:", error);
        setMessage("An error occurred while updating your gold.");
      } else {
        // Refresh character context so gold updates visually
        await refreshCharacter();
      }
      await supabase.from("CasinoPlays").insert({
        character_id: character.id,
        bet: betAmount,
        results: result.reels.join(""),
        win_amount: result.win,
        jackpot: result.reels.every((s) => s === "🧿"), // optional logic to flag jackpots
      });

      setIsSpinning(false);
    }, 1200);
  };

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

      <div className="reel-box">
        {reels.map((r, i) => (
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

      <div className="result-message">{message}</div>
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

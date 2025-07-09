import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../client";
import { fetchNpcLeaders } from "./fetchNpcLeaders";
import "./ArmWrestlingGame.styles.css"; // You can create this CSS file for styles
import { useCharacter } from "../../context/CharacterContext";
import recordNpcWin from "./recordNpcWin";
import Dwarf from "../../assets/WrestlingAvatars/Dwarf.png";
import Gnome from "../../assets/WrestlingAvatars/Gnome.png";
import Human from "../../assets/WrestlingAvatars/Human.png";
import Orc from "../../assets/WrestlingAvatars/Orc.png";
const npcs = [
  {
    name: "Brannic",
    strBonus: 2,
    avatar: Human,
    tauntStart: "I may look average, but I'm no pushover.",
    tauntWin: "That’s what experience gets you.",
    tauntLose: "Okay, maybe you're tougher than you look.",
  },
  {
    name: "Fizzwick",
    strBonus: 0,
    avatar: Gnome,
    tauntStart: "You’ll be surprised what small hands can do.",
    tauntWin: "Size doesn’t matter when you're this clever!",
    tauntLose: "Ow! That wasn’t fair, I slipped!",
  },
  {
    name: "Thrain",
    strBonus: 4,
    avatar: Dwarf,
    tauntStart: "Let’s see if you've got forge-born grit.",
    tauntWin: "Back to the surface with ye.",
    tauntLose: "Bah! Next time I’ll use both hands.",
  },
  {
    name: "Grakthar",
    strBonus: 6,
    avatar: Orc,
    tauntStart: "RAARGH! You weak. Me win.",
    tauntWin: "HAHA! Orc smash every time!",
    tauntLose: "WHAT?! You strong... respect.",
  },
];

export default function ArmWrestlingGame() {
  const [rounds, setRounds] = useState([]);
  const [winner, setWinner] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [usedDex, setUsedDex] = useState(false);
  const [usedCha, setUsedCha] = useState(false);
  const [nextDexBonus, setNextDexBonus] = useState(0);
  const [nextChaBonus, setNextChaBonus] = useState(0);
  const { character, loading } = useCharacter();
  const [selectedNpc, setSelectedNpc] = useState(null);
  const [npcLeaders, setNpcLeaders] = useState([]);
  const [npcMessage, setNpcMessage] = useState("");
  const navigate = useNavigate();
  const strBonus = character?.str || 0;
  const dexBonus = character?.dex || 0;
  const conBonus = character?.con || 0;
  const chaBonus = character?.char || 0;

  useEffect(() => {
    fetchNpcLeaders().then(setNpcLeaders);
  }, []);

  const rollDice = () => Math.floor(Math.random() * 20) + 1;
  console.log("Character stats:", {
    str: character?.str,
    dex: character?.dex,
    con: character?.con,
    cha: character?.cha,
  });

  const playRound = async () => {
    if (winner || rolling) return;
    setRolling(true);

    const charRoll = rollDice();
    const npcRoll = rollDice();

    let charTotal = charRoll + strBonus + nextDexBonus + nextChaBonus;
    let npcTotal = npcRoll + selectedNpc.strBonus;

    if (currentRound + 1 >= 4) {
      charTotal += conBonus;
    }

    const newRound = {
      round: currentRound + 1,
      charRoll,
      npcRoll,
      charTotal,
      npcTotal,
      usedDex: nextDexBonus > 0,
      usedCha: nextChaBonus > 0,
      usedCon: currentRound + 1 >= 4,
      result:
        charTotal > npcTotal
          ? "Character"
          : npcTotal > charTotal
          ? "NPC"
          : "Draw",
    };

    const updatedRounds = [...rounds, newRound];
    setRounds(updatedRounds);
    setCurrentRound(currentRound + 1);
    setRolling(false);
    setNextDexBonus(0);
    setNextChaBonus(0);

    const charWins = updatedRounds.filter(
      (r) => r.result === "Character"
    ).length;
    const npcWins = updatedRounds.filter((r) => r.result === "NPC").length;

    if (charWins === 3) {
      setWinner("Character Wins!");
      setNpcMessage(selectedNpc.tauntLose);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (userId) {
        await recordNpcWin(userId, selectedNpc.name, true); // or false
        const updatedLeaders = await fetchNpcLeaders();
        setNpcLeaders(updatedLeaders); // ⬅️ Refresh leaderboard
      }
    } else if (npcWins === 3) {
      setWinner("NPC Wins!");
      setNpcMessage(selectedNpc.tauntWin);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (userId) {
        await recordNpcWin(userId, selectedNpc.name, false); // 👈 npc won
      }
    }
  };

  const applyDex = () => {
    if (usedDex || winner) return;
    setNextDexBonus(dexBonus);
    setUsedDex(true);
  };

  const applyCha = () => {
    if (usedCha || winner) return;
    setNextChaBonus(chaBonus);
    setUsedCha(true);
  };

  const resetGame = async () => {
    setRounds([]);
    setWinner(null);
    setCurrentRound(0);
    setUsedDex(false);
    setUsedCha(false);
    setNextDexBonus(0);
    setNextChaBonus(0);
    setSelectedNpc(null);

    const updatedLeaders = await fetchNpcLeaders();
    setNpcLeaders(updatedLeaders);
  };

  const charWins = rounds.filter((r) => r.result === "Character").length;
  const npcWins = rounds.filter((r) => r.result === "NPC").length;

  if (loading || !character) return <p>Loading character...</p>;

  return (
    <div className="arm-wrestling-container">
      <button onClick={() => navigate("/wyrmspire")}>
        ← Back to Wyrmspire
      </button>
      {!selectedNpc ? (
        <div className="npc-selection">
          <h3>Select Your Opponent</h3>
          <div className="npc-list">
            {npcs.map((npcOption) => (
              <button
                key={npcOption.name}
                onClick={() => {
                  setSelectedNpc(npcOption);
                  setNpcMessage(npcOption.tauntStart);
                }}
              >
                <img src={npcOption.avatar} alt={npcOption.name} />
                <p>{npcOption.name}</p>
              </button>
            ))}
          </div>
          <div className="npc-leaderboard">
            <h4>NPC Leaderboard</h4>
            {npcLeaders.map((leader) => (
              <p key={leader.npc_name}>
                {leader.npc_name}:{" "}
                <strong className="leader-name">{leader.user}</strong> (
                {leader.wins} wins)
              </p>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h2>Arm Wrestling Match</h2>
          <div className="wrestlers">
            <div className="avatar">
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </div>
            <div className="result-image">
              {rounds[currentRound - 1] && (
                <div
                  className={`result-${rounds[
                    currentRound - 1
                  ].result.toLowerCase()}`}
                >
                  <p>
                    Round {rounds[currentRound - 1].round}:{" "}
                    {rounds[currentRound - 1].result}
                  </p>
                </div>
              )}
            </div>
            <div className="avatar">
              <img src={selectedNpc.avatar} alt={selectedNpc.name} />
              <p>{selectedNpc.name}</p>
            </div>
          </div>
          <div className="npc-dialogue">
            <p className="npc-dialogue">{npcMessage}</p>
          </div>
          <div className="character-actions">
            <p>
              Wins: {charWins} | Losses: {npcWins}
            </p>
            <button onClick={applyDex} disabled={usedDex || winner}>
              Use Dexterity Boost (+{dexBonus})
            </button>
            <button onClick={applyCha} disabled={usedCha || winner}>
              Use Charisma Bluff (+{chaBonus})
            </button>
          </div>

          {!winner ? (
            <button onClick={playRound} disabled={rolling}>
              Roll Next Round
            </button>
          ) : (
            <>
              <h3>{winner}</h3>
              <button onClick={resetGame}>Play Again</button>
            </>
          )}

          <div className="round-history">
            {rounds.map((r) => (
              <div key={r.round} className="round-row">
                <p>Round {r.round}:</p>
                <p>
                  Character ({r.charRoll} + Str {strBonus}
                  {r.usedCon ? ` + Con ${conBonus}` : ""}
                  {r.usedDex ? ` + Dex ${dexBonus}` : ""}
                  {r.usedCha ? ` + Char ${chaBonus}` : ""} = {r.charTotal})
                </p>
                <p>
                  NPC ({r.npcRoll} + Str {selectedNpc.strBonus} = {r.npcTotal})
                </p>
                <p>Winner: {r.result}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

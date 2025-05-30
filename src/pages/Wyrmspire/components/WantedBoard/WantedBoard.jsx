import React from "react";
import "./WantedBoard.styles.css";

const wantedPosts = [
  {
    title: "Missing Miners",
    body: "Tremor hit Tunnel 6. Five boys didn’t come back up. Rescue team failed. Bring gear, not prayers. — Korda Emberfield, Mayor",
    reward: "100 gp per head (alive), + hazard pay if all rescued",
    type: "Quest",
  },
  {
    title: "Black Flames at Night",
    body: "Something’s burning in the northern treeline — but no smoke by morning. Three hunting dogs gone missing. If you’ve got steel and a good nose, take a look. — Revna Blackspur, Watch Captain",
    reward: "60 gp + hunting supplies",
    type: "Quest",
  },
  {
    title: "Voices from the Deep Forge",
    body: "Strange whispering heard in the lower shaft. Old dwarves say it’s “the Anvil echoing.” Young dwarves say it’s ghosts. I say it’s a problem. Go shut it up. — Taggin Coalwhistle, Shift Foreman",
    reward: "75 gp + forged item credit",
    type: "Quest",
  },
  {
    title: "Missing Chicken — Personal Plea",
    body: "Darla gone 3 days. Big hen. Answers to Cluckalina. Real smart. Pecks at boots. Please help. — Gilda Marsh",
    reward: "Pie and awkward gratitude",
    type: "Flavor",
  },
  {
    title: "Traveling Bard Seeks Company",
    body: "Minstrelsy, mirth, and mead. Heading east soon. Need strong arms and soft ears. No cultists. — “Elvar the Almost Famous”",
    reward: "None",
    type: "Flavor",
  },
  {
    title: "Curse Stone for Sale",
    body: "Found rock with angry face. Makes bad dreams. Cheap. — Dregg",
    reward: "A cursed trinket if bought. 100% cursed.",
    type: "Flavor",
  },
  {
    title: "Tunnel 13 Closed Until Further Notice",
    body: "Scrawled in red: “No one goes in. I locked the hatch. Not again.” — Name scratched out",
    reward: "None posted",
    type: "Rumor",
  },
  {
    title: "DO NOT FOLLOW THE LIGHTS",
    body: "Whatever you saw near the fissure, it’s not lanterns. Don’t follow. We lost a man last week. — Anonymous",
    reward: "None posted",
    type: "Rumor",
  },
];

export default function WantedBoard() {
  return (
    <div className="wanted-board-container">
      <h1>Braeforge Wanted Board</h1>
      <div className="grid-container">
        {wantedPosts.map((post, idx) => (
          <div key={idx} className="wanted-post">
            <h2>{post.title}</h2>
            <p className="body">{post.body}</p>
            <p className="reward">Reward: {post.reward}</p>
            <p className="type">Type: {post.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

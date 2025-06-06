import React from "react";
import "./WantedBoard.styles.css";

const wantedPosts = [
  {
    title: "Search for Survivors – Tunnel 6",
    body: "Miners found. One alive. Four dead. Rescue party nearly joined them. Do not enter without blessing or backup. — Korda Emberfield, Mayor",
    reward: "50 gp for confirmed report, 150 gp if blessed by priest",
    type: "Quest",
  },
  {
    title: "Black Flames at Night",
    body: "Fire came again. Still no smoke by dawn. Revna saw shapes in the trees. Don’t go alone. — Revna Blackspur, Watch Captain",
    reward: "60 gp + upgraded hunting gear",
    type: "Quest",
  },
  {
    title: "Wailing from the Deep Forge",
    body: "Whispers became screams. Anvils shaking. Pulling crew until this is dealt with. If you go down there, leave a will. — Taggin Coalwhistle, Shift Foreman",
    reward: "150 gp + choice of tool from Forge stores",
    type: "Quest",
  },
  {
    title: "Darla STILL Missing — Now a Family Emergency",
    body: "Cluckalina vanished six days ago. I heard her in the wind. Husband says it's the grief. Please. I’m begging now. — Gilda Marsh",
    reward: "2 pies, 1 hug (awkward), and my eternal thanks",
    type: "Flavor",
  },
  {
    title: "Traveling Bard Seeks Company",
    body: "Minstrelsy, mirth, and mead. Heading east soon. Need strong arms and soft ears. No cultists. — “Elvar the Almost Famous”",
    reward: "Exposure, mostly",
    type: "Flavor",
  },
  {
    title: "Cursed Stone — FINAL OFFER",
    body: "Still got the rock. Face’s angrier now. It blinked. I need it gone. Cheap. — Dregg (twitchier than before)",
    reward: "1 cursed trinket. Possibly watching you already.",
    type: "Flavor",
  },
  {
    title: "Tunnel 13 — DO NOT OPEN",
    body: "Red scrawl updated: “I heard it again. The hatch didn’t hold. Gods help us.” — Name now illegible",
    reward: "None posted",
    type: "Rumor",
  },
  {
    title: "Glowing Shapes Spotted Near the Old Obelisk",
    body: "Stranger things walk the mines now. Green eyes. Warped bodies. Don’t touch them. Don’t *look* too long. — Anonymous",
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

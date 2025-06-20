import React from "react";
import "./WantedBoard.styles.css";

const wantedPosts = [
  {
    title: "Missing: Keldra and the Twins",
    body: "Left to gather supplies before the mountain lit up green. Didn’t come back. Last seen near Tunnel 4. If found, tell Elric — heading to Duskmere. — Etched into wood, hung with twine.",
    reward: "Whatever food Elric didn’t pack. Maybe a kiss, maybe a punch.",
    type: "Quest",
  },
  {
    title: "The Breath Is Stirring",
    body: `"I saw the stone bleed beneath the chapel. I smelled the ash in the snow.  
One by one, the sparks are chosen — and one by one, they will burn.  
Do not fear the flame. Fear the silence that comes after.  
When the Second Ember arrives, only the hollow shall remain.”  
— Brother Harven Duskwhistle`,
    reward: "Salvation (interpret as you will)",
    type: "Rumor",
  },
  {
    title: "Final Evacuation Notice",
    body: "Braeforge is no longer under protection. All citizens urged to flee. Last wagons leave at dusk. No room for debate. — Revna Blackspur, Watch Captain",
    reward: "A seat on the wagon. If it holds.",
    type: "Quest",
  },
  {
    title: "Call for Witnesses",
    body: `"The mountain dreams again.  
If you have seen green flame in the dark, heard whispers in stone, or felt the ground breathe beneath your feet — come to the square at dawn.  
The Book of Ash remembers your name. It is time."  
— Brother Harven Duskwhistle`,
    reward: "A page in the book. A place in the fire.",
    type: "Rumor",
  },

  {
    title: "Letter for Madame Rose",
    body: `"Dearest Rose —  
Hope the mountain air hasn’t dulled your wit. We’ve an open seat at the table here, and the wine flows better than ever. A few *old friends* are in town asking after you (subtle types, you know the kind).  
Ten-Towns would love a visit — bring your charm, your smile, and that *special perfume*.  
— L."`,
    reward:
      "Safe passage + formal invitation (scented parchment, faint hint of cinnamon and clove)",
    type: "Flavor",
  },

  {
    title: "Chicken Crisis: Cluckalina's Revenge",
    body: "Cluckalina came back. Bigger. Meaner. Laid an egg that *hissed*. Took the shed. We live in fear. — Gilda Marsh (currently hiding)",
    reward: "Pie, panic, and a handmade 'Chicken Slayer' sash",
    type: "Flavor",
  },
  {
    title: "To Whoever Finds This",
    body: "We’ve gone west — me, the boys, and little Mora. Couldn’t wait anymore. If Harven returns… tell him I forgave him. — L.",
    reward: "A child’s drawing of a smiling dwarf family, folded inside",
    type: "Flavor",
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

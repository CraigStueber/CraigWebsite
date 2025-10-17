import React from "react";
import "./WantedBoard.styles.css";

const wantedPosts = [
  {
    title: "Notice of Grave Concern",
    body: `Travelers found half-buried in snow, drained of blood. No tracks. No fire. No gods.  
Locals whisper of a “Scarlet Congregation” performing rites beneath the aurora.  
Town Speaker requests discretion — children have stopped sleeping.`,
    reward: "50 gold for any proof of their existence or destruction.",
    type: "Quest",
  },
  {
    title: "To Madame Rose (if you’re still breathing)",
    body: `A scrap of perfumed parchment is pinned beneath a dagger.  
“He took the house. Says we work for him now. Don’t come alone. He watches the river road.”  
Signed with a pressed rose petal and the faint scent of lavender soap.`,
    reward: "None listed — but the scent alone says it’s personal.",
    type: "Quest",
  },
  {
    title: "Nights of Black Sky",
    body: `Attacks on outer farms have doubled on nights when the sky goes *lightless.*  
Locals call it **The Empty Moon.**  
No torches, no travel, no prayers outdoors when the moon disappears.  
Those who ignored the last warning were found half-buried, staring upward.`,
    reward: "Survival. Stay inside when the sky turns hollow.",
    type: "Warning",
  },
  {
    title: "Missing: Blue Heron (Again)",
    body: `The famous talking heron of Easthaven has gone missing for the **fourth** time this winter.  
Answers to “Sir Feathers” and “You Idiot Bird.”  
Last seen attempting to trade fish for beer.`,
    reward: "One warm pie and half a pint (if he returns sober).",
    type: "Flavor",
  },
  {
    title: "Wanted: Cheese Thief",
    body: `Someone’s been stealing cheese wheels from the cellar under the inn.  
Found only footprints, crumbs, and one extremely satisfied goat.`,
    reward: "Free drink for whoever finds the culprit (or the goat).",
    type: "Flavor",
  },
  {
    title: "Strange Job Posting",
    body: `“Seeking brave souls to retrieve my *very important bucket* from the lake.  
It glows sometimes, hums at others, and may whisper insults.  
Bring rope, patience, and a towel.”  
— Signed, Tammel the Fisher of Questionable Judgment.`,
    reward: "Gratitude, confusion, and possibly a cursed bucket.",
    type: "Flavor",
  },
  {
    title: "Public Reminder",
    body: `Anyone found licking the frozen statues in Temple Square *again* will be fined 5 silver.  
(Yes, even if “it looked like ale.”)`,
    reward: "None — but dignity is priceless.",
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

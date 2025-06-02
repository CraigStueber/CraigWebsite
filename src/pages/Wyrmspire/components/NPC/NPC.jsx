import React from "react";
import Harven from "../../../../assets/Harven.png";
import Korda from "../../../../assets/Korda.png";
import Revna from "../../../../assets/Revan.png";
import Taggin from "../../../../assets/Taggin.png";
import "./NPC.styles.css";

const braeforgeNPCs = [
  {
    name: "Revna Blackspur",
    quote: "Steel, silence, and keep your back to stone.",
    bio: `Revna is Braeforge’s grim, no-nonsense protector — and he is only half-orc. Stoic and controlled, Revna commands the town’s ragtag militia with brutal efficiency. He speaks little, drinks nothing, and hates orcs with an unrelenting fury.
    
His mother was the only survivor of an orc raid on a village that once stood near the Wyrmspire’s base. One of the raiders left her with child. Revna was born from that horror — a constant, walking reminder of it. He was raised by a dwarven blacksmith in Braeforge who taught him how to fight, and how to focus rage into discipline.

He will not tolerate anyone treating orcs — even reformed or peaceable ones — with sympathy. To outsiders, he is harsh. To his troops, he is absolute. To the mountain? He listens. And he worries.`,
    img: Revna,
  },
  {
    name: "Korda Emberfield",
    quote: "We don’t do panic. We do plans.",
    bio: `Korda was a mercenary captain before she became mayor. Now she spends more time juggling budgets and beef shortages than swinging an axe. Braeforge respects her not because she’s kind — she’s not — but because she gets things done.

She doesn’t believe in dwarven ghosts, dragon gods, or cursed pendants. “Stone is stone,” she says. “Until it cracks.”`,
    img: Korda,
  },
  {
    name: "Taggin Coalwhistle",
    quote: "Did you hear that? No? Good. Then I’m probably fine.",
    bio: `Taggin Coalwhistle is a very old, wildly eccentric gnome woman who’s been working the mines since before Braeforge had a name. She’s twitchy, loud, and talks as fast as a dwarven drill — but beneath the madness is sharp experience.

She wears four pairs of goggles on her head (only one still works), chews blackroot like it’s food, and lives in a shack made entirely from discarded tools, broken carts, and at least one stolen weather vane.

She claims to hear the mountain whispering in her dreams. And lately… she’s started sleepwalking into the mine at night, mumbling ancient dwarven prayers — even though she’s never spoken a word of Dwarvish in her life.`,
    img: Taggin,
  },
  {
    name: "Brother Harven Duskwhistle",
    quote:
      "The mountain does not sleep. It dreams — and in its dreaming, it remembers fire, and death, and gods. We are but sparks on the edge of the breath.",
    bio: `Brother Harven arrived in Braeforge just three weeks ago — cloaked, silent, barefoot in the snow, and carrying a massive ancient tome bound in ash-bark and blacksteel hinges. He preaches in the square every morning, calmly, persistently, as if time no longer means much to him.

He claims he was “called up the Wyrmspire by the Breath Beneath,” and that the “Second Ember” is coming — a fire that will reshape the land and judge the worthy. His voice is low, precise, and disturbingly comforting.

Some call him a madman. Others… are starting to listen.

Whispers say he predicted the first fissure. Others claim his book glows faintly in the dark, written in languages only the mountain remembers.`,
    img: Harven,
  },
];

export default function NPC() {
  return (
    <div className="npcs-container">
      <h1>Notable NPCs of Braeforge</h1>
      {braeforgeNPCs.map((npc, index) => (
        <div key={index} className="npc-card">
          <div className="npc-header">
            <img src={npc.img} alt={npc.name} className="npc-image" />
            <div>
              <h2 className="npc-name">{npc.name}</h2>
              <p className="npc-quote">“{npc.quote}”</p>
            </div>
          </div>

          <p className="npc-bio">{npc.bio}</p>
        </div>
      ))}
    </div>
  );
}

import React from "react";
import Dimitri from "../../../../assets/Dimitri.png";
import Madame from "../../../../assets/Madame.png";
import Hemlock from "../../../../assets/Hemlock.png";
import Olggly from "../../../../assets/Olggly.png";
import "./PC.styles.css";
const playerCharacters = [
  {
    name: "Igneous 'Ol' Iggy' Viernrock",
    class: "Forge Cleric",
    bio: `One of the original settlers of Braeforge, Ol’ Iggy now lives in a crooked shack just beyond the town's edge. Once the town’s doctor and blacksmith, he's become a muttering recluse who prays loudly to forge gods, talks to his hammer, and smells like soot and soup at all times. Locals still visit him for healing or repairs—if they can handle the ranting.`,
    image: Olggly,
  },
  {
    name: "Hemlock",
    class: "Warlock (Pact of the Chain)",
    bio: `Hemlock is a waterlogged, lantern-bearing wanderer who serves a mysterious patron he only knows as “the Light.” Driven by visions and forgotten memories, he follows the Light’s will in hopes it will lead him back to a woman named Rosemary. His familiar, a raven named Muninn, is his eyes in the storm—and sometimes the only one talking back.`,
    image: Hemlock,
  },
  {
    name: "Miss Ruby Delane a.k.a. 'Madame Whiskey Rose'",
    class: "Rogue",
    bio: `Ruby Delane runs The Gilded Thorn, Braeforge’s most infamous and ONLY brothel—and the beating heart of an underground network of thieves, spies, and assassins. Born in the gutters and forged in courts of deceit, Ruby fled a scandal in the East and now reigns with velvet gloves over iron daggers.`,
    image: Madame,
  },
  {
    name: "Dimitri Alexander Ivankov",
    class: "Artificer",
    bio: `Born to a noble family but dressed like a miner, Dimitri came west chasing ideas of flight and invention. Known for fixing things, building odd contraptions, and occasionally making them explode, he’s become Braeforge’s go-to tinker—though few know the blueprints he hides, or the letters sealed with noble crests that still arrive for him.`,
    image: Dimitri,
  },
];
export default function PC() {
  return (
    <div className="pcs-container">
      <h1>Player Characters</h1>
      {playerCharacters.map((pc, index) => (
        <div key={index} className="pc-card">
          <div className="pc-header">
            <img src={pc.image} alt={pc.name} className="pc-image" />
            <div>
              <h2 className="pc-name">{pc.name}</h2>
              <p className="pc-class">{pc.class}</p>
              <p className="pc-bio">{pc.bio}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

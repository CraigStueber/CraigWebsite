import React from "react";
import "./VirelinDominion.styles.css";
import GreenRoad from "../../../../assets/greenRoad.png";
export default function VirelinDominion() {
  return (
    <div className="virelin-container">
      <h1 className="virelin-title">The Virelin Dominion</h1>
      <img
        src={GreenRoad}
        alt="Forest path through the Virelin Dominion"
        className="virelin-image"
      />
      <p>
        Beyond the northern borders of Longrock lies the{" "}
        <strong>Virelin Dominion</strong> — an ancient, insular woodland empire
        shrouded in mist and memory. The Virelin elves do not claim sovereignty.
        They do not seek war, diplomacy, or alliances. They care only for what
        lies within the borders of their endless forest. To them, the outside
        world is a distraction — loud, short-lived, and irrelevant.
      </p>
      <p>
        The elves of Virelin are <em>older than the kingdoms of men</em>, and
        they have spent their entire lives beneath the canopy. Few outsiders
        have ever seen them; even fewer have heard them speak.
      </p>

      <blockquote className="virelin-quote">
        “There is one road. Stay on it. Step into the trees, and they will
        forget you were ever there.”
      </blockquote>

      <h2 className="virelin-subtitle">One Road, One Trade</h2>
      <p>
        The Dominion trades only with <strong>Longrock</strong>. A single path —
        known as
        <em> the Greenroad</em> — winds through the heart of the forest,
        patrolled by silence and watched by eyes unseen. Longrock caravans are
        permitted to travel this road, but only this road. To stray from it is
        to vanish.
      </p>
      <p>
        Trade is <em>wordless</em>. No handshakes, no haggling. Longrock
        merchants arrive at designated glades where goods have been left: bows
        strung with silver-threaded bark, arrows that hum in flight, carved
        idols that flicker with enchantment. In return, the merchants leave
        textiles, dried fruits, grains, and salted fish. The rates are never
        spoken — only understood.
      </p>

      <h2 className="virelin-subtitle">The Spirit of the Wild</h2>
      <p>
        The elves are said to follow a single, eternal figure — a{" "}
        <strong>spirit of the hunt</strong> known as <em>Caer’Thalor</em>, the
        Stagborn. Each spring, Caer’Thalor awakens beneath the Great Tree,
        reborn in flesh and fury. He leads the Wild Hunts, guides the flow of
        the seasons, and dies with the first frost — returning to the earth
        until the cycle begins anew.
      </p>
      <p>
        Some call him a god. Others say he is the forest made flesh — a being of
        rhythm and rebirth. No outsider has ever seen him and lived unchanged.
      </p>

      <h2 className="virelin-subtitle">Unseen, Untouched</h2>
      <p>
        To the Virelin, silence is language, and stillness is law. Their archers
        watch unseen, their druids speak with trees, and their artisans shape
        wood as if it lived still. They craft{" "}
        <strong>bows of unnatural grace</strong>,{" "}
        <strong>armor that bends like vine</strong>, and{" "}
        <strong>trinkets that glow beneath moonlight</strong>.
      </p>
      <p>
        The Dominion does not welcome visitors. They do not answer calls. They
        do not forgive intrusion. They are not evil — only <em>uninterested</em>
        . In their eyes, the world outside the forest is burning, and it is not
        their fire to put out.
      </p>
    </div>
  );
}

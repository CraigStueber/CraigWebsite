import React from "react";
import "./KhrunGrunn.styles.css";
import KhrunGate from "../../../../assets/recap/session2/KhrunGate.png";

export default function KhrunGrunn() {
  return (
    <div className="kgr-container">
      <h1 className="kgr-title">Khrun Grunn</h1>
      <img src={KhrunGate} alt="Khrun Grunn Ruins" className="kgr-image" />
      <p>
        Hidden deep beneath the <strong>Wyrmspire Mountains</strong>, the lost
        dwarven archive known as <strong>Khrun Grunn</strong> has lain in ruin
        for centuries — a shattered relic of a world long gone. Few believe it
        ever existed, and fewer still survive those who’ve ventured deep enough
        to find it.
      </p>
      <p>
        Built in an age when <em>giants and dwarves stood side by side</em>,
        Khrun Grunn was carved from blackstone and flameglass — a gift of
        knowledge and diplomacy. Though crafted by dwarven hands, it was
        intended for giant scholars who once walked the world as stewards, not
        tyrants.
      </p>
      <blockquote className="kgr-quote">
        “The stone remembers. The pact was not forgotten. Only broken.”
      </blockquote>

      <h2 className="kgr-subtitle">The Ghost King</h2>
      <p>
        Among the crumbled vaults and crag-filled corridors, the players
        encountered the <strong>spirit of King Dûmarin Stonebind</strong> — a
        dwarven monarch who gave his life to seal the final the <strong>WyrmGate</strong>.
      </p>
      <p>
        This fractured WyrmGate once bound the god-dragon <em>Skaranthos</em>,
        sealed in place by ancient magic and rare{" "}
        <strong>blacksteel and soul-gems</strong>. But time eroded memory, and
        looters, blind to its purpose, stripped it bare. The seal has failed —
        and <em>something beneath the mountain now stirs</em>.
      </p>

      <h2 className="kgr-subtitle">The Archive Breathes</h2>
      <p>
        What remains of Khrun Grunn is no longer quiet. The air hangs thick with{" "}
        <strong>green spores</strong> that shimmer with unnatural light. Ancient
        murals shift when unobserved. Vines like muscle and bone snake through
        broken halls, and <em>root-born horrors</em> creep through the shattered
        stacks.
      </p>
      <p>
        The deeper one goes, the clearer it becomes — the archive is watching.
      </p>
    </div>
  );
}

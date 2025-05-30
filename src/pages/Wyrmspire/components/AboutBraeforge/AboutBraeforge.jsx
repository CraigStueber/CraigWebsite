import React from "react";
import "./AboutBraeforge.styles.css";
import Braeforge from "../../../../assets/Braeforge.png";
export default function AboutBraeforge() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Braeforge</h1>
      <img src={Braeforge} alt="Braeforge" className="about-image" />
      <p>
        Nestled in the shadow of the <strong>Wyrmspire Mountains</strong>,
        Braeforge is a<em> frontier mining town</em> built on grit, fire, and
        forgotten stone. Founded just under fifty years ago by a coalition of{" "}
        <strong>
          exiled dwarves, human prospectors, and wandering traders
        </strong>
        , Braeforge exists on no formal map — and most folk like it that way.
      </p>
      <p>
        The town was established near rich veins of{" "}
        <strong>blacksteel ore</strong>, a volcanic alloy prized for its
        strength and resistance to enchantment. Beneath its dusty surface, the
        land hums with heat, and the air often carries the scent of sulfur and
        old smoke. Earthquakes are common. Strange lights sometimes dance over
        the peaks at night. But the coin flows — and so do the people.
      </p>
      <h2 className="about-subtitle">Life in Braeforge</h2>
      <p>
        Braeforge is a <em>town of hard bargains and harder hands</em>. The
        streets are lined with stonework cabins and timber bunkhouses, and a
        central forgeyard runs day and night, echoing with hammer and flame. The
        town watch is thin, the law is mostly practical, and if you ask three
        locals where the mayor lives, you’ll get five directions.
      </p>
      <p>
        Still, there’s community in the chaos. Folk share their stew, sharpen
        each other’s blades, and raise their tankards to the same thing every
        night:
      </p>
      <blockquote className="about-quote">
        “May the mountain sleep one more day.”
      </blockquote>

      <h2 className="about-subtitle">Whispers from Below</h2>
      <p>
        Beneath the town lie the{" "}
        <strong>ruins of a forgotten dwarven hold</strong> — possibly even older
        than Citadel Felbarr. Miners have uncovered sealed doors with glowing
        runes, tunnels that breathe warm air, and bones burned black from
        within.
      </p>
      <p>
        Some say Braeforge is cursed. Others say it’s chosen. Either way,{" "}
        <strong>something beneath the stone is stirring</strong>, and the
        mountain has begun to crack.
      </p>
    </div>
  );
}

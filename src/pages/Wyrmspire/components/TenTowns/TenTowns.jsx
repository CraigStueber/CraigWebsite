import "./TenTowns.styles.css";
import TenTownsImage from "../../../../assets/TenTowns.png"; // Replace with actual image

export default function TenTowns() {
  return (
    <div className="tt-container">
      <h1 className="tt-title">Ten-Towns</h1>
      <img src={TenTownsImage} alt="Ten-Towns" className="tt-image" />

      <p>
        Scattered along the frozen shores of <strong>Lac Dinneshere</strong> and
        <strong> Maer Dualdon</strong>, the settlements known collectively as{" "}
        <strong>Ten-Towns</strong> cling to life at the northern edge of the
        world. Founded by trappers, miners, and exiles who wanted more from life
        — or less from civilization — these hardy folk carved out a living where
        even the gods seem to look away.
      </p>

      <p>
        The region is both <em>beautiful</em> and <em>brutal</em>: endless snow,
        glittering auroras, and winds sharp enough to flay the unready. Every
        dock, hall, and alley bears the marks of survival — patched walls,
        frozen nets, and the constant scent of fish, smoke, and sweat.
      </p>

      <blockquote className="tt-quote">
        “If you can live through one winter here, you’re already a local.” —
        Town Speaker Duvessa Shane, Bryn Shander
      </blockquote>

      <h2 className="tt-subtitle">A Circle of Ice and Trade</h2>
      <p>
        Ten-Towns began as ten rival fishing camps, each jealously guarding its
        lake and livelihood. Trade, greed, and desperation eventually bound them
        together — barely. <strong>Bryn Shander</strong> stands as the largest
        and most defensible, while the smaller towns — <strong>Targos</strong>,{" "}
        <strong>Easthaven</strong>,<strong> Bremen</strong>,{" "}
        <strong>Caer-Konig</strong>, <strong>Caer-Dineval</strong>, and others —
        rely on its protection and politics alike.
      </p>
      <p>
        Goods move by sled, wagon, and ice-boat. Whispers move faster. The
        trappers bring furs, the miners bring black ice, and the bards bring
        trouble. All three are in constant demand.
      </p>

      <h2 className="tt-subtitle">Governance & Rivalry</h2>
      <p>
        Each town is ruled by a <strong>Speaker</strong> — elected, bribed, or
        bullied into office — who meets with the others in uneasy council. When
        peace reigns, they squabble over trade routes and fishing rights. When
        war looms, they argue over who has to fight first.
      </p>
      <p>
        In truth, the Speakers’ Alliance exists more out of necessity than
        loyalty. The wilderness closes in every year, and monsters grow bolder
        with each dark season. Without cooperation, Ten-Towns would already be a
        memory frozen beneath the snow.
      </p>

      <h2 className="tt-subtitle">Faith & Fear</h2>
      <p>
        Shrines to <strong>Tempus</strong> and <strong>Umberlee</strong> dot the
        icy streets, but prayers come second to preparation. Tales spread of
        lights moving across the tundra — torches, or worse. Some claim{" "}
        <em>Auril the Frostmaiden</em> herself watches from the blizzards,
        taking the weak in tribute.
      </p>
      <p>
        Lately, darker rumors whisper from the north: blood left steaming on
        snow, symbols carved into the ice, and shadows moving even under the
        full light of the aurora. The locals call them{" "}
        <strong>“The Scarlet Congregation.”</strong>
      </p>

      <h2 className="tt-subtitle">Towns of Note</h2>
      <ul className="tt-list">
        <li>
          <strong>Bryn Shander:</strong> The heart of Ten-Towns — walled,
          crowded, and always cold. Every caravan and rumor passes through its
          gates.
        </li>
        <li>
          <strong>Targos:</strong> Fierce traders and fishermen. More knives
          than smiles. Their Speaker dreams of ruling all Ten-Towns.
        </li>
        <li>
          <strong>Easthaven:</strong> Bustling and superstitious, home to
          shipwrights, smugglers, and one very famous talking heron who refuses
          to retire.
        </li>
        <li>
          <strong>Caer-Dineval:</strong> Once noble, now half-ruined. The
          “Knights of the Black Sword” still keep watch, though none agree on
          whom they serve.
        </li>
        <li>
          <strong>Lonelywood:</strong> A logging town haunted by wolves — and
          worse. The trees whisper, and people vanish between the trunks.
        </li>
      </ul>

      <h2 className="tt-subtitle">Life on the Edge</h2>
      <p>
        Every coin here smells of hardship. Inns double as shelters, taverns as
        courts, and markets as meeting halls. Few laws reach this far north, and
        those that do are written in frost and desperation. Outsiders quickly
        learn: you earn your welcome by your usefulness.
      </p>

      <blockquote className="tt-quote">
        “Fish freezes. Ale freezes. But gossip? Never.” — Old Klem of Bremen
      </blockquote>

      <h2 className="tt-subtitle">The Spirit of Ten-Towns</h2>
      <p>
        Survival is a shared religion here. Whether human, dwarf, elf, or
        stranger — all stand equal before the storm. Those who come north for
        glory rarely find it; those who come for redemption often stay.
      </p>
      <p>
        In the heart of this frostbitten realm, there is no crown, no church, no
        empire — only the will to live another day and the stories told beside
        the hearth before the fire dies.
      </p>
    </div>
  );
}

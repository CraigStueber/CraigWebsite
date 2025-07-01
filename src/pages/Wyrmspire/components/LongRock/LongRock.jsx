import "./LongRock.styles.css";
import LongRockImage from "../../../../assets/longrock.png"; // Placeholder for the image
export default function LongRock() {
  return (
    <div className="lr-container">
      <h1 className="lr-title">Longrock</h1>
      <img src={LongRockImage} alt="Longrock Gate" className="lr-image" />
      <p>
        Built atop the ruins of ancient Sunabar and nestled near the shadowed
        edge of the Evermoor,
        <strong> Longrock</strong> is a city of second chances — a haven of
        study, trade, and reinvention. Founded nearly 200 years ago by{" "}
        <strong>Orwell West</strong>, the city takes its name from the towering
        stone pillar at its center — a monument as old as any written record.
      </p>
      <p>
        Longrock stands at a <em>planar crossroads</em>, where the fabric
        between dimensions frays. Its scholars probe the mysteries of the
        multiverse, its traders barter for rare goods from across the realms,
        and its streets thrum with a quiet tension between politics, power, and
        the ghosts of hidden pasts.
      </p>

      <blockquote className="lr-quote">
        “We build not on peace, but on potential. All things can be forged anew
        — even people.” — Irisa West
      </blockquote>

      <h2 className="lr-subtitle">The Gate Through the Green</h2>
      <p>
        To the north, dense forests stretch beyond sight — ancient, untouched,
        and unwelcoming. Within them dwell reclusive <em>elven powers</em> who
        permit no outsiders… save one.
        <strong>
          {" "}
          Longrock is the sole trade city granted passage through the trees
        </strong>
        . Only merchants bearing the city’s sigils are allowed to travel the
        winding paths under watchful eyes.
      </p>
      <p>
        No treaties were signed. No names were exchanged. But every caravan that
        vanishes off the path is reminder enough — the elves keep their own
        laws, and only Longrock walks their woods unchallenged.
      </p>

      <h2 className="lr-subtitle">Politics & Power</h2>
      <p>
        Longrock is ruled as a <strong>republic</strong>, its council fractured
        between two powerful blocs: the <em>federationists</em> who seek
        alliance and expansion, and the <em>isolationists</em> who value control
        and independence. Towering above both, though rarely acknowledged
        outright, stands the <strong>West family</strong>.
      </p>
      <p>
        A West is always present at major votes — most often the quiet,
        calculating patriarch — and their influence is felt across guilds,
        guildhalls, and guard posts alike. Some say they merely steer. Others
        claim they still rule.
      </p>

      <h2 className="lr-subtitle">A City of Institutions</h2>
      <p>
        The renowned <strong>Longrock University (LRU)</strong> attracts minds
        from every plane. Its planar studies program is unmatched, and its
        current Chancellor,
        <strong> Lady Irisa West</strong>, is known for her calm intellect and
        razor wit.
      </p>
      <p>
        The <strong>military</strong> is led by knight-commanders — often
        noble-born, but not always. Promotion through merit is common, and
        dimensional combat training is part of every soldier’s regimen. The
        legacy of <strong>Sir Alexander Draco Ivonkov</strong>, a blacksmith’s
        son turned knight, is still held up as proof of Longrock’s promise.
      </p>

      <h2 className="lr-subtitle">Districts of Note</h2>
      <ul className="lr-list">
        <li>
          <strong>Market of Planes:</strong> Rare goods, interdimensional
          traders, and informants mingle. Harper and Zhentarim eyes are
          everywhere.
        </li>
        <li>
          <strong>The Pleasure Quarter:</strong> Casinos, brothels, and vice.
          Officially unregulated. Quietly watched. Its most successful owner
          guards deeper motives.
        </li>
        <li>
          <strong>Noble Hill:</strong> Home to diplomats, old blood, and
          political players. Policies are debated. Power is brokered.
        </li>
        <li>
          <strong>Luxury Commons:</strong> New wealth and bold influence.
          Traders, investors, and Federation advocates make moves here.
        </li>
        <li>
          <strong>Foundry Ward:</strong> Forging, labor, and quiet unrest.
          Factory barons favor isolation. Union leaders push for alliance and
          reform.
        </li>
      </ul>

      <h2 className="lr-subtitle">The Forgiveness City</h2>
      <p>
        Longrock is known as the <strong>City of Second Chances</strong>. Its
        famed
        <em>Forgiveness Program</em> offers sanctuary to those fleeing their
        pasts. So long as their release wouldn’t threaten the city itself,
        records are sealed — and lives, reborn.
      </p>
      <p>
        That reputation, however, draws more than repentant merchants and failed
        nobles. It draws the hunted, the dangerous, and the ambitious. And
        behind it all, the strange, long-lived founder{" "}
        <strong>Orwell West</strong> — pale-skinned and sunless — is said to
        have cheated a devil’s pact… and still rules a quiet corner of the
        hells.
      </p>
    </div>
  );
}

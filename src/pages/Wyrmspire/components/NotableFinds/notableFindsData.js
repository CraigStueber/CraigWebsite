import BrokenRuin from "../../../../assets/NotableFinds/BrokenRuin.png";
import Pendant from "../../../../assets/NotableFinds/Pendant.png";
import FixedPickAxe from "../../../../assets/NotableFinds/FixedPickAxe.png";
import JournalEntry1 from "../../../../assets/NotableFinds/JournalEntry1.png";
import MapTemple from "../../../../assets/NotableFinds/MapTemple.png";
import Note from "../../../../assets/NotableFinds/Note.png";

const notableFindsData = [
  {
    title: "Tilda’s Pendant",
    description:
      "Found on the body of the fallen miner Tilda Braestone, this pendant pulsed with light during the party’s shared vision. It seems connected to the god-dragon and may react to ancient runes or lost relics.",
    image: Pendant,
  },
  {
    title: "Broken Rune Stone",
    description:
      "A jagged stone fragment etched with a glowing rune. The magic is fractured but still hums faintly with power. It might be one part of a larger seal, or a clue to an ancient dwarven pact.",
    image: BrokenRuin,
  },
  {
    title: "Scorched Journal Page",
    description:
      "Pulled from the wreckage of the sanctum, this page contains cryptic symbols and mentions a 'sealed archive' beyond the pass. It’s partially burned, but might be legible with the right spell.",
    image: JournalEntry1,
  },

  {
    title: "Map to the Dwarven Archive of Thar Keldrun",
    description:
      "Discovered among the sanctum’s debris, this hand-drawn map points toward a hidden dwarven archive buried deep in the mountains. Faded symbols and ancient routes suggest it hasn’t been traveled in centuries.",
    image: MapTemple,
  },
  {
    title: "Secret Letter (Lockbox Find)",
    description:
      "Found inside a hidden lockbox just inside the mine’s entrance. Its seal was not broken by Rose when she opened it — but only she knows what it said. She’s kept the contents to herself, for now.",
    image: Note,
  },
  {
    title: "The Whispering Pickaxe",
    description:
      "Recovered by Ol’Iggy, this tool was once Tilda’s. When repaired, it whispered a faint 'Thank you' in Dwarven. It may be more than just sentimental — it seems attuned to deeper mountain secrets.",
    image: FixedPickAxe,
  },
];

export default notableFindsData;

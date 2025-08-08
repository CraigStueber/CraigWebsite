import React from "react";
import Harven from "../../../../assets/Harven.png";
import Korda from "../../../../assets/Korda.png";
import Revna from "../../../../assets/Revan.png";
import Taggin from "../../../../assets/Taggin.png";
import Cedric from "../../../../assets/recap/session3/Cedric.png";
import Morgrave from "../../../../assets/recap/session3/Morgrave.png";
import Ghost from "../../../../assets/recap/session2/Ghost.png";
import CultArrival from "../../../../assets/recap/session5/CultArrival.png";
import Cult from "../../../../assets/recap/session3/Cult.png";
import "./NPC.styles.css";

const braeforgeNPCs = [
  {
    name: "The Doctrine of the Second Ember",
    quote:
      "The flame is not your enemy. It is the mirror. Step into it, and see what the gods tried to burn away.",
    bio: "The Doctrine of the Second Ember is a zealous cult devoted to restoring a forgotten truth they believe was stolen by the so-called New Gods. To its followers, this world is a lie — a soft, comfortable prison meant to erase the differences between races, dull the spirit, and suppress the soul’s true potential. They teach that the Great One, a primordial force of fire and order, once granted eternal life and clarity of purpose to mortals. In contrast, the New Gods gave freedom and comfort — and in doing so, severed the bloodlines, cultures, and ancient powers that made each race unique. The cult views unity as a curse disguised as peace. To them, magic has become reckless, souls have been leashed, and the world has grown quiet in all the wrong ways. They await the Second Ember — a divine reckoning that will burn away the illusion and return mortals to their true, primal forms.",
    img: Cult,
  },
  {
    name: "The Harbinger of the Second Ember",
    quote:
      "The new gods gave you comfort. The Great One gives you truth. Which is more sacred?",
    bio: "The Harbinger of the Second Ember is a high-ranking cult leader cloaked in charred red robes and surrounded by an aura of calm authority. His voice carries with it the weight of prophecy, not rage — he speaks like a teacher revealing forgotten truths, not a villain seeking chaos. Though his exact origins are unknown, cultists whisper that he once walked as a mortal until the Great One revealed the memory of what came before. Since then, he has traveled across broken lands gathering those who feel erased or disillusioned. The Harbinger believes death is not an end but a threshold — and he offers all who listen a chance to reclaim their original shape, free of divine lies. Even in battle, he shows restraint, choosing words over weapons when possible, and sparing those who seem unsure. In his eyes, the players are not enemies — they are lost souls on the verge of remembering who they truly are.",
    img: CultArrival,
  },
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
  {
    name: "King Dûmarin Stonebind",
    quote: "I was memory’s last witness. Now… you are.",
    bio: `Over ten thousand years ago, King Dûmarin Stonebind ruled the dwarven citadel of Barakzhar — a master of forge, faith, and the arcane bond between stone and spirit. Known as the last Forgemind, he helped forge the ancient Pact between dwarves, elves, and dragons to contain the Wyrm That Breathed All.

He died sealing the Wyrmgate beneath Khar Grunn, binding his soul to the Cycle and sacrificing his life to preserve the world.

Now he lingers as a ghost — not fully conscious, but tethered to memory and purpose. He appears only when the ancient pendant pulses near the shattered gate, speaking in fragments of prophecy and pain. His eyes do not burn with anger or sorrow, but with the weight of remembrance.

Bound to the Wyrmgates, he cannot rest until the Pact is reforged… or utterly broken.`,
    img: Ghost,
  },

  {
    name: "Sir Cedric DuVayne",
    quote:
      "Please, come in. You must be exhausted. Stay for dinner — I insist.",
    bio: `Sir Cedric DuVayne is a relic of another age — a nobleman preserved by etiquette, power, and something far colder than time. He has not aged in over a century, though his charm remains disarmingly intact. Clad in impeccable velvet and lace, he moves with unhurried grace and speaks as though every sentence were a toast.

His manor on the edge of Braeforge is breathtaking: roses bloom out of season, fountains run red with Parth Tree sap, and his servants do not blink. Visitors often remark that the halls seem to *breathe* — and that mirrors refuse to show him clearly.

No one recalls inviting him to Braeforge. And yet, he’s always been here.

Most avoid his estate after dark. The wise never accept a second glass of wine.`,
    img: Cedric,
  },
  {
    name: "Professor Morgrave",
    quote:
      "Time bends like copper wire. I bent it! Bent it *toward* Dimitri! Or… away from him? Wait—where is my spoon?!",
    bio: `Once one of the realm’s brightest minds, Professor Morgrave was a scholar of arcane physics, dimensional theory, and poor impulse control. He mentored Dimitri in their university days, often pushing boundaries no other mage dared approach.

Everything changed after Dimitri vanished. Obsessed with finding him, Morgrave performed a forbidden ritual designed to twist time itself toward a lost soul. It worked. But it shattered his mind like glass under pressure.

Now he wanders Longrock, muttering equations to squirrels, building machines that hum when no one watches, and carrying an empty birdcage named “Professor Two.” His brilliance flickers through the madness — but for how long?

He insists he can still *see* Dimitri’s time-thread. He just needs a little more twine. And maybe some soup.`,
    img: Morgrave,
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

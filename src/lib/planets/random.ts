import { ModifierKeysToPaneSettings } from "~/components/PlanetEditor/Mapping";
import {
  PlanetModifierType,
  type PlanetDefinition,
  type PlanetModifier,
} from ".";

const petPlanets = [
  "Snorblit",
  "Muffinox",
  "Zigglebean",
  "Plumpo",
  "Niblet",
  "Wobblar",
  "Fizzlepop",
  "Bloopus",
  "Chonkara",
  "Twinklet",
  "Glimmerpaw",
  "Orbitzle",
  "Puffaroo",
  "Driftlet",
  "Mopsyron",
  "Blorble",
  "Skippit",
  "Tootle",
  "Zazzlebit",
  "Flonky",
  "Boopiter",
  "Snicklet",
  "Grumblet",
  "Ploopa",
  "Wiggloon",
  "Crumblex",
  "Tateron",
  "Floofaris",
  "Quiblet",
  "Bubblox",
  "Doodleth",
  "Chirplet",
  "Glimmlet",
  "Scootara",
  "Blinket",
  "Snootix",
  "Puddleon",
  "Zonkle",
  "Nibblar",
  "Whimbit",
  "Tinkaroo",
  "Fluffara",
  "Boinglet",
  "Snorfle",
  "Plinket",
  "Gloopix",
  "Cuddloon",
  "Binkara",
  "Dazzlet",
  "Skittleth",
  "Twizzleon",
  "Piparoo",
  "Morbble",
  "Splotix",
  "Zibblet",
  "Drizzlewump",
  "Floopara",
  "Chonkit",
  "Wobbleth",
  "Snuggleon",
  "Gribbix",
  "Booplex",
  "Pufflet",
  "Trundleon",
  "Zonkit",
  "Blimple",
  "Fuzzara",
  "Sproinket",
  "Nibbo",
  "Pluffix",
  "Wagglet",
  "Crumbara",
  "Tinklet",
  "Zoodleon",
  "Blipbit",
  "Giggloon",
  "Snuzzle",
  "Flonbit",
  "Boingara",
  "Plooplet",
  "Wizzleth",
  "Dorbix",
  "Muffara",
  "Zinklet",
  "Skibbleon",
  "Blooplet",
  "Chuffara",
  "Twinkbit",
  "Sniblet",
  "Glimpix",
  "Floonara",
  "Blorbit",
  "Puffnix",
  "Womblet",
  "Zazzloon",
  "Nibbit",
  "Crumplet",
  "Orbitara",
  "Fuzzbit",
];

function generateRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 0x1000000).toString(16);
  const paddedColor = randomColor.padStart(6, "0");
  return `#${paddedColor}`;
}

function randomInRange(element: keyof typeof ModifierKeysToPaneSettings) {
  const [min, max] = ModifierKeysToPaneSettings[element].numericRange!;
  return Math.random() * (max - min) + min;
}

// The chance a ring will be generated each run
const ringChance = 1 / 8;
// The chance a moon is generated each run
const moonChance = 1 / 8;
// The number of runs to perform
const chanceRuns = 4;

export default function GenerateRandomPlanet(): PlanetDefinition {
  const modifiers: PlanetModifier[] = [];
  for (let i = 0; i < chanceRuns; i++) {
    if (Math.random() <= ringChance) {
      modifiers.push({
        type: PlanetModifierType.RING,
        color: generateRandomHexColor(),
        angle: randomInRange("angle"),
        distance: randomInRange("distance"),
        thickness: randomInRange("thickness"),
      });
    }

    if (Math.random() <= moonChance) {
      modifiers.push({
        type: PlanetModifierType.ORBITING_BODY,
        color: generateRandomHexColor(),
        angle: randomInRange("angle"),
        distance: randomInRange("distance"),
        offset: randomInRange("offset"),
        size: randomInRange("size"),
        speed: randomInRange("speed"),
      });
    }
  }

  return {
    name: petPlanets[Math.floor(Math.random() * petPlanets.length)]!,
    modifiers: [
      ...modifiers,
      {
        type: PlanetModifierType.PLANET_VISUAL_DEFINITION,
        eyeColor: generateRandomHexColor(),
        eyeSeparation: randomInRange("eyeSeparation"),
        eyeSize: randomInRange("eyeSize"),
        planetColor: generateRandomHexColor(),
        planetSize: randomInRange("planetSize"),
      },
    ],
  };
}

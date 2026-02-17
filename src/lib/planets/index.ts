export type PlanetDefinition = {
  name: string;
  modifiers: PlanetModifier[];
};

export enum PlanetModifierType {
  PLANET_VISUAL_DEFINITION,
  ORBITING_BODY,
  RING,
}

export type PlanetModifier =
  | PlanetVisualDefinitionPlanetModifier
  | OrbitingBodyPlanetModifier
  | RingPlanetModifier;

export const defaultPlanetVisualDefinition: PlanetVisualDefinitionPlanetModifier =
  {
    type: PlanetModifierType.PLANET_VISUAL_DEFINITION,
    eyeColor: "#000",
    eyeSeparation: 0.2,
    eyeSize: 0.1,
    planetColor: "#f9554c",
    planetSize: 1.0,
  };

export const defaultOrbitingBody: OrbitingBodyPlanetModifier = {
  type: PlanetModifierType.ORBITING_BODY,
  angle: 45,
  distance: 0.75,
  offset: 0,
  size: 0.2,
  speed: 1,
  color: "#4CF0F9",
};

export const defaultRing: RingPlanetModifier = {
  type: PlanetModifierType.RING,
  thickness: 0.25,
  distance: 0.5,
  angle: 290,
  color: "#d8d2c2",
}

export const isPlanetDefinition = (object: object): object is PlanetDefinition => {
  const keys = Object.keys(object);
  const keyFlag = keys.filter(v => v === "name" || v === "modifiers").length === 2;

  // TODO: Validate each modifier, not super important but could help in edge cases
  // const modifierFlags = (object as PlanetDefinition).modifiers.map((modifier) => )

  return keyFlag;
}

export const isPlanetVisualDefinitionModifier = (
  modifier: PlanetModifier,
): modifier is PlanetVisualDefinitionPlanetModifier =>
  modifier.type === PlanetModifierType.PLANET_VISUAL_DEFINITION;

export const isOrbitingBodyModifier = (
  modifier: PlanetModifier,
): modifier is OrbitingBodyPlanetModifier =>
  modifier.type === PlanetModifierType.ORBITING_BODY;

export const isRingModifier = (
  modifier: PlanetModifier,
): modifier is RingPlanetModifier => modifier.type === PlanetModifierType.RING;

export type PlanetVisualDefinitionPlanetModifier = {
  type: PlanetModifierType.PLANET_VISUAL_DEFINITION;
  // The size of the planet body
  planetSize: number;
  // The color of the planet body
  planetColor: string;
  // The size of the eyes
  eyeSize: number;
  // The separation between the left and right eye
  eyeSeparation: number;
  // The color of the eyes
  eyeColor: string;
};

export type OrbitingBodyPlanetModifier = {
  type: PlanetModifierType.ORBITING_BODY;
  // The angle the planet orbits around
  angle: number;
  // The orbit period offset
  offset: number;
  // The size of the planet orbiting
  size: number;
  // The distance the planet orbits at
  distance: number;
  // The speed the planet orbits at
  speed: number;
  // The color of the orbiting body
  color: string;
};

export type RingPlanetModifier = {
  type: PlanetModifierType.RING;
  // The thickness of the ring
  thickness: number;
  // The distance from the planet
  distance: number;
  // The angle the ring is tilted at
  angle: number;
  // The color of the ring
  color: string;
};

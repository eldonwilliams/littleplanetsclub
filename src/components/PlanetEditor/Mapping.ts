import {
  PlanetModifierType,
  type OrbitingBodyPlanetModifier,
  type PlanetVisualDefinitionPlanetModifier,
  type RingPlanetModifier,
} from "~/lib/planets";

export const ModifierToPaneStrings: Record<
  PlanetModifierType,
  {
    title: string;
    description: string;
  }
> = {
  [PlanetModifierType.PLANET_VISUAL_DEFINITION]: {
    title: "Planet Visuals",
    description: "Determines how your planet looks!",
  },
  [PlanetModifierType.ORBITING_BODY]: {
    title: "Moon",
    description: "Adds a moon with various styles to your planet!",
  },
  [PlanetModifierType.RING]: {
    title: "Ring",
    description: "Adds a ring with various styles to your planet!",
  },
};

export type PaneSettings = {
  numericRange?: [start: number, end: number];
  isColor?: boolean;
  title: string;
  description?: string;
};

export const ModifierKeysToPaneSettings: Record<
  | keyof PlanetVisualDefinitionPlanetModifier
  | keyof RingPlanetModifier
  | keyof OrbitingBodyPlanetModifier,
  PaneSettings
> = {
  type: { numericRange: [0, 0], isColor: false, title: "", description: "" },
  planetSize: {
    numericRange: [0.1, 2],
    title: "Planet Size",
    description: "Size of the planet",
  },
  planetColor: {
    isColor: true,
    title: "Planet Color",
    description: "Color of the planet",
  },
  eyeSize: {
    numericRange: [0.02, 0.2],
    title: "Eye Size",
    description: "Size of the eyes",
  },
  eyeSeparation: {
    numericRange: [0, 1],
    title: "Eye Separation",
    description: "Distance between eyes",
  },
  eyeColor: {
    isColor: true,
    title: "Eye Color",
    description: "Color of the eyes",
  },
  thickness: {
    numericRange: [0.1, 2],
    title: "Thickness",
    description: "Thickness of the ring",
  },
  distance: {
    numericRange: [0, 2],
    title: "Distance",
    description: "Distance from planet where the moon orbits",
  },
  angle: {
    numericRange: [0, 360],
    title: "Angle",
    description: "Angle at which the moon orbits",
  },
  color: {
    isColor: true,
    title: "Color",
    description: "Color of the moon",
  },
  offset: {
    numericRange: [0, 180],
    title: "Offset",
    description: "Offset of the moon's orbit",
  },
  size: {
    numericRange: [0, 3],
    title: "Size",
    description: "Size of the moon",
  },
  speed: {
    numericRange: [0, 3],
    title: "Speed",
    description: "Speed at which the moon orbits",
  },
};

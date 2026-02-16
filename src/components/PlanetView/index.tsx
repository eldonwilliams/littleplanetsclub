"use client";

import { createContext, type ComponentProps } from "react";
import {
  isOrbitingBodyModifier,
  isRingModifier, type PlanetDefinition
} from "~/lib/planets";
import PlanetBody from "./PlanetBody";
import Eyes from "./Eyes";
import OrbitingBody from "./OrbitingBody";
import Ring from "./Ring";

export type PlanetViewProps = ComponentProps<"group"> & {
  definition: PlanetDefinition;
};

export const PlanetDefinitionContext = createContext<PlanetDefinition>(null!);

export default function PlanetView({
  definition,
  ...groupProps
}: PlanetViewProps) {
  return (
    <PlanetDefinitionContext.Provider value={definition}>
      <group {...groupProps}>
        <PlanetBody />
        <Eyes />
        {definition.modifiers
          .filter(isOrbitingBodyModifier)
          .map((modifier, i) => (
            <OrbitingBody modifier={modifier} key={i} />
          ))}
        {definition.modifiers
          .filter(isRingModifier)
          .map((modifier, i) => (
            <Ring modifier={modifier} key={i} />
          ))}
      </group>
    </PlanetDefinitionContext.Provider>
  );
}

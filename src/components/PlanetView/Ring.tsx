import { useContext, type ComponentProps } from "react";
import { Euler, MathUtils } from "three";
import {
  defaultPlanetVisualDefinition,
  defaultRing,
  PlanetModifierType,
  type RingPlanetModifier,
} from "~/lib/planets";
import { PlanetDefinitionContext } from ".";

export type RingProps = ComponentProps<"mesh"> & {
  modifier: RingPlanetModifier;
};

export default function Ring({ modifier, ...meshProps }: RingProps) {
  modifier = { ...defaultRing, ...modifier } as RingPlanetModifier;

  const planetDefinition = useContext(PlanetDefinitionContext);
  const planetVisualModifier = {
    ...defaultPlanetVisualDefinition,
    ...planetDefinition.modifiers.find(
      (v) => v.type === PlanetModifierType.PLANET_VISUAL_DEFINITION,
    ),
  };

  return (
    <mesh
      rotation={
        new Euler(
          (-Math.PI - 2 * Math.cos(modifier.angle * MathUtils.DEG2RAD)) / 2.5,
          (Math.PI + 2 * Math.sin(modifier.angle * MathUtils.DEG2RAD)) / 10,
          0,
        )
      }
      {...meshProps}
    >
      <torusGeometry
        args={[
          modifier.distance +
            modifier.thickness +
            planetVisualModifier.planetSize,
          modifier.thickness,
          2,
        ]}
      />
      <meshStandardMaterial
        color={modifier.color}
        side={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

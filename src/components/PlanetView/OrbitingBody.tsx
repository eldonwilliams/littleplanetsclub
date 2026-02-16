import { useContext, useRef, type ComponentProps } from "react";
import {
  defaultOrbitingBody,
  defaultPlanetVisualDefinition,
  PlanetModifierType,
  type OrbitingBodyPlanetModifier,
} from "~/lib/planets";
import { PlanetDefinitionContext } from ".";
import { MathUtils, type Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export type OrbitingBodyProps = ComponentProps<"mesh"> & {
  modifier: Partial<OrbitingBodyPlanetModifier>;
};

export default function OrbitingBody({
  modifier,
  ...meshProps
}: OrbitingBodyProps) {
  modifier = {
    ...defaultOrbitingBody,
    ...modifier,
  } as OrbitingBodyPlanetModifier;

  const planetDefinition = useContext(PlanetDefinitionContext);
  const planetVisualModifier = {
    ...defaultPlanetVisualDefinition,
    ...planetDefinition.modifiers.find(
      (v) => v.type === PlanetModifierType.PLANET_VISUAL_DEFINITION,
    ),
  };

  const orbitingBodyRef = useRef<Mesh>(null!);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const orbitBody = orbitingBodyRef.current;

    const radius = planetVisualModifier.planetSize + modifier.distance! + modifier.size!;
    const speed = modifier.speed!;
    const offset = modifier.offset! * MathUtils.DEG2RAD;
    const angle = modifier.angle! * MathUtils.DEG2RAD;

    const theta = elapsed * speed + offset;

    const x = radius * Math.cos(theta);
    const z = radius * Math.sin(theta);

    const y = z * Math.sin(angle);
    const zInclined = z * Math.cos(angle);

    orbitBody.position.set(x, y, zInclined);
  });

  return (
    <mesh {...meshProps} ref={orbitingBodyRef}>
      <sphereGeometry args={[modifier.size]} />
      <meshStandardMaterial color={modifier.color} />
    </mesh>
  );
}

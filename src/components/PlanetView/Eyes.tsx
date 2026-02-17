import { useContext, useRef } from "react";
import { PlanetDefinitionContext } from ".";
import {
  defaultPlanetVisualDefinition,
  isPlanetVisualDefinitionModifier,
} from "~/lib/planets";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export default function Eyes() {
  const { modifiers } = useContext(PlanetDefinitionContext);
  const { planetSize, eyeColor, eyeSeparation, eyeSize } = {
    ...defaultPlanetVisualDefinition,
    ...modifiers.find(isPlanetVisualDefinitionModifier)!,
  };

  const eyesRef = [useRef<Mesh>(null!), useRef<Mesh>(null!)];

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    const period = 4;
    const range = 0.25;
    const offset = 0.1;

    eyesRef.forEach((eye, i) => {
      const temporalOffset = i * offset;
      const isBlinking = (elapsed - temporalOffset) % period <= range;
      eye.current.scale.set(eyeSize, isBlinking ? 0 : eyeSize, eyeSize);
    });
  });

  return (
    <group>
      <mesh
        position={[
          planetSize * Math.cos(Math.PI / 4 + eyeSeparation),
          0.15,
          planetSize * Math.sin(Math.PI / 4 + eyeSeparation),
        ]}
        ref={eyesRef[0]}
      >
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
      <mesh
        position={[
          planetSize * Math.cos((3 * Math.PI) / 4 - eyeSeparation),
          0.15,
          planetSize * Math.sin((3 * Math.PI) / 4 - eyeSeparation),
        ]}
        ref={eyesRef[1]}
      >
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
    </group>
  );
}

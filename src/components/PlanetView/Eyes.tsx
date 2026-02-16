import { useContext } from "react";
import { PlanetDefinitionContext } from ".";
import {
  defaultPlanetVisualDefinition,
  isPlanetVisualDefinitionModifier,
} from "~/lib/planets";

export default function Eyes() {
  const { modifiers } = useContext(PlanetDefinitionContext);
  const { planetSize, eyeColor, eyeSeparation, eyeSize } = {
    ...defaultPlanetVisualDefinition,
    ...modifiers.find(isPlanetVisualDefinitionModifier)!,
  };

  return (
    <group>
      <mesh
        position={[
          planetSize * Math.cos(Math.PI / 4 + eyeSeparation),
          0.15,
          planetSize * Math.sin(Math.PI / 4 + eyeSeparation),
        ]}
      >
        <sphereGeometry args={[eyeSize]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
      <mesh
        position={[
          planetSize * Math.cos((3 * Math.PI) / 4 - eyeSeparation),
          0.15,
          planetSize * Math.sin((3 * Math.PI) / 4 - eyeSeparation),
        ]}
      >
        <sphereGeometry args={[eyeSize]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
    </group>
  );
}

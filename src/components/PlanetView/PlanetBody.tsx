import { useContext } from "react";
import { PlanetDefinitionContext } from ".";
import {
  defaultPlanetVisualDefinition,
  isPlanetVisualDefinitionModifier,
} from "~/lib/planets";

export default function PlanetBody() {
  const { modifiers } = useContext(PlanetDefinitionContext);
  const { planetColor, planetSize } = {
    ...defaultPlanetVisualDefinition,
    ...modifiers.find(isPlanetVisualDefinitionModifier)!,
  };

  return (
    <mesh scale={1}>
      <sphereGeometry args={[planetSize]} />
      <meshStandardMaterial color={planetColor} />
    </mesh>
  );
}

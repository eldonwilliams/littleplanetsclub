import { isPlanetDefinition, type PlanetDefinition } from ".";

export function SerializePlanet(definition: PlanetDefinition): string {
  return Buffer.from(JSON.stringify(definition)).toString("base64");
}

export function DeserializePlanet(
  serializedDefinition: string,
): PlanetDefinition | undefined {
  const definition = JSON.parse(
    Buffer.from(serializedDefinition, "base64").toString(),
  ) as object;
  if (isPlanetDefinition(definition)) {
    return definition;
  }
  return undefined;
}

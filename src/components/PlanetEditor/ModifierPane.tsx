import type { Dispatch, SetStateAction } from "react";
import { type PlanetDefinition, type PlanetModifier } from "~/lib/planets";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import EditorField from "./EditorField";
import { ModifierToPaneStrings } from "./Mapping";

export type ModifierPaneProps = {
  modifier: PlanetModifier;
  modifierIndex: number;
  setDefinition: Dispatch<SetStateAction<PlanetDefinition>>;
};

export default function ModifierPane({
  modifier,
  modifierIndex,
  setDefinition,
}: ModifierPaneProps) {
  return (
    <Card className="w-full bg-transparent shadow-md">
      <CardHeader>
        <CardTitle>{ModifierToPaneStrings[modifier.type].title}</CardTitle>
        <CardAction>
          <Button
            variant="link"
            onClick={() =>
              setDefinition((d) => ({
                ...d,
                modifiers: d.modifiers.filter((_, i) => modifierIndex !== i),
              }))
            }
          >
            Delete
          </Button>
        </CardAction>
        <CardDescription>
          {ModifierToPaneStrings[modifier.type].description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {Object.keys(modifier)
          .filter((key) => !["type"].includes(key))
          .map((key, i) => (
            <EditorField
              key={i}
              fieldKey={key}
              modifier={modifier}
              modifierIndex={modifierIndex}
              setDefinition={setDefinition}
            />
          ))}
      </CardContent>
    </Card>
  );
}

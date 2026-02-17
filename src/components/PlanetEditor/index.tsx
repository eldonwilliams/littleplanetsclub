import {
  defaultOrbitingBody,
  defaultPlanetVisualDefinition,
  defaultRing,
  PlanetModifierType,
  type PlanetDefinition,
  type PlanetModifier,
} from "~/lib/planets";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Fragment, useState, type Dispatch, type SetStateAction } from "react";
import ModifierPane from "./ModifierPane";
import { ModifierToPaneStrings } from "./Mapping";
import { Button } from "../ui/button";
import { DeserializePlanet } from "~/lib/planets/serialization";

export type PlanetEditorProps = Parameters<typeof Card>[0] & {
  definition: PlanetDefinition;
  setDefinition: Dispatch<SetStateAction<PlanetDefinition>>;
};

export default function PlanetEditor({
  definition,
  setDefinition,
  className,
  ...cardProps
}: PlanetEditorProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <Button
        className={
          hidden ? "absolute top-16 left-1/2 -translate-x-1/2" : "hidden"
        }
        onClick={() => setHidden(false)}
      >
        Show Editor
      </Button>
      <Card
        className={`no-scrollbar m-4 max-h-[calc(100vh-var(--spacing)*8)] w-full max-w-sm overflow-y-scroll bg-transparent shadow-md backdrop-blur-2xl ${hidden && "hidden"} ${className}`}
        {...cardProps}
      >
        <CardHeader>
          <CardTitle>Planet Editor</CardTitle>
          <CardDescription>
            Make your own planet! Not great on mobile, but you can hide this and
            unhide it.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Button onClick={() => setHidden(true)}>Hide</Button>
            <Button
              variant="secondary"
              onClick={async () => {
                const data = await navigator.clipboard.readText();
                try {
                  const planet = DeserializePlanet(data);
                  if (planet === undefined) {
                    alert("That didn't work, make sure it was a valid string.");
                    return;
                  }
                  setDefinition(planet);
                } catch {
                  alert("There was an issue reading the planet, copy it again please.")
                }
              }}
            >
              Paste
            </Button>
          </div>
          <Field>
            <FieldLabel>Planet Name</FieldLabel>
            <Input
              placeholder="Dug"
              type="text"
              value={definition.name}
              onChange={(e) =>
                setDefinition((d) => ({ ...d, name: e.target.value }))
              }
            />
          </Field>
          {definition.modifiers.map((modifier, i) => (
            <Fragment key={i}>
              <Separator />
              <ModifierPane
                modifier={modifier}
                modifierIndex={i}
                setDefinition={setDefinition}
              />
            </Fragment>
          ))}
          <Separator />
          <Select
            value={null}
            onValueChange={(v) =>
              setDefinition((d) => ({
                ...d,
                modifiers: [...d.modifiers, v as unknown as PlanetModifier],
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Add a Modifier" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Modifier Types</SelectLabel>
                <SelectItem
                  value={defaultPlanetVisualDefinition}
                  disabled={
                    definition.modifiers.filter(
                      (v) =>
                        v.type === PlanetModifierType.PLANET_VISUAL_DEFINITION,
                    ).length > 0
                  }
                >
                  {
                    ModifierToPaneStrings[
                      PlanetModifierType.PLANET_VISUAL_DEFINITION
                    ].title
                  }
                </SelectItem>
                <SelectItem value={defaultOrbitingBody}>
                  {" "}
                  {
                    ModifierToPaneStrings[PlanetModifierType.ORBITING_BODY]
                      .title
                  }
                </SelectItem>
                <SelectItem value={defaultRing}>
                  {" "}
                  {ModifierToPaneStrings[PlanetModifierType.RING].title}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </>
  );
}

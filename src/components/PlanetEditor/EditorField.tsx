import type { Dispatch, SetStateAction } from "react";
import type { PlanetDefinition } from "~/lib/planets";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { ChromePicker } from "react-color";
import { ModifierKeysToPaneSettings } from "./Mapping";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Slider } from "../ui/slider";

export type EditorFieldProps = {
  modifier: Record<string, string | number>;
  modifierIndex: number;
  fieldKey: string;
  setDefinition: Dispatch<SetStateAction<PlanetDefinition>>;
};

export default function EditorField({
  modifier,
  modifierIndex,
  fieldKey,
  setDefinition,
}: EditorFieldProps) {
  const setValue = (value: string | number) => {
    if (typeof modifier[fieldKey] === "number" && typeof value === "string") {
      value = parseFloat(value);
    }
    setDefinition((d) => ({
      ...d,
      modifiers: d.modifiers.map((modifier, i) =>
        i !== modifierIndex ? modifier : { ...modifier, [fieldKey]: value },
      ),
    }));
  };

  const paneSetting =
    ModifierKeysToPaneSettings[
      fieldKey as keyof typeof ModifierKeysToPaneSettings
    ];

  return (
    <Field>
      <FieldLabel>{paneSetting.title}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          value={modifier[fieldKey]}
          type={typeof modifier[fieldKey] === "number" ? "number" : "text"}
          onChange={(e) => setValue(e.target.value)}
        />
        {paneSetting.isColor && (
          <InputGroupAddon align="inline-end">
            <Popover>
              <PopoverTrigger
                className="h-6 w-12 rounded-full transition-transform hover:scale-150"
                style={{ background: modifier[fieldKey] }}
              ></PopoverTrigger>
              <PopoverContent className="overflow-clip p-0">
                <ChromePicker
                  styles={{
                    default: {
                      picker: {
                        borderRadius: "2px",
                        boxShadow: "0",
                        boxSizing: "initial",
                        fontFamily: "Geist",
                        width: "100%",
                        margin: "0",
                      },
                    },
                  }}
                  disableAlpha
                  color={modifier[fieldKey]?.toString()}
                  onChange={(c) => setValue(c.hex)}
                />
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
        )}
      </InputGroup>
      {paneSetting.numericRange && (
        <Slider
          min={paneSetting.numericRange[0]}
          max={paneSetting.numericRange[1]}
          value={modifier[fieldKey] as number}
          onValueChange={(v) => setValue(v as number)}
          step={0.001}
        />
      )}
      {paneSetting.description && (
        <FieldDescription>{paneSetting.description}</FieldDescription>
      )}
    </Field>
  );
}

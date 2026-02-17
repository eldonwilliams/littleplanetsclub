"use client";

import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import PlanetView from "~/components/PlanetView";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { type PlanetDefinition } from "~/lib/planets";
import GenerateRandomPlanet from "~/lib/planets/random";
import { SerializePlanet } from "~/lib/planets/serialization";

export default function Page() {
  const [definition, setDefinition] = useState<PlanetDefinition | undefined>(
    undefined,
  );

  useEffect(() => {
    setDefinition(GenerateRandomPlanet());
  }, []);

  return (
    <div className="h-lvh w-full">
      <Canvas>
        <pointLight position={[-10, -10, -10]} />
        <ambientLight intensity={Math.PI} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        {definition && <PlanetView definition={definition} />}
        <OrbitControls enablePan={false} enableZoom={true} makeDefault />
      </Canvas>
      <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center justify-center mix-blend-difference">
        {/* <p className="pb-36 text-6xl font-bold text-white">
          Little Planets Club
        </p> */}
        <p className="text-3xl font-thin text-white">
          {definition?.name ?? ""}
        </p>
      </div>
      <Popover>
        <PopoverTrigger
          render={<Button className="absolute right-4 bottom-4" variant="secondary" size="icon-lg"><HugeiconsIcon icon={Menu01Icon} /></Button>}
        />

        <PopoverContent className="flex flex-col gap-2 p-2">
          <Button onClick={() => setDefinition(GenerateRandomPlanet())}>
            Generate New Planet
          </Button>
          <Button
            variant="secondary"
            onClick={async () => {
              await navigator.clipboard.writeText(SerializePlanet(definition!));
            }}
          >
            Save Planet
          </Button>
          <Button
            variant="destructive"
            onClick={() => alert("Why would you do that?")}
          >
            Destroy Planet
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

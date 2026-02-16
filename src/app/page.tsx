"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import PlanetEditor from "~/components/PlanetEditor";
import PlanetView from "~/components/PlanetView";
import { type PlanetDefinition } from "~/lib/planets";

export default function Page() {
  const [definition, setDefinition] = useState<PlanetDefinition>({
    name: "Dug",
    modifiers: [],
  });

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
        <PlanetView definition={definition} />
        <OrbitControls enablePan={false} enableZoom={true} makeDefault />
      </Canvas>
      <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center justify-center mix-blend-difference">
        {/* <p className="pb-36 text-6xl font-bold text-white">
          Little Planets Club
        </p> */}
        <p className="text-3xl font-thin text-white">
          {definition.name ?? "<No Name>"}
        </p>
      </div>
      <PlanetEditor definition={definition} setDefinition={setDefinition} className="absolute top-0 left-0" />
    </div>
  );
}

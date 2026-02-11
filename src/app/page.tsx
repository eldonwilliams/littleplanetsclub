"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, type ComponentProps } from "react";
import { type Group, Matrix4, Quaternion, Vector3, type Mesh } from "three";

function Sphere({
  planetColor,
  ...props
}: ComponentProps<"group"> & {
  planetColor?: string;
}) {
  return (
    <>
      <mesh {...props}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color={planetColor ?? "#f9554c"} />
      </mesh>
    </>
  );
}

function PlanetDisplay() {
  const orbitSphereRef = useRef<Group>(null!);
  const eyesRef = [useRef<Mesh>(null!), useRef<Mesh>(null!)];
  const planetRef = useRef<Mesh>(null!);
  const camera = useThree((state) => state.camera);

  useFrame((state, deltaTime) => {
    const elapsed = state.clock.getElapsedTime();
    const orbitSphere = orbitSphereRef.current;

    // orbit
    const radius = 2;
    const speed = 0.5;

    // blinking
    const period = 4;
    const range = 0.25;
    const offset = 0.1;

    orbitSphere.position.set(
      radius * Math.cos(elapsed * speed),
      Math.sin(elapsed * speed) * 0.5,
      radius * Math.sin(elapsed * speed),
    );

    eyesRef.forEach((eye, i) => {
      const temporalOffset = i * offset;
      const isBlinking = (elapsed - temporalOffset) % period <= range;
      eye.current.scale.set(0.1, isBlinking ? 0 : 0.1, 0.1);
    });

    const rotationMatrix = new Matrix4();
    rotationMatrix.lookAt(
      camera.position,
      planetRef.current.position,
      new Vector3(0, 1, 0),
    );
    const targetQuaternion = new Quaternion();
    targetQuaternion.setFromRotationMatrix(rotationMatrix);
    planetRef.current.quaternion.slerp(targetQuaternion, deltaTime);
  });

  return (
    <group>
      <group ref={planetRef}>
        <Sphere scale={1.25} />
        <Sphere
          scale={0.1}
          ref={eyesRef[0]}
          planetColor="#000"
          position={[
            1.25 * Math.cos(Math.PI / 4 + 0.2),
            0.15,
            1.25 * Math.sin(Math.PI / 4 + 0.2),
          ]}
        />
        <Sphere
          scale={0.1}
          ref={eyesRef[1]}
          planetColor="#000"
          position={[
            1.25 * Math.cos((3 * Math.PI) / 4 - 0.2),
            0.15,
            1.25 * Math.sin((3 * Math.PI) / 4 - 0.2),
          ]}
        />
      </group>
      <group ref={orbitSphereRef}>
        <pointLight intensity={Math.PI * 1.5} color="#4CF0F9" />
        <Sphere scale={0.2} planetColor="#4CF0F9" />
      </group>
    </group>
  );
}

export default function Page() {
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
        <PlanetDisplay />
        <OrbitControls enablePan={false} enableZoom={false} makeDefault />
      </Canvas>
      <div className="absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center justify-center mix-blend-difference">
        <p className="pointer-events-none text-6xl font-bold text-white">
          Little Planet Club
        </p>
      </div>
    </div>
  );
}

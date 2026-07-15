"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
  name: string;
  color: string;
};

export default function SkillBall({ position, name, color }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x += delta * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={position}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial
            color={color}
            wireframe={false}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <Text
          position={[0, -1, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
}
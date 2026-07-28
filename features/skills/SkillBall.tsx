"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
  name: string;
  color: string;
};

export default function SkillBall({ position, name, color }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 0.8 : 0.3);
      meshRef.current.rotation.x += delta * (hovered ? 0.5 : 0.2);
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.9}>
      <group
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.25 : 1}
      >
        {/* Outer Tech Wireframe Shell */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.65, 1]} />
          <meshStandardMaterial
            color={color}
            wireframe={true}
            emissive={color}
            emissiveIntensity={hovered ? 1.5 : 0.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Glowing Inner Core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.38, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.8}
            roughness={0.1}
          />
        </mesh>

        {/* 3D Floating Name Tag */}
        <Text
          position={[0, -0.95, 0]}
          fontSize={0.22}
          color={hovered ? "#06b6d4" : "#ffffff"}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          {name.toUpperCase()}
        </Text>

        {/* Interactive Hover HUD Status */}
        {hovered && (
          <Html distanceFactor={10} position={[0, 0.85, 0]} center>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                background: "rgba(15, 23, 42, 0.9)",
                border: `1px solid ${color}`,
                color: "#f8fafc",
                padding: "2px 8px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
                boxShadow: `0 0 10px ${color}88`,
                pointerEvents: "none",
              }}
            >
              SYS.SKILL // ACTIVE
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}
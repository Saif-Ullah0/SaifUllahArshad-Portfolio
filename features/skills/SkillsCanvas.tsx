"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Billboard } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

type SkillData = {
  name: string;
  color: string;
  radius: number;
  speed: number;
  offset: number;
  size: number;
  yOffset: number;
};

const skills: SkillData[] = [
  { name: "Python", color: "#4ade80", radius: 3.5, speed: 0.4, offset: 0, size: 0.55, yOffset: 0.3 },
  { name: "PyTorch", color: "#f87171", radius: 4.2, speed: 0.3, offset: 1.2, size: 0.5, yOffset: -0.4 },
  { name: "React", color: "#22d3ee", radius: 3.8, speed: 0.5, offset: 2.4, size: 0.5, yOffset: 0.5 },
  { name: "TypeScript", color: "#60a5fa", radius: 4.8, speed: 0.25, offset: 0.8, size: 0.45, yOffset: -0.3 },
  { name: "Next.js", color: "#e2e8f0", radius: 3.2, speed: 0.6, offset: 3.6, size: 0.45, yOffset: 0.2 },
  { name: "FastAPI", color: "#34d399", radius: 5.2, speed: 0.2, offset: 1.8, size: 0.45, yOffset: -0.5 },
  { name: "PostgreSQL", color: "#a78bfa", radius: 4.5, speed: 0.35, offset: 4.2, size: 0.5, yOffset: 0.4 },
  { name: "Docker", color: "#38bdf8", radius: 5.8, speed: 0.18, offset: 2.1, size: 0.4, yOffset: -0.2 },
  { name: "scikit-learn", color: "#fb923c", radius: 4.0, speed: 0.45, offset: 5.0, size: 0.45, yOffset: 0.6 },
  { name: "XGBoost", color: "#facc15", radius: 5.5, speed: 0.22, offset: 3.3, size: 0.45, yOffset: -0.4 },
  { name: "Git", color: "#f97316", radius: 3.0, speed: 0.55, offset: 0.5, size: 0.4, yOffset: 0.1 },
  { name: "MongoDB", color: "#4ade80", radius: 6.0, speed: 0.15, offset: 4.8, size: 0.4, yOffset: 0.3 },
];

function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }
    if (ringRef1.current) ringRef1.current.rotation.z += delta * 0.4;
    if (ringRef2.current) ringRef2.current.rotation.x += delta * 0.3;
    if (ringRef3.current) ringRef3.current.rotation.y += delta * 0.5;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
        />
      </mesh>
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.02, 16, 100]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ringRef2} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ringRef3} rotation={[0, Math.PI / 4, Math.PI / 3]}>
        <torusGeometry args={[2.0, 0.01, 16, 100]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function OrbitingSkill({
  skill,
  mousePos,
  scattered,
}: {
  skill: SkillData;
  mousePos: React.MutableRefObject<THREE.Vector2>;
  scattered: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(skill.offset);
  const [hovered, setHovered] = useState(false);

  const scatterTarget = useRef<THREE.Vector3>(
    new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    )
  );

  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    if (!scattered) {
      angleRef.current += delta * skill.speed;
    }

    const orbitX = Math.cos(angleRef.current) * skill.radius;
    const orbitZ = Math.sin(angleRef.current) * skill.radius;
    const orbitY = skill.yOffset + Math.sin(angleRef.current * 0.5) * 0.3;

    const targetX = scattered ? scatterTarget.current.x : orbitX;
    const targetY = scattered ? scatterTarget.current.y : orbitY;
    const targetZ = scattered ? scatterTarget.current.z : orbitZ;

    // Mouse magnetism only when not scattered
    const mx = mousePos.current.x * 8;
    const my = mousePos.current.y * 4;
    const dx = mx - targetX;
    const dy = my - targetY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const magnetStrength = scattered ? 0 : Math.max(0, 1 - dist / 4) * 0.25;

    groupRef.current.position.x +=
      (targetX + dx * magnetStrength - groupRef.current.position.x) * 0.06;
    groupRef.current.position.y +=
      (targetY + dy * magnetStrength - groupRef.current.position.y) * 0.06;
    groupRef.current.position.z +=
      (targetZ - groupRef.current.position.z) * 0.06;

    const targetScale = hovered ? 1.4 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    meshRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <icosahedronGeometry args={[skill.size, 1]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.9 : 0.3}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Billboard makes text always face camera — fixes flipping */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, -skill.size - 0.38, 0]}
          fontSize={0.2}
          color={hovered ? skill.color : "#94a3b8"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.008}
          outlineColor="#0a0a0f"
        >
          {skill.name}
        </Text>
      </Billboard>
    </group>
  );
}

function Scene({ scattered }: { scattered: boolean }) {
  const mousePos = useRef(new THREE.Vector2(0, 0));
  const { gl } = useThree();

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} color="#7c3aed" intensity={2} distance={15} />
      <pointLight position={[8, 4, 4]} color="#06b6d4" intensity={1} distance={20} />
      <pointLight position={[-8, -4, -4]} color="#8b5cf6" intensity={1} distance={20} />

      <AICore />

      {skills.map((skill) => (
        <OrbitingSkill
          key={skill.name}
          skill={skill}
          mousePos={mousePos}
          scattered={scattered}
        />
      ))}

      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.35}
      />
    </>
  );
}

export default function SkillsCanvas() {
  const [scattered, setScattered] = useState(false);

  return (
    <div style={{ width: "100%", height: "560px", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          color: "var(--color-text-muted)",
          zIndex: 10,
          pointerEvents: "none",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
        }}
      >
        click to scatter · drag to rotate · hover to highlight
      </div>
      <Canvas
        camera={{ position: [0, 2, 14], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent", cursor: "grab" }}
        onClick={() => setScattered((prev) => !prev)}
      >
        <Scene scattered={scattered} />
      </Canvas>
    </div>
  );
}

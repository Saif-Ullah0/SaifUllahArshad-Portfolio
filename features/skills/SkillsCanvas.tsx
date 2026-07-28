"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Billboard, Sparkles } from "@react-three/drei";
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

function AICore({ scattered }: { scattered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.scale.setScalar(
        1 + Math.sin(t * 2) * 0.05 + (hovered ? 0.2 : 0)
      );
    }
    if (ringRef1.current) ringRef1.current.rotation.z += delta * (hovered ? 0.8 : 0.4);
    if (ringRef2.current) ringRef2.current.rotation.x += delta * (hovered ? 0.6 : 0.3);
    if (ringRef3.current) ringRef3.current.rotation.y += delta * (hovered ? 0.9 : 0.5);
  });

  return (
    <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Outer Glow Shield */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={hovered ? 0.6 : 0.25}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Central Core Glass Mesh */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={hovered ? 1.5 : 0.9}
          roughness={0.1}
          metalness={0.8}
          wireframe={scattered}
        />
      </mesh>

      {/* Orbital Gyro Rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.018, 16, 100]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ringRef2} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.85, 0.015, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ringRef3} rotation={[0, Math.PI / 4, Math.PI / 3]}>
        <torusGeometry args={[2.1, 0.012, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function OrbitingSkill({
  skill,
  mousePos,
  scattered,
  nodePositions,
  index,
}: {
  skill: SkillData;
  mousePos: React.MutableRefObject<THREE.Vector2>;
  scattered: boolean;
  nodePositions: React.MutableRefObject<THREE.Vector3[]>;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(skill.offset);
  const [hovered, setHovered] = useState(false);

  const scatterTarget = useRef<THREE.Vector3>(
    new THREE.Vector3(
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12
    )
  );

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    if (!scattered) {
      angleRef.current += delta * skill.speed;
    }

    const t = state.clock.getElapsedTime();
    const orbitX = Math.cos(angleRef.current) * skill.radius;
    const orbitZ = Math.sin(angleRef.current) * skill.radius;
    const orbitY = skill.yOffset + Math.sin(t * 1.5 + skill.offset) * 0.25;

    const targetX = scattered ? scatterTarget.current.x : orbitX;
    const targetY = scattered ? scatterTarget.current.y : orbitY;
    const targetZ = scattered ? scatterTarget.current.z : orbitZ;

    // Mouse Magnetism Dynamics
    const mx = mousePos.current.x * 6;
    const my = mousePos.current.y * 4;
    const dx = mx - targetX;
    const dy = my - targetY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const magnetStrength = scattered ? 0 : Math.max(0, 1 - dist / 5) * 0.35;

    groupRef.current.position.x +=
      (targetX + dx * magnetStrength - groupRef.current.position.x) * 0.08;
    groupRef.current.position.y +=
      (targetY + dy * magnetStrength - groupRef.current.position.y) * 0.08;
    groupRef.current.position.z +=
      (targetZ - groupRef.current.position.z) * 0.08;

    // Update position in shared array for dynamic lines
    nodePositions.current[index] = groupRef.current.position;

    // Hover scale spring interpolation
    const targetScale = hovered ? 1.45 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.12
    );

    meshRef.current.rotation.y += delta * 1.2;
    meshRef.current.rotation.x += delta * 0.5;

    if (haloRef.current) {
      haloRef.current.rotation.z -= delta * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Node Mesh */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
      >
        <icosahedronGeometry args={[skill.size, 1]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 1.2 : 0.4}
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>

      {/* Hover Outer Wireframe Halo */}
      <mesh ref={haloRef}>
        <icosahedronGeometry args={[skill.size * 1.35, 1]} />
        <meshStandardMaterial
          color={skill.color}
          wireframe
          transparent
          opacity={hovered ? 0.8 : 0.15}
        />
      </mesh>

      {/* Billboarded Skill Text */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, -skill.size - 0.4, 0]}
          fontSize={0.22}
          color={hovered ? "#ffffff" : "#cbd5e1"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.012}
          outlineColor="#090d16"
        >
          {skill.name}
        </Text>
      </Billboard>
    </group>
  );
}

{/* Dynamic Constellation Network Lines */}
function SynapseLines({
  nodePositions,
  scattered,
}: {
  nodePositions: React.MutableRefObject<THREE.Vector3[]>;
  scattered: boolean;
}) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!lineRef.current || scattered) return;

    const positions: number[] = [];
    const center = new THREE.Vector3(0, 0, 0);

    nodePositions.current.forEach((pos, i) => {
      if (!pos) return;

      // Draw connection line to central core if within range
      if (pos.distanceTo(center) < 6.5) {
        positions.push(pos.x, pos.y, pos.z);
        positions.push(0, 0, 0);
      }

      // Draw connections to neighboring skill nodes
      for (let j = i + 1; j < nodePositions.current.length; j++) {
        const otherPos = nodePositions.current[j];
        if (otherPos && pos.distanceTo(otherPos) < 3.2) {
          positions.push(pos.x, pos.y, pos.z);
          positions.push(otherPos.x, otherPos.y, otherPos.z);
        }
      }
    });

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeBoundingSphere();
  });

  if (scattered) return null;

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function Scene({ scattered }: { scattered: boolean }) {
  const mousePos = useRef(new THREE.Vector2(0, 0));
  const nodePositions = useRef<THREE.Vector3[]>([]);

  useFrame((state) => {
    // Smoothly track viewport pointer for ambient movement
    mousePos.current.x = state.pointer.x;
    mousePos.current.y = state.pointer.y;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} color="#8b5cf6" intensity={2.5} distance={15} />
      <pointLight position={[10, 6, 6]} color="#06b6d4" intensity={1.5} distance={20} />
      <pointLight position={[-10, -6, -6]} color="#ec4899" intensity={1.2} distance={20} />

      {/* Ambient Cosmic Particles */}
      <Sparkles count={80} scale={14} size={2.5} speed={0.4} color="#a78bfa" />
      <Sparkles count={50} scale={18} size={2} speed={0.2} color="#38bdf8" />

      <AICore scattered={scattered} />

      {skills.map((skill, index) => (
        <OrbitingSkill
          key={skill.name}
          index={index}
          skill={skill}
          mousePos={mousePos}
          scattered={scattered}
          nodePositions={nodePositions}
        />
      ))}

      <SynapseLines nodePositions={nodePositions} scattered={scattered} />

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!scattered}
        autoRotateSpeed={0.5}
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
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--color-text-muted, #94a3b8)",
          zIndex: 10,
          pointerEvents: "none",
          letterSpacing: "0.08em",
          whiteSpace: "nowrap",
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          padding: "6px 16px",
          borderRadius: "20px",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {scattered ? "click to collapse" : "click to scatter"} · drag to rotate · hover to illuminate
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
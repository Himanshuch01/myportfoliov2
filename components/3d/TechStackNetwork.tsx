"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

const techStack = [
  { name: "React", color: "#61dafb", position: [0, 0, 0], size: 0.22 },
  { name: "Node.js", color: "#68a063", position: [2.8, 1.4, -1], size: 0.20 },
  { name: "MongoDB", color: "#4db33d", position: [-2.8, 1.4, 1], size: 0.20 },
  { name: "TypeScript", color: "#3178c6", position: [1.6, -1.8, 2], size: 0.18 },
  { name: "Next.js", color: "#a78bfa", position: [-1.6, -1.8, -2], size: 0.18 },
  { name: "Express", color: "#a78bfa", position: [2.8, -1.4, 0.5], size: 0.16 },
  { name: "Tailwind", color: "#06b6d4", position: [-2.8, -1.4, -0.5], size: 0.16 },
  { name: "PostgreSQL", color: "#336791", position: [0, 2.8, 1.4], size: 0.19 },
  { name: "AWS", color: "#ff9900", position: [2.0, 0.9, -2.2], size: 0.16 },
  { name: "Docker", color: "#2496ed", position: [-2.0, 0.9, 2.2], size: 0.16 },
];

// ── Tech node — vibrant, crisp glow ──────────────────────────────────────────
function TechNode({
  position, color, size, index,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    const time = state.clock.getElapsedTime();
    const floatSpeed = 0.4 + (index % 3) * 0.15;
    const floatAmount = 0.25 + (index % 2) * 0.1;

    meshRef.current.position.y = position[1] + Math.sin(time * floatSpeed + index) * floatAmount;
    glowRef.current.position.y = meshRef.current.position.y;

    meshRef.current.rotation.x = time * 0.12;
    meshRef.current.rotation.y = time * 0.18;

    // Subtle pulsing glow (kept tight so it doesn't bleed)
    glowRef.current.scale.setScalar(1.6 + Math.sin(time * 1.8 + index) * 0.2);
    meshRef.current.scale.setScalar(1 + Math.sin(time * 1.2 + index) * 0.06);
  });

  return (
    <group>
      {/* Tight glow halo */}
      <Sphere ref={glowRef} args={[size * 1.8, 16, 16]} position={position}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Core node — highly emissive so it punches through any overlay */}
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}   // ← boosted so colors are vivid
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </group>
  );
}

// ── Connection lines ─────────────────────────────────────────────────────────
function ConnectionLines() {
  const lineRefs = useRef<any[]>([]);

  const connections = useMemo(() => {
    const result = [];
    for (let i = 0; i < techStack.length; i++) {
      for (let j = i + 1; j < techStack.length; j++) {
        const p1 = new THREE.Vector3(...(techStack[i].position as [number, number, number]));
        const p2 = new THREE.Vector3(...(techStack[j].position as [number, number, number]));
        if (p1.distanceTo(p2) < 3.8) {
          result.push({
            start: techStack[i].position as [number, number, number],
            end: techStack[j].position as [number, number, number],
            color: techStack[i].color,
            index: i,
          });
        }
      }
    }
    return result;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    lineRefs.current.forEach((line, index) => {
      if (line?.material) {
        (line.material as THREE.LineBasicMaterial).opacity =
          0.15 + Math.sin(time * 1.5 + index * 0.5) * 0.1;
      }
    });
  });

  return (
    <>
      {connections.map((c, i) => (
        <Line
          key={i}
          ref={(el) => { lineRefs.current[i] = el; }}
          points={[c.start, c.end]}
          color={c.color}
          lineWidth={1.2}
          opacity={0.25}
          transparent
        />
      ))}
    </>
  );
}

// ── Particle field — subtle indigo dust ──────────────────────────────────────
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 80;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#818cf8"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Scene ────────────────────────────────────────────────────────────────────
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      time * 0.07 + mouse.x * 0.25,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.15,
      0.04
    );
  });

  return (
    <>
      <ParticleField />
      <group ref={groupRef}>
        {techStack.map((tech, i) => (
          <TechNode
            key={tech.name}
            position={tech.position as [number, number, number]}
            color={tech.color}
            size={tech.size}
            index={i}
          />
        ))}
        <ConnectionLines />
      </group>

      {/* Boosted lighting so nodes read clearly */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={2.0} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={1.0} color="#10b981" />
      <pointLight position={[0, 0, 12]} intensity={0.8} color="#f59e0b" />
    </>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────
export default function TechStackNetwork() {
  return (
    // No opacity wrapper here — Hero controls opacity/positioning
    <Canvas
      camera={{ position: [0, 0, 10], fov: 48 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}

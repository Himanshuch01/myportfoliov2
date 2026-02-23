"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Torus, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ── Core rotating icosahedron ────────────────────────────────────────────────
function Core() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.18;
      outerRef.current.rotation.y = t * 0.24;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.12;
      innerRef.current.rotation.y = -t * 0.20;
    }
  });

  return (
    <group>
      {/* Outer wireframe — bigger */}
      <Icosahedron ref={outerRef} args={[2.5, 1]}>
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.30} />
      </Icosahedron>

      {/* Inner wireframe */}
      <Icosahedron ref={innerRef} args={[1.55, 0]}>
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={0.9}
          roughness={0.3}
          metalness={0.9}
          transparent
          opacity={0.65}
          wireframe
        />
      </Icosahedron>

      {/* Glowing solid core */}
      <Icosahedron args={[0.9, 1]}>
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#818cf8"
          emissiveIntensity={2.0}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.55}
        />
      </Icosahedron>
    </group>
  );
}

// ── Orbiting torus rings ─────────────────────────────────────────────────────
function OrbitRing({ radius, tilt, speed, color }: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <Torus ref={ref} args={[radius, 0.008, 16, 120]} rotation={tilt}>
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </Torus>
  );
}

// ── Particle sphere shell ────────────────────────────────────────────────────
function Particles({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 5.0 + Math.random() * 2.5;  // wider shell
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04;
      ref.current.rotation.x = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        size={0.025}
        color="#a5b4fc"
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Points>
  );
}

// ── Full Scene ───────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={3.0} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={1.8} color="#10b981" />
      <pointLight position={[0, 7, 0]} intensity={1.2} color="#f59e0b" />

      <Core />

      {/* Wider orbit rings */}
      <OrbitRing radius={3.4} tilt={[0, 0, 0]} speed={0.28} color="#6366f1" />
      <OrbitRing radius={3.8} tilt={[Math.PI / 3, 0, 0]} speed={-0.20} color="#818cf8" />
      <OrbitRing radius={4.2} tilt={[Math.PI / 6, Math.PI / 4, 0]} speed={0.16} color="#34d399" />

      <Particles />
    </>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────
export default function FloatingGeometry() {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 55 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}

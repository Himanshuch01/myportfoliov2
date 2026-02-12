"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

// Tech stack data with positions and colors
const techStack = [
  { name: "React", color: "#61dafb", position: [0, 0, 0], size: 0.2 },
  { name: "Node.js", color: "#68a063", position: [2.5, 1.2, -1], size: 0.18 },
  { name: "MongoDB", color: "#4db33d", position: [-2.5, 1.2, 1], size: 0.18 },
  { name: "TypeScript", color: "#3178c6", position: [1.5, -1.5, 2], size: 0.16 },
  { name: "Next.js", color: "#ffffff", position: [-1.5, -1.5, -2], size: 0.16 },
  { name: "Express", color: "#ffffff", position: [2.5, -1.2, 0.5], size: 0.15 },
  { name: "Tailwind", color: "#06b6d4", position: [-2.5, -1.2, -0.5], size: 0.15 },
  { name: "PostgreSQL", color: "#336791", position: [0, 2.5, 1.2], size: 0.17 },
  { name: "AWS", color: "#ff9900", position: [1.8, 0.8, -2], size: 0.14 },
  { name: "Docker", color: "#2496ed", position: [-1.8, 0.8, 2], size: 0.14 },
];

// Floating node component with glow effect
function TechNode({
  position,
  color,
  size,
  index,
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

    // Floating motion with different speeds for variety
    const floatSpeed = 0.5 + (index % 3) * 0.2;
    const floatAmount = 0.3 + (index % 2) * 0.1;
    meshRef.current.position.y = position[1] + Math.sin(time * floatSpeed + index) * floatAmount;
    glowRef.current.position.y = meshRef.current.position.y;

    // Gentle rotation
    meshRef.current.rotation.x = time * 0.15;
    meshRef.current.rotation.y = time * 0.2;

    // Pulsing glow
    const glowScale = 1.5 + Math.sin(time * 2 + index) * 0.3;
    glowRef.current.scale.setScalar(glowScale);

    // Pulsing node scale
    const nodeScale = 1 + Math.sin(time * 1.5 + index) * 0.08;
    meshRef.current.scale.setScalar(nodeScale);
  });

  return (
    <group>
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[size * 2.0, 16, 16]} position={position}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Main node */}
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.9}
        />
      </Sphere>
    </group>
  );
}

// Animated connection lines
function ConnectionLines() {
  const lineRefs = useRef<any[]>([]);

  const connections = useMemo(() => {
    const result = [];

    // Create connections between nearby nodes
    for (let i = 0; i < techStack.length; i++) {
      for (let j = i + 1; j < techStack.length; j++) {
        const pos1 = new THREE.Vector3(...(techStack[i].position as [number, number, number]));
        const pos2 = new THREE.Vector3(...(techStack[j].position as [number, number, number]));
        const distance = pos1.distanceTo(pos2);

        // Only connect nodes that are close enough
        if (distance < 3.5) {
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
      if (line && line.material) {
        // Pulsing opacity
        const material = line.material as THREE.LineBasicMaterial;
        material.opacity = 0.2 + Math.sin(time * 2 + index * 0.5) * 0.15;
      }
    });
  });

  return (
    <>
      {connections.map((connection, index) => (
        <Line
          key={index}
          ref={(el) => {
            lineRefs.current[index] = el;
          }}
          points={[connection.start, connection.end]}
          color={connection.color}
          lineWidth={2.5}
          opacity={0.6}
          transparent
        />
      ))}
    </>
  );
}

// Particle field background
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#6366f1"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main scene with mouse parallax
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Slow auto-rotation
    groupRef.current.rotation.y = time * 0.08;

    // Mouse parallax effect
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.2,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      time * 0.08 + mouse.x * 0.3,
      0.05
    );
  });

  return (
    <>
      {/* Particle background */}
      <ParticleField />

      {/* Main tech stack network */}
      <group ref={groupRef}>
        {/* Tech nodes */}
        {techStack.map((tech, index) => (
          <TechNode
            key={tech.name}
            position={tech.position as [number, number, number]}
            color={tech.color}
            size={tech.size}
            index={index}
          />
        ))}

        {/* Connection lines */}
        <ConnectionLines />
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
      <pointLight position={[0, 0, 10]} intensity={0.3} color="#f59e0b" />
    </>
  );
}

// Main component
export default function TechStackNetwork() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

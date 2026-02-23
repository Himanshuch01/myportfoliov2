'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiPython, SiDocker, SiTailwindcss,
  SiMongodb, SiGit,
} from 'react-icons/si';

const technologies = [
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', lat: 20, lon: 0, size: 1 },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6', lat: -20, lon: 60, size: 1 },
  { name: 'React', Icon: SiReact, color: '#61DAFB', lat: 40, lon: 120, size: 1 },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#6366f1', lat: -40, lon: -60, size: 0.8 },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933', lat: 60, lon: -120, size: 0.9 },
  { name: 'Python', Icon: SiPython, color: '#3776AB', lat: -60, lon: 180, size: 0.7 },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED', lat: 0, lon: -180, size: 0.9 },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4', lat: 30, lon: -30, size: 0.8 },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248', lat: -30, lon: 90, size: 0.8 },
  { name: 'Git', Icon: SiGit, color: '#F05032', lat: 50, lon: 150, size: 0.7 },
];

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function TechIcon({ position, tech, onHoverChange }: {
  position: THREE.Vector3;
  tech: (typeof technologies)[0];
  onHoverChange: (h: boolean) => void;
}) {
  const htmlRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (htmlRef.current && !hovered) {
      const d = state.camera.position.distanceTo(position);
      const nd = Math.max(0, Math.min(1, (d - 8) / 4));
      htmlRef.current.style.opacity = String(Math.max(0.5, 1 - nd * 0.8));
      htmlRef.current.style.transform = `scale(${Math.max(0.8, 1 - nd * 0.3) * tech.size})`;
      htmlRef.current.style.zIndex = nd < 0.4 ? '10' : '0';
    }
  });

  return (
    // @ts-ignore
    <Html ref={htmlRef} position={position} center distanceFactor={6}
      style={{
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', pointerEvents: 'auto',
        zIndex: hovered ? 1000 : undefined
      }}>
      <div
        className="group relative flex items-center justify-center"
        onMouseEnter={() => { setHovered(true); onHoverChange(true); }}
        onMouseLeave={() => { setHovered(false); onHoverChange(false); }}
        style={{ transform: hovered ? 'scale(1.25)' : 'scale(1)', transition: 'transform 0.3s ease' }}
      >
        <div style={{
          background: hovered ? `${tech.color}20` : 'rgba(255,255,255,0.85)',
          width: '56px', height: '56px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: tech.color,
          backdropFilter: 'blur(8px)',
          border: `2px solid ${hovered ? tech.color : 'transparent'}`,
          boxShadow: hovered ? `0 0 20px ${tech.color}40` : '0 4px 10px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
        }}>
          <tech.Icon size={28} />
        </div>
        {/* Tooltip */}
        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full
                         text-xs font-bold whitespace-nowrap pointer-events-none
                         transition-all duration-300
                         ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          style={{
            background: tech.color, color: '#fff',
            boxShadow: `0 4px 12px ${tech.color}60`
          }}>
          {tech.name}
        </div>
      </div>
    </Html>
  );
}

function WireframeGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const isHoveringRef = useRef(false);

  const wireframeGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.SphereGeometry(2.8, 32, 32));
  }, []);

  useFrame(() => {
    if (globeRef.current && !isHoveringRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={globeRef}>
      <lineSegments geometry={wireframeGeometry}>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.18} />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[2.75, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      {technologies.map((tech, i) => (
        <TechIcon
          key={i}
          position={latLonToVector3(tech.lat, tech.lon, 2.9)}
          tech={tech}
          onHoverChange={(h) => (isHoveringRef.current = h)}
        />
      ))}
    </group>
  );
}

/** Standalone globe canvas — drop this anywhere, no section wrapper */
export default function SkillGlobe() {
  return (
    <div className="w-full" style={{ height: '480px' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <WireframeGlobe />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Estrutura Biomédica 3D: Dupla Hélice de DNA com Nós de Informática
const DnaHelixMesh: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Gerar geometria da dupla hélice de DNA com dados de bioinformática
  const { strandPoints1, strandPoints2, ladderLines } = useMemo(() => {
    const numPoints = 40;
    const height = 8;
    const radius = 1.4;
    const turns = 2.5;

    const p1: THREE.Vector3[] = [];
    const p2: THREE.Vector3[] = [];
    const lines: THREE.Vector3[] = [];

    for (let i = 0; i < numPoints; i++) {
      const t = (i / (numPoints - 1)) * Math.PI * 2 * turns;
      const y = (i / (numPoints - 1) - 0.5) * height;

      const x1 = Math.cos(t) * radius;
      const z1 = Math.sin(t) * radius;
      const pt1 = new THREE.Vector3(x1, y, z1);
      p1.push(pt1);

      const x2 = Math.cos(t + Math.PI) * radius;
      const z2 = Math.sin(t + Math.PI) * radius;
      const pt2 = new THREE.Vector3(x2, y, z2);
      p2.push(pt2);

      // Degraus da hélice (ligações de pares de bases) a cada 2 pontos
      if (i % 2 === 0) {
        lines.push(pt1);
        lines.push(pt2);
      }
    }

    return { strandPoints1: p1, strandPoints2: p2, ladderLines: lines };
  }, []);

  // Criar geometria das linhas dos degraus
  const ladderGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(ladderLines.length * 3);
    for (let i = 0; i < ladderLines.length; i++) {
      positions[i * 3] = ladderLines[i].x;
      positions[i * 3 + 1] = ladderLines[i].y;
      positions[i * 3 + 2] = ladderLines[i].z;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [ladderLines]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Rotação constante suave
    groupRef.current.rotation.y += 0.005;

    // Efeito de Parallax suave seguindo o cursor do mouse
    targetRotation.current.x = state.pointer.y * 0.35;
    targetRotation.current.y = state.pointer.x * 0.45;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x - 0.2, // leve inclinação para profundidade
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -targetRotation.current.y * 0.3,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Esferas do filamento 1 (Roxo Neon #8a2be2) */}
      {strandPoints1.map((pt, i) => (
        <mesh key={`s1-${i}`} position={pt}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#8a2be2"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Esferas do filamento 2 (Lilás Claro #9370db) */}
      {strandPoints2.map((pt, i) => (
        <mesh key={`s2-${i}`} position={pt}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#9370db"
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Linhas de conexão entre as bases (Pontes de Hidrogênio / Conexões de Rede) */}
      <lineSegments geometry={ladderGeometry}>
        <lineBasicMaterial color="#9370db" transparent opacity={0.4} />
      </lineSegments>

      {/* Partículas flutuantes ao redor (Glow Bioinformático) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              useMemo(() => {
                const count = 120;
                const arr = new Float32Array(count * 3);
                for (let i = 0; i < count; i++) {
                  arr[i * 3] = (Math.random() - 0.5) * 6;
                  arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
                  arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
                }
                return arr;
              }, []),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#c084fc"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Fallback estático caso WebGL não esteja disponível ou prefers-reduced-motion
const StaticFallback: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-purple-800/30 to-violet-500/30 blur-3xl animate-pulse" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-48 h-48 rounded-full border border-purple-500/30 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border border-violet-400/40" />
      </div>
    </div>
  </div>
);

const Hero3DScene: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Verificar se WebGL é suportado
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setHasWebGL(supported);
    } catch {
      setHasWebGL(false);
    }

    // Verificar reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', onMotionChange);
    return () => motionQuery.removeEventListener('change', onMotionChange);
  }, []);

  if (!hasWebGL || prefersReducedMotion) {
    return <StaticFallback />;
  }

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[440px] md:min-h-[500px] relative pointer-events-auto">
      <Suspense fallback={<StaticFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* Iluminação com tons da paleta */}
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-10, -5, -5]} intensity={1.5} color="#8a2be2" />
          <pointLight position={[0, -5, 5]} intensity={0.8} color="#4b0082" />

          {/* Dupla hélice com flutuação orgânica */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
            <DnaHelixMesh />
          </Float>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Hero3DScene;

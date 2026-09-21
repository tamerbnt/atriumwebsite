import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RobotHead, RobotHeadHandle } from './RobotHead';
import {
  createBakedEnvironmentTexture,
  createBrushedMetalTexture,
  createSmallTerracottaGradientTexture,
} from '../utils/textureGenerators';

gsap.registerPlugin(ScrollTrigger);

interface Scene3DProps {
  isMobile: boolean;
  isInView: boolean;
  scrollProgress: number;
  onStatsUpdate?: (stats: { fps: number; drawCalls: number; triangles: number }) => void;
}

// 4 Stylized Robot Heads arrangement: stacked loose vertical & diagonal composition
// Inspired by the AIAF reference screenshot composition
export const ROBOT_CONFIGS = [
  {
    id: 1,
    name: 'Hero Central',
    pos: [0.08, 0.28, 0.35] as [number, number, number],
    rot: [0.08, -0.32, -0.04] as [number, number, number],
    scale: 1.05,
    rotSpeedY: 0.18,
    phase: 0,
  },
  {
    id: 2,
    name: 'Top Left Accent',
    pos: [-0.64, 0.78, -0.22] as [number, number, number],
    rot: [-0.05, 0.38, 0.08] as [number, number, number],
    scale: 0.88,
    rotSpeedY: -0.15,
    phase: 2.1,
  },
  {
    id: 3,
    name: 'Lower Left Base',
    pos: [-0.55, -0.28, 0.15] as [number, number, number],
    rot: [0.12, 0.45, -0.06] as [number, number, number],
    scale: 0.92,
    rotSpeedY: 0.16,
    phase: 3.8,
  },
  {
    id: 4,
    name: 'Back Right Depth',
    pos: [0.62, 0.72, -0.35] as [number, number, number],
    rot: [0.06, -0.55, 0.05] as [number, number, number],
    scale: 0.82,
    rotSpeedY: -0.14,
    phase: 5.4,
  },
];

/**
 * Inner 3D scene content with Three.js objects
 */
function SceneContent({
  isMobile,
  onStatsUpdate,
}: {
  isMobile: boolean;
  scrollProgress: number;
  onStatsUpdate?: (stats: { fps: number; drawCalls: number; triangles: number }) => void;
}) {
  const { gl, scene, pointer, viewport } = useThree();

  // Head component handle references
  const head1Ref = useRef<RobotHeadHandle>(null);
  const head2Ref = useRef<RobotHeadHandle>(null);
  const head3Ref = useRef<RobotHeadHandle>(null);
  const head4Ref = useRef<RobotHeadHandle>(null);

  // Master cluster group ref for subtle scroll animation
  const clusterGroupRef = useRef<THREE.Group>(null);

  // FPS tracking
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // Generate procedural textures once (0 KB network payload)
  const { envTexture, brushedTex, terracottaDiscTex } = useMemo(() => {
    const env = createBakedEnvironmentTexture(gl);
    const brushed = createBrushedMetalTexture();
    const discTex = createSmallTerracottaGradientTexture();
    return { envTexture: env, brushedTex: brushed, terracottaDiscTex: discTex };
  }, [gl]);

  // Set scene environment — pure deep dark space matching hero section #06070a
  useEffect(() => {
    scene.environment = envTexture;
    scene.background = new THREE.Color('#06070a');
  }, [scene, envTexture]);

  // Gunmetal / Charcoal Metallic Material with Clearcoat Gloss
  const bodyMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#22262d'), // Premium gunmetal dark charcoal
      metalness: 0.95, // True metallic conductivity
      roughness: 0.20, // Fine satin-matte micro-roughness
      bumpMap: brushedTex,
      bumpScale: 0.005, // Subtle brushed grain
      clearcoat: 1.0, // High-gloss specular highlight on bevel fillets
      clearcoatRoughness: 0.10,
      envMapIntensity: 2.2, // Studio reflection sharpness
      reflectivity: 0.95,
    });
  }, [brushedTex]);

  // Lower Jaw Material (slightly darker to articulate the panel seam)
  const jawMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#171a20'), // Darker recessed jaw segment
      metalness: 0.94,
      roughness: 0.24,
      bumpMap: brushedTex,
      bumpScale: 0.005,
      clearcoat: 0.85,
      clearcoatRoughness: 0.14,
      envMapIntensity: 1.8,
    });
  }, [brushedTex]);

  // Glowing Terracotta Eye Material (pulsed in RobotHead)
  const eyeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d96342'), // Brand terracotta / coral
      emissive: new THREE.Color('#ff6e4a'),
      emissiveIntensity: 2.2,
      roughness: 0.12,
      metalness: 0.1,
    });
  }, []);

  // Rivet bolt material
  const rivetMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#121418'),
      metalness: 0.98,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
  }, []);

  // Small floating terracotta flat space material
  const terracottaFlatSpaceMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: terracottaDiscTex,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
  }, [terracottaDiscTex]);

  // Subtle floating scroll displacement targets
  const scrollAnimRef = useRef({
    clusterY: 0,
    clusterSpread: 0,
  });

  // GSAP ScrollTrigger for gentle floating cluster offset on scroll
  useEffect(() => {
    const scrollTarget = scrollAnimRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#section-hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
      },
    });

    tl.to(
      scrollTarget,
      {
        clusterY: -0.4,
        clusterSpread: 0.6,
        ease: 'power1.inOut',
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Frame animation loop
  useFrame((state) => {
    const now = performance.now();

    // 1. Interactive subtle mouse parallax (simulates floating zero-g inertia)
    const targetCamX = pointer.x * (isMobile ? 0.05 : 0.12);
    const targetCamY = (isMobile ? 0.4 : 0.6) + pointer.y * (isMobile ? 0.04 : 0.10);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.05);
    state.camera.lookAt(0, isMobile ? -0.15 : 0.0, 0);

    // 2. Performance FPS counter calculation
    frameCountRef.current += 1;
    if (now - lastTimeRef.current >= 500) {
      const currentFps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
      frameCountRef.current = 0;
      lastTimeRef.current = now;
      if (onStatsUpdate) {
        onStatsUpdate({
          fps: currentFps,
          drawCalls: gl.info.render.calls,
          triangles: gl.info.render.triangles,
        });
      }
    }

    // 3. Subtle cluster displacement on scroll
    if (clusterGroupRef.current) {
      clusterGroupRef.current.position.y = scrollAnimRef.current.clusterY;
    }
  });

  // Compute responsive layout offsets using viewport in world units
  // Keep the stack nicely framed on the right half of the hero
  const clusterOffsetX = isMobile ? 0 : Math.min(Math.max(viewport.width * 0.22, 1.15), 1.45);
  const clusterShiftX = isMobile ? 0 : 0.22;
  const clusterOffsetY = isMobile ? -0.45 : 0.05;
  const terracottaRadius = isMobile ? Math.min(viewport.width * 0.44, 1.55) : 1.95;

  const headRefs = [head1Ref, head2Ref, head3Ref, head4Ref];

  return (
    <>
      {/* Studio Lighting with Environment reflections */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[clusterOffsetX + clusterShiftX + 4, 7, 5]} intensity={2.8} color="#ffffff" />
      <directionalLight position={[clusterOffsetX + clusterShiftX - 4, 3, 3]} intensity={1.4} color="#e0f2fe" />
      <directionalLight position={[clusterOffsetX + clusterShiftX, -3, -2]} intensity={0.6} color="#64748b" />

      {/* Terracotta Upward Rim Glow from beneath */}
      <pointLight position={[clusterOffsetX, clusterOffsetY - 1.2, 0.2]} intensity={4.2} color="#d96342" distance={10} />
      <pointLight position={[clusterOffsetX + clusterShiftX * 0.5, clusterOffsetY - 0.7, 0.8]} intensity={2.6} color="#b85438" distance={9} />

      {/* Optional Preset Environment for extra crisp reflections */}
      <Environment preset="studio" />

      {/* Cluster Group containing the floating terracotta flat space & Robot Heads */}
      <group position={[clusterOffsetX, clusterOffsetY, 0]}>
        {/* FLOATING TERRACOTTA GRADIENT FLAT STAGE */}
        <mesh
          position={[0, -1.15, 0.15]}
          rotation={[-Math.PI * 0.48, 0, 0]}
          material={terracottaFlatSpaceMaterial}
        >
          <circleGeometry args={[terracottaRadius, 64]} />
        </mesh>

        {/* 4 STYLIZED ROBOT HEADS */}
        <group ref={clusterGroupRef} position={[clusterShiftX, 0, 0]}>
          {ROBOT_CONFIGS.map((config, index) => (
            <RobotHead
              key={config.id}
              ref={headRefs[index]}
              position={config.pos}
              rotation={config.rot}
              scale={config.scale}
              rotSpeedY={config.rotSpeedY}
              phase={config.phase}
              bodyMaterial={bodyMaterial}
              jawMaterial={jawMaterial}
              eyeMaterial={eyeMaterial}
              rivetMaterial={rivetMaterial}
            />
          ))}
        </group>
      </group>
    </>
  );
}

/**
 * Main 3D Scene Wrapper with IntersectionObserver and DPR Cap
 */
export default function Scene3D({
  isMobile,
  isInView,
  scrollProgress,
  onStatsUpdate,
}: Scene3DProps) {
  const dpr = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    return Math.min(window.devicePixelRatio || 1, 2);
  }, []);

  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, isMobile ? 0.4 : 0.6, 4.4], fov: isMobile ? 48 : 40 }}
        dpr={dpr}
        shadows={false} // Performance: Zero dynamic shadow maps
        frameloop={isInView ? 'always' : 'never'} // Cap render loop: pause when not in view
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true,
        }}
        className="w-full h-full"
      >
        <SceneContent
          isMobile={isMobile}
          scrollProgress={scrollProgress}
          onStatsUpdate={onStatsUpdate}
        />
      </Canvas>
    </div>
  );
}

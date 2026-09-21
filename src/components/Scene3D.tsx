import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

// 4 Aluminum cubes config — spacious, collision-free cluster floating weightlessly above the terracotta space
const CUBE_CONFIGS = [
  { id: 1, pos: [-0.54, 0.52, -0.22] as [number, number, number], rotSpeed: [0.28, 0.34, 0.16] as [number, number, number], phase: 0 },
  { id: 2, pos: [0.54, 0.58, -0.16] as [number, number, number], rotSpeed: [-0.30, 0.28, 0.18] as [number, number, number], phase: 1.8 },
  { id: 3, pos: [-0.48, -0.25, 0.30] as [number, number, number], rotSpeed: [0.22, -0.28, 0.22] as [number, number, number], phase: 3.4 },
  { id: 4, pos: [0.48, -0.22, 0.26] as [number, number, number], rotSpeed: [-0.24, -0.30, -0.16] as [number, number, number], phase: 5.1 },
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

  // References to the 4 aluminum cube meshes for continuous floating animation
  const cube1Ref = useRef<THREE.Mesh>(null);
  const cube2Ref = useRef<THREE.Mesh>(null);
  const cube3Ref = useRef<THREE.Mesh>(null);
  const cube4Ref = useRef<THREE.Mesh>(null);

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

  // Brushed aluminum PBR material (Apple-grade anodized aluminum with satin sheen & crisp edge speculars)
  const aluminumMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#eaedf4'), // Pure high-grade natural anodized aluminum
      metalness: 0.94, // True metallic conductivity
      roughness: 0.22, // Fine satin-matte micro-roughness
      bumpMap: brushedTex,
      bumpScale: 0.008, // Subtle sub-millimeter anisotropic grain
      clearcoat: 0.35, // Premium protective gloss layer highlighting bevel edges
      clearcoatRoughness: 0.12,
      envMapIntensity: 2.2, // Crisp specular reflection of the softbox and rim strips
      reflectivity: 0.95,
    });
  }, [brushedTex]);

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
    cubeSpread: 0,
  });

  // GSAP ScrollTrigger for gentle floating cube spread on scroll
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
        cubeSpread: 1.5,
        ease: 'power1.inOut',
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Frame animation loop
  useFrame((state, delta) => {
    const now = performance.now();

    // 1. Interactive subtle mouse parallax (simulates zero-g floating inertia)
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

    // 3. Weightless flight of the 4 rounded aluminum cubes in space
    const anim = scrollAnimRef.current;
    const idleMultiplier = isMobile ? 0.4 : 1.0;
    const timeFactor = delta * idleMultiplier;

    const cubes = [cube1Ref.current, cube2Ref.current, cube3Ref.current, cube4Ref.current];
    cubes.forEach((cube, index) => {
      if (!cube) return;
      const config = CUBE_CONFIGS[index];

      // Smooth continuous multi-axis tumbling
      cube.rotation.x += config.rotSpeed[0] * timeFactor;
      cube.rotation.y += config.rotSpeed[1] * timeFactor;
      cube.rotation.z += config.rotSpeed[2] * timeFactor;

      // 3D Orbital Flight Levitation (sinusoidal floating in X, Y, and Z)
      const t = now * 0.0012 + config.phase;
      const floatY = Math.sin(t) * 0.03;
      const floatX = Math.cos(t * 0.7) * 0.018;
      const floatZ = Math.sin(t * 0.5) * 0.018;

      // Gentle parting displacement on scroll
      const dirX = Math.sign(config.pos[0]);
      const dirY = Math.sign(config.pos[1]);
      const dirZ = Math.sign(config.pos[2]);

      cube.position.x = config.pos[0] + floatX + dirX * anim.cubeSpread * 0.20;
      cube.position.y = config.pos[1] + floatY + dirY * anim.cubeSpread * 0.12;
      cube.position.z = config.pos[2] + floatZ + dirZ * anim.cubeSpread * 0.16;
    });
  });

  // Compute responsive layout offsets using viewport in world units
  // Shifting to the right: desktop offset increased, with dedicated cube cluster offset to the right
  const clusterOffsetX = isMobile ? 0 : Math.min(Math.max(viewport.width * 0.22, 1.15), 1.45);
  const cubeClusterShiftX = isMobile ? 0 : 0.26; // Moves cubes a little to the right relative to the stage
  const clusterOffsetY = isMobile ? -0.55 : 0.05;
  // Make the flat surface substantially bigger (from 1.35 to 1.85, mobile from 1.2 to 1.55)
  const terracottaRadius = isMobile ? Math.min(viewport.width * 0.44, 1.55) : 1.85;

  return (
    <>
      {/* Studio Space Key Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[clusterOffsetX + cubeClusterShiftX + 5, 8, 5]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[clusterOffsetX + cubeClusterShiftX - 4, 4, 3]} intensity={1.2} color="#e0f2fe" />
      <directionalLight position={[clusterOffsetX + cubeClusterShiftX, -3, -2]} intensity={0.6} color="#64748b" />

      {/* Terracotta Space Glow — focused upward from beneath the floating aluminum cubes */}
      <pointLight position={[clusterOffsetX, clusterOffsetY - 1.1, 0.2]} intensity={3.8} color="#d96342" distance={10} />
      <pointLight position={[clusterOffsetX + cubeClusterShiftX * 0.5, clusterOffsetY - 0.7, 0.8]} intensity={2.4} color="#b85438" distance={9} />

      {/* Cluster Group containing the floating terracotta flat space & 4 larger rounded cubes */}
      <group position={[clusterOffsetX, clusterOffsetY, 0]}>
        {/* ENLARGED FLOATING TERRACOTTA GRADIENT FLAT SPACE — Lowered and tilted much flatter (horizontal floor) */}
        <mesh
          position={[0, -1.05, 0.15]}
          rotation={[-Math.PI * 0.48, 0, 0]}
          material={terracottaFlatSpaceMaterial}
        >
          {/* Substantially larger circular disc with soft radial gradient, guaranteed never cut off */}
          <circleGeometry args={[terracottaRadius, 64]} />
        </mesh>

        {/* 4 Metallic Brushed Aluminum Cubes with ROUNDED EDGES — shifted a little to the right */}
        <group position={[cubeClusterShiftX, 0, 0]}>
          {CUBE_CONFIGS.map((config, index) => {
            const refMap = [cube1Ref, cube2Ref, cube3Ref, cube4Ref];
            return (
              <RoundedBox
                key={config.id}
                ref={refMap[index]}
                args={[0.58, 0.58, 0.58]} // Sized up, spacious and collision-free
                radius={0.075} // Smoothly rounded bevel fillet
                smoothness={5} // Silky edge curvature
                position={config.pos}
                material={aluminumMaterial}
                castShadow={false}
                receiveShadow={false}
              />
            );
          })}
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

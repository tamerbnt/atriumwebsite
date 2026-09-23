import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RobotHead, RobotHeadHandle } from './RobotHead';
import {
  createBakedEnvironmentTexture,
  createBrushedMetalTexture,
  createSmallTerracottaGradientTexture,
  createEyeGlowTexture,
} from '../utils/textureGenerators';

// Dev-only Perf monitor: completely excluded (tree-shaken) from production bundle
const DevPerf = import.meta.env.DEV
  ? React.lazy(() => import('r3f-perf').then((mod) => ({ default: mod.Perf })))
  : null;

gsap.registerPlugin(ScrollTrigger);

interface Scene3DProps {
  isMobile: boolean;
  isInView: boolean;
  scrollProgress?: number;
  onStatsUpdate?: (stats: { fps: number; drawCalls: number; triangles: number }) => void;
}

// 4 Stylized Robot Heads arrangement: refined composition spacing to prevent silhouette/glow merging
export const ROBOT_CONFIGS = [
  {
    id: 1,
    name: 'Hero Central',
    pos: [0.16, 0.22, 0.40] as [number, number, number],
    rot: [0.08, -0.32, -0.04] as [number, number, number],
    scale: 1.08,
    phase: 0,
  },
  {
    id: 2,
    name: 'Top Left Accent',
    pos: [-0.76, 0.82, -0.25] as [number, number, number],
    rot: [-0.05, 0.38, 0.08] as [number, number, number],
    scale: 0.86,
    phase: 2.1,
  },
  {
    id: 3,
    name: 'Lower Left Base',
    pos: [-0.68, -0.36, 0.10] as [number, number, number],
    rot: [0.12, 0.45, -0.06] as [number, number, number],
    scale: 0.90,
    phase: 3.8,
  },
  {
    id: 4,
    name: 'Back Right Depth',
    pos: [0.72, 0.70, -0.38] as [number, number, number],
    rot: [0.06, -0.55, 0.05] as [number, number, number],
    scale: 0.80,
    phase: 5.4,
  },
];

/**
 * Inner 3D scene content with Three.js objects
 */
function SceneContent({
  isMobile,
  scrollProgress,
  onStatsUpdate,
}: {
  isMobile: boolean;
  scrollProgress?: number;
  onStatsUpdate?: (stats: { fps: number; drawCalls: number; triangles: number }) => void;
}) {
  const { gl, scene, pointer, viewport, camera } = useThree();

  // Head component handle references
  const head1Ref = useRef<RobotHeadHandle>(null);
  const head2Ref = useRef<RobotHeadHandle>(null);
  const head3Ref = useRef<RobotHeadHandle>(null);
  const head4Ref = useRef<RobotHeadHandle>(null);

  // Master cluster group ref and terracotta disc mesh ref
  const clusterGroupRef = useRef<THREE.Group>(null);
  const discMeshRef = useRef<THREE.Mesh>(null);

  // Global window-wide pointer tracking so cursor tracking functions seamlessly across entire page
  const windowPointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      windowPointerRef.current.x = nx;
      windowPointerRef.current.y = ny;
      windowPointerRef.current.active = true;
    };

    const handlePointerLeave = () => {
      windowPointerRef.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // Multi-Axis Scroll Parallax Targets for Hero Section
  const parallaxRef = useRef({
    clusterY: 0,
    clusterX: 0,
    clusterZ: 0,
    clusterRotX: 0,
    clusterRotY: 0,
    clusterRotZ: 0,
    discY: 0,
    discTiltX: 0,
    camY: 0,
    camZ: 0,
    camX: 0,
  });

  // GSAP ScrollTrigger for Hero Parallax Scroll
  useEffect(() => {
    const p = parallaxRef.current;

    const trigger = ScrollTrigger.create({
      trigger: '#section-hero',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const pr = self.progress;
        // Deep spatial parallax: cluster drops down and drifts slightly into view,
        // tilting forward to reveal crowns and side chamfer facets
        p.clusterY = (isMobile ? -0.55 : -0.78) * pr;
        p.clusterX = (isMobile ? 0.08 : 0.18) * pr;
        p.clusterZ = 0.32 * pr;
        p.clusterRotX = 0.22 * pr;
        p.clusterRotY = -0.26 * pr;
        p.clusterRotZ = -0.06 * pr;

        // Terracotta stage disc drops at a slower rate (visual depth separation)
        p.discY = (isMobile ? -0.28 : -0.44) * pr;
        p.discTiltX = -0.12 * pr;

        // Camera smoothly glides down and slightly in
        p.camY = -0.32 * pr;
        p.camZ = -0.18 * pr;
        p.camX = (isMobile ? 0.06 : 0.14) * pr;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile]);

  // Base camera and lookAt targets
  const baseCamX = 0;
  const baseCamY = isMobile ? 0.15 : 0.35;
  const baseCamZ = 4.4;

  const baseLookAtX = isMobile ? 0.2 : 0.5;
  const baseLookAtY = isMobile ? -0.45 : -0.25;

  const lookAtTarget = useMemo(
    () => new THREE.Vector3(baseLookAtX, baseLookAtY, 0),
    [baseLookAtX, baseLookAtY]
  );

  // FPS tracking
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // Generate procedural textures once (0 KB network payload)
  const { envTexture, brushedTex, terracottaDiscTex, eyeGlowTex } = useMemo(() => {
    const env = createBakedEnvironmentTexture(gl);
    const brushed = createBrushedMetalTexture();
    const discTex = createSmallTerracottaGradientTexture();
    const glowTex = createEyeGlowTexture();
    return {
      envTexture: env,
      brushedTex: brushed,
      terracottaDiscTex: discTex,
      eyeGlowTex: glowTex,
    };
  }, [gl]);

  // Set scene environment statically once — deep obsidian void matching hero #06070a
  useEffect(() => {
    scene.environment = envTexture;
    scene.background = new THREE.Color('#06070a');
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
  }, [scene, envTexture, gl]);

  // MATERIAL VARIATION HIERARCHY:
  // 1. Hero Central (frontmost): Higher contrast, glossier lacquer clearcoat, crisp specular reflections
  const heroBodyMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#252931'),
      metalness: 0.96,
      roughness: 0.16, // Glossier finish
      bumpMap: brushedTex,
      bumpScale: 0.005,
      clearcoat: 1.0, // Crisp high-gloss specular highlight on bevel fillets
      clearcoatRoughness: 0.06,
      envMapIntensity: 2.5,
      reflectivity: 0.96,
    });
  }, [brushedTex]);

  // 2. Background Robots: Softer satin-matte sheen, deeper atmospheric recession
  const backgroundBodyMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1b1e24'),
      metalness: 0.92,
      roughness: 0.28, // Softer satin diffuse sheen
      bumpMap: brushedTex,
      bumpScale: 0.005,
      clearcoat: 0.65,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.6,
      reflectivity: 0.90,
    });
  }, [brushedTex]);

  // JAW MATERIALS:
  const heroJawMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#16191f'),
      metalness: 0.95,
      roughness: 0.20,
      bumpMap: brushedTex,
      bumpScale: 0.005,
      clearcoat: 0.95,
      clearcoatRoughness: 0.10,
      envMapIntensity: 2.0,
    });
  }, [brushedTex]);

  const backgroundJawMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#121418'),
      metalness: 0.92,
      roughness: 0.32,
      bumpMap: brushedTex,
      bumpScale: 0.005,
      clearcoat: 0.50,
      clearcoatRoughness: 0.22,
      envMapIntensity: 1.4,
    });
  }, [brushedTex]);

  // Base glowing terracotta eye material
  const eyeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e05a36'),
      emissive: new THREE.Color('#ff5a30'),
      emissiveIntensity: 2.8,
      roughness: 0.12,
      metalness: 0.0,
    });
  }, []);

  // Rivet bolt material
  const rivetMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0f1115'),
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

  // Compute responsive layout offsets using viewport in world units (shifted lower and more to the right)
  const clusterOffsetX = isMobile ? 0.32 : Math.min(Math.max(viewport.width * 0.28, 1.60), 2.25);
  const clusterShiftX = isMobile ? 0.18 : 0.36;
  const clusterOffsetY = isMobile ? -0.85 : -0.38;
  const terracottaRadius = isMobile ? Math.min(viewport.width * 0.44, 1.55) : 1.95;

  // Frame animation loop with zero heap allocation
  useFrame((state) => {
    const now = performance.now();
    const t = now * 0.001;

    // 1. Mouse pointer parallax + Scroll parallax targets
    const pX = windowPointerRef.current.active ? windowPointerRef.current.x : pointer.x;
    const pY = windowPointerRef.current.active ? windowPointerRef.current.y : pointer.y;

    const p = parallaxRef.current;
    const targetCamX = baseCamX + p.camX + pX * (isMobile ? 0.05 : 0.12);
    const targetCamY = baseCamY + p.camY + pY * (isMobile ? 0.04 : 0.10);
    const targetCamZ = baseCamZ + p.camZ;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.08);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.08);

    lookAtTarget.set(
      baseLookAtX + p.clusterX * 0.35,
      baseLookAtY + p.clusterY * 0.25,
      0
    );
    state.camera.lookAt(lookAtTarget);

    // 2. Cluster parallax + shared slow orbital drift
    if (clusterGroupRef.current) {
      clusterGroupRef.current.position.x = clusterShiftX + p.clusterX + Math.sin(t * 0.4) * 0.025;
      clusterGroupRef.current.position.y = p.clusterY + Math.cos(t * 0.3) * 0.02;
      clusterGroupRef.current.position.z = p.clusterZ;
      clusterGroupRef.current.rotation.x = p.clusterRotX;
      clusterGroupRef.current.rotation.y = p.clusterRotY;
      clusterGroupRef.current.rotation.z = p.clusterRotZ + Math.sin(t * 0.25) * 0.012;
    }

    // 3. Terracotta stage disc parallax (drifts at slower rate for layer depth)
    if (discMeshRef.current) {
      discMeshRef.current.position.y = -1.15 + p.discY;
      discMeshRef.current.rotation.x = -Math.PI * 0.48 + p.discTiltX;
    }

    // 4. Performance FPS counter calculation
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
  });

  const headRefs = [head1Ref, head2Ref, head3Ref, head4Ref];

  return (
    <>
      {/* Studio Lighting with pre-baked Environment reflections */}
      <ambientLight intensity={0.42} />
      <directionalLight position={[clusterOffsetX + clusterShiftX + 4, 7, 5]} intensity={2.8} color="#ffffff" />
      <directionalLight position={[clusterOffsetX + clusterShiftX - 4, 3, 3]} intensity={1.4} color="#e0f2fe" />
      <directionalLight position={[clusterOffsetX + clusterShiftX, -3, -2]} intensity={0.6} color="#64748b" />

      {/* COOL-TONED DIRECTIONAL RIM LIGHT (Thin edge highlight separating silhouette from dark background) */}
      <directionalLight
        position={[clusterOffsetX + clusterShiftX - 5, clusterOffsetY + 3.5, -4.5]}
        intensity={1.1}
        color="#d4e6f7"
        castShadow={false}
      />

      {/* Terracotta Upward Rim Glow from beneath */}
      <pointLight position={[clusterOffsetX, clusterOffsetY - 1.2, 0.2]} intensity={3.8} color="#d96342" distance={9} />
      <pointLight position={[clusterOffsetX + clusterShiftX * 0.5, clusterOffsetY - 0.7, 0.8]} intensity={2.2} color="#b85438" distance={8} />

      {/* Cluster Group containing the floating terracotta flat space & Robot Heads */}
      <group position={[clusterOffsetX, clusterOffsetY, 0]}>
        {/* FLOATING TERRACOTTA GRADIENT FLAT STAGE (32 segments) */}
        <mesh
          ref={discMeshRef}
          position={[0, -1.15, 0.15]}
          rotation={[-Math.PI * 0.48, 0, 0]}
          material={terracottaFlatSpaceMaterial}
        >
          <circleGeometry args={[terracottaRadius, 32]} />
        </mesh>

        {/* 4 STYLIZED ROBOT HEADS WITH HIERARCHICAL MATERIALS */}
        <group ref={clusterGroupRef} position={[clusterShiftX, 0, 0]}>
          {ROBOT_CONFIGS.map((config, index) => (
            <RobotHead
              key={config.id}
              ref={headRefs[index]}
              position={config.pos}
              rotation={config.rot}
              scale={config.scale}
              phase={config.phase}
              bodyMaterial={index === 0 ? heroBodyMaterial : backgroundBodyMaterial}
              jawMaterial={index === 0 ? heroJawMaterial : backgroundJawMaterial}
              eyeMaterial={eyeMaterial}
              rivetMaterial={rivetMaterial}
              eyeGlowTexture={eyeGlowTex}
              globalPointerRef={windowPointerRef}
            />
          ))}
        </group>
      </group>

      {/* Selective Bloom Post-Processing Pass (desktop only; mobile relies on emissive + point light for 60fps) */}
      {!isMobile && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={1.2}
            luminanceSmoothing={0.25}
            intensity={0.8}
            mipmapBlur
            radius={0.35}
          />
        </EffectComposer>
      )}
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
    // Cap mobile to 1.5x DPR to avoid fillrate throttling on dense 3x retina displays
    return Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
  }, [isMobile]);

  // Check if developer requested r3f-perf overlay via URL param '?perf=true' or hash '#perf'
  const [showDevPerf, setShowDevPerf] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && import.meta.env.DEV) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('perf') === 'true' || window.location.hash.includes('perf')) {
        setShowDevPerf(true);
      }
    }
  }, []);

  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, isMobile ? 0.15 : 0.35, 4.4], fov: isMobile ? 48 : 40 }}
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
        {/* Dev-only r3f-perf instrument overlay: tree-shaken from production build */}
        {DevPerf && showDevPerf && (
          <Suspense fallback={null}>
            <DevPerf position="top-left" />
          </Suspense>
        )}

        <SceneContent
          isMobile={isMobile}
          scrollProgress={scrollProgress}
          onStatsUpdate={onStatsUpdate}
        />
      </Canvas>
    </div>
  );
}

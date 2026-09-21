import React, { useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export interface RobotHeadProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  rotSpeedY?: number;
  phase?: number;
  bodyMaterial: THREE.Material;
  jawMaterial: THREE.Material;
  eyeMaterial: THREE.MeshStandardMaterial;
  rivetMaterial: THREE.Material;
}

export interface RobotHeadHandle {
  group: THREE.Group | null;
}

/**
 * Procedural stylized Robot Head component constructed purely from primitive geometry:
 * - RoundedBox main skull/head with rounded-cube silhouette
 * - Two glowing horizontal pill/capsule eyes embedded flush into the front visor
 * - Distinct lower jaw/chin segment creating the horizontal mechanical panel seam
 * - Side ear pods attached symmetrically to left/right
 * - 4 micro-rivet cylinders along the jaw seam
 */
export const RobotHead = forwardRef<RobotHeadHandle, RobotHeadProps>(function RobotHead(
  {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1.0,
    rotSpeedY = 0.2,
    phase = 0,
    bodyMaterial,
    jawMaterial,
    eyeMaterial,
    rivetMaterial,
  },
  ref
) {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  useImperativeHandle(ref, () => ({
    get group() {
      return groupRef.current;
    },
  }));

  // Unique per-instance eye material clone so pulsing emissive intensity is independent
  const localEyeMaterial = useMemo(() => {
    return eyeMaterial.clone();
  }, [eyeMaterial]);

  // Clean up cloned material on unmount
  React.useEffect(() => {
    return () => {
      localEyeMaterial.dispose();
    };
  }, [localEyeMaterial]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const now = performance.now() * 0.001;

    // Asynchronous gentle bobbing
    const floatY = Math.sin(now * 1.3 + phase) * 0.04;
    const floatZ = Math.cos(now * 0.9 + phase) * 0.02;
    groupRef.current.position.y = position[1] + floatY;
    groupRef.current.position.z = position[2] + floatZ;

    // Continuous smooth Y rotation with subtle pitch oscillation
    groupRef.current.rotation.y += rotSpeedY * delta;
    groupRef.current.rotation.x = rotation[0] + Math.sin(now * 0.8 + phase) * 0.03;

    // Dynamic eye emissive pulsing (vitality/idle breathing loop)
    const pulse = 1.8 + Math.sin(now * 2.2 + phase) * 0.7;
    localEyeMaterial.emissiveIntensity = pulse;
  });

  // Structural dimensions matching reference rounded-cube proportions
  const headW = 0.54 * scale;
  const headH = 0.58 * scale;
  const headD = 0.52 * scale;
  const headRadius = 0.10 * scale;

  const jawW = 0.52 * scale;
  const jawH = 0.16 * scale;
  const jawD = 0.50 * scale;
  const jawRadius = 0.06 * scale;
  const jawY = -headH * 0.5 - jawH * 0.5 + 0.02 * scale; // Seamed against head

  const eyeW = 0.13 * scale;
  const eyeH = 0.045 * scale;
  const eyeD = 0.03 * scale;
  const eyeX = 0.135 * scale;
  const eyeY = 0.04 * scale;
  const eyeZ = headD * 0.5 + 0.008 * scale; // Embedded flush into front face

  const earRadius = 0.06 * scale;
  const earHeight = 0.06 * scale;
  const earX = headW * 0.5 + 0.02 * scale;

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* 1. MAIN SKULL / HEAD */}
      <RoundedBox
        args={[headW, headH, headD]}
        radius={headRadius}
        smoothness={5}
        material={bodyMaterial}
        castShadow={false}
        receiveShadow={false}
      />

      {/* 2. LOWER JAW / CHIN PANEL */}
      <group position={[0, jawY, 0]}>
        <RoundedBox
          args={[jawW, jawH, jawD]}
          radius={jawRadius}
          smoothness={4}
          material={jawMaterial}
          castShadow={false}
          receiveShadow={false}
        />

        {/* 3. MICRO-RIVETS ALONG THE PANEL SEAM (4 decorative bolts) */}
        {[-0.18, -0.06, 0.06, 0.18].map((offset, idx) => (
          <mesh
            key={idx}
            position={[offset * scale, jawH * 0.42, jawD * 0.5 + 0.005 * scale]}
            rotation={[Math.PI * 0.5, 0, 0]}
            material={rivetMaterial}
            castShadow={false}
            receiveShadow={false}
          >
            <cylinderGeometry args={[0.014 * scale, 0.014 * scale, 0.01 * scale, 12]} />
          </mesh>
        ))}
      </group>

      {/* 4. SYMMETRICAL GLOWING EYES (embedded into front face) */}
      <mesh
        ref={leftEyeRef}
        position={[-eyeX, eyeY, eyeZ]}
        material={localEyeMaterial}
        castShadow={false}
        receiveShadow={false}
      >
        <boxGeometry args={[eyeW, eyeH, eyeD]} />
      </mesh>
      <mesh
        ref={rightEyeRef}
        position={[eyeX, eyeY, eyeZ]}
        material={localEyeMaterial}
        castShadow={false}
        receiveShadow={false}
      >
        <boxGeometry args={[eyeW, eyeH, eyeD]} />
      </mesh>

      {/* 5. SIDE EAR PODS */}
      {/* Left Ear */}
      <mesh
        position={[-earX, 0, 0]}
        rotation={[0, 0, Math.PI * 0.5]}
        material={bodyMaterial}
        castShadow={false}
        receiveShadow={false}
      >
        <cylinderGeometry args={[earRadius, earRadius, earHeight, 24]} />
      </mesh>
      {/* Right Ear */}
      <mesh
        position={[earX, 0, 0]}
        rotation={[0, 0, -Math.PI * 0.5]}
        material={bodyMaterial}
        castShadow={false}
        receiveShadow={false}
      >
        <cylinderGeometry args={[earRadius, earRadius, earHeight, 24]} />
      </mesh>
    </group>
  );
});

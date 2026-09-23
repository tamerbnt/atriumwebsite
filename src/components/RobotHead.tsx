import React, { useRef, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export interface RobotHeadProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  phase?: number;
  bodyMaterial: THREE.Material;
  jawMaterial: THREE.Material;
  eyeMaterial: THREE.MeshStandardMaterial;
  rivetMaterial: THREE.Material;
  eyeGlowTexture?: THREE.Texture;
  globalPointerRef?: React.MutableRefObject<{ x: number; y: number; active: boolean }>;
}

export interface RobotHeadHandle {
  group: THREE.Group | null;
}

/**
 * Procedural stylized Robot Head & Articulated Base component:
 * - Decoupled Head and Base kinematics allowing fluent multi-directional motion
 * - Head articulates with agile yaw, pitch, and roll on a central spherical neck gimbal
 * - Base chassis floats with independent physical inertia, gyroscopic banking, and counter-rotation
 * - Glowing terracotta capsule eyes with radial gradient falloff and recessed dark socket bevel
 * - Dual dedicated eye point lights parented directly inside left & right eye transforms
 * - Multi-stage machined ear pods with dark anodized base collar and brushed metallic core
 */
export const RobotHead = forwardRef<RobotHeadHandle, RobotHeadProps>(function RobotHead(
  {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1.0,
    phase = 0,
    bodyMaterial,
    jawMaterial,
    eyeMaterial,
    rivetMaterial,
    eyeGlowTexture,
    globalPointerRef,
  },
  ref
) {
  const groupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const baseGroupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftPupilRef = useRef<THREE.Mesh>(null);
  const rightPupilRef = useRef<THREE.Mesh>(null);
  const leftEyeLightRef = useRef<THREE.PointLight>(null);
  const rightEyeLightRef = useRef<THREE.PointLight>(null);

  // Organic randomized eye blink timing state (zero allocations in animation loop)
  const blinkRef = useRef({
    isBlinking: false,
    startTime: 0,
    duration: 0.18,
    scaleY: 1.0,
    isDoubleBlink: false,
    nextBlinkTime: 2.2 + Math.random() * 3.5 + phase * 0.7, // Staggered per robot instance
  });

  useImperativeHandle(ref, () => ({
    get group() {
      return groupRef.current;
    },
  }));

  // Unique per-instance eye, socket, and gasket materials
  const {
    localEyeMaterial,
    localPupilMaterial,
    socketMaterial,
    gasketMaterial,
  } = useMemo(() => {
    const eyeMat = eyeMaterial.clone();
    eyeMat.color = new THREE.Color('#e05a36');
    eyeMat.emissive = new THREE.Color('#ff5a30');
    eyeMat.emissiveIntensity = 2.8;
    if (eyeGlowTexture) {
      eyeMat.emissiveMap = eyeGlowTexture;
      eyeMat.map = eyeGlowTexture;
      eyeMat.needsUpdate = true;
    }

    const pupilMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffe6dc'),
      emissive: new THREE.Color('#ffa080'),
      emissiveIntensity: 4.2,
      roughness: 0.15,
      metalness: 0.0,
    });

    // Dark recessed lens socket bevel / aperture frame
    const sockMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0d0f14'),
      metalness: 0.88,
      roughness: 0.55,
      clearcoat: 0.4,
      clearcoatRoughness: 0.25,
    });

    // Dark recessed gasket for the head-jaw panel seam and neck socket
    const gasMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#06070a'),
    });

    return {
      localEyeMaterial: eyeMat,
      localPupilMaterial: pupilMat,
      socketMaterial: sockMat,
      gasketMaterial: gasMat,
    };
  }, [eyeMaterial, eyeGlowTexture]);

  // Clean up cloned and generated materials on unmount
  React.useEffect(() => {
    return () => {
      localEyeMaterial.dispose();
      localPupilMaterial.dispose();
      socketMaterial.dispose();
      gasketMaterial.dispose();
    };
  }, [
    localEyeMaterial,
    localPupilMaterial,
    socketMaterial,
    gasketMaterial,
  ]);

  // Structural dimensions matching reference rounded-cube proportions
  const headW = 0.54 * scale;
  const headH = 0.58 * scale;
  const headD = 0.52 * scale;
  const headRadius = 0.10 * scale;

  const jawW = 0.52 * scale;
  const jawH = 0.16 * scale;
  const jawD = 0.50 * scale;
  const jawRadius = 0.06 * scale;
  const jawY = -headH * 0.5 - jawH * 0.5 + 0.015 * scale; // Seamed against head with neck gimbal

  const eyeW = 0.135 * scale;
  const eyeH = 0.050 * scale;
  const eyeD = 0.025 * scale;
  const eyeRadius = 0.014 * scale;
  const eyeX = 0.135 * scale;
  const eyeY = 0.04 * scale;
  const eyeZ = headD * 0.5 + 0.008 * scale; // Embedded flush into front face

  const pupilW = 0.052 * scale;
  const pupilH = 0.030 * scale;
  const pupilD = 0.018 * scale;
  const pupilRadius = 0.008 * scale;
  const pupilZ = eyeZ + 0.006 * scale;

  const earRadius = 0.065 * scale;
  const earHeight = 0.045 * scale;
  const earX = headW * 0.5 + 0.015 * scale;

  // Frame animation loop with zero Vector3 allocations
  useFrame((state) => {
    if (!groupRef.current) return;
    const now = performance.now() * 0.001;

    // 1. Organic, persistent breathing float & subtle head sway (always alive, not only when mouse moves)
    const floatY = Math.sin(now * 1.15 + phase) * 0.035;
    const floatZ = Math.cos(now * 0.85 + phase) * 0.02;
    const idleSwayYaw = Math.sin(now * 0.65 + phase) * 0.09;
    const idleSwayPitch = Math.sin(now * 0.5 + phase * 1.2) * 0.04;
    const idleSwayRoll = Math.cos(now * 0.4 + phase) * 0.02;

    // 2. Cursor tracking: Read global window pointer coordinates if available, fallback to canvas pointer
    const isGlobalActive = Boolean(globalPointerRef?.current?.active);
    const ptrX = isGlobalActive
      ? globalPointerRef!.current.x
      : state.pointer.x;
    const ptrY = isGlobalActive
      ? globalPointerRef!.current.y
      : state.pointer.y;

    const hasCursor = isGlobalActive || Math.abs(state.pointer.x) > 0.001 || Math.abs(state.pointer.y) > 0.001;

    // 3. FLUID DECOUPLED KINEMATICS (HEAD AND BASE MOVE IN DIFFERENT DIRECTIONS)
    // The head tracks the pointer with agile, curious responsiveness.
    // The base acts as a floating gyroscopic chassis with heavy physical inertia, hovercraft banking, and counter-rotation.

    // Pointer aims:
    const headAimYaw = ptrX * 0.52;      // up to ~30° yaw
    const headAimPitch = -ptrY * 0.36;   // up to ~21° pitch
    const headAimRoll = ptrX * 0.08;     // inquisitive biometric tilt

    // Base counter-reaction to pointer:
    // When the head turns right (+yaw), the base counter-twists slightly or banks in the opposite direction
    const baseCounterYaw = -ptrX * 0.16;   // Counter-rotates opposite to head
    const baseCounterPitch = ptrY * 0.10;  // Tilts back as head nods forward
    const baseCounterRoll = -ptrX * 0.08;  // Hovercraft banking

    // Independent multi-frequency living idle motion (completely different rhythms & phases)
    // Base: slow, deep 4.5s breathing hover rhythm
    const baseIdleYaw = Math.sin(now * 0.45 + phase * 0.8) * 0.10;
    const baseIdlePitch = Math.cos(now * 0.38 + phase * 1.1) * 0.06;
    const baseIdleRoll = Math.sin(now * 0.32 + phase * 0.6) * 0.05;

    // Head: faster, curious 2.8s exploratory scanning rhythm (multi-harmonic)
    const headIdleYaw = Math.sin(now * 0.72 + phase * 1.4) * 0.14 + Math.cos(now * 0.28 + phase * 2.2) * 0.07;
    const headIdlePitch = Math.sin(now * 0.62 + phase * 1.0) * 0.08;
    const headIdleRoll = Math.cos(now * 0.50 + phase * 1.7) * 0.05;

    // Floating spatial translation of root cluster
    const bodyLeanX = ptrX * 0.04 * scale;
    const bodyLeanY = ptrY * 0.03 * scale;
    groupRef.current.position.x = position[0] + bodyLeanX;
    groupRef.current.position.y = position[1] + floatY + bodyLeanY;
    groupRef.current.position.z = position[2] + floatZ;

    // Fluent Base Rotation (Smooth, heavy mechanical damping)
    if (baseGroupRef.current) {
      const baseTargetYaw = rotation[1] + baseCounterYaw + baseIdleYaw;
      const baseTargetPitch = rotation[0] + baseCounterPitch + baseIdlePitch;
      const baseTargetRoll = rotation[2] + baseCounterRoll + baseIdleRoll;

      baseGroupRef.current.rotation.y = THREE.MathUtils.lerp(baseGroupRef.current.rotation.y, baseTargetYaw, 0.045);
      baseGroupRef.current.rotation.x = THREE.MathUtils.lerp(baseGroupRef.current.rotation.x, baseTargetPitch, 0.045);
      baseGroupRef.current.rotation.z = THREE.MathUtils.lerp(baseGroupRef.current.rotation.z, baseTargetRoll, 0.045);
    }

    // Fluent Head Rotation (Agile, responsive swivel & pitch in different direction)
    if (headGroupRef.current) {
      const headTargetYaw = rotation[1] + headAimYaw + headIdleYaw;
      const headTargetPitch = rotation[0] + headAimPitch + headIdlePitch;
      const headTargetRoll = rotation[2] + headAimRoll + headIdleRoll;

      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, headTargetYaw, 0.085);
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(headGroupRef.current.rotation.x, headTargetPitch, 0.085);
      headGroupRef.current.rotation.z = THREE.MathUtils.lerp(headGroupRef.current.rotation.z, headTargetRoll, 0.085);
    }

    // 4. Dynamic eye emissive pulsing (breathing idle glow)
    const pulse = 2.4 + Math.sin(now * 2.1 + phase) * 0.7;
    localEyeMaterial.emissiveIntensity = pulse;
    localPupilMaterial.emissiveIntensity = pulse * 1.45;

    // 5. ROBOT EYE (PUPIL) TRACKING: Pupils shift dynamically inside the lenses toward the cursor
    const maxPupilShiftX = 0.022 * scale;
    const maxPupilShiftY = 0.014 * scale;

    // Organic idle gaze wander (saccades) when cursor is stationary or on touch devices
    const idleGazeX = Math.sin(now * 0.45 + phase * 1.7) * Math.cos(now * 0.22) * (0.008 * scale);
    const idleGazeY = Math.sin(now * 0.35 + phase * 0.9) * (0.004 * scale);

    const targetPupilX = hasCursor
      ? THREE.MathUtils.clamp(ptrX * 0.035 * scale + idleGazeX * 0.2, -maxPupilShiftX, maxPupilShiftX)
      : idleGazeX;
    const targetPupilY = hasCursor
      ? THREE.MathUtils.clamp(ptrY * 0.022 * scale + idleGazeY * 0.2, -maxPupilShiftY, maxPupilShiftY)
      : idleGazeY;

    if (leftPupilRef.current && rightPupilRef.current) {
      leftPupilRef.current.position.x = THREE.MathUtils.lerp(leftPupilRef.current.position.x, -eyeX + targetPupilX, 0.12);
      leftPupilRef.current.position.y = THREE.MathUtils.lerp(leftPupilRef.current.position.y, eyeY + targetPupilY, 0.12);
      rightPupilRef.current.position.x = THREE.MathUtils.lerp(rightPupilRef.current.position.x, eyeX + targetPupilX, 0.12);
      rightPupilRef.current.position.y = THREE.MathUtils.lerp(rightPupilRef.current.position.y, eyeY + targetPupilY, 0.12);
    }

    // 6. ORGANIC RANDOMIZED EYE BLINK ANIMATION
    // Asymmetric biomechanical curve: snappy eyelid close (~55ms) and smooth elastic recovery (~125ms)
    const blink = blinkRef.current;
    if (!blink.isBlinking && now >= blink.nextBlinkTime) {
      blink.isBlinking = true;
      blink.startTime = now;
      blink.duration = 0.17 + Math.random() * 0.05; // 170ms - 220ms
    }

    if (blink.isBlinking) {
      const elapsed = now - blink.startTime;
      const progress = elapsed / blink.duration;

      if (progress >= 1.0) {
        // Blink cycle complete
        blink.isBlinking = false;
        blink.scaleY = 1.0;

        // Occasional organic double-blink flutter (~20% chance)
        if (!blink.isDoubleBlink && Math.random() < 0.20) {
          blink.isDoubleBlink = true;
          blink.nextBlinkTime = now + 0.11 + Math.random() * 0.06; // Quick flutter 110-170ms later
        } else {
          blink.isDoubleBlink = false;
          // Randomized periodic interval (2.8s - 6.8s) so timing feels biological
          blink.nextBlinkTime = now + 2.8 + Math.random() * 4.0;
        }
      } else {
        // Asymmetric closing vs opening easing
        if (progress < 0.32) {
          // Fast closing snap (quadratic ease in)
          const tClose = progress / 0.32;
          blink.scaleY = Math.max(0.06, 1.0 - (tClose * tClose) * 0.94);
        } else {
          // Smooth decelerating opening (sine ease out with subtle elastic feeling)
          const tOpen = (progress - 0.32) / 0.68;
          blink.scaleY = 0.06 + Math.sin(tOpen * Math.PI * 0.5) * 0.94;
        }
      }
    } else {
      blink.scaleY = 1.0;
    }

    // Apply vertical geometry scale to eye lenses and pupils (scaling around vertical center)
    const currentEyeScaleY = blink.scaleY;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = currentEyeScaleY;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = currentEyeScaleY;
    if (leftPupilRef.current) leftPupilRef.current.scale.y = currentEyeScaleY;
    if (rightPupilRef.current) rightPupilRef.current.scale.y = currentEyeScaleY;

    // Animate dual eye point lights proportionally, dimming during blink
    const lightIntensity = (0.35 + (pulse - 1.7) * 0.22) * (0.15 + 0.85 * currentEyeScaleY);
    if (leftEyeLightRef.current) {
      leftEyeLightRef.current.intensity = lightIntensity;
    }
    if (rightEyeLightRef.current) {
      rightEyeLightRef.current.intensity = lightIntensity;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* 1. ARTICULATED BASE / LOWER CHASSIS (Independent Floating & Inertia) */}
      <group ref={baseGroupRef} position={[0, jawY, 0]}>
        {/* Main lower base chassis panel */}
        <RoundedBox
          args={[jawW, jawH, jawD]}
          radius={jawRadius}
          smoothness={2}
          material={jawMaterial}
          castShadow={false}
          receiveShadow={false}
        />

        {/* Front micro-rivets along base panel */}
        {[-0.18, -0.06, 0.06, 0.18].map((offset, idx) => (
          <mesh
            key={`b-rivet-${idx}`}
            position={[offset * scale, jawH * 0.38, jawD * 0.5 + 0.005 * scale]}
            rotation={[Math.PI * 0.5, 0, 0]}
            material={rivetMaterial}
            castShadow={false}
            receiveShadow={false}
          >
            <cylinderGeometry args={[0.014 * scale, 0.014 * scale, 0.01 * scale, 10]} />
          </mesh>
        ))}

        {/* Precision side cooling/thruster vents on base */}
        {[-0.12, 0, 0.12].map((zOff, idx) => (
          <React.Fragment key={`b-vent-${idx}`}>
            <mesh
              position={[jawW * 0.5 + 0.002 * scale, 0, zOff * scale]}
              material={socketMaterial}
            >
              <boxGeometry args={[0.006 * scale, jawH * 0.45, 0.04 * scale]} />
            </mesh>
            <mesh
              position={[-jawW * 0.5 - 0.002 * scale, 0, zOff * scale]}
              material={socketMaterial}
            >
              <boxGeometry args={[0.006 * scale, jawH * 0.45, 0.04 * scale]} />
            </mesh>
          </React.Fragment>
        ))}

        {/* Articulated spherical neck socket collar rising from base */}
        <mesh position={[0, jawH * 0.5 + 0.008 * scale, 0]} material={socketMaterial}>
          <cylinderGeometry args={[0.13 * scale, 0.15 * scale, 0.024 * scale, 24]} />
        </mesh>
        {/* Machined spherical gimbal joint core visible during head pitch/yaw */}
        <mesh position={[0, jawH * 0.5 + 0.022 * scale, 0]} material={rivetMaterial}>
          <sphereGeometry args={[0.095 * scale, 18, 14]} />
        </mesh>
      </group>

      {/* 2. ARTICULATED HEAD CASING & SENSORS (Independent Swivel & Pitch above Base) */}
      <group ref={headGroupRef} position={[0, 0, 0]}>
        {/* MAIN CRANIAL CASING */}
        <RoundedBox
          args={[headW, headH, headD]}
          radius={headRadius}
          smoothness={2}
          material={bodyMaterial}
          castShadow={false}
          receiveShadow={false}
        />

        {/* ARTICULATED HEAD/BASE MAGNETIC GASKET RING at bottom of head */}
        <mesh position={[0, -headH * 0.5 - 0.001 * scale, 0]} material={gasketMaterial}>
          <cylinderGeometry args={[headW * 0.40, headW * 0.43, 0.016 * scale, 24]} />
        </mesh>

        {/* RECESSED DARK EYE APERTURE BEZELS / SOCKET FRAMES */}
        <RoundedBox
          args={[eyeW + 0.026 * scale, eyeH + 0.022 * scale, 0.016 * scale]}
          radius={eyeRadius * 1.3}
          smoothness={2}
          position={[-eyeX, eyeY, eyeZ - 0.004 * scale]}
          material={socketMaterial}
          castShadow={false}
          receiveShadow={false}
        />
        <RoundedBox
          args={[eyeW + 0.026 * scale, eyeH + 0.022 * scale, 0.016 * scale]}
          radius={eyeRadius * 1.3}
          smoothness={2}
          position={[eyeX, eyeY, eyeZ - 0.004 * scale]}
          material={socketMaterial}
          castShadow={false}
          receiveShadow={false}
        />

        {/* SYMMETRICAL ROUNDED GLOWING EYE LENSES WITH RADIAL GRADIENT FALLOFF */}
        <RoundedBox
          ref={leftEyeRef}
          args={[eyeW, eyeH, eyeD]}
          radius={eyeRadius}
          smoothness={2}
          position={[-eyeX, eyeY, eyeZ]}
          material={localEyeMaterial}
          castShadow={false}
          receiveShadow={false}
        />
        <RoundedBox
          ref={rightEyeRef}
          args={[eyeW, eyeH, eyeD]}
          radius={eyeRadius}
          smoothness={2}
          position={[eyeX, eyeY, eyeZ]}
          material={localEyeMaterial}
          castShadow={false}
          receiveShadow={false}
        />

        {/* RESPONSIVE BRIGHT EMISSIVE PUPILS */}
        <RoundedBox
          ref={leftPupilRef}
          args={[pupilW, pupilH, pupilD]}
          radius={pupilRadius}
          smoothness={2}
          position={[-eyeX, eyeY, pupilZ]}
          material={localPupilMaterial}
          castShadow={false}
          receiveShadow={false}
        />
        <RoundedBox
          ref={rightPupilRef}
          args={[pupilW, pupilH, pupilD]}
          radius={pupilRadius}
          smoothness={2}
          position={[eyeX, eyeY, pupilZ]}
          material={localPupilMaterial}
          castShadow={false}
          receiveShadow={false}
        />

        {/* DUAL EYE POINT LIGHTS (Strictly parented inside headGroupRef) */}
        <pointLight
          ref={leftEyeLightRef}
          position={[-eyeX, eyeY, eyeZ + 0.016 * scale]}
          color="#ff6a38"
          intensity={0.35}
          distance={0.45 * scale}
          decay={2}
          castShadow={false}
        />
        <pointLight
          ref={rightEyeLightRef}
          position={[eyeX, eyeY, eyeZ + 0.016 * scale]}
          color="#ff6a38"
          intensity={0.35}
          distance={0.45 * scale}
          decay={2}
          castShadow={false}
        />

        {/* MULTI-STAGE MACHINED EAR PODS */}
        {/* Left Ear Assembly */}
        <group position={[-earX, eyeY, 0]} rotation={[0, 0, Math.PI * 0.5]}>
          <mesh position={[0, -earHeight * 0.25, 0]} material={socketMaterial}>
            <cylinderGeometry args={[earRadius * 1.05, earRadius * 1.05, earHeight * 0.4, 16]} />
          </mesh>
          <mesh position={[0, earHeight * 0.15, 0]} material={bodyMaterial}>
            <cylinderGeometry args={[earRadius * 0.82, earRadius * 0.82, earHeight * 0.7, 16]} />
          </mesh>
          <mesh position={[0, earHeight * 0.51, 0]} material={socketMaterial}>
            <circleGeometry args={[earRadius * 0.45, 16]} />
          </mesh>
        </group>

        {/* Right Ear Assembly */}
        <group position={[earX, eyeY, 0]} rotation={[0, 0, -Math.PI * 0.5]}>
          <mesh position={[0, -earHeight * 0.25, 0]} material={socketMaterial}>
            <cylinderGeometry args={[earRadius * 1.05, earRadius * 1.05, earHeight * 0.4, 16]} />
          </mesh>
          <mesh position={[0, earHeight * 0.15, 0]} material={bodyMaterial}>
            <cylinderGeometry args={[earRadius * 0.82, earRadius * 0.82, earHeight * 0.7, 16]} />
          </mesh>
          <mesh position={[0, earHeight * 0.51, 0]} material={socketMaterial}>
            <circleGeometry args={[earRadius * 0.45, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
});

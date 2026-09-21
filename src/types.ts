export interface PerformanceStats {
  fps: number;
  dpr: number;
  triangles: number;
  drawCalls: number;
  isPaused: boolean;
  isInView: boolean;
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
}

export type SceneMode = '3d' | 'fallback';

export interface CubeConfig {
  id: number;
  initialPosition: [number, number, number];
  rotationSpeed: [number, number, number];
  size: number;
}

/**
 * Device and performance capabilities detector
 */

export interface DeviceProfile {
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  hasWebGL: boolean;
  recommendedMode: '3d' | 'fallback';
  reason: string;
}

export function detectDeviceCapabilities(): DeviceProfile {
  if (typeof window === 'undefined') {
    return {
      isLowEnd: false,
      prefersReducedMotion: false,
      isMobile: false,
      hasWebGL: true,
      recommendedMode: '3d',
      reason: 'Server-side rendering default',
    };
  }

  // 1. Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Mobile detection
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
    (window.innerWidth < 768 && 'ontouchstart' in window);

  // 3. WebGL Support check (support WebGL2 and WebGL)
  let hasWebGL = true;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    hasWebGL = !!gl;
  } catch {
    hasWebGL = true; // Optimistically assume WebGL supported in modern browsers
  }

  // 4. Low-end hardware detection
  let isLowEnd = false;
  let reason = 'Optimal hardware configuration';

  if (!hasWebGL) {
    isLowEnd = true;
    reason = 'No WebGL hardware acceleration found';
  } else if (prefersReducedMotion) {
    reason = 'User prefers reduced motion';
  }

  // Default to 3D mode for all visitors; fallback is only used if WebGL is completely unavailable
  const recommendedMode = hasWebGL ? '3d' : 'fallback';

  return {
    isLowEnd,
    prefersReducedMotion,
    isMobile,
    hasWebGL,
    recommendedMode,
    reason,
  };
}

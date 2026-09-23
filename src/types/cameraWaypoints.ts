/**
 * Named camera waypoints for sections 1-4 (Hero, Problem, Shift, How It Works)
 * Each waypoint specifies 3D camera position, lookAt target, and FOV.
 */

export interface CameraWaypoint {
  name: string;
  sectionId: string;
  label: string;
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export interface SectionWaypoints {
  desktop: CameraWaypoint;
  mobile: CameraWaypoint;
}

export const CAMERA_WAYPOINTS: Record<number, SectionWaypoints> = {
  // 0: HERO — Wide master shot, cluster framed lower-right
  0: {
    desktop: {
      name: 'hero',
      sectionId: 'section-hero',
      label: 'HERO // OVERVIEW',
      position: [0, 0.35, 4.4],
      lookAt: [0.5, -0.25, 0],
      fov: 40,
    },
    mobile: {
      name: 'hero',
      sectionId: 'section-hero',
      label: 'HERO // OVERVIEW',
      position: [0, 0.15, 4.4],
      lookAt: [0.2, -0.45, 0],
      fov: 48,
    },
  },

  // 1: PROBLEM — SINGULAR DOLLY-ZOOM MOMENT:
  // Simultaneous opposite-direction change: Camera pushes dramatically in on Z (4.4 -> 2.65),
  // while FOV widens dramatically (40 -> 56), creating the classic Vertigo perspective distortion!
  1: {
    desktop: {
      name: 'problem',
      sectionId: 'section-problem',
      label: 'PROBLEM // BOTTLENECK',
      position: [0.38, 0.08, 2.65], // Pushed close in Z
      lookAt: [0.46, -0.06, 0.15],
      fov: 56, // Vertigo FOV widen
    },
    mobile: {
      name: 'problem',
      sectionId: 'section-problem',
      label: 'PROBLEM // BOTTLENECK',
      position: [0.15, -0.06, 2.80],
      lookAt: [0.22, -0.25, 0.15],
      fov: 62,
    },
  },

  // 2: SHIFT — Lateral orbital arc shift & pull-back catching specular highlights
  2: {
    desktop: {
      name: 'shift',
      sectionId: 'section-shift',
      label: 'SHIFT // REVELATION',
      position: [-0.55, 0.40, 3.85], // Modest orbital arc shift to lateral side
      lookAt: [0.35, -0.20, 0],
      fov: 38,
    },
    mobile: {
      name: 'shift',
      sectionId: 'section-shift',
      label: 'SHIFT // REVELATION',
      position: [-0.22, 0.22, 3.90],
      lookAt: [0.18, -0.38, 0],
      fov: 46,
    },
  },

  // 3: HOW IT WORKS — Elevated high-angle perspective showing structural hierarchy
  3: {
    desktop: {
      name: 'howItWorks',
      sectionId: 'section-how-it-works',
      label: 'HOW IT WORKS // ARCHITECTURE',
      position: [0.28, 0.82, 4.15], // Elevated camera looking down
      lookAt: [0.42, -0.32, 0],
      fov: 42,
    },
    mobile: {
      name: 'howItWorks',
      sectionId: 'section-how-it-works',
      label: 'HOW IT WORKS // ARCHITECTURE',
      position: [0.12, 0.52, 4.25],
      lookAt: [0.20, -0.44, 0],
      fov: 48,
    },
  },
};

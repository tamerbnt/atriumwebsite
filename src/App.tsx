/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { detectDeviceCapabilities } from './utils/deviceDetection';
import { SceneMode } from './types';
import { Language } from './content/copy';
import StaticFallback from './components/StaticFallback';
import PerformanceMonitor from './components/PerformanceMonitor';
import PageShell from './components/PageShell';
import DemoModal from './components/DemoModal';

// Lazy-load Three.js / WebGL bundle so it doesn't block first paint of page shell
const Scene3D = lazy(() => import('./components/Scene3D'));

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [deviceProfile, setDeviceProfile] = useState(() => detectDeviceCapabilities());
  const [activeMode, setActiveMode] = useState<SceneMode>(() =>
    deviceProfile.recommendedMode
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [stats, setStats] = useState<{ fps: number; drawCalls: number; triangles: number }>({
    fps: 60,
    drawCalls: 6,
    triangles: 116,
  });

  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Sync RTL direction attribute on language change
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Initialize hydration and detect device capabilities
  useEffect(() => {
    const profile = detectDeviceCapabilities();
    setDeviceProfile(profile);
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver to pause R3F render loop when 3D hero is out of view
  useEffect(() => {
    const container = heroContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.05, // Freeze render loop when hero is off-screen
      }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);

  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  const hero3DNode = (
    <div ref={heroContainerRef} className="w-full h-full relative">
      {activeMode === '3d' ? (
        <Suspense
          fallback={
            <StaticFallback
              reason="Loading 3D WebGL bundle..."
              onSwitchTo3D={() => setActiveMode('3d')}
            />
          }
        >
          {isHydrated && (
            <Scene3D
              isMobile={deviceProfile.isMobile}
              isInView={isInView}
              scrollProgress={0}
              onStatsUpdate={(newStats) => setStats(newStats)}
            />
          )}
        </Suspense>
      ) : (
        <StaticFallback
          reason={deviceProfile.reason}
          onSwitchTo3D={() => setActiveMode('3d')}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0c0e12] text-stone-200">
      {/* Main Landing Page Funnel Structure with integrated 3D Hero */}
      <PageShell
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
        onOpenDemo={() => setIsDemoOpen(true)}
        isHydrated={isHydrated}
        activeMode={activeMode}
        hero3DNode={hero3DNode}
      />

      {/* Real-time Performance HUD Telemetry */}
      <PerformanceMonitor
        fps={stats.fps}
        drawCalls={stats.drawCalls}
        triangles={stats.triangles}
        dpr={dpr}
        isInView={isInView}
        activeMode={activeMode}
        onToggleMode={(mode) => setActiveMode(mode)}
        isMobile={deviceProfile.isMobile}
      />

      {/* Interactive 15-Minute Demo Booking Dialog */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        lang={lang}
      />
    </div>
  );
}



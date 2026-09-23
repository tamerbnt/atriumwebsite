/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { detectDeviceCapabilities } from './utils/deviceDetection';
import { SceneMode } from './types';
import { Language } from './content/copy';
import StaticFallback from './components/StaticFallback';
import PageShell from './components/PageShell';
import DemoModal from './components/DemoModal';
import SmoothScroll from './components/SmoothScroll';

// Dev-only Performance Monitor: fully tree-shaken from production bundle
const DevPerformanceMonitor = import.meta.env.DEV
  ? lazy(() => import('./components/PerformanceMonitor'))
  : null;

// Import 3D Scene directly so hero loads immediately with zero static fallback flash
import Scene3D from './components/Scene3D';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [deviceProfile, setDeviceProfile] = useState(() => detectDeviceCapabilities());
  const [activeMode, setActiveMode] = useState<SceneMode>('3d');
  const [isHydrated, setIsHydrated] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [stats, setStats] = useState<{ fps: number; drawCalls: number; triangles: number }>({
    fps: 60,
    drawCalls: 14,
    triangles: 2780,
  });

  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Sync RTL direction attribute on language change
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Mark hydrated on client mount
  useEffect(() => {
    setIsHydrated(true);
    const profile = detectDeviceCapabilities();
    setDeviceProfile(profile);
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
        <Scene3D
          isMobile={deviceProfile.isMobile}
          isInView={isInView}
          scrollProgress={0}
          onStatsUpdate={(newStats) => setStats(newStats)}
        />
      ) : (
        <StaticFallback
          reason={deviceProfile.reason}
          onSwitchTo3D={() => setActiveMode('3d')}
        />
      )}
    </div>
  );

  const [showDebugHud, setShowDebugHud] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('debug') === 'true' || params.get('telemetry') === 'true') {
        setShowDebugHud(true);
      }
    }
  }, []);

  return (
    <SmoothScroll>
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

        {/* Dev-only Performance Telemetry: fully excluded from production build */}
        {DevPerformanceMonitor && showDebugHud && (
          <Suspense fallback={null}>
            <DevPerformanceMonitor
              fps={stats.fps}
              drawCalls={stats.drawCalls}
              triangles={stats.triangles}
              dpr={dpr}
              isInView={isInView}
              activeMode={activeMode}
              onToggleMode={(mode) => setActiveMode(mode)}
              isMobile={deviceProfile.isMobile}
            />
          </Suspense>
        )}

        {/* Interactive 15-Minute Demo Booking Dialog */}
        <DemoModal
          isOpen={isDemoOpen}
          onClose={() => setIsDemoOpen(false)}
          lang={lang}
        />
      </div>
    </SmoothScroll>
  );
}



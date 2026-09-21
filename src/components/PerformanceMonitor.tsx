import React, { useState } from 'react';
import {
  Activity,
  Layers,
  Eye,
  EyeOff,
  Maximize2,
  Sparkles,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SceneMode } from '../types';

interface PerformanceMonitorProps {
  fps: number;
  drawCalls: number;
  triangles: number;
  dpr: number;
  isInView: boolean;
  activeMode: SceneMode;
  onToggleMode: (mode: SceneMode) => void;
  isMobile: boolean;
}

export default function PerformanceMonitor({
  fps,
  drawCalls,
  triangles,
  dpr,
  isInView,
  activeMode,
  onToggleMode,
  isMobile,
}: PerformanceMonitorProps) {
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const fpsColor =
    fps >= 55 ? 'text-emerald-400' : fps >= 30 ? 'text-amber-400' : 'text-rose-400';

  return (
    <aside
      aria-label="Performance Telemetry"
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-auto"
    >
      <div className="bg-[#12141a]/95 border border-stone-800 rounded-lg shadow-2xl backdrop-blur-md overflow-hidden text-xs text-stone-300 w-72 sm:w-80 transition-all">
        {/* Header Bar */}
        <div className="px-3.5 py-2.5 bg-stone-900/80 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                !isInView
                  ? 'bg-amber-400 animate-pulse'
                  : activeMode === '3d'
                  ? 'bg-emerald-400'
                  : 'bg-cyan-400'
              }`}
            />
            <span className="font-mono font-medium tracking-wide text-stone-100 text-[11px] uppercase">
              Performance Budget
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* FPS Pill */}
            {activeMode === '3d' && (
              <span className={`font-mono font-bold text-xs ${fpsColor}`}>
                {isInView ? `${fps} FPS` : '0 FPS (PAUSED)'}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded transition cursor-pointer"
              title="Toggle details"
              aria-label="Toggle details"
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Details Panel */}
        {isExpanded && (
          <div className="p-3.5 space-y-3 font-mono text-[11px]">
            {/* Mode Switcher */}
            <div className="flex items-center justify-between bg-stone-950/60 p-1.5 rounded border border-stone-800/80">
              <span className="text-stone-400 text-[10px] uppercase tracking-wider pl-1">
                Render Engine
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => onToggleMode('3d')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                    activeMode === '3d'
                      ? 'bg-amber-600/90 text-white font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  3D WebGL
                </button>
                <button
                  type="button"
                  onClick={() => onToggleMode('fallback')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                    activeMode === 'fallback'
                      ? 'bg-cyan-700/90 text-white font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  Static Mode
                </button>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-stone-300">
              <div className="p-2 rounded bg-stone-900/60 border border-stone-800/60">
                <div className="text-[10px] text-stone-500 uppercase">Device DPR</div>
                <div className="font-semibold text-stone-200 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-cyan-400" />
                  <span>{dpr.toFixed(1)}x</span>
                  <span className="text-[10px] text-emerald-400 font-normal">(Capped ≤ 2)</span>
                </div>
              </div>

              <div className="p-2 rounded bg-stone-900/60 border border-stone-800/60">
                <div className="text-[10px] text-stone-500 uppercase">Poly Budget</div>
                <div className="font-semibold text-stone-200 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-amber-400" />
                  <span>{triangles || 116} tri</span>
                  <span className="text-[10px] text-stone-500 font-normal">(Low-poly)</span>
                </div>
              </div>

              <div className="p-2 rounded bg-stone-900/60 border border-stone-800/60">
                <div className="text-[10px] text-stone-500 uppercase">Viewport State</div>
                <div className="font-semibold text-stone-200 flex items-center gap-1">
                  {isInView ? (
                    <>
                      <Eye className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">In Viewport</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-400">Loop Paused</span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-2 rounded bg-stone-900/60 border border-stone-800/60">
                <div className="text-[10px] text-stone-500 uppercase">Shadow Pass</div>
                <div className="font-semibold text-stone-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span className="text-sky-300">Baked (0 Maps)</span>
                </div>
              </div>
            </div>

            {/* Performance Checklist Verification */}
            <div className="pt-2 border-t border-stone-800/70 space-y-1 text-[10px] text-stone-400">
              <div className="flex items-center justify-between">
                <span>Reflections:</span>
                <span className="text-stone-300">1x Procedural PMREM (0 KB net)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shadow Maps:</span>
                <span className="text-emerald-400">Zero dynamic passes</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Post-processing:</span>
                <span className="text-stone-300">Targeted diamond bloom only</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Render loop:</span>
                <span className="text-stone-300">
                  {isInView ? 'Active (frameloop: always)' : 'Freezes off-screen (never)'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

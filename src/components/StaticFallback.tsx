import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

interface StaticFallbackProps {
  reason?: string;
  onSwitchTo3D?: () => void;
}

export default function StaticFallback({ reason, onSwitchTo3D }: StaticFallbackProps) {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center lg:justify-end lg:pr-12 xl:pr-20 bg-transparent select-none">
      {/* Container positioned on the right-hand stage on desktop */}
      <div className="relative flex items-center justify-center mt-28 lg:mt-0">
        {/* ENLARGED FLOATING TERRACOTTA GRADIENT FLAT SPACE — Lowered and tilted flatter */}
        {/* Floating circular gradient stage, outer is pure black */}
        <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] lg:w-[620px] lg:h-[620px] rounded-full bg-[radial-gradient(circle,rgba(224,107,72,0.95)_0%,rgba(184,84,56,0.8)_35%,rgba(94,32,18,0.5)_60%,transparent_75%)] pointer-events-none transform -rotate-x-70 translate-y-20 sm:translate-y-24" />

        {/* 4 Isometric CSS 3D Cubes with ROUNDED EDGES flying above flat space — Scaled larger and shifted right */}
        <div
          className="relative z-10 w-72 h-72 sm:w-96 sm:h-96 translate-x-4 sm:translate-x-6"
          style={{
            perspective: '1000px',
          }}
        >
          <div
            className="w-full h-full relative animate-[spin_40s_linear_infinite]"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(20deg) rotateY(-28deg)',
            }}
          >
            {/* Top-Left Aluminum Cube with rounded edges (spacious, zero overlap) */}
            <div className="absolute left-8 sm:left-10 top-6 sm:top-8 w-18 h-18 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-2xl bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 shadow-[0_22px_40px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.2)] border border-white/70 flex items-center justify-center backdrop-blur-sm">
              <div className="w-full h-full rounded-2xl bg-gradient-to-t from-transparent via-white/10 to-white/50" />
            </div>

            {/* Top-Right Aluminum Cube with rounded edges (spacious, zero overlap) */}
            <div className="absolute right-8 sm:right-10 top-6 sm:top-8 w-18 h-18 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-2xl bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 shadow-[0_22px_40px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.2)] border border-white/70 flex items-center justify-center backdrop-blur-sm">
              <div className="w-full h-full rounded-2xl bg-gradient-to-t from-transparent via-white/10 to-white/50" />
            </div>

            {/* Bottom-Left Aluminum Cube with rounded edges (spacious, zero overlap) */}
            <div className="absolute left-10 sm:left-12 bottom-8 sm:bottom-10 w-18 h-18 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 shadow-[0_22px_40px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.3)] border border-white/60 flex items-center justify-center backdrop-blur-sm">
              <div className="w-full h-full rounded-2xl bg-gradient-to-t from-transparent via-white/10 to-white/40" />
            </div>

            {/* Bottom-Right Aluminum Cube with rounded edges (spacious, zero overlap) */}
            <div className="absolute right-10 sm:right-12 bottom-8 sm:bottom-10 w-18 h-18 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 shadow-[0_22px_40px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.3)] border border-white/60 flex items-center justify-center backdrop-blur-sm">
              <div className="w-full h-full rounded-2xl bg-gradient-to-t from-transparent via-white/10 to-white/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Fallback indicator info pill */}
      <div className="absolute bottom-6 left-6 z-20 flex flex-wrap items-center gap-2">
        <div className="px-3 py-1.5 rounded-md bg-stone-900/90 border border-stone-700/60 text-stone-200 text-xs flex items-center gap-2 backdrop-blur-md shadow-lg">
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-[11px] text-amber-300">STATIC FALLBACK ACTIVE</span>
          <span className="text-stone-400 hidden sm:inline">|</span>
          <span className="text-stone-400 text-[11px] hidden sm:inline">
            {reason || 'Zero WebGL GPU load mode'}
          </span>
        </div>

        {onSwitchTo3D && (
          <button
            type="button"
            onClick={onSwitchTo3D}
            className="px-3 py-1.5 rounded-md bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-xs font-medium transition cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Force 3D WebGL</span>
          </button>
        )}
      </div>
    </div>
  );
}

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
        {/* ENLARGED FLOATING TERRACOTTA GRADIENT FLAT SPACE */}
        <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] lg:w-[620px] lg:h-[620px] rounded-full bg-[radial-gradient(circle,rgba(224,107,72,0.95)_0%,rgba(184,84,56,0.8)_35%,rgba(94,32,18,0.5)_60%,transparent_75%)] pointer-events-none transform -rotate-x-70 translate-y-20 sm:translate-y-24" />

        {/* 4 STYLIZED ROBOT HEADS (CSS 3D / Flat Silhouette Representation) */}
        <div
          className="relative z-10 w-72 h-72 sm:w-96 sm:h-96 translate-x-4 sm:translate-x-6"
          style={{
            perspective: '1000px',
          }}
        >
          <div
            className="w-full h-full relative animate-[spin_45s_linear_infinite]"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(15deg) rotateY(-20deg)',
            }}
          >
            {/* Robot Head 1 — Center Front Dominant */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-32 sm:w-32 sm:h-36 rounded-2xl bg-gradient-to-br from-stone-700 via-stone-800 to-stone-950 border border-stone-600/80 shadow-[0_25px_50px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)] flex flex-col justify-between p-3.5 z-20 backdrop-blur-sm">
              {/* Ear pods */}
              <div className="absolute -left-2 top-8 w-2 h-6 rounded-l-md bg-stone-700 border-l border-stone-500" />
              <div className="absolute -right-2 top-8 w-2 h-6 rounded-r-md bg-stone-700 border-r border-stone-500" />
              {/* Glowing Terracotta Eyes */}
              <div className="flex items-center justify-center gap-3 pt-3">
                <div className="w-5 h-2 rounded-sm bg-[#ff6e4a] shadow-[0_0_12px_#ff6e4a]" />
                <div className="w-5 h-2 rounded-sm bg-[#ff6e4a] shadow-[0_0_12px_#ff6e4a]" />
              </div>
              {/* Seamed Jaw with rivets */}
              <div className="w-full h-7 rounded-lg bg-stone-900 border-t border-stone-700/80 flex items-center justify-around px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
              </div>
            </div>

            {/* Robot Head 2 — Top Left */}
            <div className="absolute left-2 sm:left-4 top-2 sm:top-4 w-22 h-26 sm:w-26 sm:h-30 rounded-xl bg-gradient-to-br from-stone-700 via-stone-850 to-stone-950 border border-stone-600/60 shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between p-2.5 z-10 opacity-90">
              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="w-4 h-1.5 rounded-sm bg-[#ff6e4a] shadow-[0_0_8px_#ff6e4a]" />
                <div className="w-4 h-1.5 rounded-sm bg-[#ff6e4a] shadow-[0_0_8px_#ff6e4a]" />
              </div>
              <div className="w-full h-5 rounded-md bg-stone-900 border-t border-stone-700/80" />
            </div>

            {/* Robot Head 3 — Lower Left */}
            <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 w-24 h-28 sm:w-28 sm:h-32 rounded-xl bg-gradient-to-br from-stone-750 via-stone-850 to-stone-950 border border-stone-600/60 shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between p-3 z-15 opacity-95">
              <div className="flex items-center justify-center gap-2.5 pt-2">
                <div className="w-4 h-1.5 rounded-sm bg-[#ff6e4a] shadow-[0_0_8px_#ff6e4a]" />
                <div className="w-4 h-1.5 rounded-sm bg-[#ff6e4a] shadow-[0_0_8px_#ff6e4a]" />
              </div>
              <div className="w-full h-5 rounded-md bg-stone-900 border-t border-stone-700/80" />
            </div>

            {/* Robot Head 4 — Back Right */}
            <div className="absolute right-4 sm:right-6 top-6 sm:top-8 w-20 h-24 sm:w-24 sm:h-28 rounded-xl bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 border border-stone-700/50 shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between p-2 z-5 opacity-80">
              <div className="flex items-center justify-center gap-2 pt-1.5">
                <div className="w-3.5 h-1.5 rounded-sm bg-[#ff6e4a] shadow-[0_0_8px_#ff6e4a]" />
                <div className="w-3.5 h-1.5 rounded-sm bg-[#ff6e4a] shadow-[0_0_8px_#ff6e4a]" />
              </div>
              <div className="w-full h-4 rounded-md bg-stone-900 border-t border-stone-750/70" />
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

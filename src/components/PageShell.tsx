import React, { useState } from 'react';
import {
  ChevronRight,
  WifiOff,
  Building,
  TrendingUp,
  Sliders,
  Check,
  Globe2,
  PhoneCall,
  Clock,
  ArrowDownRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { CONTENT, Language } from '../content/copy';

interface PageShellProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenDemo: () => void;
  isHydrated: boolean;
  activeMode: '3d' | 'fallback';
  hero3DNode?: React.ReactNode;
}

export default function PageShell({
  lang,
  onLanguageChange,
  onOpenDemo,
  isHydrated,
  activeMode,
  hero3DNode,
}: PageShellProps) {
  const content = CONTENT[lang];
  const isRTL = lang === 'ar';

  const [activeVertical, setActiveVertical] = useState('gym');
  const [activeKpiFilter, setActiveKpiFilter] = useState<'all' | 'sales' | 'staff' | 'inventory'>('all');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentVertical =
    content.verticals.items.find((v) => v.id === activeVertical) || content.verticals.items[0];

  return (
    <div
      className="relative w-full text-stone-200 bg-[#0c0e12] selection:bg-[#b85438]/40 selection:text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ------------------------------------------------------------- */}
      {/* TOP STICKY NAVIGATION BAR */}
      {/* ------------------------------------------------------------- */}
      <header
        id="atrium-nav"
        className="fixed top-0 left-0 right-0 z-40 px-5 sm:px-8 py-3.5 flex items-center justify-between border-b border-stone-800/80 bg-[#0c0e12]/90 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          {/* Logo Mark: Terracotta & Brushed Aluminum Geometry */}
          <div className="w-8 h-8 rounded-sm bg-[#181a20] border border-stone-700/80 flex items-center justify-center relative overflow-hidden shadow-inner">
            <div className="w-4 h-4 rotate-45 bg-[#b85438] absolute -bottom-1 -right-1" />
            <div className="w-3.5 h-3.5 rotate-45 border border-stone-300 relative z-10" />
          </div>
          <div>
            <span className="font-editorial tracking-wider text-base font-bold text-stone-100 uppercase">
              ATRIUM
            </span>
            <span className="text-[10px] font-mono text-stone-500 block leading-none">
              BY STOA STUDIO
            </span>
          </div>
        </div>

        {/* Desktop Anchor Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-6 text-xs font-medium text-stone-400"
        >
          <button
            type="button"
            onClick={() => scrollTo('section-problem')}
            className="hover:text-stone-100 transition cursor-pointer"
          >
            {content.nav.problem}
          </button>
          <button
            type="button"
            onClick={() => scrollTo('section-shift')}
            className="hover:text-stone-100 transition cursor-pointer"
          >
            {content.nav.shift}
          </button>
          <button
            type="button"
            onClick={() => scrollTo('section-how-it-works')}
            className="hover:text-stone-100 transition cursor-pointer"
          >
            {content.nav.howItWorks}
          </button>
          <button
            type="button"
            onClick={() => scrollTo('section-verticals')}
            className="hover:text-stone-100 transition cursor-pointer"
          >
            {content.nav.verticals}
          </button>
          <button
            type="button"
            onClick={() => scrollTo('section-differentiation')}
            className="hover:text-stone-100 transition cursor-pointer"
          >
            {content.nav.whyAtrium}
          </button>
          <button
            type="button"
            onClick={() => scrollTo('section-pricing')}
            className="hover:text-stone-100 transition cursor-pointer"
          >
            {content.nav.pricing}
          </button>
        </nav>

        {/* Action Controls & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-md p-0.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded transition cursor-pointer ${
                lang === 'en' ? 'bg-[#b85438] text-white font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('fr')}
              className={`px-2 py-1 rounded transition cursor-pointer ${
                lang === 'fr' ? 'bg-[#b85438] text-white font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ar')}
              className={`px-2 py-1 rounded transition cursor-pointer ${
                lang === 'ar' ? 'bg-[#b85438] text-white font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              عربي
            </button>
          </div>

          {/* Primary Navbar Action */}
          <button
            type="button"
            onClick={onOpenDemo}
            className="px-3.5 py-1.5 rounded-md bg-[#b85438] hover:bg-[#a04830] text-white font-medium text-xs tracking-wide transition shadow-sm cursor-pointer"
          >
            {content.nav.bookDemo}
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1 — HERO */}
      {/* Job: Stop the scroll, state the promise in one sentence, no jargon */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-hero"
        className="relative w-full h-[150vh] bg-[#06070a]"
      >
        {/* Sticky Background Container for the 3D Hero Scene (Full Viewport) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-none">
          {hero3DNode}
        </div>

        {/* Hero Content Overlay Layer */}
        <div className="absolute top-0 left-0 right-0 h-screen z-10 p-6 sm:p-12 pt-32 sm:pt-36 max-w-7xl mx-auto flex flex-col justify-between pointer-events-none">
          <div className="max-w-xl pointer-events-auto">
            {/* Brand Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-stone-900/90 border border-stone-800 text-stone-300 text-[10px] sm:text-[11px] font-mono mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b85438] animate-pulse" />
              <span>{content.hero.badge}</span>
            </div>

            {/* Headline: One sentence naming the core outcome */}
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-100 leading-[1.12] mb-4">
              {content.hero.headline}
            </h1>

            {/* Subheadline: Naming who it's for and single biggest pain removed */}
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans max-w-lg mb-6">
              {content.hero.subheadline}
            </p>

            {/* ONE Primary CTA Button — No competing buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-5 py-3 rounded-md bg-[#b85438] hover:bg-[#a24830] text-white font-semibold text-xs tracking-wider uppercase transition shadow-xl shadow-[#b85438]/25 cursor-pointer flex items-center justify-center gap-2.5"
              >
                <Calendar className="w-4 h-4" />
                <span>{content.hero.ctaButton}</span>
              </button>

              <span className="text-[10px] sm:text-[11px] font-mono text-stone-500">
                15 min • No hardware required • WhatsApp follow-up
              </span>
            </div>
          </div>

          {/* Scroll Indicator Prompt */}
          <div className="pt-12 pb-4 flex items-center justify-between border-t border-stone-800/60 pointer-events-auto">
            <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400">
              <ArrowDownRight className="w-3.5 h-3.5 text-[#b85438]" />
              <span>{content.hero.scrollHint}</span>
            </div>
            <div className="text-[10px] font-mono text-stone-500 hidden sm:block">
              3D METALLIC &amp; TERRACOTTA ENGINE ACTIVE
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2 — THE PROBLEM (Before Atrium) */}
      {/* Job: Make the visitor say "yes, that's exactly my situation" */}
      {/* Visually minimal, text-forward, high contrast, pain is felt */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-problem"
        className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-[#090b0e]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-mono text-[#c85a3a] tracking-widest uppercase block mb-2">
              {content.problem.tag}
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-stone-100 leading-tight max-w-3xl">
              {content.problem.headline}
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              {content.problem.subline}
            </p>
          </div>

          {/* 4 Pain Statements Specific to SMB Reality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {content.problem.points.map((point, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-lg bg-stone-950/80 border border-stone-800/90 relative group hover:border-stone-700 transition"
              >
                <div className="text-xs font-mono text-stone-600 mb-3 font-semibold">
                  [ 0{index + 1} — THE BOTTLENECK ]
                </div>
                <h3 className="text-lg font-medium text-stone-200 mb-2.5">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3 — THE SHIFT (With Atrium) */}
      {/* Job: Mirror section 2's pain points 1-to-1 with the fix */}
      {/* Resolves the diamond cube unification metaphor */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-shift"
        className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-[#0d0f14]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase block mb-2">
              {content.shift.tag}
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-stone-100 leading-tight max-w-3xl">
              {content.shift.headline}
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              {content.shift.subline}
            </p>
          </div>

          {/* 4 Shift Resolutions (1-to-1 mirror) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {content.shift.points.map((point, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-lg bg-stone-900/40 border border-cyan-900/30 hover:border-cyan-700/50 transition relative overflow-hidden"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-3 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>[ 0{index + 1} — RESOLVED ]</span>
                </div>
                <h3 className="text-lg font-medium text-stone-100 mb-2.5">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Unification Visual Metaphor Callout */}
          <div className="mt-12 p-6 rounded-lg bg-stone-950/70 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rotate-45 bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.7)]" />
              <span>THE UNIFIED ATRIUM CORE: 4 scattered vectors resolve into 1 central truth.</span>
            </div>
            <button
              type="button"
              onClick={onOpenDemo}
              className="text-[#c85a3a] hover:text-stone-200 transition underline underline-offset-4 cursor-pointer"
            >
              See the unified system live →
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4 — HOW IT WORKS (3-4 Steps) */}
      {/* Job: Remove the "is this complicated to set up" fear */}
      {/* 1 short sentence + 1 supporting visual mock per step */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-how-it-works"
        className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-[#090b0e]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center sm:text-left">
            <span className="text-xs font-mono text-[#c85a3a] tracking-widest uppercase block mb-2">
              {content.howItWorks.tag}
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-stone-100 leading-tight max-w-3xl">
              {content.howItWorks.headline}
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              {content.howItWorks.subline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.howItWorks.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-lg bg-stone-950/80 border border-stone-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded bg-stone-900 border border-stone-800 text-[#b85438] font-mono text-xs font-bold flex items-center justify-center mb-4">
                    {step.stepNumber}
                  </div>
                  <h3 className="text-sm font-semibold text-stone-100 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed mb-6 font-sans">
                    {step.caption}
                  </p>
                </div>

                {/* Supporting Visual / Mockup Wireframe */}
                <div className="rounded-md bg-stone-900/90 border border-stone-800/90 p-3 font-mono text-[10px]">
                  {step.mockType === 'setup' && (
                    <div className="space-y-1.5 text-stone-400">
                      <div className="text-[#c85a3a] font-semibold">Select Business:</div>
                      <div className="p-1 rounded bg-[#b85438]/20 border border-[#b85438]/50 text-stone-100">
                        ✓ Gym &amp; Fitness Center
                      </div>
                      <div className="p-1 rounded bg-stone-950 text-stone-500">Salon &amp; Spa</div>
                    </div>
                  )}

                  {step.mockType === 'config' && (
                    <div className="space-y-1.5 text-stone-400">
                      <div className="text-cyan-400 font-semibold">Auto-Generated Tools:</div>
                      <div className="flex items-center justify-between text-stone-300">
                        <span>Turnstile Control</span>
                        <span className="text-emerald-400">ACTIVE</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-300">
                        <span>Member Subscriptions</span>
                        <span className="text-emerald-400">ACTIVE</span>
                      </div>
                    </div>
                  )}

                  {step.mockType === 'operations' && (
                    <div className="space-y-1.5 text-stone-400">
                      <div className="text-amber-400 font-semibold">Live Floor Desk:</div>
                      <div className="p-1 rounded bg-stone-950 flex justify-between text-stone-200">
                        <span>Check-in #418 (Amine K.)</span>
                        <span className="text-emerald-400">VALID</span>
                      </div>
                      <div className="p-1 rounded bg-stone-950 flex justify-between text-stone-200">
                        <span>New Sub: 6 Months</span>
                        <span className="text-stone-300">18,000 DZD</span>
                      </div>
                    </div>
                  )}

                  {step.mockType === 'branches' && (
                    <div className="space-y-1.5 text-stone-400">
                      <div className="text-emerald-400 font-semibold">Consolidated Today:</div>
                      <div className="flex justify-between text-stone-200">
                        <span>Algiers (Didouche)</span>
                        <span className="font-mono">142,500 DZD</span>
                      </div>
                      <div className="flex justify-between text-stone-200">
                        <span>Oran (Akid Lotfi)</span>
                        <span className="font-mono">98,200 DZD</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5 — BUILT FOR YOUR BUSINESS (Vertical Proof) */}
      {/* Job: Prove this isn't generic software — shows vertical recognition */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-verticals"
        className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-[#0e1015]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono text-amber-500 tracking-widest uppercase block mb-2">
              {content.verticals.tag}
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-stone-100 leading-tight max-w-3xl">
              {content.verticals.headline}
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              {content.verticals.subline}
            </p>
          </div>

          {/* Vertical Selector Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-4 mb-8">
            {content.verticals.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveVertical(item.id)}
                className={`px-4 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer font-mono ${
                  activeVertical === item.id
                    ? 'bg-[#b85438] text-white shadow-md'
                    : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Active Vertical Display Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 rounded-xl bg-stone-950/80 border border-stone-800">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-900 text-stone-300 font-mono text-[11px] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b85438]" />
                  <span>INDUSTRY SPECIFIC WORKFLOW</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-light text-stone-100 mb-4">
                  {currentVertical.name}
                </h3>

                <p className="text-sm text-stone-300 leading-relaxed mb-6 font-sans">
                  {currentVertical.featureLine}
                </p>

                <div className="p-4 rounded-lg bg-stone-900/60 border border-stone-800/80 mb-6">
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1">
                    PRIMARY VERIFIABLE OUTCOME
                  </div>
                  <div className="text-lg font-semibold text-emerald-400 font-mono">
                    {currentVertical.metricPreview}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="px-5 py-2.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition border border-stone-700 cursor-pointer"
                >
                  Schedule {currentVertical.name} Walkthrough →
                </button>
              </div>
            </div>

            {/* Simulated Live Floor Dashboard Mock */}
            <div className="lg:col-span-6 rounded-lg bg-[#111318] border border-stone-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800/80 text-xs font-mono text-stone-400">
                  <span>ATRIUM FLOOR DESK // {currentVertical.name.toUpperCase()}</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    LIVE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {currentVertical.kpis.map((kpi, idx) => (
                    <div key={idx} className="p-3 rounded bg-stone-900/80 border border-stone-800/70">
                      <div className="text-[10px] font-mono text-stone-500 truncate mb-1">
                        {kpi.label}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-stone-100 font-mono">
                        {kpi.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="text-[10px] text-stone-500 uppercase">Recent Floor Events</div>
                  <div className="p-2 rounded bg-stone-900/50 border border-stone-800/50 flex items-center justify-between text-stone-300 text-[11px]">
                    <span>14:32 — Counter Checkout #1094</span>
                    <span className="text-emerald-400">+4,200 DZD</span>
                  </div>
                  <div className="p-2 rounded bg-stone-900/50 border border-stone-800/50 flex items-center justify-between text-stone-300 text-[11px]">
                    <span>14:28 — Auto Subscription Alert</span>
                    <span className="text-amber-400">SMS Sent</span>
                  </div>
                  <div className="p-2 rounded bg-stone-900/50 border border-stone-800/50 flex items-center justify-between text-stone-300 text-[11px]">
                    <span>14:15 — Till Cash Drop Logged</span>
                    <span className="text-stone-400">Verified</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-800 text-[10px] font-mono text-stone-500 flex justify-between">
                <span>Hardware: Touch Screen / Windows / macOS / iPad</span>
                <span>Mode: Offline-First SQLite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6 — WHAT MAKES IT DIFFERENT (Differentiation) */}
      {/* 3 differentiation pillars with concrete details */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-differentiation"
        className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-[#090b0e]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase block mb-2">
              {content.differentiation.tag}
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-stone-100 leading-tight max-w-3xl">
              {content.differentiation.headline}
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              {content.differentiation.subline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.differentiation.pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="p-8 rounded-lg bg-stone-950/80 border border-stone-800 hover:border-stone-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-[#b85438] font-bold mb-4">
                    PILLAR 0{pillar.number}
                  </div>
                  <h3 className="text-xl font-medium text-stone-100 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6 font-sans">
                    {pillar.explanation}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 text-xs font-mono text-stone-400 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pillar.proofDetail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 7 — DASHBOARD / KPI SHOWCASE */}
      {/* Job: Sell the "feels like a real company" fantasy */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-dashboard"
        className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-[#0d0f14]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase block mb-2">
              {content.dashboard.tag}
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-stone-100 leading-tight max-w-3xl">
              {content.dashboard.headline}
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              {content.dashboard.subline}
            </p>
          </div>

          {/* Large Interactive KPI Executive Dashboard Mockup */}
          <div className="rounded-xl bg-[#111318] border border-stone-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-stone-800/80 gap-4">
              <div>
                <div className="text-base font-semibold text-stone-100 font-mono">
                  EXECUTIVE SUMMARY // CONSOLIDATED NETWORK
                </div>
                <div className="text-xs text-stone-400 font-sans">
                  {content.dashboard.caption}
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded p-1 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveKpiFilter('all')}
                  className={`px-2.5 py-1 rounded transition cursor-pointer ${
                    activeKpiFilter === 'all' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  All Vitals
                </button>
                <button
                  type="button"
                  onClick={() => setActiveKpiFilter('sales')}
                  className={`px-2.5 py-1 rounded transition cursor-pointer ${
                    activeKpiFilter === 'sales' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Cash &amp; Sales
                </button>
                <button
                  type="button"
                  onClick={() => setActiveKpiFilter('staff')}
                  className={`px-2.5 py-1 rounded transition cursor-pointer ${
                    activeKpiFilter === 'staff' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Staff Comms
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-5 rounded-lg bg-stone-900/70 border border-stone-800">
                <div className="text-xs font-mono text-stone-500 mb-1">TODAY&apos;S NET REVENUE</div>
                <div className="text-2xl font-bold font-mono text-stone-100">
                  240,700 <span className="text-xs font-normal text-stone-400">DZD</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-2">
                  ↑ +18.4% vs yesterday
                </div>
              </div>

              <div className="p-5 rounded-lg bg-stone-900/70 border border-stone-800">
                <div className="text-xs font-mono text-stone-500 mb-1">CASH IN TILL (CURRENT)</div>
                <div className="text-2xl font-bold font-mono text-stone-100">
                  86,400 <span className="text-xs font-normal text-stone-400">DZD</span>
                </div>
                <div className="text-[11px] text-stone-400 font-mono mt-2">
                  Zero discrepancy across 3 registers
                </div>
              </div>

              <div className="p-5 rounded-lg bg-stone-900/70 border border-stone-800">
                <div className="text-xs font-mono text-stone-500 mb-1">ACTIVE CUSTOMERS ON FLOOR</div>
                <div className="text-2xl font-bold font-mono text-[#c85a3a]">
                  54 <span className="text-xs font-normal text-stone-400">people</span>
                </div>
                <div className="text-[11px] text-stone-400 font-mono mt-2">
                  Peak window: 17:00 – 20:30
                </div>
              </div>

              <div className="p-5 rounded-lg bg-stone-900/70 border border-stone-800">
                <div className="text-xs font-mono text-stone-500 mb-1">AUTOMATED PAYROLL OWED</div>
                <div className="text-2xl font-bold font-mono text-stone-100">
                  34,200 <span className="text-xs font-normal text-stone-400">DZD</span>
                </div>
                <div className="text-[11px] text-cyan-400 font-mono mt-2">
                  Tallied in real-time from services
                </div>
              </div>
            </div>

            {/* Consolidated Location Breakdown Table */}
            <div className="rounded-lg bg-stone-950/60 border border-stone-800/80 p-4 font-mono text-xs overflow-x-auto">
              <div className="text-[11px] text-stone-500 uppercase tracking-wider mb-3">
                Live Branch Telemetry
              </div>
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-500 text-[10px]">
                    <th className="pb-2">BRANCH LOCATION</th>
                    <th className="pb-2">FLOOR STATUS</th>
                    <th className="pb-2">NETWORK SYNC</th>
                    <th className="pb-2 text-right">DAILY GROSS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-900 text-stone-300">
                  <tr>
                    <td className="py-2.5 font-semibold text-stone-100">Branch 01 — Algiers Center</td>
                    <td className="py-2.5 text-emerald-400">● 28 Active Clients</td>
                    <td className="py-2.5 text-stone-400">Synchronized (1s ago)</td>
                    <td className="py-2.5 text-right font-mono font-bold">142,500 DZD</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-stone-100">Branch 02 — Oran Waterfront</td>
                    <td className="py-2.5 text-emerald-400">● 19 Active Clients</td>
                    <td className="py-2.5 text-stone-400">Synchronized (3s ago)</td>
                    <td className="py-2.5 text-right font-mono font-bold">76,200 DZD</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-stone-100">Branch 03 — Blida Express</td>
                    <td className="py-2.5 text-amber-400">● 7 Active Clients</td>
                    <td className="py-2.5 text-stone-400">Offline SQLite Buffer (Ready)</td>
                    <td className="py-2.5 text-right font-mono font-bold">22,000 DZD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 8 — PRICING */}
      {/* Job: Remove ambiguity, reduce decision friction */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-pricing"
        className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 border-t border-stone-800/80 bg-[#090b0e]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-xs font-mono text-[#c85a3a] tracking-widest uppercase block mb-2">
              {content.pricing.tag}
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-light text-stone-100 leading-tight max-w-2xl mx-auto">
              {content.pricing.headline}
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
              {content.pricing.subline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {content.pricing.tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-xl border flex flex-col justify-between transition ${
                  tier.highlighted
                    ? 'bg-[#12151d] border-[#b85438] shadow-2xl relative'
                    : 'bg-stone-950/70 border-stone-800'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#b85438] text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-2">
                    {tier.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold font-mono text-stone-100">{tier.price}</span>
                    <span className="text-xs font-mono text-stone-500">/ {tier.period}</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed mb-6 font-sans min-h-[36px]">
                    {tier.desc}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-stone-800/80 mb-8">
                    {tier.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-2.5 text-xs text-stone-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenDemo}
                  className={`w-full py-3 px-4 rounded-lg font-mono text-xs font-semibold tracking-wider transition cursor-pointer ${
                    tier.highlighted
                      ? 'bg-[#b85438] hover:bg-[#a24830] text-white shadow-lg shadow-[#b85438]/25'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700'
                  }`}
                >
                  {tier.ctaText}
                </button>
              </div>
            ))}
          </div>

          {/* Risk Reversal Assurance Banner */}
          <div className="p-6 rounded-lg bg-stone-950/90 border border-stone-800/80 text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>ZERO RISK GUARANTEE</span>
            </div>
            <p className="text-sm text-stone-200 font-medium font-sans">
              {content.pricing.riskReversal}
            </p>
            <p className="text-xs text-stone-500 font-mono">
              {content.pricing.billingNote}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 9 — SOCIAL PROOF */}
      {/* Job: Borrow trust with authentic founder-story trust line */}
      {/* (No fabricated quotes or logos as mandated by brief) */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-proof"
        className="relative z-20 py-20 px-6 sm:px-12 border-t border-stone-800/80 bg-[#0d0f14]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono text-[#c85a3a] tracking-widest uppercase block mb-3">
            {content.socialProof.tag}
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl font-light text-stone-100 leading-snug mb-8">
            {content.socialProof.headline}
          </h2>

          <div className="p-8 sm:p-10 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-300 italic font-serif text-base sm:text-lg leading-relaxed shadow-xl max-w-3xl mx-auto mb-6">
            {content.socialProof.founderNote}
          </div>

          <div className="text-xs font-mono text-stone-500">
            {content.socialProof.location}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 10 — FINAL CTA */}
      {/* Job: One last, low-friction push — distraction-free */}
      {/* ------------------------------------------------------------- */}
      <section
        id="section-final-cta"
        className="relative z-20 py-28 sm:py-36 px-6 sm:px-12 border-t border-stone-800/80 bg-[#090b0e] text-center"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-stone-100 leading-tight">
            {content.finalCta.headline}
          </h2>
          <p className="text-sm sm:text-base text-stone-400 font-sans leading-relaxed">
            {content.finalCta.subline}
          </p>

          <div className="pt-4">
            <button
              type="button"
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-md bg-[#b85438] hover:bg-[#a24830] text-white font-semibold text-xs tracking-wider uppercase transition shadow-2xl shadow-[#b85438]/30 cursor-pointer inline-flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-4 h-4" />
              <span>{content.finalCta.ctaButton}</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-stone-500 pt-2">
            Instant scheduling • Response within 2 business hours • WhatsApp direct
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 11 — FOOTER */}
      {/* Standard: contact info, social links, legal, language toggle */}
      {/* ------------------------------------------------------------- */}
      <footer className="relative z-20 border-t border-stone-800/80 py-16 px-6 sm:px-12 bg-[#07080a] text-xs font-mono text-stone-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-xs bg-[#b85438] flex items-center justify-center text-white font-bold text-[10px]">
                A
              </div>
              <span className="font-editorial text-sm font-bold text-stone-100 tracking-wider">
                ATRIUM
              </span>
            </div>
            <p className="text-stone-400 text-xs font-sans max-w-sm leading-relaxed">
              {content.footer.tagline}
            </p>
            <div className="text-[11px] text-stone-500">{content.footer.byline}</div>
          </div>

          {/* Contact Details */}
          <div>
            <div className="text-stone-200 font-semibold mb-3">{content.footer.contactHeading}</div>
            <div className="space-y-2 text-stone-400">
              <div>Email: {content.footer.contactEmail}</div>
              <div>Phone: {content.footer.phone}</div>
              <div>Location: Algiers, Algeria</div>
              <div>Response: Direct WhatsApp line</div>
            </div>
          </div>

          {/* Language & Regional Switcher */}
          <div>
            <div className="text-stone-200 font-semibold mb-3">Language / اللغة</div>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`block hover:text-stone-100 transition cursor-pointer ${
                  lang === 'en' ? 'text-[#b85438] font-bold' : 'text-stone-400'
                }`}
              >
                English (International)
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`block hover:text-stone-100 transition cursor-pointer ${
                  lang === 'fr' ? 'text-[#b85438] font-bold' : 'text-stone-400'
                }`}
              >
                Français (Algérie / Maghreb)
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ar')}
                className={`block hover:text-stone-100 transition cursor-pointer ${
                  lang === 'ar' ? 'text-[#b85438] font-bold' : 'text-stone-400'
                }`}
              >
                العربية (الجزائر والشرق الأوسط)
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600 gap-4">
          <div>{content.footer.copyright}</div>
          <div className="flex items-center gap-4">
            <span>Built by Stoa Studio</span>
            <span>•</span>
            <span>Desktop &amp; Cloud Hybrid</span>
            <span>•</span>
            <span>Offline-First Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

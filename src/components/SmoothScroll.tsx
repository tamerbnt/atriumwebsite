import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import Lenis, { LenisOptions, ScrollToOptions } from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: ScrollToOptions
  ) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useLenis = (onScroll?: (lenis: Lenis) => void) => {
  const context = useContext(SmoothScrollContext);

  useEffect(() => {
    if (!context.lenis || !onScroll) return;

    const handler = (e: Lenis) => {
      onScroll(e);
    };

    context.lenis.on('scroll', handler);
    return () => {
      context.lenis?.off('scroll', handler);
    };
  }, [context.lenis, onScroll]);

  return context;
};

interface SmoothScrollProps {
  children: ReactNode;
  options?: Partial<LenisOptions>;
  className?: string;
}

export function SmoothScroll({
  children,
  options = {},
  className = '',
}: SmoothScrollProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Create customized Lenis instance calibrated for cinematic GSAP Parallax
    const lenis = new Lenis({
      // We manually drive Lenis via GSAP ticker for 100% lockstep frame sync
      autoRaf: false,
      smoothWheel: !prefersReducedMotion,
      syncTouch: false,
      // Buttery smooth lerp inertia tuned for physical spatial parallax
      lerp: prefersReducedMotion ? 1 : 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.25,
      infinite: false,
      anchors: true,
      respectReducedMotion: true,
      ...options,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // 1. Synchronize Lenis scroll position with GSAP ScrollTrigger updates
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // 2. Drive Lenis's animation frame updates from GSAP's high-precision internal ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // 3. Disable GSAP ticker lagSmoothing to prevent stutter or frame-skipping
    // during compute-heavy WebGL render loop or scrubbed parallax animations
    gsap.ticker.lagSmoothing(0);

    // 4. Recalculate ScrollTrigger start/end coordinates once Lenis dimensions are ready
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      scrollToOptions?: ScrollToOptions
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: -70,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          ...scrollToOptions,
        });
      } else {
        // Fallback if Lenis is not available
        if (typeof target === 'string') {
          const el = target.startsWith('#')
            ? document.getElementById(target.slice(1))
            : document.querySelector(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' });
        }
      }
    },
    []
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const contextValue = useRef<SmoothScrollContextValue>({
    lenis: null,
    scrollTo,
    stop,
    start,
  });

  contextValue.current.lenis = lenisInstance;
  contextValue.current.scrollTo = scrollTo;
  contextValue.current.stop = stop;
  contextValue.current.start = start;

  return (
    <SmoothScrollContext.Provider value={contextValue.current}>
      <div className={`smooth-scroll-wrapper ${className}`}>{children}</div>
    </SmoothScrollContext.Provider>
  );
}

export default SmoothScroll;

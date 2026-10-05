import React, { useEffect, useRef, useState } from 'react';

interface CosmicBackgroundProps {
  /**
   * 'login' shows a subtle distant Earth/planet silhouette on the horizon.
   * 'dashboard' shows balanced deep space stars + soft nebula.
   * 'test' renders a calm, ultra-serene slow starfield for deep focus.
   */
  mode?: 'login' | 'dashboard' | 'test';
  reducedMotionOverride?: boolean;
}

interface StarParticle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vx: number;
  vy: number;
  color: string;
  isBrightDust: boolean;
}

const STAR_COLORS = [
  '248, 250, 252', // Crisp white
  '186, 230, 253', // Soft cyan-white
  '221, 214, 254', // Subtle violet-white
  '125, 211, 252', // Cyan glow dust
];

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  mode = 'dashboard',
  reducedMotionOverride = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isReducedMotion = prefersReducedMotion || reducedMotionOverride;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let lastFrameTime = performance.now();

    // Target ~36 FPS on mobile to save battery & GPU, ~60 FPS on desktop
    const isMobileViewport = width < 768;
    const frameInterval = isMobileViewport ? 1000 / 36 : 1000 / 60;

    // Responsive particle density (Section 40, 44, 45):
    // Desktop (>=1024px): ~95 stars
    // Tablet (768-1023px): ~55 stars
    // Mobile (<768px): ~28 stars
    const getParticleCount = (w: number) => {
      const base = w >= 1024 ? 95 : w >= 768 ? 55 : 28;
      return mode === 'test' ? Math.floor(base * 0.75) : base;
    };

    let stars: StarParticle[] = [];

    const initParticles = (w: number, h: number) => {
      const count = getParticleCount(w);
      const speedMultiplier = mode === 'test' ? 0.35 : 1;

      stars = Array.from({ length: count }, (_, idx) => {
        const isBrightDust = idx % 8 === 0;
        const radius = isBrightDust
          ? Math.random() * 1.4 + 1.1
          : Math.random() * 1.0 + 0.4;
        const baseAlpha = isBrightDust
          ? Math.random() * 0.35 + 0.45
          : Math.random() * 0.45 + 0.18;

        return {
          x: Math.random() * w,
          y: Math.random() * h,
          radius,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: (Math.random() * 0.0012 + 0.0004) * speedMultiplier,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.08 * speedMultiplier,
          vy: (-Math.random() * 0.12 - 0.03) * speedMultiplier,
          color: STAR_COLORS[idx % STAR_COLORS.length],
          isBrightDust,
        };
      });
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const renderFrame = (now: number) => {
      const elapsed = now - lastFrameTime;

      if (elapsed >= frameInterval || isReducedMotion) {
        lastFrameTime = now - (elapsed % frameInterval);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];

          if (!isReducedMotion) {
            s.x += s.vx;
            s.y += s.vy;

            // Wrap around screen edges seamlessly
            if (s.y < -10) s.y = height + 10;
            if (s.y > height + 10) s.y = -10;
            if (s.x < -10) s.x = width + 10;
            if (s.x > width + 10) s.x = -10;

            s.alpha =
              s.baseAlpha +
              Math.sin(now * s.twinkleSpeed + s.twinklePhase) * 0.18;
          }

          const clampedAlpha = Math.max(0.08, Math.min(0.9, s.alpha));

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color}, ${clampedAlpha})`;
          ctx.fill();

          // Soft halo only for bright dust particles on non-mobile or login
          if (s.isBrightDust && (!isMobileViewport || mode === 'login')) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${s.color}, ${clampedAlpha * 0.16})`;
            ctx.fill();
          }
        }
      }

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    animationFrameId = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, isReducedMotion]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Base Deep Space Atmospheric Layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            mode === 'test'
              ? 'radial-gradient(ellipse at 50% 20%, #0B132B 0%, #060919 60%, #03050C 100%)'
              : 'radial-gradient(ellipse at 50% 0%, #0F172A 0%, #070B19 55%, #040611 100%)',
        }}
      />

      {/* Soft Nebula Glows — subdued in 'test' mode for maximum focus */}
      <div
        className={`absolute -top-32 -left-32 w-[38rem] h-[38rem] rounded-full pointer-events-none transition-opacity duration-700 ${
          mode === 'test' ? 'opacity-15' : 'opacity-35'
        } ${!isReducedMotion ? 'animate-pulse-glow' : ''}`}
        style={{
          background:
            'radial-gradient(circle, rgba(88, 28, 135, 0.28) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 70%)',
        }}
      />

      <div
        className={`absolute top-1/4 -right-40 w-[34rem] h-[34rem] rounded-full pointer-events-none transition-opacity duration-700 ${
          mode === 'test' ? 'opacity-10' : 'opacity-30'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 72%)',
        }}
      />

      {/* Distant Galaxy Swirl Hint */}
      {mode !== 'test' && (
        <div
          className="absolute bottom-16 left-12 md:left-24 w-64 h-32 opacity-20 pointer-events-none rotate-[-18deg]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.24) 0%, rgba(56, 189, 248, 0.09) 42%, transparent 75%)',
          }}
        />
      )}

      {/* Subtle Planet Elements — Prominent on Login, Delicate in Dashboard */}
      {mode === 'login' && (
        <>
          {/* Distant Earth / Exoplanet Horizon Silhouette at Bottom */}
          <div
            className="absolute -bottom-[42vh] left-1/2 -translate-x-1/2 w-[130vw] max-w-[1400px] h-[62vh] rounded-[100%] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, #09152E 0%, #040814 55%, #02040A 100%)',
              boxShadow:
                '0 -12px 60px -8px rgba(56, 189, 248, 0.28), inset 0 6px 28px rgba(125, 211, 252, 0.32)',
              borderTop: '1px solid rgba(125, 211, 252, 0.35)',
            }}
          />
          {/* Distant Ringed Planet Silhouette in Upper Right */}
          <div
            className={`hidden sm:block absolute top-16 right-[12%] w-28 h-28 rounded-full opacity-40 ${
              !isReducedMotion ? 'animate-float-slow' : ''
            }`}
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.35), rgba(15, 23, 42, 0.95) 70%)',
              boxShadow: 'inset -6px -6px 16px rgba(2, 6, 23, 0.9), 0 0 24px rgba(56, 189, 248, 0.12)',
            }}
          >
            {/* Planetary Ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-10 rounded-full border border-cyan-300/20 rotate-[-22deg]"
              style={{
                boxShadow: '0 0 12px rgba(56, 189, 248, 0.1)',
              }}
            />
          </div>
        </>
      )}

      {mode === 'dashboard' && (
        <div
          className="hidden lg:block absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(56, 189, 248, 0.24), rgba(15, 23, 42, 0.9) 75%)',
            border: '1px solid rgba(125, 211, 252, 0.15)',
          }}
        />
      )}

      {/* Lightweight HTML5 Canvas Starfield & Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

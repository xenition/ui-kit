import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';

export type ParticleMood = 'ember' | 'snow' | 'fireflies' | 'sparks';

export interface ParticleFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Particle character: rising embers, falling snow, blinking fireflies, or fast sparks. */
  mood?: ParticleMood;
  /** Particle count (clamped 0–80; default 18). */
  density?: number;
  /** Layout seed — same seed, same sky on server, client, and e2e runs. */
  seed?: number;
}

/** Everything one particle needs; all values deterministic from (mood, index, seed). */
export interface ParticleSpec {
  /** Horizontal position, percent string. */
  x: string;
  /** Vertical anchor, percent string (fireflies' `top`). */
  y: string;
  /** Unitless 0–1 vertical factor (drives the reduced-motion rest pose). */
  yFactor: number;
  size: string;
  duration: string;
  delay: string;
  /** Horizontal drift over one cycle, px string. */
  drift: string;
  /** Peak opacity. */
  opacity: number;
}

const GOLDEN = 0.618033988749895;

interface MoodTuning {
  sizeMin: number;
  sizeMax: number;
  durMin: number;
  durMax: number;
  driftMax: number;
}

const TUNING: Record<ParticleMood, MoodTuning> = {
  ember: { sizeMin: 3, sizeMax: 8, durMin: 9, durMax: 18, driftMax: 120 },
  sparks: { sizeMin: 2, sizeMax: 4.5, durMin: 4, durMax: 9, driftMax: 60 },
  snow: { sizeMin: 2.5, sizeMax: 6.5, durMin: 12, durMax: 24, driftMax: 90 },
  fireflies: { sizeMin: 3, sizeMax: 5.5, durMin: 4, durMax: 9, driftMax: 24 },
};

const clampDensity = (density: number): number =>
  Math.max(0, Math.min(80, Math.round(density)));

/**
 * Pure, deterministic particle layout — golden-ratio low-discrepancy spread,
 * no `Math.random`, so server/client/e2e all see the same sky. Exported so
 * tests (and curious templates) can assert determinism directly.
 */
export function computeParticles(
  mood: ParticleMood,
  density: number,
  seed: number
): ParticleSpec[] {
  const tune = TUNING[mood];
  return Array.from({ length: clampDensity(density) }, (_, i) => {
    const t = ((i + seed) * GOLDEN) % 1;
    const u = ((i + seed + 7) * GOLDEN) % 1;
    const v = ((i + seed + 13) * GOLDEN) % 1;
    return {
      x: `${(t * 100).toFixed(1)}%`,
      y: `${(8 + v * 76).toFixed(1)}%`,
      yFactor: Number(v.toFixed(3)),
      size: `${(tune.sizeMin + u * (tune.sizeMax - tune.sizeMin)).toFixed(1)}px`,
      duration: `${(tune.durMin + t * (tune.durMax - tune.durMin)).toFixed(1)}s`,
      delay: `${(-u * (tune.durMin + tune.durMax)).toFixed(1)}s`,
      drift: `${((u - 0.5) * 2 * tune.driftMax).toFixed(0)}px`,
      opacity: Number((0.35 + t * 0.45).toFixed(2)),
    };
  });
}

/**
 * One sheet covers all moods: geometry/timing arrive per particle as inline
 * custom properties; every color is a `--xen-*` ramp gradient. Reduced motion
 * freezes each particle at a deterministic rest pose instead of animating.
 */
const PARTICLE_CSS = `
@keyframes xen-particle-rise {
  0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0; }
  6% { opacity: var(--xen-particle-o); }
  30% { transform: translate3d(calc(var(--xen-particle-drift) * 0.35), -26vh, 0) scale(0.9); opacity: calc(var(--xen-particle-o) * 0.85); }
  60% { transform: translate3d(calc(var(--xen-particle-drift) * 0.7), -52vh, 0) scale(0.6); opacity: calc(var(--xen-particle-o) * 0.5); }
  100% { transform: translate3d(var(--xen-particle-drift), -88vh, 0) scale(0.2); opacity: 0; }
}
@keyframes xen-particle-fall {
  0% { transform: translate3d(0, 0, 0); opacity: 0; }
  8% { opacity: var(--xen-particle-o); }
  50% { transform: translate3d(var(--xen-particle-drift), 55vh, 0); opacity: var(--xen-particle-o); }
  100% { transform: translate3d(calc(var(--xen-particle-drift) * 0.4), 110vh, 0); opacity: 0; }
}
@keyframes xen-particle-blink {
  0%, 100% { transform: translate3d(0, 0, 0); opacity: 0; }
  35% { opacity: var(--xen-particle-o); }
  50% { transform: translate3d(var(--xen-particle-drift), calc(var(--xen-particle-drift) * -0.4), 0); opacity: calc(var(--xen-particle-o) * 0.6); }
  70% { opacity: var(--xen-particle-o); }
}
[data-xen-particles] {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
[data-xen-particle] {
  position: absolute;
  left: var(--xen-particle-x);
  width: var(--xen-particle-s);
  height: var(--xen-particle-s);
  border-radius: 9999px;
  opacity: 0;
  filter: blur(0.4px);
  will-change: transform, opacity;
  animation-duration: var(--xen-particle-dur);
  animation-delay: var(--xen-particle-delay);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
[data-xen-particles="ember"] [data-xen-particle] {
  bottom: -2vh;
  background-image: radial-gradient(circle, var(--xen-accent-100) 0%, var(--xen-primary-400) 45%, transparent 72%);
  animation-name: xen-particle-rise;
}
[data-xen-particles="sparks"] [data-xen-particle] {
  bottom: -2vh;
  background-image: radial-gradient(circle, var(--xen-accent-200) 0%, var(--xen-accent-500) 50%, transparent 72%);
  animation-name: xen-particle-rise;
}
[data-xen-particles="snow"] [data-xen-particle] {
  top: -4vh;
  background-image: radial-gradient(circle, var(--xen-neutral-50) 0%, var(--xen-neutral-200) 55%, transparent 78%);
  animation-name: xen-particle-fall;
  animation-timing-function: ease-in-out;
}
[data-xen-particles="fireflies"] [data-xen-particle] {
  top: var(--xen-particle-y);
  background-image: radial-gradient(circle, var(--xen-accent-200) 0%, var(--xen-accent-400) 40%, transparent 70%);
  animation-name: xen-particle-blink;
  animation-timing-function: ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-particle] {
    animation: none !important;
    opacity: calc(var(--xen-particle-o) * 0.35);
  }
  [data-xen-particles="ember"] [data-xen-particle],
  [data-xen-particles="sparks"] [data-xen-particle] {
    transform: translate3d(calc(var(--xen-particle-drift) * 0.5), calc(var(--xen-particle-yn) * -70vh), 0);
  }
  [data-xen-particles="snow"] [data-xen-particle] {
    transform: translate3d(calc(var(--xen-particle-drift) * 0.3), calc(var(--xen-particle-yn) * 70vh), 0);
  }
}
`;

/**
 * Ambient particle field generalized from the restaurant template's ember
 * sky: four moods (`ember` | `snow` | `fireflies` | `sparks`), pure CSS
 * animation, deterministic golden-ratio layout (`seed`), token-only colors.
 * Decorative (`aria-hidden`, `pointer-events: none`) — position it inside a
 * `relative overflow-hidden` section; it renders `absolute inset-0`. Under
 * `prefers-reduced-motion` the particles freeze into a faint static scatter.
 */
export const ParticleField = React.forwardRef<HTMLDivElement, ParticleFieldProps>(
  function ParticleField(
    { mood = 'ember', density = 18, seed = 1, className, ...rest },
    ref
  ) {
    injectStyleOnce('xen-particle-styles', PARTICLE_CSS);
    const particles = React.useMemo(
      () => computeParticles(mood, density, seed),
      [mood, density, seed]
    );

    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-xen-particles={mood}
        className={cn(className)}
        {...rest}
      >
        {particles.map((particle, index) => (
          <span
            key={index}
            data-xen-particle=""
            style={
              {
                '--xen-particle-x': particle.x,
                '--xen-particle-y': particle.y,
                '--xen-particle-yn': particle.yFactor,
                '--xen-particle-s': particle.size,
                '--xen-particle-dur': particle.duration,
                '--xen-particle-delay': particle.delay,
                '--xen-particle-drift': particle.drift,
                '--xen-particle-o': particle.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    );
  }
);

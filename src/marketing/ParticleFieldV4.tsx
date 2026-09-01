import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import {
  ParticleField,
  computeParticles,
  type ParticleFieldProps,
  type ParticleMood,
} from './ParticleField';

export type { ParticleMood };
/** Re-export the deterministic layout helper — the V4 reuses it, never reinvents it. */
export { computeParticles };

/** Drop-in for {@link ParticleFieldProps} — same props, the V4 "showcase" design. */
export type ParticleFieldV4Props = ParticleFieldProps;

/**
 * ParticleField — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link ParticleField}: four moods
 * (`ember`/`snow`/`fireflies`/`sparks`), pure-CSS keyframe animation, and the
 * deterministic golden-ratio layout from the shared `computeParticles` (reused,
 * never reinvented — same `seed`, same sky on server/client/e2e). The base
 * component owns the geometry, timing, keyframes **and reduced-motion**; the V4
 * only re-tints and re-tunes.
 *
 * The refinement: **tuned density + size per mood** (each mood gets a confident
 * default multiplier so embers feel sparser/warmer and fireflies denser), plus
 * richer multi-stop token gradients and a soft additive `screen` blend so the
 * particles read bolder while staying ambient. Passing an explicit `density`
 * still wins — the per-mood tuning only fills the default.
 *
 * **Reduced motion:** inherited from the base, which freezes each particle into
 * a faint deterministic static scatter under `prefers-reduced-motion: reduce`;
 * the V4 adds no new motion, so it degrades identically. Token-only colors.
 */

/** Per-mood default density (only applied when `density` is left unset). */
const MOOD_DENSITY: Record<ParticleMood, number> = {
  ember: 16,
  sparks: 26,
  snow: 22,
  fireflies: 20,
};

/**
 * V4 re-tint sheet. Targets the same `[data-xen-particle]` dots the base
 * renders, scoped under `[data-xen-particles-v4]`, with richer multi-stop
 * ramp gradients and a soft additive blend. Color-bearing declarations
 * reference `--xen-*` variables exclusively; geometry/timing stay on the base.
 */
const PARTICLE_V4_CSS = `
[data-xen-particles-v4] [data-xen-particle] {
  mix-blend-mode: screen;
  filter: blur(0.5px);
}
[data-xen-particles-v4][data-xen-particles="ember"] [data-xen-particle] {
  background-image: radial-gradient(circle, var(--xen-accent-100) 0%, var(--xen-primary-400) 40%, var(--xen-primary-600) 62%, transparent 76%);
}
[data-xen-particles-v4][data-xen-particles="sparks"] [data-xen-particle] {
  background-image: radial-gradient(circle, var(--xen-accent-100) 0%, var(--xen-accent-400) 44%, var(--xen-accent-600) 64%, transparent 76%);
}
[data-xen-particles-v4][data-xen-particles="snow"] [data-xen-particle] {
  background-image: radial-gradient(circle, var(--xen-neutral-50) 0%, var(--xen-neutral-100) 48%, var(--xen-neutral-300) 68%, transparent 82%);
}
[data-xen-particles-v4][data-xen-particles="fireflies"] [data-xen-particle] {
  background-image: radial-gradient(circle, var(--xen-accent-100) 0%, var(--xen-accent-300) 38%, var(--xen-accent-500) 60%, transparent 74%);
}
`;

export const ParticleFieldV4 = React.forwardRef<HTMLDivElement, ParticleFieldV4Props>(
  function ParticleFieldV4(
    { mood = 'ember', density, seed = 1, className, ...rest }: ParticleFieldV4Props,
    ref
  ) {
    injectStyleOnce('xen-particle-v4-styles', PARTICLE_V4_CSS);
    const tunedDensity = density ?? MOOD_DENSITY[mood];

    return (
      <ParticleField
        ref={ref}
        data-xen-particles-v4=""
        mood={mood}
        density={tunedDensity}
        seed={seed}
        className={cn(className)}
        {...rest}
      />
    );
  }
);

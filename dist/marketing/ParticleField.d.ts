import * as React from 'react';
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
/**
 * Pure, deterministic particle layout — golden-ratio low-discrepancy spread,
 * no `Math.random`, so server/client/e2e all see the same sky. Exported so
 * tests (and curious templates) can assert determinism directly.
 */
export declare function computeParticles(mood: ParticleMood, density: number, seed: number): ParticleSpec[];
/**
 * Ambient particle field generalized from the restaurant template's ember
 * sky: four moods (`ember` | `snow` | `fireflies` | `sparks`), pure CSS
 * animation, deterministic golden-ratio layout (`seed`), token-only colors.
 * Decorative (`aria-hidden`, `pointer-events: none`) — position it inside a
 * `relative overflow-hidden` section; it renders `absolute inset-0`. Under
 * `prefers-reduced-motion` the particles freeze into a faint static scatter.
 */
export declare const ParticleField: React.ForwardRefExoticComponent<ParticleFieldProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ParticleField.d.ts.map
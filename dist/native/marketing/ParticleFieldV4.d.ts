import * as React from 'react';
import type { ParticleFieldProps, ParticleMood } from './ParticleField';
export type { ParticleMood };
/** Drop-in for {@link ParticleFieldProps} — same props, the V4 "showcase" design. */
export type ParticleFieldV4Props = ParticleFieldProps;
/**
 * ParticleField — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base: a **static, deterministic scatter** of
 * small fully-rounded token-colored dot Views — React Native has no CSS
 * keyframe engine here, so nothing animates and there is nothing to honor for
 * reduced motion (it is already the reduced-motion rest pose). The V4 *refines*
 * the look: V4-tuned size ranges + confident per-mood default density, and a
 * soft two-stop token core (bright center → translucent edge) so each dot reads
 * cleaner and bolder than the base's flat alpha disc.
 *
 * `mood`/`density`/`seed` are honored exactly as in the base: `mood` selects the
 * dot color + size range, `density`/`seed` drive the same golden-ratio layout.
 * An explicit `density` overrides the per-mood default. Token-only colors.
 */
export declare function ParticleFieldV4({ mood, density, seed, children, style, }: ParticleFieldV4Props): React.ReactElement;
//# sourceMappingURL=ParticleFieldV4.d.ts.map
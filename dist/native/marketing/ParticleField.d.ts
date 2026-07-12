import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ParticleMood = 'ember' | 'snow' | 'fireflies' | 'sparks';
export interface ParticleFieldProps {
    /** Particle character: embers, snow, fireflies, or sparks (drives color + size). */
    mood?: ParticleMood;
    /** Particle count (clamped 0–80; default 18). */
    density?: number;
    /** Layout seed — same seed, same scatter (deterministic, no `Math.random`). */
    seed?: number;
    /** Decorative content layered above the scatter (rendered absolute-fill). */
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Native mirror of the web `ParticleField`. The web version animates each
 * particle on an infinite CSS keyframe path (rise/fall/blink). React Native
 * gets a **static, deterministic scatter** of small fully-rounded token-colored
 * dot Views — no animation loop, so there is nothing to honor for reduced
 * motion (it is already the reduced-motion rest pose). The `mood`/`density`/
 * `seed` props are preserved: `mood` selects the dot color + size range,
 * `density`/`seed` drive the same golden-ratio layout as web. Token-only.
 */
export declare function ParticleField({ mood, density, seed, children, style, }: ParticleFieldProps): React.ReactElement;
//# sourceMappingURL=ParticleField.d.ts.map
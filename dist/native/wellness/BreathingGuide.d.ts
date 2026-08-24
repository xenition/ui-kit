import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'holdOut';
export interface BreathStep {
    phase: BreathPhase;
    /** Seconds to spend in this phase. */
    seconds: number;
}
/** Named breathing patterns; expanded to steps when no explicit `steps`. */
export type BreathingPattern = 'box' | '4-7-8' | 'calm' | 'coherent';
export interface BreathingGuideProps {
    /** Named pattern; ignored when `steps` is supplied. Default `'box'`. */
    pattern?: BreathingPattern;
    /** Explicit phase sequence — overrides `pattern`. */
    steps?: BreathStep[];
    /** Drive the animation. When false the guide sits at rest. Default false. */
    running?: boolean;
    /** Circle diameter in px. Default 200. */
    size?: number;
    /** Fires when the active phase changes. */
    onPhaseChange?: (phase: BreathPhase, index: number) => void;
    /** Fires each time the full sequence loops. */
    onCycleComplete?: (cycle: number) => void;
    /** Overrides the auto phase caption (e.g. localized). */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * An animated breathing coach. A circle expands on inhale, holds, and contracts
 * on exhale, cycling through the chosen `pattern` (or explicit `steps`). Driven
 * by `Animated` and gated on the OS "Reduce Motion" setting — when reduced, the
 * circle snaps between sizes instead of easing and the caption still advances,
 * so the guidance never depends on motion alone. State (running / current
 * phase) is exposed to screen readers via the caption, not color. Token-only
 * colors (semantic slots + a `withAlpha` tint).
 */
export declare function BreathingGuide({ pattern, steps, running, size, onPhaseChange, onCycleComplete, label, style, }: BreathingGuideProps): React.ReactElement;
//# sourceMappingURL=BreathingGuide.d.ts.map
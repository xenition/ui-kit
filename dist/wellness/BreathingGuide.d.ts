import * as React from 'react';
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
    className?: string;
}
/**
 * An animated breathing coach (web parity of the native block). A circle expands
 * on inhale, holds, and contracts on exhale, cycling through the chosen
 * `pattern` (or explicit `steps`). The easing is a CSS `transform` transition
 * whose duration tracks each phase; under `prefers-reduced-motion` an injected
 * media rule kills the transition so the circle snaps between sizes while the
 * caption still advances — the guidance never depends on motion alone. State is
 * exposed to screen readers via the caption, not color. Token-only colors.
 */
export declare const BreathingGuide: React.ForwardRefExoticComponent<BreathingGuideProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BreathingGuide.d.ts.map
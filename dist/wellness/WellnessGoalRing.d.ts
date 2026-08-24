import * as React from 'react';
/** Ring color — a semantic slot the shared `ProgressRing` chart understands. */
export type WellnessGoalColor = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';
export interface WellnessGoalRingProps {
    /** Metric label, e.g. "Mindful minutes". */
    label: string;
    /** Current value. */
    value: number;
    /** Target value; `<= 0` renders an empty "No goal set" state. */
    goal: number;
    /** Unit suffix, e.g. "min". */
    unit?: string;
    /** Ring color (semantic slot). Default `'primary'`. */
    color?: WellnessGoalColor;
    /** Ring diameter in px. Default 132. */
    size?: number;
    /** Show a "✓ Goal met" note once value reaches the goal. Default true. */
    showMetBadge?: boolean;
    className?: string;
}
/**
 * A wellness goal dial built on the shared `ProgressRing` chart (web parity of
 * the native block): a labeled ring showing progress toward a daily target, with
 * the value / goal beneath and a success badge once met. A non-positive `goal`
 * degrades to a "No goal set" note (state, not color alone). Token-only colors —
 * the ring resolves its stroke from a semantic color slot.
 */
export declare const WellnessGoalRing: React.ForwardRefExoticComponent<WellnessGoalRingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WellnessGoalRing.d.ts.map
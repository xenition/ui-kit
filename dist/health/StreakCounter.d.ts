import * as React from 'react';
export type StreakCounterTone = 'primary' | 'success' | 'warn' | 'accent';
export interface StreakCounterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Current streak length. Clamped to `>= 0`. */
    count: number;
    /** Unit noun; defaults to "day". Pluralized automatically. */
    unit?: string;
    /** Caption under the number; defaults to "streak". */
    label?: string;
    /** Accent tone for the number + flame. */
    tone?: StreakCounterTone;
    /** Optional best/record value shown as a muted sub-caption. */
    best?: number;
}
/**
 * A prominent streak readout: a flame, the day count, and a caption. When
 * `count` is 0 it reads a muted "Start your streak" prompt instead of a cold
 * zero. Web parity of the native `StreakCounter`; all colors trace to `--xen-*`
 * token classes — no literals.
 */
export declare const StreakCounter: React.ForwardRefExoticComponent<StreakCounterProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StreakCounter.d.ts.map
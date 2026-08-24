import * as React from 'react';
export type LoopControlVariant = 'bar' | 'inline';
export interface LoopControlProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Whether looping is enabled. */
    enabled: boolean;
    /** Loop start bar (1-based). */
    start?: number;
    /** Loop end bar (1-based, inclusive). */
    end?: number;
    /** Total bars in the arrangement (for the region visualization). Default 8. */
    totalBars?: number;
    /**
     * - `bar` — toggle + a region strip over the bar count (default).
     * - `inline` — toggle + `start–end` text only.
     */
    variant?: LoopControlVariant;
    /** Disable the control. */
    disabled?: boolean;
    /** Fires with the next enabled state when the loop toggle is pressed. */
    onToggle?: (enabled: boolean) => void;
    /** Fires with `[start, end]` when the region steppers change it. */
    onRegionChange?: (start: number, end: number) => void;
}
/**
 * A loop-region control — a UI shell only, it loops no transport, and the DOM
 * parity of `native/music`'s `LoopControl`. Shows a loop on/off toggle (state
 * via `aria-pressed` + fill, not color alone) and, in the `bar` variant, a strip
 * visualizing the `[start, end]` region over `totalBars` with −/＋ steppers that
 * report through `onRegionChange`. All bounds are clamped/guarded. Token-only.
 */
export declare const LoopControl: React.ForwardRefExoticComponent<LoopControlProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LoopControl.d.ts.map
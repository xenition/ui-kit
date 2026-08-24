import * as React from 'react';
export type BPMControlVariant = 'stepper' | 'inline' | 'tap';
export interface BPMControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Current tempo in BPM. */
    value: number;
    /** Range bounds (default `40`…`300`). */
    min?: number;
    max?: number;
    /** Increment per step press (default `1`). */
    step?: number;
    /**
     * - `stepper` — big read-out with −/＋ buttons (default).
     * - `inline` — compact single-row −/＋.
     * - `tap` — stepper plus a "Tap" tempo button.
     */
    variant?: BPMControlVariant;
    /** Whether the transport is playing (adds a non-color "playing" dot). */
    playing?: boolean;
    /** Disable the control. */
    disabled?: boolean;
    /** Fires with the new BPM when stepped. */
    onChange?: (bpm: number) => void;
    /** Fires each time the "Tap" button is pressed (tap-tempo intent). */
    onTap?: () => void;
}
/**
 * A tempo (BPM) control — a UI shell only, it drives no clock, and the DOM
 * parity of `native/music`'s `BPMControl`. Shows the tempo read-out with −/＋
 * steppers (clamped to `[min, max]`) and, in the `tap` variant, a "Tap" button
 * that fires `onTap` for an app to time. The `playing` flag adds a non-color
 * "playing" dot beside the value. Token-only styling.
 */
export declare const BPMControl: React.ForwardRefExoticComponent<BPMControlProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BPMControl.d.ts.map
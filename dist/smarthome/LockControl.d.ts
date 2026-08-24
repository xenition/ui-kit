import * as React from 'react';
/** State of a smart lock. */
export type LockState = 'locked' | 'unlocked' | 'jammed' | 'offline';
export interface LockControlProps {
    /** Lock display name (e.g. "Front Door"). */
    name: string;
    /** Current lock state. */
    state?: LockState;
    /** Battery percentage 0–100. Shows a low-battery hint under 20%. */
    batteryPct?: number;
    /** Fires with the requested locked value when the action button is clicked. */
    onToggle?: (next: boolean) => void;
    /** Show a busy label and block the action (command in flight). */
    busy?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * Smart-lock control — a state glyph + a status {@link Badge} over a single
 * lock/unlock {@link Button}. `state` selects the accent slot and a text label
 * (`locked`→success, `unlocked`→warn, `jammed`→danger, `offline`→muted) so the
 * status reads without color; the action button flips between "Lock"/"Unlock",
 * uses the `danger` variant when unlocking, and is disabled when
 * `offline`/`jammed` or `busy` (the web {@link Button} has no `loading`, so busy
 * maps to disabled + a "Working…" label). Optional `batteryPct` surfaces a low
 * hint under 20%. No literal colors.
 */
export declare const LockControl: React.ForwardRefExoticComponent<LockControlProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LockControl.d.ts.map
import * as React from 'react';
export type SessionTimerTone = 'primary' | 'accent' | 'success';
export interface SessionTimerProps {
    /** Total session length in seconds. */
    totalSec: number;
    /** Seconds remaining; clamped to `[0, totalSec]`. */
    remainingSec: number;
    /** Whether the timer is currently counting down. */
    running?: boolean;
    /** Optional phase caption, e.g. "Body scan". */
    phaseLabel?: string;
    /** Accent tone. Default `'primary'`. */
    tone?: SessionTimerTone;
    /** Fires when the play / pause control is tapped, with the next running state. */
    onToggle?: (next: boolean) => void;
    /** Fires when the reset control is tapped (omit to hide it). */
    onReset?: () => void;
    className?: string;
}
/**
 * A meditation session countdown (web parity of the native block): a large mm:ss
 * readout, an elapsed progress bar, a play / pause toggle as a real `<button>`,
 * and an optional reset. When `remainingSec` hits 0 it shows a "✓ Complete"
 * state instead of the toggle. Play state drives the toggle glyph and its a11y
 * label (state, not color alone). Guards a non-positive `totalSec`. Token-only
 * colors.
 */
export declare const SessionTimer: React.ForwardRefExoticComponent<SessionTimerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SessionTimer.d.ts.map
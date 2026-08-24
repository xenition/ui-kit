import * as React from 'react';
export interface TimeTrackerProps {
    /** Pre-formatted elapsed label (e.g. `'01:24:07'`). */
    elapsedLabel: string;
    /** Whether the timer is currently running. */
    running?: boolean;
    /** Fires with the next running value when the start/stop control is clicked. */
    onToggle?: (running: boolean) => void;
    /** Optional context label (e.g. the task name being timed). */
    label?: string;
    className?: string;
}
/**
 * A start/stop time tracker: an elapsed readout, an optional context label, and
 * a toggle control that reads as **success** (running) or **primary** (stopped)
 * with a matching play/stop glyph. The control exposes a `button` role with a
 * stateful label. Web parity of the native `TimeTracker`. No literal colors.
 */
export declare const TimeTracker: React.ForwardRefExoticComponent<TimeTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TimeTracker.d.ts.map
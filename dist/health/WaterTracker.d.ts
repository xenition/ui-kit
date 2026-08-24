import * as React from 'react';
export interface WaterTrackerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Glasses (or units) consumed so far. Clamped to `[0, goal]`. */
    count: number;
    /** Daily goal in glasses/units. */
    goal: number;
    /** Volume per glass in ml, used for the total readout. */
    mlPerGlass?: number;
    /** Fires with the next count when a glass icon is tapped. */
    onChange?: (next: number) => void;
}
/**
 * A hydration tracker rendered as a row of tappable glass icons: filled glasses
 * up to `count`, empty ones to `goal`. Tapping a glass sets the count to that
 * position (tapping the last filled glass clears it back one). Shows a
 * `current / goal` and optional ml total. Guards `goal <= 0` with a muted note.
 * Web parity of the native `WaterTracker`; token-only colors.
 */
export declare const WaterTracker: React.ForwardRefExoticComponent<WaterTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WaterTracker.d.ts.map
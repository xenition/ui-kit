import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface WaterTrackerProps {
    /** Glasses (or units) consumed so far. Clamped to `[0, goal]`. */
    count: number;
    /** Daily goal in glasses/units. */
    goal: number;
    /** Volume per glass in ml, used for the total readout. */
    mlPerGlass?: number;
    /** Fires with the next count when a glass icon is tapped. */
    onChange?: (next: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A hydration tracker rendered as a row of tappable glass icons: filled glasses
 * up to `count`, empty ones to `goal`. Tapping a glass sets the count to that
 * position (tapping the last filled glass clears it back one). Shows a
 * `current / goal` and optional ml total. Guards `goal <= 0` with a muted note.
 * Token-only colors.
 */
export declare function WaterTracker({ count, goal, mlPerGlass, onChange, style, }: WaterTrackerProps): React.ReactElement;
//# sourceMappingURL=WaterTracker.d.ts.map
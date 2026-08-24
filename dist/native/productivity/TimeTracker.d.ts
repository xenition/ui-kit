import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
export interface TimeTrackerProps {
    /** Pre-formatted elapsed label (e.g. `'01:24:07'`). */
    elapsedLabel: string;
    /** Whether the timer is currently running. */
    running?: boolean;
    /** Fires with the next running value when the start/stop control is pressed. */
    onToggle?: (running: boolean) => void;
    /** Optional context label (e.g. the task name being timed). */
    label?: string;
    /** Surface treatment (visual-diversity preset). Defaults to `classic`. */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A start/stop time tracker: an elapsed readout, an optional context label, and
 * a toggle control that reads as **success** (running) or **primary** (stopped)
 * with a matching play/stop glyph. The control exposes a `button` a11y role with
 * a stateful label. No literal colors.
 */
export declare function TimeTracker({ elapsedLabel, running, onToggle, label, appearance, style, }: TimeTrackerProps): React.ReactElement;
//# sourceMappingURL=TimeTracker.d.ts.map
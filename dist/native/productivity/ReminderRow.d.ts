import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
import { type DueDateTone } from './DueDatePill';
export interface ReminderRowProps {
    /** Reminder text. */
    title: string;
    /** Pre-formatted time label (e.g. `'9:00 AM'`). */
    timeLabel?: string;
    /** Urgency tone for the time pill. */
    tone?: DueDateTone;
    /** Whether the reminder is enabled (bell on). */
    enabled?: boolean;
    /** Fires with the next enabled value when the bell is toggled. */
    onToggle?: (enabled: boolean) => void;
    /** Fires when the row body is pressed. */
    onPress?: () => void;
    /** Surface treatment (visual-diversity preset). Defaults to `classic`. */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A reminder line: title, an optional time {@link DueDatePill}, and a bell toggle
 * that reads as primary (on) or muted (off) and exposes a `switch` a11y role with
 * a stateful label. No literal colors.
 */
export declare function ReminderRow({ title, timeLabel, tone, enabled, onToggle, onPress, appearance, style, }: ReminderRowProps): React.ReactElement;
//# sourceMappingURL=ReminderRow.d.ts.map
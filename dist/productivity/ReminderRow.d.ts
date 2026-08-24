import * as React from 'react';
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
    /** Fires when the row body is clicked. */
    onClick?: () => void;
    className?: string;
}
/**
 * A reminder line: title, an optional time {@link DueDatePill}, and a bell toggle
 * that reads as primary (on) or muted (off) and exposes a `switch` role with a
 * stateful label. Web parity of the native `ReminderRow` (`onPress` → `onClick`).
 * No literal colors.
 */
export declare const ReminderRow: React.ForwardRefExoticComponent<ReminderRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReminderRow.d.ts.map
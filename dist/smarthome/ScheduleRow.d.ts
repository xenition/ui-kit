import * as React from 'react';
export interface ScheduleRowProps {
    /** Schedule label (e.g. "Wake-up lights"). */
    label: string;
    /** Time string (e.g. "06:30", "Sunset"). */
    time?: string;
    /** Active weekdays (e.g. ["Mon","Tue"]). Rendered as chips; guarded when empty. */
    days?: string[];
    /** Leading glyph/emoji. Default "⏰". */
    icon?: string;
    /** Whether the schedule is enabled. */
    enabled?: boolean;
    /** Fires with the requested enabled value. */
    onToggle?: (next: boolean) => void;
    /** Hide the bottom divider. */
    last?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A schedule / timer row — a clock glyph, the time (emphasized), a label, and a
 * row of weekday chips, closed by an enable {@link Switch}. Disabled schedules
 * dim to `muted`; the enabled state is carried by the switch's `aria-checked`
 * state (not color). `days` is mapped defensively (nothing renders when empty),
 * and a hairline divider separates rows unless `last`. Token-bound throughout.
 */
export declare const ScheduleRow: React.ForwardRefExoticComponent<ScheduleRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScheduleRow.d.ts.map
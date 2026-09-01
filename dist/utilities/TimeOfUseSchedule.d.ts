import * as React from 'react';
export type TouPeriod = 'off-peak' | 'mid-peak' | 'on-peak';
export interface TouBlock {
    /** Block start, hour of day (0–24). */
    startHour: number;
    /** Block end, hour of day (0–24). */
    endHour: number;
    /** Rate period — drives the segment color and legend entry. */
    period: TouPeriod;
}
export interface TimeOfUseScheduleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Card title (default "Time of use"). */
    title?: string;
    /** Rate blocks across the 24h day. */
    blocks: TouBlock[];
    /** Current hour of day (0–24) — draws a thin "now" marker when supplied. */
    nowHour?: number;
}
/**
 * A clean-card time-of-use day bar (web parity). A 24-hour horizontal track is
 * split into rate blocks, each segment sized by its share of the day and colored
 * by rate period — off-peak → `success`, mid-peak → `warn`, on-peak → `danger` —
 * so the color is meaningful, not decorative. A thin `on-surface` "now" marker
 * locates the current hour, hour ticks anchor the axis, and a legend names each
 * period present with its dot + tone. Purely presentational; every color traces
 * to a token.
 */
export declare const TimeOfUseSchedule: React.ForwardRefExoticComponent<TimeOfUseScheduleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TimeOfUseSchedule.d.ts.map
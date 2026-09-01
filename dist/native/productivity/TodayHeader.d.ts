import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TodayHeaderProps {
    /** Greeting line above the date (default `'Good morning'`). */
    greeting?: string;
    /** The person's name, appended to the greeting (e.g. `'Sam'` → "Good morning, Sam"). */
    userName?: string;
    /** Localized date label (e.g. "Monday, Aug 31"). */
    dateLabel?: string;
    /** Number of tasks due today — the big near-white headline numeral. */
    dueToday: number;
    /** Number of tasks completed today — a frosted stat tile + progress source. */
    completedToday: number;
    /**
     * Explicit completion percentage `0–100` for the progress bar. When omitted it
     * is derived from `completedToday / (completedToday + dueToday)`.
     */
    progressPct?: number;
    /** Optional "next up" focus task label, rendered as a frosted focus tile. */
    focusLabel?: string;
    /** Outer style override for layout composition. */
    style?: StyleProp<ViewStyle>;
}
/**
 * TodayHeader — the "today" dashboard hero and the **peak** of the productivity
 * V4 "flow" line. A brand-gradient panel that greets the person, shows the date,
 * and states the day in one glance: a big near-white **"N tasks due today"**
 * numeral, a near-white progress bar with its percentage, frosted done/remaining
 * tiles, and an optional "next up" focus tile. Presentational — shaped data only,
 * nothing fetches. Every color derives from the brand ramp via `GradientSurface`
 * + `flow*(tokens.ramps)` — no literals, light + dark. The one vivid, motivating
 * surface at the top of the day.
 */
export declare function TodayHeader({ greeting, userName, dateLabel, dueToday, completedToday, progressPct, focusLabel, style, }: TodayHeaderProps): React.ReactElement;
//# sourceMappingURL=TodayHeader.d.ts.map
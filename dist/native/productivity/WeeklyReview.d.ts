import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface WeeklyReviewProps {
    /** Tasks completed this week — the big near-white headline numeral. */
    completed: number;
    /** Current streak length in days; rendered as a frosted flame tile. */
    streakDays?: number;
    /**
     * Per-day completions for the 7-bar mini chart. Each bar's height scales to the
     * week's max; heights read in near-white opacity steps.
     */
    perDay?: readonly {
        label: string;
        count: number;
    }[];
    /** Optional focused-hours label (e.g. "12h 30m"); rendered as a frosted tile. */
    focusHours?: string;
    /** Fires on the "Share" action. Hidden when unset. */
    onShare?: () => void;
    /** Outer style override for layout composition. */
    style?: StyleProp<ViewStyle>;
}
/**
 * WeeklyReview — the weekly stats / streak hero for the productivity V4 "flow"
 * line. A brand-gradient panel that closes the week: a big near-white
 * **completed** numeral, a 7-bar mini chart of per-day completions (bars in
 * near-white opacity steps), a streak flame tile, an optional focus-hours tile,
 * and an optional "Share" CTA. Presentational — shaped data + a callback, nothing
 * fetches. Every color derives from the brand ramp via `GradientSurface` +
 * `flow*(tokens.ramps)` (bar steps via `withAlpha` on the near-white ink) — no
 * literals, light + dark.
 */
export declare function WeeklyReview({ completed, streakDays, perDay, focusHours, onShare, style, }: WeeklyReviewProps): React.ReactElement;
//# sourceMappingURL=WeeklyReview.d.ts.map
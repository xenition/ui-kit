import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SleepQuality = 'poor' | 'fair' | 'good' | 'excellent';
export interface SleepBarProps {
    /** Hours actually slept. */
    hours: number;
    /** Target hours; the bar fills to `hours / goal`. */
    goal?: number;
    /** Sleep-quality rating; colors the bar and shows a tag. */
    quality?: SleepQuality;
    /** Optional bedtime label, e.g. "11:20 PM". */
    bedtime?: string;
    /** Optional wake time label, e.g. "6:45 AM". */
    wakeTime?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A sleep-duration summary: hours slept versus goal drawn as a single fill bar,
 * a color-coded quality tag, and optional bed / wake times. The bar color comes
 * from `quality` (falling back to `primary`). Guards `goal <= 0`. Token-only.
 */
export declare function SleepBar({ hours, goal, quality, bedtime, wakeTime, style, }: SleepBarProps): React.ReactElement;
//# sourceMappingURL=SleepBar.d.ts.map
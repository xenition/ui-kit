import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { Mood } from './MoodCheckIn';
export interface MoodTrendPoint {
    label: string;
    mood: Mood;
}
export interface MoodTrendProps {
    data: MoodTrendPoint[];
    title?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * MoodTrend — a week of mood at a glance: a clean card with one vertical bar per
 * day, its height set by the mood level (awful→great, 1..5 of a fixed max) and
 * its fill the mood's semantic color. The card stays calm (surface + border);
 * only the bars carry color, and each day's mood is announced (state, not color
 * alone). Empty data shows a muted note. Token-only colors.
 */
export declare function MoodTrend({ data, title, style }: MoodTrendProps): React.ReactElement;
//# sourceMappingURL=MoodTrend.d.ts.map
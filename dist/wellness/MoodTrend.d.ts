import * as React from 'react';
import type { Mood } from './MoodCheckIn';
export interface MoodTrendPoint {
    label: string;
    mood: Mood;
}
export interface MoodTrendProps extends React.HTMLAttributes<HTMLDivElement> {
    data: MoodTrendPoint[];
    title?: string;
}
/**
 * MoodTrend — a week of mood at a glance: a clean card with one vertical bar per
 * day, its height set by the mood level (awful→great, 1..5 of a fixed max) and
 * its fill the mood's semantic color. The card stays calm (surface + border);
 * only the bars carry color, and each day's mood is announced (state, not color
 * alone). Empty data shows a muted note. Token-only colors.
 */
export declare const MoodTrend: React.ForwardRefExoticComponent<MoodTrendProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MoodTrend.d.ts.map
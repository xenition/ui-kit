import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CSATResultCardProps {
    /** Satisfaction score as a percentage `0–100`; the big near-white numeral. */
    score: number;
    /** Total number of survey responses this score is based on. */
    responses: number;
    /** Count of **positive** ratings (raw response count, not a percentage). */
    positive: number;
    /** Count of **neutral** ratings (raw response count, not a percentage). */
    neutral: number;
    /** Count of **negative** ratings (raw response count, not a percentage). */
    negative: number;
    /** Headline (default `"Customer satisfaction"`). */
    title?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * CSATResultCard — a gradient "console" results hero for a customer-satisfaction
 * score. The title and a big near-white `score%` numeral sit over the console
 * gradient, above the response count. A positive/neutral/negative breakdown
 * reads as three token bars (success/warn/danger) whose widths are the share of
 * the total raw counts, each on a frosted track. A calm peak-moment surface,
 * dark-mode safe, every color from the compiled theme ramps (token-only, no
 * literals). Presentational — shaped counts only, nothing fetches.
 */
export declare function CSATResultCard({ score, responses, positive, neutral, negative, title, style, }: CSATResultCardProps): React.ReactElement;
//# sourceMappingURL=CSATResultCard.d.ts.map
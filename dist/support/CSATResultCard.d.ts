import * as React from 'react';
export interface CSATResultCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
}
/**
 * CSATResultCard — a gradient "console" results hero for a customer-satisfaction
 * score. The title and a big near-white `score%` numeral sit over a
 * `from-primary-500 to-primary-700` ground, above the response count. A
 * positive/neutral/negative breakdown reads as three token bars
 * (success/warn/danger) whose widths are the share of the total raw counts, each
 * on a frosted track (`bg-primary-50/15`). A calm peak-moment surface,
 * dark-mode safe, every color from the brand + semantic ramps (token-only, no
 * literals). Presentational — shaped counts only, nothing fetches.
 */
export declare const CSATResultCard: React.ForwardRefExoticComponent<CSATResultCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CSATResultCard.d.ts.map
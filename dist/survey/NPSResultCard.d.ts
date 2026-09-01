import * as React from 'react';
export interface NPSResultCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The computed Net Promoter Score, `-100`..`100` (clamped for display). */
    score: number;
    /** Total number of responses the score is computed from. */
    responses: number;
    /** Promoter count (a raw response count, not a percentage). */
    promoters: number;
    /** Passive count (a raw response count, not a percentage). */
    passives: number;
    /** Detractor count (a raw response count, not a percentage). */
    detractors: number;
    /** Hero heading over the score. Default `'Net Promoter Score'`. */
    title?: string;
}
/**
 * NPSResultCard — the survey's NPS **results hero** (V4 "focus" line). The big
 * computed score (`-100`..`100`) sits on a brand gradient ground
 * (`bg-gradient-to-br from-primary-500 to-primary-700`) in near-white ink
 * (`text-primary-50` / `text-primary-100`) with the response count as a frosted
 * caption. Below, a calm surface footer breaks the responses down into three
 * token bars — promoter→success, passive→warn, detractor→danger — each a
 * proportional fill with its raw count, so meaning is never color-only.
 * `promoters` / `passives` / `detractors` are **counts** (not percentages).
 * Presentational only. All colors from `--xen-*` token classes + gradient
 * utilities (no literal colors), dark-mode safe.
 */
export declare const NPSResultCard: React.ForwardRefExoticComponent<NPSResultCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NPSResultCard.d.ts.map
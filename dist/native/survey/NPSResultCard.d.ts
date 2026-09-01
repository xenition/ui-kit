import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface NPSResultCardProps {
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
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * NPSResultCard — the survey's NPS **results hero** (V4 "focus" line). The big
 * computed score (`-100`..`100`) sits on a brand gradient ground
 * (`focusGradient`) in near-white ink (`focusInk` / `focusInkSoft`) with the
 * response count as a frosted caption tile. Below, a calm surface footer breaks
 * the responses down into three token bars — promoter→success, passive→warn,
 * detractor→danger — each a proportional fill with its raw count, so meaning is
 * never color-only. `promoters` / `passives` / `detractors` are **counts** (not
 * percentages). Presentational only. Token-only colors via `useXenitionTheme()`
 * + `focus*(tokens.ramps)` (no literals), dark-mode safe.
 */
export declare function NPSResultCard({ score, responses, promoters, passives, detractors, title, style, }: NPSResultCardProps): React.ReactElement;
//# sourceMappingURL=NPSResultCard.d.ts.map
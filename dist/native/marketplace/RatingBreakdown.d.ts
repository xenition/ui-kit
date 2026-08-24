import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface RatingBreakdownProps {
    /**
     * Count of ratings per star, indexed by star value. Accepts either a 5-length
     * array ordered `[1★, 2★, 3★, 4★, 5★]` or a `{1..5: count}` map. Missing
     * entries are treated as 0.
     */
    counts: number[] | Partial<Record<1 | 2 | 3 | 4 | 5, number>>;
    /**
     * Optional pre-computed average; when omitted it is derived from `counts`.
     */
    average?: number;
    /** Hide the summary header (average + total). Default `false`. */
    hideSummary?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A review-score distribution — a summary header (average + total count) over
 * five proportional bars, one per star level (5★ at the top). Accepts counts as
 * an ordered array or a `{1..5}` map, derives the average when not supplied, and
 * guards every lookup and the divide-by-zero empty case. Presentational, data
 * only. Reuses `Rating`; token-only colors with a token-derived alpha for the
 * bar track.
 */
export declare function RatingBreakdown({ counts, average, hideSummary, style, }: RatingBreakdownProps): React.ReactElement;
//# sourceMappingURL=RatingBreakdown.d.ts.map
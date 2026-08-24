import * as React from 'react';
import type { MatchScoreProps } from './MatchScore';
/** Drop-in replacement for {@link MatchScoreProps} — identical shape. */
export type MatchScoreV3Props = MatchScoreProps;
/**
 * MatchScore, design variant 3 — a **compact fixture line**. Everything sits on
 * one row: a leading status block (a `danger` dot + minute when live, otherwise
 * a glyph + short label), the home side right-aligned, a tight `2 - 1` (or
 * `vs`) score in the middle, and the away side left-aligned. Built for dense
 * lists. Same props as `MatchScore`; token-pure, reduced-motion press scale.
 */
export declare function MatchScoreV3({ home, away, status, minute, kickoffLabel, competition, loading, onPress, style, }: MatchScoreV3Props): React.ReactElement;
//# sourceMappingURL=MatchScoreV3.d.ts.map
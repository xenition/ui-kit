import * as React from 'react';
import type { MatchScoreProps } from './MatchScore';
/** Drop-in for {@link MatchScoreProps} — same props, the V4 "broadcast" design. */
export type MatchScoreV4Props = MatchScoreProps;
/**
 * MatchScore — **V4** "broadcast" design. The matchday take on a scoreline: an
 * elevated card with a soft-tint status pill (a pulsing danger dot reinforces
 * "LIVE" — never color alone) and bold score numerals; the `feature` variant
 * becomes a full brand-gradient hero with near-white ink. Same props/behavior as
 * {@link MatchScoreProps}; token-only colors via `useXenitionTheme()`. `loading`
 * swaps in a token skeleton.
 */
export declare function MatchScoreV4({ home, away, status, minute, kickoffLabel, competition, variant, loading, onPress, style, }: MatchScoreV4Props): React.ReactElement;
//# sourceMappingURL=MatchScoreV4.d.ts.map
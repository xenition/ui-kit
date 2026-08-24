import * as React from 'react';
import type { MatchScoreProps } from './MatchScore';
/** Drop-in replacement for {@link MatchScoreProps} — identical shape. */
export type MatchScoreV2Props = MatchScoreProps;
/**
 * MatchScore, design variant 2 — a **big scoreboard card**. The two crests sit
 * in flanking columns around an oversized centered scoreline, with the
 * competition caption above and a pill "live band" below. The band carries a
 * `danger` dot for live states and a glyph + label otherwise, so lifecycle is
 * conveyed by text + glyph and never color alone. Same props as `MatchScore`;
 * token-pure (elevation via `shadow`, tints via `withAlpha`), reduced-motion
 * aware (enter + press scale). `loading` swaps in a token skeleton.
 */
export declare function MatchScoreV2({ home, away, status, minute, kickoffLabel, competition, loading, onPress, style, }: MatchScoreV2Props): React.ReactElement;
//# sourceMappingURL=MatchScoreV2.d.ts.map
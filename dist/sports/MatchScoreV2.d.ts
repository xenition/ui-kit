import * as React from 'react';
import type { MatchScoreProps } from './MatchScore';
/** Same public contract as {@link MatchScore} — a drop-in alternate design. */
export type MatchScoreV2Props = MatchScoreProps;
/**
 * MatchScore, redesigned (v2): a **feature scoreboard**. The competition caption
 * tops a big centered board — home crest/name, an oversized score with the away
 * side mirrored, and a status/minute pill beneath (LIVE fills danger). Bolder
 * than v1's row. Same props, token-only.
 */
export declare const MatchScoreV2: React.ForwardRefExoticComponent<MatchScoreProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchScoreV2.d.ts.map
import * as React from 'react';
import type { MatchScoreProps } from './MatchScore';
/** Same public contract as {@link MatchScore} — a drop-in alternate design. */
export type MatchScoreV3Props = MatchScoreProps;
/**
 * MatchScore, redesigned (v3): a **dense fixture line**. Home code · score ·
 * away code on one row with the status/minute pinned right (LIVE in danger) —
 * hairline-bordered for a results ticker. The opposite of v2's board. Same props,
 * token-only.
 */
export declare const MatchScoreV3: React.ForwardRefExoticComponent<MatchScoreProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchScoreV3.d.ts.map
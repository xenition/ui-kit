import * as React from 'react';
import type { LeaderboardRowProps } from './LeaderboardRow';
/** Same public contract as {@link LeaderboardRow} — a drop-in alternate design. */
export type LeaderboardRowV2Props = LeaderboardRowProps;
/**
 * LeaderboardRow, design v2 — an **elevated card** row: a large tinted rank disc
 * (medal glyph for the top three) on the left, a ringed avatar, the name over an
 * optional trend line, and the score in a {@link Badge} on the right. The score
 * badge turns `primary` for the highlighted (current-user) row. `empty` renders
 * a muted placeholder. Same props as {@link LeaderboardRow}. Token-only colors.
 */
export declare function LeaderboardRowV2({ rank, name, avatar, score, scoreUnit, highlighted, empty, trend, onPress, style, }: LeaderboardRowV2Props): React.ReactElement;
//# sourceMappingURL=LeaderboardRowV2.d.ts.map
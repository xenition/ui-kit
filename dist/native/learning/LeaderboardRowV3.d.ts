import * as React from 'react';
import type { LeaderboardRowProps } from './LeaderboardRow';
/** Same public contract as {@link LeaderboardRow} — a drop-in alternate design. */
export type LeaderboardRowV3Props = LeaderboardRowProps;
/**
 * LeaderboardRow, design v3 — a **minimal flat row** separated by a hairline
 * rule, no card. The rank is a plain numeral (medal glyph for the top three),
 * the name sits mid-row, and the score is emphasized as large numerals with a
 * quiet unit beside it. The highlighted (current-user) row gets a soft primary
 * tint wash rather than a solid fill, keeping text legible against a token color.
 * `empty` renders a muted placeholder. Same props as {@link LeaderboardRow}.
 * Token-only colors.
 */
export declare function LeaderboardRowV3({ rank, name, avatar, score, scoreUnit, highlighted, empty, trend, onPress, style, }: LeaderboardRowV3Props): React.ReactElement;
//# sourceMappingURL=LeaderboardRowV3.d.ts.map
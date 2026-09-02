import * as React from 'react';
import type { StreakBadgeProps } from './StreakBadge';
/** Drop-in for {@link StreakBadgeProps} — same props, the V4 "campus" design. */
export type StreakBadgeV4Props = StreakBadgeProps;
/**
 * StreakBadge — **V4** "campus" design (native twin of the web V4). A gamified
 * streak pill on a tone-tinted well: a flame glyph + the **tabular-nums** streak
 * count and unit. A zero streak degrades to a muted prompt instead of a "0"
 * badge. The count uses a semantic `tone` color. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function StreakBadgeV4({ count, unit, tone, glyph, size, emptyLabel, style }: StreakBadgeV4Props): React.ReactElement;
//# sourceMappingURL=StreakBadgeV4.d.ts.map
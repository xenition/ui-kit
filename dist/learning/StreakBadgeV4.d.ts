import * as React from 'react';
import type { StreakBadgeProps } from './StreakBadge';
/** Drop-in for {@link StreakBadgeProps} — same props, the V4 "campus" design. */
export type StreakBadgeV4Props = StreakBadgeProps;
/**
 * StreakBadge — **V4** "campus" design (web parity of the native V4). A gamified
 * streak pill on a tone-tinted well: a flame glyph + the **tabular-nums** streak
 * count and unit. A zero streak degrades to a muted prompt instead of a "0"
 * badge. The count uses a semantic `tone` color. Identical props/behavior to
 * {@link StreakBadgeProps}. All colors from `--xen-*` token classes (no literals).
 */
export declare const StreakBadgeV4: React.ForwardRefExoticComponent<StreakBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StreakBadgeV4.d.ts.map
import * as React from 'react';
import type { LeaderboardRowProps } from './LeaderboardRow';
/** V4 layout choices for the "campus" design. */
export type LeaderboardRowLayout = 'full' | 'compact';
/** Drop-in for {@link LeaderboardRowProps} — same props, the V4 "campus" design. */
export interface LeaderboardRowV4Props extends LeaderboardRowProps {
    /** V4 layout: `full` (default) or `compact` (denser single line). */
    variant?: LeaderboardRowLayout;
}
/**
 * LeaderboardRow — **V4** "campus" design (native twin of the web V4). An
 * elevated rounded row with a soft shadow: rank (a medal glyph for the top
 * three), avatar, name, an optional trend, and a big legible **tabular-nums**
 * score. `highlighted` marks the current user with a primary ring; `empty`
 * renders a muted placeholder. Tappable when `onPress` is set. Honors the V4
 * `variant` — `full` (default) and `compact`. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function LeaderboardRowV4({ rank, name, avatar, score, scoreUnit, highlighted, empty, trend, onPress, variant, style, }: LeaderboardRowV4Props): React.ReactElement;
//# sourceMappingURL=LeaderboardRowV4.d.ts.map
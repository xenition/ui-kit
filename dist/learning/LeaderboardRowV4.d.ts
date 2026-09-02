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
 * LeaderboardRow — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded row with a soft shadow: rank (a medal glyph for the top three),
 * avatar, name, an optional trend note, and a big legible **tabular-nums** score.
 * `highlighted` marks the current user with a primary ring; `empty` renders a
 * muted placeholder for an unfilled slot. Interactive rows are a keyboard-operable
 * `role="button"`. Honors the V4 `variant` — `full` (default) and `compact` (a
 * denser single line). All colors from `--xen-*` token classes (no literals).
 */
export declare const LeaderboardRowV4: React.ForwardRefExoticComponent<LeaderboardRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaderboardRowV4.d.ts.map
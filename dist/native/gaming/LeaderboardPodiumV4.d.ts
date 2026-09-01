import * as React from 'react';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';
export interface LeaderboardPodiumV4Props extends LeaderboardPodiumProps {
    /** How a podium score is written. Default {@link formatCount} — `4200` → `'4.2K'`. */
    formatScore?: (score: number) => string;
}
/**
 * **V4 leaderboard podium** — same props as {@link LeaderboardPodium} plus
 * `formatScore`.
 *
 * ## Four changes
 *
 * 1. **A podium place is identity, not status.** Gold was `warn` and bronze
 *    `accent` — two status slots spent on a ribbon — and each pillar was a
 *    translucent 18% wash of that colour, so the same place was a different
 *    shade on every surface it sat on. The medal glyph and the pillar height
 *    carry the place; the ground is the module's one opaque neutral.
 * 2. **Second place stops wearing the hairline as a tier accent.** `border`
 *    exists to draw a 1px rule; used as a fill it means whatever the ramp
 *    happens to be, and it made silver read as "unstyled" rather than as
 *    second.
 * 3. **The pillar heights come off the spacing scale**, so the podium keeps
 *    its proportions when a seed re-scales its rhythm.
 * 4. **A place is one spoken name including its score**, and `formatScore`
 *    makes the drawn number and the announced one the same string — the base
 *    drew `formatCount(score)` and announced the raw integer, so a reader and
 *    a viewer compared different numbers. A press is a state layer.
 */
export declare function LeaderboardPodiumV4({ entries, emptyLabel, formatScore, onPress, style, }: LeaderboardPodiumV4Props): React.ReactElement;
//# sourceMappingURL=LeaderboardPodiumV4.d.ts.map
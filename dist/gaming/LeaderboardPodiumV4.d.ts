import * as React from 'react';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';
export interface LeaderboardPodiumV4Props extends LeaderboardPodiumProps {
    /** Format a podium score. Default {@link formatCount} — `1234` → `'1.2K'`. */
    formatScore?: (score: number) => string;
}
/**
 * **V4 leaderboard podium** — same props as {@link LeaderboardPodium} plus
 * `formatScore`.
 *
 * ## Four changes
 *
 * 1. **A podium place is identity, not status.** Gold was `warn` and bronze
 *    `accent` — so the winner of a leaderboard was drawn in the colour the kit
 *    uses to warn you about something, and third place in the brand's
 *    secondary. Second place was worse: it spent `border` — the **hairline**
 *    colour, which has no contrast promise at all — as a tier accent, so on
 *    some seeds it simply vanished. The medal, the `#1`/`#2`/`#3` and the
 *    pillar height say which place it is; all three pillars share one neutral
 *    ground and one hairline.
 * 2. **A place that is not a button still has a name.** The static form put
 *    `aria-label` on a bare `<div>`, where ARIA forbids it — so the rank, the
 *    name and the score were discarded, while the native twin announced all
 *    three. It is a `group` now, and the interactive form keeps the score in
 *    its name the way the V2 and V3 lines already did.
 * 3. **Scores are formatted once, by `formatScore`.** The base printed
 *    `formatCount(score)` on the pillar and announced the raw integer, so a
 *    reader heard "1247 points" where the screen said "1.2K" — two different
 *    numbers for the same fact, and no way for an app to change either.
 * 4. **The pillar ground is a token mix and the press is a state layer.**
 *    `bg-neutral-100` inverts under `[data-theme="dark"]`; `hover:opacity-90`
 *    dims the podium's own content, which is M3's disabled signal. Each place
 *    clears 44 and rings in the kit's one `ring` colour.
 */
export declare const LeaderboardPodiumV4: React.ForwardRefExoticComponent<LeaderboardPodiumV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaderboardPodiumV4.d.ts.map
import * as React from 'react';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';
/** Drop-in alternate of {@link LeaderboardPodiumProps} — identical prop contract. */
export type LeaderboardPodiumV2Props = LeaderboardPodiumProps;
/**
 * LeaderboardPodium — design variant **V2**: a **classic 3-column podium with
 * medal tiers**. A titled, elevated card frames three pedestals (2nd · 1st ·
 * 3rd) whose heights and tinted risers escalate to the champion, each carrying a
 * medal, ringed avatar, name, a rank chip, and score. Where V1 is a bare compact
 * podium, V2 is a taller, ceremonial stand with a crown on first and stronger
 * tier tints. Uses **guarded indexing** so a 1–2 entry list omits missing places
 * and renders an `EmptyState` when empty. Same props as
 * {@link LeaderboardPodiumProps}. Token-only.
 */
export declare function LeaderboardPodiumV2({ entries, emptyLabel, onPress, style, }: LeaderboardPodiumV2Props): React.ReactElement;
//# sourceMappingURL=LeaderboardPodiumV2.d.ts.map
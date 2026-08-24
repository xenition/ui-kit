import * as React from 'react';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';
/** Drop-in alternate of {@link LeaderboardPodiumProps} — identical prop contract. */
export type LeaderboardPodiumV3Props = LeaderboardPodiumProps;
/**
 * LeaderboardPodium — design variant **V3**: a **horizontal top-3 strip**. The
 * leaders read left→right (1 · 2 · 3) as equal-width tiles — medal, ringed
 * avatar, name, and score stacked in each — instead of V1/V2's stepped
 * pedestals. Uses **guarded indexing** so a 1–2 entry list renders only the
 * present tiles and an `EmptyState` when there are none. Same props as
 * {@link LeaderboardPodiumProps}. Token-only, minimal (hairline dividers).
 */
export declare function LeaderboardPodiumV3({ entries, emptyLabel, onPress, style, }: LeaderboardPodiumV3Props): React.ReactElement;
//# sourceMappingURL=LeaderboardPodiumV3.d.ts.map
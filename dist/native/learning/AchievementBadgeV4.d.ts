import * as React from 'react';
import type { AchievementBadgeProps } from './AchievementBadge';
/** Drop-in for {@link AchievementBadgeProps} — same props, the V4 "campus" design. */
export type AchievementBadgeV4Props = AchievementBadgeProps;
/**
 * AchievementBadge — **V4** "campus" design (native twin of the web V4). A
 * gamification achievement badge: a tier-toned medallion (a tinted well inside a
 * toned ring) with an icon, plus a title / description. Locked achievements dim
 * the medallion and overlay a 🔒 (state is spoken, not color-only). Tappable when
 * `onPress` is set. Token-only colors via `useXenitionTheme()`.
 */
export declare function AchievementBadgeV4({ title, glyph, tier, unlocked, description, size, hideLabel, onPress, style }: AchievementBadgeV4Props): React.ReactElement;
//# sourceMappingURL=AchievementBadgeV4.d.ts.map
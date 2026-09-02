import * as React from 'react';
import type { AchievementBadgeProps } from './AchievementBadge';
/** Drop-in for {@link AchievementBadgeProps} — same props, the V4 "campus" design. */
export type AchievementBadgeV4Props = AchievementBadgeProps;
/**
 * AchievementBadge — **V4** "campus" design (web parity of the native V4). A
 * gamification achievement badge: a tier-toned medallion (a tinted well inside a
 * toned ring) with an icon, plus a title / description. Locked achievements dim
 * the medallion and overlay a 🔒 (state is spoken, not color-only). Interactive
 * badges are a keyboard-operable `role="button"`. Identical props/behavior to
 * {@link AchievementBadgeProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
export declare const AchievementBadgeV4: React.ForwardRefExoticComponent<AchievementBadgeProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AchievementBadgeV4.d.ts.map
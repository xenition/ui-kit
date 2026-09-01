import * as React from 'react';
import type { LiveBadgeProps, LiveBadgeVariant } from './LiveBadge';
export type { LiveBadgeVariant };
/** Drop-in for {@link LiveBadgeProps} — same props, the V4 "spotlight" design. */
export type LiveBadgeV4Props = LiveBadgeProps;
/**
 * LiveBadge — **V4** "spotlight" design. A refined LIVE pill: a pulsing-look
 * `danger` dot (a solid core inside a soft-danger halo ring, so live status
 * reads by glyph + color, never color alone) beside a bold "LIVE" label on a
 * soft `withAlpha(danger, 0.12)` tint pill. Keeps the base's three variants
 * (`solid` / `outline` / `dot`) and the optional viewer count. Same
 * props/behavior as {@link LiveBadgeProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha` — no literal hex.
 */
export declare function LiveBadgeV4({ variant, label, viewers, accessibilityLabel, style, }: LiveBadgeV4Props): React.ReactElement;
//# sourceMappingURL=LiveBadgeV4.d.ts.map
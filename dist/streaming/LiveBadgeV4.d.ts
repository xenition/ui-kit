import * as React from 'react';
import type { LiveBadgeProps, LiveBadgeVariant } from './LiveBadge';
export type { LiveBadgeVariant };
/** Drop-in for {@link LiveBadgeProps} — same props, the V4 "spotlight" design. */
export type LiveBadgeV4Props = LiveBadgeProps;
/**
 * LiveBadge — **V4** "spotlight" design (web parity of the native V4). A refined
 * LIVE pill: a pulsing-look `danger` dot (a solid core inside a soft-danger halo
 * ring, so live status reads by glyph + color, never color alone) beside a bold
 * "LIVE" label on a soft `bg-danger/10` tint pill. Keeps the base's three
 * variants (`solid` / `outline` / `dot`) and the optional viewer count. Same
 * props/behavior as {@link LiveBadgeProps}; every color resolves from `--xen-*`
 * danger / on-danger / muted tokens — no literal hex. The combined text
 * (label + viewers) is exposed as the element's `aria-label`.
 */
export declare const LiveBadgeV4: React.ForwardRefExoticComponent<LiveBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=LiveBadgeV4.d.ts.map
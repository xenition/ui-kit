import * as React from 'react';
import type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb';
export type { BreadcrumbProps as BreadcrumbV4Props, BreadcrumbItem };
/**
 * **V4 breadcrumb** — same props as {@link Breadcrumb}, a different design
 * line.
 *
 * ## What a breadcrumb is for
 *
 * §29 asks that the user always know three things: where they are, what they
 * are editing, and how to go back. A breadcrumb is the only component in the
 * kit that answers all three at once, so the whole design is about making the
 * answer separable at a glance (§33 — users scan before they read).
 *
 * The trail therefore has exactly two registers, not a gradient of them:
 *
 * - **Where you are** is the last item, in `onSurface` at weight 600. It is
 *   the only full-contrast text in the row, so a scan finds it without
 *   counting separators.
 * - **How to go back** is everything before it, in `muted` at 400, each one a
 *   real target.
 *
 * ## The separator is a chevron, not a slash
 *
 * The base default was `/`, which reads as a path — a filesystem string the
 * user is expected to parse. `›` reads as *direction*: this came from that.
 * Same prop, same type, a different default; pass `separator` to override it
 * exactly as before. It is drawn in `muted`, because a separator that competes
 * with the labels it separates is noise (§7).
 *
 * ## Reach
 *
 * Each link is a full 44pt target, composed from the spacing scale. The base
 * trail wrapped bare `Text` in a `Pressable` with no padding at all — a 17pt
 * tap target, and the one control on the screen whose entire job is *getting
 * out of here* (§30).
 */
export declare function BreadcrumbV4({ items, separator, style, }: BreadcrumbProps): React.ReactElement;
//# sourceMappingURL=BreadcrumbV4.d.ts.map
import * as React from 'react';
import type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb';
export type { BreadcrumbProps as BreadcrumbV4Props, BreadcrumbItem };
/**
 * **V4 breadcrumb** — the web twin of the native `BreadcrumbV4`, same props as
 * {@link Breadcrumb}, a different design line.
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
 * - **Where you are** is the last item, in `on-surface` at weight 600, carrying
 *   `aria-current="page"`. It is the only full-contrast text in the row, so a
 *   scan finds it without counting separators.
 * - **How to go back** is everything before it, in `muted`, each one a real
 *   target that underlines on hover so it reads as a link before it is clicked.
 *
 * ## The separator is a chevron, not a slash
 *
 * The base default was `/`, which reads as a path — a filesystem string the
 * user is expected to parse. `›` reads as *direction*: this came from that.
 * Same prop, same type, a different default; pass `separator` to override it
 * exactly as before. It is `aria-hidden`, because a screen reader announcing a
 * chevron between every crumb is noise and the list order already carries the
 * nesting.
 *
 * ## A link you can reach with a keyboard
 *
 * The base rendered `<a onClick>` with no `href` for a click-only crumb. An
 * anchor without an `href` is not in the tab order and does not fire on Enter,
 * so a keyboard user could see the way back and not take it — §46 makes that a
 * defect, not a nicety. V4 renders an `<a>` only when there is somewhere to go
 * and a `<button>` when there is only a handler, which is what each element
 * actually means.
 *
 * ## Reach
 *
 * Each link is a full 44px target composed from the spacing scale. The base
 * trail had none — a 17px hit area on the one control whose entire job is
 * *getting out of here* (§30).
 */
export declare function BreadcrumbV4({ items, separator, className, }: BreadcrumbProps): React.ReactElement;
//# sourceMappingURL=BreadcrumbV4.d.ts.map
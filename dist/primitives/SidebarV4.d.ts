import * as React from 'react';
import type { SidebarGroup, SidebarItem, SidebarProps } from './Sidebar';
export type { SidebarProps as SidebarV4Props, SidebarItem, SidebarGroup };
/**
 * `Sidebar`, V4 — the same props, and a rail that answers "where am I?".
 *
 * ## No shadow, and that is the point
 *
 * A persistent nav rail is **not** a layer. It is attached to the edge of the
 * page and separated by a hairline, and §11 asks that a container earn its
 * existence rather than draw a box because that looks modern. So this component
 * spends no `elevation` at all: the only V4 primitive in the chrome family that
 * deliberately does not.
 *
 * The rail genuinely does become a layer in one situation — slid in over the
 * page on a narrow screen — and that is `AppShellV4`'s job, because the drawer
 * is the thing that is floating, not the sidebar inside it. Putting the shadow
 * here would make the persistent rail cast one onto the content beside it,
 * which is a shadow with nothing to fall from.
 *
 * ## Saying where the user is
 *
 * §29 gives navigation one job above every other: the user should always know
 * where they are, and §32 asks that they recognise it rather than recall it. So
 * the current row carries three signals — a brand tint, the brand text colour
 * and a leading rail — rather than the single solid `primary` fill the native
 * base paints, which repaints the row and takes the icon and the label with it.
 *
 * Group headings move from `muted` to `muted-text`: `muted` is a decorative
 * slot with no contrast promise, and a section heading is text.
 *
 * ## Feedback
 *
 * Hover and press are the M3 state layer — the row's own content colour at
 * 0.08 / 0.12 over `surface`. The base's `hover:bg-neutral-100` is a
 * light-oriented ramp step and paints a near-white slab across a dark rail.
 * Focus is `--xen-ring`, the one ring the kit shares, rather than
 * `ring-primary-300`, which is another ramp step and inverts the same way.
 */
export declare const SidebarV4: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=SidebarV4.d.ts.map
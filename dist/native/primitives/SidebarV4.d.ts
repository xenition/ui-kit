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
 * page on a phone — and that is `AppShellV4`'s job, because the drawer is the
 * thing that is floating, not the sidebar inside it. Putting the shadow here
 * would make the persistent rail cast one onto the content beside it, which is
 * a shadow with nothing to fall from.
 *
 * ## Saying where the user is
 *
 * §29 gives navigation one job above every other: the user should always know
 * where they are, and §32 asks that they recognise it rather than recall it. The
 * base fills the current row solid `primary` — which wins the "which one"
 * question and loses the icon, the label and the group structure under a brand
 * bar, exactly what §35.6 calls colour as noise rather than hierarchy.
 *
 * V4 uses three quieter signals instead: a brand **tint** at 12% composited
 * into `surface`, the contrast-corrected `primaryText` for the label, and a
 * leading rail in `primary`. The tint is composited rather than laid on with
 * alpha, so the row owns its colour instead of borrowing whatever it sits on;
 * the rail survives for a user who cannot separate the tint from the surface at
 * all. Selection also reaches the accessibility layer, not just the pixels.
 *
 * The tint mixes the **scheme-resolved** `primary` into the scheme-resolved
 * `surface`, never `tokens.ramps.primary[50]` — the ramps carry the light
 * orientation in both schemes, so that step is the palest one on a dark page
 * too.
 *
 * Group headings move from `muted` to `mutedText`: `muted` is a decorative slot
 * with no contrast promise, and a section heading is text.
 *
 * ## Feedback
 *
 * Press is the M3 state layer — the row's own content colour over its own
 * ground, at `state.pressed`. Every row clears 44pt, composed from the spacing
 * scale; the base's `paddingVertical: sm` put it around 34.
 */
export declare function SidebarV4({ brand, items, groups, footer, style, }: SidebarProps): React.ReactElement;
//# sourceMappingURL=SidebarV4.d.ts.map
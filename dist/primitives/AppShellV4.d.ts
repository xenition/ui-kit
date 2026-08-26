import * as React from 'react';
import type { AppShellProps } from './AppShell';
export type { AppShellProps as AppShellV4Props };
/**
 * `AppShell`, V4 — the same props, and exactly one layer.
 *
 * ## Which container earns depth, and which does not
 *
 * §11 asks that a container earn its existence. This shell has four candidates
 * and gives depth to one of them:
 *
 * - The **persistent rail** is attached to the page edge and separated by the
 *   `Sidebar`'s own hairline. It is not floating, so it casts nothing.
 * - The **top bar** is sticky, not raised. It stays flat with a hairline: a
 *   shadow under a bar that content scrolls beneath is the honest signal, but
 *   only once the content is actually under it, and a shell cannot know that
 *   without owning the scroll position of a region the caller fills. A hairline
 *   is true in every state, which §14 prefers to a decoration that is right
 *   half the time.
 * - The **content column** is the page. Pages do not float.
 * - The **slide-in drawer** genuinely is above the page, over a scrim, with the
 *   content still visible behind it. That one takes `--xen-elevation-sheet`,
 *   the same altitude as every other V4 overlay.
 *
 * The drawer wrapper is always `solid` rather than following the seed's glass
 * setting, and that is deliberate: it holds an opaque `Sidebar` that paints its
 * own surface, so a translucent wrapper would frost nothing. A component should
 * not claim a treatment it cannot deliver.
 *
 * ## The scrim
 *
 * `--xen-elevation-color` at a fixed alpha, shared with `ModalV4`, `DrawerV4`
 * and the rest. The base's `bg-neutral-900/50` is a LIGHT-oriented ramp step:
 * the dark block re-emits the ramps mirrored, so it paints a near-white veil
 * over a dark page.
 *
 * ## Motion
 *
 * The drawer travels the whole of itself from the left edge — §36.5's spatial
 * continuity, so the movement says where it came from and where dismissing it
 * sends it back — on the same keyframes and the same duration `DrawerV4` uses,
 * because they are the same object. Under `prefers-reduced-motion` the travel
 * becomes a fade.
 *
 * ## The menu button
 *
 * It hovers and presses with the M3 state layer rather than
 * `hover:bg-neutral-100`, rings with the shared `--xen-ring`, and clears the
 * 44px target composed from the spacing scale. The base's `p-2` around a 20px
 * glyph put it at 36 — under the target, on the control that is the only way
 * into navigation on a phone.
 */
export declare const AppShellV4: React.ForwardRefExoticComponent<AppShellProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AppShellV4.d.ts.map
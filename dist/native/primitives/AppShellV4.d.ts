import * as React from 'react';
import type { AppShellProps } from './AppShell';
export type { AppShellProps as AppShellV4Props };
/**
 * `AppShell`, V4 — the same props, and exactly one layer.
 *
 * ## Which container earns depth, and which does not
 *
 * §11 asks that a container earn its existence. This shell has three candidates
 * and gives depth to one of them:
 *
 * - The **top bar** is pinned, not raised. It stays flat with a hairline: a
 *   shadow under a bar is honest only once content is actually scrolling
 *   beneath it, and a shell cannot know that without owning the scroll position
 *   of a region the caller fills. A hairline is true in every state, which §14
 *   prefers to a decoration that is right half the time.
 * - The **content area** is the page. Pages do not float.
 * - The **slide-in drawer** genuinely is above the page, over a scrim, with the
 *   content still visible behind it. That one takes `elevation.sheet`, the same
 *   altitude as every other V4 overlay.
 *
 * The drawer is opaque rather than following the seed's glass setting, and that
 * is deliberate: it holds an opaque `Sidebar` that paints its own surface, so a
 * translucent wrapper would frost nothing. A component should not claim a
 * treatment it cannot deliver.
 *
 * ## The scrim
 *
 * The shadow colour at a fixed alpha, shared with `ModalV4`, `DrawerV4` and the
 * rest. The base painted `colors.onSurface` at 0.5, which INVERTS with the
 * scheme and lays a white veil over a dark page.
 *
 * ## Motion
 *
 * The base opens the drawer with `animationType="slide"`, which on React Native
 * means *up from the bottom* — a left-anchored rail arriving from underneath
 * the screen, which says something false about where it lives (§36.5). V4
 * drives the travel itself: the panel moves the width of itself, from the left
 * edge, at `SURFACE_MOTION.sheet`, with `motion.easingEnter` so it settles
 * rather than stopping dead. Under Reduce Motion the travel is dropped and the
 * scrim's fade carries the transition.
 *
 * ## The menu button
 *
 * It becomes a real 44pt target composed from the spacing scale — the base's
 * `padding: xs` around a glyph put it near 28, on the control that is the only
 * way into navigation on a phone — presses with the M3 state layer, and draws
 * its glyph through the kit's own `Icon` rather than a raw `≡` in a `<Text>`,
 * so the whole kit uses one symbol for one idea.
 */
export declare function AppShellV4({ sidebar, header, children, menuLabel, sidebarWidth, style, }: AppShellProps): React.ReactElement;
//# sourceMappingURL=AppShellV4.d.ts.map
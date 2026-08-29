import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export interface GridV4Props extends ViewProps {
    /**
     * Number of equal-width columns. Defaults to 2 — §3's "two per row on a
     * phone, never four".
     */
    columns?: number;
    /**
     * Gutter between cells, from the spacing scale. Defaults to `md` (16) —
     * §4.1's grid / KPI gutter.
     */
    gap?: SpaceKey;
    /**
     * Minimum width, in px, that a cell is allowed to shrink to.
     *
     * **On native this prop is accepted for parity and does not change the
     * layout** — see the platform-divergence note on the component below. The
     * grid renders its `columns` tracks exactly as it would without it, so
     * passing it from shared code is always safe.
     *
     * On web it switches the template to
     * `repeat(auto-fit, minmax(<minItemWidth>px, 1fr))` and `columns` is ignored.
     */
    minItemWidth?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * **V4 grid** — the native twin of the web `GridV4`, the base `Grid`'s props
 * plus one, a different design line.
 *
 * Structurally the base: children wrap into equal-width cells using the classic
 * gutter technique (a negative margin on the container, half the gutter as
 * padding on every cell), so the token-bound `gap` traces to the compiled
 * spacing scale. It paints nothing — no ground, no border, no radius — so there
 * is no state layer, no motion and no elevation here, and a `GridV4` full of
 * `CardV4`s is a flat container of raised things rather than a raised container
 * (§4.6: never nest a shadow in a shadow).
 *
 * ## What V4 changes
 *
 * 1. **`minItemWidth`** is accepted, for prop parity with the web twin. See the
 *    divergence note below for what it does here, which is nothing.
 * 2. **An empty grid costs nothing.** The base applies its negative margins
 *    unconditionally, so a `Grid` with no children pulled its siblings a half
 *    gutter closer on every side — an empty component leaving a visible dent in
 *    the page, which §4.5 rules out. With no cells there is nothing to gutter,
 *    so the margins come off.
 *
 * ### Platform divergence — read this before changing either twin
 *
 * The props are identical on both twins; the *mechanism* cannot be, because
 * **React Native has no CSS grid and no container queries**. There is no
 * `auto-fit` and no `minmax()` to reach for, and measuring the container with
 * `onLayout` to derive a column count would make the grid re-render on layout —
 * a per-frame cost this kit does not pay for a layout primitive.
 *
 * - **Web (`src/layout/GridV4.tsx`):** `minItemWidth` switches the template to
 *   `repeat(auto-fit, minmax(<minItemWidth>px, 1fr))`; the browser fits as many
 *   tracks as the container holds.
 * - **Native (this file):** `minItemWidth` **degrades to the `columns`
 *   behaviour**. A native caller that needs a different column count on a
 *   tablet passes a different `columns`.
 *
 * The prop is therefore a progressive enhancement, not a promise: passing it is
 * always safe and never breaks this layout.
 */
export declare function GridV4({ columns, gap, minItemWidth: _minItemWidth, style, children, ...rest }: GridV4Props): React.ReactElement;
//# sourceMappingURL=GridV4.d.ts.map
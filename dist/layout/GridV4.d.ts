import * as React from 'react';
import { type SpaceKey } from './_tokens';
export interface GridV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Number of equal-width columns. Defaults to 2 — §3's "two per row on a
     * phone, never four". Ignored when `minItemWidth` is set.
     */
    columns?: number;
    /**
     * Gutter between cells, from the spacing scale. Defaults to `md` (16) —
     * §4.1's grid / KPI gutter.
     */
    gap?: SpaceKey;
    /**
     * Minimum width, in px, that a cell is allowed to shrink to. When set, the
     * grid **fits as many columns as the container can hold** at that width and
     * `columns` is ignored. Default `undefined`, i.e. today's fixed-column grid.
     *
     * This is the scoped form of the one idea the Tamagui review produced: a
     * layout that restyles itself at a breakpoint. It is deliberately *not* a
     * general responsive-prop system — no `$gtSm={{ … }}`, no media-query props —
     * because a breakpoint mechanism for the whole kit is its own piece of work.
     * What it buys immediately is that `KpiRow` and `QuickActions` stop being
     * two-up on a tablet as well as on a phone.
     *
     * The number is the caller's own measurement of its content, not a value this
     * file chose, which is why it is allowed to be a bare number under §1.
     */
    minItemWidth?: number;
}
/**
 * **V4 grid** — the web twin of the native `GridV4`, the base `Grid`'s props
 * plus one, a different design line.
 *
 * Structurally the base: a CSS grid, `columns` equal tracks, a token-bound
 * `gap`. It paints nothing — no ground, no border, no radius — so there is no
 * state layer, no motion sheet and no depth here, and a `GridV4` full of
 * `CardV4`s is a flat container of raised things rather than a raised container
 * (§4.6: never nest a shadow in a shadow).
 *
 * ## What V4 changes
 *
 * **`minItemWidth`.** See the prop.
 *
 * ### Platform divergence — read this before changing either twin
 *
 * The props are identical on both twins; the *mechanism* cannot be, because
 * **React Native has no CSS grid and no container queries**. There is no
 * `auto-fit` and no `minmax()` to reach for, and measuring the container to
 * derive a column count would make the grid re-render on layout — a per-frame
 * cost this kit does not pay for a layout primitive.
 *
 * - **Web (this file):** `minItemWidth` switches the template to
 *   `repeat(auto-fit, minmax(<minItemWidth>px, 1fr))`. The browser fits as many
 *   tracks as the container holds and the surplus space is shared between them.
 * - **Native (`src/native/layout/GridV4.tsx`):** `minItemWidth` is accepted,
 *   documented, and **degrades to the `columns` behaviour** — the grid renders
 *   exactly as it would without it. A native caller that needs a different
 *   column count on a tablet passes a different `columns`.
 *
 * The prop is therefore a progressive enhancement, not a promise: passing it is
 * always safe and never breaks the native layout, which is why it takes
 * precedence over `columns` rather than replacing it.
 */
export declare const GridV4: React.ForwardRefExoticComponent<GridV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GridV4.d.ts.map
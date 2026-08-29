import * as React from 'react';
import { type StatCardV4Props } from './StatCardV4';
/**
 * How many KPIs sit across one row.
 *
 * **Capped at 3, in the type.** Brief §3 and §5 are explicit: two per row on a
 * phone, never four, never a bordered six-cell grid — four KPIs across a phone
 * is the admin-panel look this pass exists to remove. A cap enforced by the
 * compiler is a cap that holds; a cap enforced by a comment is a suggestion.
 */
export type KpiRowV4Columns = 2 | 3;
export interface KpiRowV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /** The stat cards to lay out. Renders nothing when empty. */
    items: StatCardV4Props[];
    /**
     * Cards per row. Default `2` — §3's "two per row on a phone". `3` is the
     * ceiling; see {@link KpiRowV4Columns}.
     */
    columns?: KpiRowV4Columns;
    /**
     * Minimum width a card may shrink to, in px. When set, the row **fits as
     * many columns as the container holds** at that width and `columns` is
     * ignored — so a KPI strip stops being two-up on a tablet as well as on a
     * phone.
     *
     * Passed straight through to `GridV4`, which is where the mechanism and its
     * platform divergence are documented: on native the prop is accepted, does
     * nothing, and degrades to `columns`. Passing it from shared code is
     * therefore always safe.
     */
    minItemWidth?: number;
    /**
     * Whether the cards carry `elevation.card`. Default `true` — a KPI strip
     * sits on the page (brief §5's dashboard order: summary metrics first, above
     * the section cards).
     *
     * Pass `false` when the strip is **inside** a card: §4.6 forbids nesting a
     * shadow in a shadow, and a `StatCard` inside a `SectionCard` is flat. An
     * item's own `raised` still wins, so one card in the strip can differ.
     */
    raised?: boolean;
}
/**
 * **V4 KPI row** — the summary strip at the top of a dashboard.
 *
 * shadcn's dashboard blocks confirm the composition order this component sits
 * in — navigation, then summary metric cards, then a chart, then a table — so
 * a `KpiRowV4` belongs above the section cards, not among them.
 *
 * Three changes, and the first is the reason the file exists.
 *
 * 1. **`basis-[44%]` is gone.** Brief §1 names it a literal to remove, and it
 *    was doing the job of a column count by arithmetic: "44% plus a gap, so two
 *    fit and a third cannot" is a magic number that quietly becomes three-up
 *    the moment the gutter changes. V4 states the intent instead — `GridV4`
 *    with `columns`, on §4.1's `md` grid gutter — and takes `minItemWidth`
 *    with it, so the same strip can be three-up on a tablet without a second
 *    percentage being guessed.
 * 2. **`columns` is capped at 3** (§3, §5). See {@link KpiRowV4Columns}.
 * 3. **An empty strip renders `null`, not an empty flex box** (§4.5, and §5
 *    names it for this component specifically). The base returned a `<div>`
 *    with a `gap` on it, which on a page laid out with `Column gap="xl"`
 *    leaves a 32px hole where nothing is — an empty component denting the
 *    page.
 *
 * The cards themselves are `StatCardV4`, so everything §3 decided about a stat
 * — the `card` ground, the `3xl` value, the trend glyph — arrives here by
 * composition rather than by being restated (§10.5).
 */
export declare const KpiRowV4: React.ForwardRefExoticComponent<KpiRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=KpiRowV4.d.ts.map
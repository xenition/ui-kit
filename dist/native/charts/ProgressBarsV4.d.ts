import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { LegendV4Tone } from './LegendV4';
export interface ProgressBarsV4Item {
    /** The row's name. Truncates to one line, as every row title in the kit does. */
    label: string;
    /** The row's value, measured against `max`. */
    value: number;
    /**
     * Opt this row into a status hue instead of slot 1.
     * Use only where the row genuinely *means* good or bad (rule 3).
     */
    tone?: LegendV4Tone;
    /** The row's supporting line — "3 of 12 done", "up 4 this week". */
    caption?: string;
}
export interface ProgressBarsV4Props {
    /** The rows, in the order they should be read. This component never re-sorts. */
    items: ProgressBarsV4Item[];
    /** The value mapped to a full bar. Defaults to the largest item. */
    max?: number;
    /** Show the numeric value at the trailing end of each row. Default `true`. */
    showValues?: boolean;
    /** The descriptive headline (§4.2). */
    title?: string;
    /** The quiet line under the list. */
    caption?: string;
    /** Format a value for its trailing readout. Default `String`. */
    valueFormat?: (value: number) => string;
    /** Called when a row is pressed. Rows are already at the 44 floor (§4.3). */
    onItemSelect?: (item: ProgressBarsV4Item, index: number) => void;
    /** Show the loading placeholder at the list's footprint instead of the rows. */
    loading?: boolean;
    /** What the empty state says. */
    emptyLabel?: string;
    /** Play the entrance reveal. Default `true` (§4.7). */
    animate?: boolean;
    /** Override the derived accessible sentence (rule 6). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 progress bars** — a labelled row list with a bar per row.
 *
 * ## This is a list, not a plot, and that decides almost everything
 *
 * Brief §5 Group D says it in one line — "the one chart-shaped thing that is
 * really a *list*, so it takes the row metric from
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.3, not a chart metric" — and the
 * consequences are worth spelling out, because every one of them is a place the
 * naive reading would have gone wrong.
 *
 * - **The row height is the row family's.** `rowMetrics(theme).twoLine` — 72,
 *   composed as `2xl + lg`, M3's two-line list container — *imported* from
 *   `dashboard/internal/row-v4.ts` rather than restated. A row carrying a title
 *   and a bar is a two-line row: the bar sits where a supporting line sits. The
 *   point of importing is that a "top channels" list inside a dashboard card
 *   and the `SettingsRow` list on the next screen must be indistinguishable as
 *   a family, and they cannot be if one of them measured its own height. The
 *   base used a bare `spacing.sm` between rows and no height at all, so its
 *   rows were shorter than every other row in the product.
 * - **The horizontal padding is `spacing.md`,** the row gutter. The list lives
 *   inside a card that is already inset by `lg`; paying the page gutter twice
 *   pushes every row's text into a narrow channel down the middle.
 * - **The accessible shape is a list.** Not `accessibilityRole="image"`, which
 *   is what the base used. Rule 6 asks every *chart* to state its value in
 *   words because a rendered plot has no text a screen reader can reach — but
 *   this component's values already *are* text, in reading order, one per row.
 *   Collapsing them into a single image with a derived sentence takes working
 *   content away and gives back a summary. So the container is a `list` with
 *   the derived sentence as its label, and each row names itself and its value.
 *   This is a decision the brief did not settle; it is the one that loses
 *   nothing.
 * - **The bar is not coloured by its own value.** §4.1: bar length already
 *   shows magnitude, and spending the identity channel on it says nothing new.
 *   Every row is slot 1 unless it carries a `tone`, which is the *only* way a
 *   status hue is painted here (rule 3, §4.3). The base's per-item `color` took
 *   any semantic slot, which is how a list of five rows ended up green, amber
 *   and red for no reason other than being third, fourth and fifth.
 *
 * ## What the bar itself is made of
 *
 * A track at `palette.grid` — chart *chrome*, the same recessive neutral the
 * grid lines take — under a fill at slot 1. The track matters: without it a
 * reader cannot see how much of the row is unfilled, and rows stop being
 * comparable, which is the entire reason the form exists.
 *
 * `CHART_MARK.endRadius` at the **data end only** (§4.4). For a horizontal bar
 * the data end is the trailing edge and the baseline is the leading edge, so
 * the corners are rounded on the right and square on the left. A fill rounded
 * at both ends floats off its own zero.
 *
 * The bar's thickness is `CHART_MARK.dotSize` — the module's smallest painted
 * mark, reused rather than a new number, which is also why it is not a prop: a
 * list whose rows have different bar weights is not one list.
 *
 * ## Why it does not compose `MiniBarV4`
 *
 * The base builds each row on `MiniBar`, and rule 8's "a V4 composite composes
 * V4 children" would point at `MiniBarV4`. It deliberately does not, for a
 * reason about the form rather than about build order: a `MiniBar` is a
 * **mark** — a fill with no track — and this row needs a track, because the
 * unfilled remainder is half of what a reader is comparing. Composing the mark
 * and then drawing a track behind it would leave the two halves of one bar
 * owned by two components.
 */
export declare function ProgressBarsV4({ items, max, showValues, title, caption, valueFormat, onItemSelect, loading, emptyLabel, animate: _animate, accessibilityLabel, style, }: ProgressBarsV4Props): React.ReactElement;
//# sourceMappingURL=ProgressBarsV4.d.ts.map
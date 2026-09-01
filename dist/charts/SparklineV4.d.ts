import * as React from 'react';
import { type ChartToneV4 } from './LineChartV4';
export interface SparklineV4Props extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'slot'> {
    /** Trend values, drawn left to right as one compact line. */
    data: number[];
    /** The viewBox width. */
    width?: number;
    /** The viewBox height. */
    height?: number;
    /**
     * Which categorical slot the line is painted from. Default `0` — the brand
     * hue itself, which is why a sparkline in a `TrendCardV4` matches the card
     * it sits in (see `CHART_HUE_OFFSETS`: "slot 1 is the brand hue at +0").
     */
    slot?: number;
    /**
     * Paint the line with a **status** hue instead of its slot, because the
     * series genuinely means good or bad. Ships with a label from whatever
     * figure the mark sits inside, never colour alone (brief §1 rule 3).
     */
    tone?: ChartToneV4;
    /** Value at the top of the box. Defaults to the largest datum. */
    max?: number;
    /** Value at the bottom of the box. Defaults to the smallest datum. */
    min?: number;
    /** Show the loading placeholder at the mark's own footprint. */
    loading?: boolean;
    /** Play the entrance reveal. Default `true`. */
    animate?: boolean;
    /**
     * The spoken sentence. Derived when omitted — brief §1 rule 6 applies to a
     * mark exactly as it does to a figure: a rendered trend that says nothing in
     * words is not accessible, however small it is.
     */
    'aria-label'?: string;
}
/**
 * **V4 sparkline** — a **mark**, not a figure.
 *
 * Brief §5 Group A is explicit: no title, no legend, no axis. HIG's "match
 * chart size to functionality" is the argument — a sparkline is a deliberate
 * size class that lives *inside* someone else's figure (a `TrendCardV4`, a
 * table cell, a row), and it carries none of §4.2's frame. Everything the
 * reader needs in words comes from the figure around it; what this component
 * owes is the shape and one honest sentence for a screen reader.
 *
 * ## What the base got wrong
 *
 * 1. **Colour was a semantic token.** `color = 'primary'` → `var(--xen-primary)`.
 *    A sparkline is a one-series mark, so it takes **slot 1** — which is the
 *    brand hue at `+0` rotation, so it lands where the base landed *and* it
 *    now belongs to the same palette as every other chart in the product,
 *    rather than to a token that happens to look similar.
 * 2. **`strokeWidth={1.5}` and `r={2}` were typed in.** Both are on brief §1
 *    rule 1's list of literals to remove. They are {@link CHART_MARK.stroke}
 *    and {@link CHART_MARK.dotSize} now.
 * 3. **The empty state dropped the footprint.** `ChartEmpty` renders a
 *    `text-sm` "No data" span, which in a 100×28 slot is both too big to fit
 *    and a different height from the mark it replaces — so a table of
 *    sparklines reflows the instant one row has no history. §4.5's rule is
 *    that all three states keep the footprint.
 * 4. **The twins were different components.** The web one is a polyline; the
 *    native one fakes it with `View` bars. Same name, same props, two
 *    different pictures. The native V4 moves to `react-native-svg` and this
 *    file is what it now matches.
 *
 * ## The empty state is a rule, not a sentence
 *
 * §4.5 asks for `ChartEmptyV4` and forbids a bare string or `null`. At a
 * mark's size neither is available: `ChartEmptyV4`'s label does not fit in 28
 * pixels of height, and shrinking it would be inventing a font size. So the
 * documented mark-scale reading of that rule is a **recessive baseline rule at
 * `CHART_GRID_VAR` across the mark's own footprint** — visibly "a sparkline
 * with nothing in it" rather than a gap — with the "no data" sentence carried
 * where §4.8 says the chart's meaning lives anyway: the `aria-label`.
 * `MiniBarV4` reads the rule the same way, for the same reason.
 */
export declare const SparklineV4: React.ForwardRefExoticComponent<SparklineV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=SparklineV4.d.ts.map
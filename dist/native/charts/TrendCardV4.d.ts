import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ChartToneV4 } from './SparklineV4';
/**
 * Direction of a `delta`.
 *
 * `'flat'` is the value the base had no word for: a delta with no direction
 * rendered in the sparkline's own colour, so "0.0%" was painted the same green
 * as "+12%". `StatCardV4` named this first and this component takes its
 * vocabulary verbatim — there must not be two ways to say "the number went up"
 * in one kit.
 */
export type TrendCardV4Trend = 'up' | 'down' | 'flat';
export interface TrendCardV4Props {
    /** Metric label, e.g. "Revenue". */
    label: string;
    /** The one loud number. */
    value: string | number;
    /** The change, e.g. "+12.4%". */
    delta?: string;
    /** Direction of `delta`. Drives the ink and the glyph. Default `'flat'`. */
    trend?: TrendCardV4Trend;
    /**
     * The quiet line under the delta — "vs last month", "last 30 days". The base
     * had nowhere to put it, so apps appended it to `label` and got it at the
     * wrong size above the number instead of below it.
     */
    caption?: string;
    /** Trend series, drawn as the composed {@link SparklineV4}. */
    data?: number[];
    /** Which categorical slot the sparkline takes. Default `0` (the brand hue). */
    slot?: number;
    /**
     * Paint the sparkline with a status hue because the series genuinely means
     * good or bad. **Not** the delta's direction — see the component doc.
     */
    tone?: ChartToneV4;
    /** The sparkline's height in px. Default `28`. */
    height?: number;
    /** The sparkline's width in px. Default `120`. */
    width?: number;
    /** Render the loading placeholders instead of the content. */
    loading?: boolean;
    /**
     * Whether the card carries `elevation.card`. Default `true`. Pass `false`
     * when the card sits **inside** another card — layout brief §4.6, never nest
     * a shadow in a shadow.
     */
    raised?: boolean;
    /** Play the sparkline's entrance reveal. Default `true`. */
    animate?: boolean;
    /** The spoken sentence. Derived when omitted (brief §1 rule 6). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 trend card (native)** — the figure `StatCardV4` already got right, with
 * a plot in it.
 *
 * Brief §5 Group A names the anatomy exactly: `colors.card` ground, label →
 * value → delta → caption → sparkline, delta ink from the `*Text` slots,
 * composing `SparklineV4`. Four changes from the base, in the order they
 * matter.
 *
 * 1. **The ground is `colors.card`, not `colors.surface`.** The single most
 *    visible bug in the whole V4 line: a card painted the same colour as the
 *    page it sits on is a spreadsheet cell (charts brief §3.2, layout brief
 *    §4.2), and the border ends up doing all the work. `CardV4` supplies the
 *    rest of the recipe — the radius, the hairline, `elevation.card`, and the
 *    shadow that gets *more* opacity in dark — and only the fill is stated
 *    here.
 * 2. **The delta is not colour alone.** The base tinted it `colors[color]` —
 *    the sparkline's own hue — so a delta was *purple* on a purple-seeded app
 *    and carried no direction at all. V4 pairs the `*Text` ink with a real
 *    chevron from the named set, which is the secondary encoding §1 rule 5
 *    obliges everywhere in this module and the ~8% of men who cannot separate
 *    green from red depend on.
 * 3. **The trend and the series are two different channels.** `trend` colours
 *    the delta; `slot` / `tone` colour the plot. Folding them together — one
 *    `color` prop for the sparkline *and* the delta accent — means a chart
 *    whose line changes colour when the last point moves, which is the
 *    identity break `CHART_HUE_OFFSETS` is documented to prevent. A sparkline
 *    stays slot 1 whatever the number did this month.
 * 4. **The value is the loudest thing on the block.** `3xl` bold in tabular
 *    figures, matching `StatCardV4` and `StatisticV4`. `2xl` ties the page
 *    title, and a KPI that ties the page title has no hierarchy. Tabular
 *    figures are what stop a ticking value reflowing and a column of cards
 *    failing to line up.
 *
 * Composes `CardV4`, `TextV4`, `IconV4` and `SparklineV4` — §1 rule 8, a V4
 * composite composes V4 children, which is also what keeps the mark on the
 * derived palette instead of on `colors.primary`. It renders **nothing** when
 * it has neither a label nor a value: brief §4.5, a component with nothing to
 * show is never a blank bordered box.
 */
export declare function TrendCardV4({ label, value, delta, trend, caption, data, slot, tone, height, width, loading, raised, animate, accessibilityLabel, style, }: TrendCardV4Props): React.ReactElement | null;
//# sourceMappingURL=TrendCardV4.d.ts.map
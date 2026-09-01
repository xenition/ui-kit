import * as React from 'react';
import type { ChartToneV4 } from './LineChartV4';
/**
 * Direction of a `delta`.
 *
 * `'flat'` is the value the base had no word for: a delta with no direction
 * rendered in the sparkline's own colour, so "0.0%" was painted the same green
 * as "+12%". `StatCardV4` named this first and this component takes its
 * vocabulary verbatim — there must not be two ways to say "the number went
 * up" in one kit.
 */
export type TrendCardV4Trend = 'up' | 'down' | 'flat';
export interface TrendCardV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'slot'> {
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
    /** The sparkline's viewBox width in px. Default `120`. */
    width?: number;
    /** Render the loading placeholders instead of the content. */
    loading?: boolean;
    /**
     * Whether the card carries `elevation.card`. Default `true`. Pass `false`
     * when the card sits **inside** another card — brief (layout) §4.6, never
     * nest a shadow in a shadow.
     */
    raised?: boolean;
    /** Play the sparkline's entrance reveal. Default `true`. */
    animate?: boolean;
}
/** The one `<style>` id this component injects from. Idempotent. */
export declare const TREND_CARD_V4_STYLE_ID = "xen-v4-trend-card-styles";
/**
 * Two rules, each needing something a utility class bound to a token cannot
 * say. Both are `StatCardV4`'s, for the reasons that file argues at length and
 * which are not re-argued here.
 *
 * 1. **The card ground.** `CardV4` hard-codes `bg-surface text-on-surface` in
 *    its own class list and `cn()` is a plain string join with no
 *    `tailwind-merge` behind it, so passing `bg-card` in `className` would put
 *    both utilities on the element and let stylesheet ordering pick — and
 *    Tailwind sorts `.bg-card` *before* `.bg-surface`, so the override would
 *    lose silently. The override is made by **specificity** instead: two
 *    attributes (0-2-0) against one class (0-1-0) wins wherever the sheets
 *    land.
 * 2. **The trend glyph's ink.** `IconV4`'s `color` takes the ten `IconColor`
 *    slots and none of them is `successText`. Rather than tint the glyph with
 *    the *fill*, it inherits from the delta line, which is already the right
 *    `*Text` colour.
 */
export declare const TREND_CARD_V4_CSS = "\n[data-xen-v4-card][data-xen-v4-trend-card] {\n  background-color: var(--xen-card);\n  color: var(--xen-on-card);\n}\n[data-xen-v4-trend-delta] [data-xen-v4-icon] {\n  color: inherit;\n}\n";
/**
 * **V4 trend card** — the figure `StatCardV4` already got right, with a plot
 * in it.
 *
 * Brief §5 Group A names the anatomy exactly: `colors.card` ground, label →
 * value → delta → caption → sparkline, delta ink from the `*Text` slots,
 * composing `SparklineV4`. Four changes from the base, in the order they
 * matter.
 *
 * 1. **The ground is `card`, not `surface`.** The single most visible bug in
 *    the whole V4 line: a card painted the same colour as the page it sits on
 *    is a spreadsheet cell (charts brief §3.2, layout brief §4.2), and the
 *    border ends up doing all the work. See {@link TREND_CARD_V4_CSS} for why
 *    the override is a sheet.
 * 2. **The delta is not colour alone.** The base tinted it
 *    `var(--xen-${color})` — the sparkline's own hue — so a delta was
 *    *purple* on a purple-seeded app and carried no direction at all. V4 pairs
 *    the `*Text` ink with a real chevron from the named set, which is the
 *    secondary encoding brief §1 rule 5 obliges everywhere in this module and
 *    the ~8% of men who cannot separate green from red depend on.
 * 3. **The trend and the series are two different channels.** `trend` colours
 *    the delta; `slot` / `tone` colour the plot. Folding them together — which
 *    is what "one `color` prop for the sparkline **and** the delta accent"
 *    did — means a chart whose line changes colour when the last point moves,
 *    which is the identity break `CHART_HUE_OFFSETS` is documented to prevent.
 *    A sparkline stays slot 1 whatever the number did this month.
 * 4. **The value is the loudest thing on the block.** `3xl` bold in tabular
 *    figures, matching `StatCardV4` and `StatisticV4`. `2xl` ties the page
 *    title, and a KPI that ties the page title has no hierarchy. Tabular
 *    figures are what stop a ticking value reflowing and a row of cards
 *    failing to line up.
 *
 * It renders **nothing** when it has neither a label nor a value: brief §4.5,
 * a component with nothing to show is never a blank bordered box.
 */
export declare const TrendCardV4: React.ForwardRefExoticComponent<TrendCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrendCardV4.d.ts.map
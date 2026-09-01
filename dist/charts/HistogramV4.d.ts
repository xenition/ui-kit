import * as React from 'react';
import { type ChartToneV4 } from '../primitives/internal/v4-chart';
/**
 * The opt-in to status colour, and the only way this chart paints one
 * (brief §4.3).
 *
 * A distribution wears `success` / `warn` / `danger` when the thing it counts
 * genuinely *means* good or bad — a latency histogram on an error budget, say.
 * It is still **one colour for every bin**; a tone changes which colour, never
 * how many.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type HistogramV4Tone = ChartToneV4;
export interface HistogramV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
    /** Bin counts; each becomes a vertical bar sized by `count / max`. */
    bins: number[];
    /**
     * Bin edge labels. Drawn **thinned**, never rotated — see the note on
     * {@link HistogramV4}.
     */
    labels?: string[];
    /** The plot's own height in px. Never auto — shadcn's rule (brief §4.2). */
    height?: number;
    /** Count mapped to a full-height bin; defaults to the largest bin. */
    max?: number;
    /** Status colour. Omit it and every bin is slot 1 — see {@link HistogramV4Tone}. */
    tone?: HistogramV4Tone;
    /** How a count is spelled, in the tooltip and in the accessible sentence. */
    format?: (value: number) => string;
    /** The descriptive headline. HIG's rule: say the takeaway, not the axes. */
    title?: string;
    /** The one loud number this figure is evidence for. */
    summary?: string;
    /** The quiet line — "vs last month", "last 30 days". */
    caption?: string;
    /** Render a skeleton at the plot's footprint instead of the plot. */
    loading?: boolean;
    /** What the empty state says. Keeps the footprint either way (brief §4.5). */
    emptyLabel?: string;
    /** Play the entrance reveal, once. Default `true` (brief §4.7). */
    animate?: boolean;
    /** Hover tooltip carrying the precise count. Default `true` (brief §4.6). */
    tooltip?: boolean;
    /** Fired when a bin is clicked. See the note on the bar chart's `onSelect`. */
    onSelect?: (index: number, value: number) => void;
}
/** The one `<style>` id this component injects from. Idempotent. */
export declare const HISTOGRAM_V4_STYLE_ID = "xen-v4-histogram-styles";
/** Paint, keyed off the chart's own root attribute. */
export declare const HISTOGRAM_V4_CSS: string;
/**
 * **V4 frequency histogram** — a distribution, which is the one bar form whose
 * colour question answers itself.
 *
 * **Bins are one series by definition.** A histogram counts one variable into
 * ordered buckets; there is no second identity to encode, so there is no second
 * colour to spend. The base takes `color?: ChartColor` and V4 takes a `tone`
 * that changes *which* single colour is used and never *how many* — because a
 * histogram painted five colours has invented five categories the data does not
 * have, and a histogram coloured by bin height has spent the identity channel
 * restating the bar length (brief §4.1).
 *
 * The rest of what the base got wrong:
 *
 * - **`stroke="var(--xen-surface)" strokeWidth={1}` between bins.** A stroke is
 *   centred on the edge, so it eats half a pixel of each neighbour and the two
 *   bins end up different widths. It is gone, and — see {@link BIN_GAP} —
 *   nothing replaces it: a histogram's bins are flush, because they are one
 *   continuous axis rather than a row of separate things.
 * - **`stroke="var(--xen-muted)"` as the axis.** `muted` is a text colour with
 *   no contrast promise as a rule. The axis is chrome and chrome is
 *   {@link CHART_AXIS_VAR} (brief §3.3).
 * - **Square tops.** `CHART_MARK.endRadius` at the data end only, so the family
 *   has one bar silhouette; the baseline stays square because a bar rounded
 *   there floats off its axis (brief §4.4).
 *
 * ## Bin labels thin, they do not rotate
 *
 * HIG's density rule: a chart stays simple and lets people ask for detail. A
 * rotated axis label is a chart admitting it has more labels than room, and it
 * costs every reader legibility to serve the few who wanted the twelfth bin's
 * edge. So a histogram draws every {@link labelStride}th label upright and
 * leaves the rest to the tooltip, which carries the precise count anyway.
 *
 * ## The one documented tap-target exception
 *
 * Brief §1 rule 10 names the histogram bin, alongside the heatmap cell, as the
 * place where density genuinely forbids 44 and HIG's absolute floor of 28
 * applies instead — and says the exception holds only where a component states
 * it. This is that statement. A bin's hit area is its full-height column slot:
 * at the default 120 height it clears 44 vertically, and horizontally it is
 * whatever twenty bins in a card leaves, which is the honest answer rather than
 * a padded rect that overlaps its neighbours and steals their presses.
 */
export declare const HistogramV4: React.ForwardRefExoticComponent<HistogramV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HistogramV4.d.ts.map
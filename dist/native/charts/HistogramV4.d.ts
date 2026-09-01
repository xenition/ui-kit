import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ChartToneV4 } from '../../primitives/internal/v4-chart';
/**
 * The opt-in to status colour, and the only way this chart paints one
 * (brief §4.3).
 *
 * A distribution wears `success` / `warn` / `danger` when the thing it counts
 * genuinely *means* good or bad. It is still **one colour for every bin**; a
 * tone changes which colour, never how many.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type HistogramV4Tone = ChartToneV4;
export interface HistogramV4Props {
    /** Bin counts; each becomes a vertical bar sized by `count / max`. */
    bins: number[];
    /** Bin edge labels. Drawn **thinned**, never rotated — see {@link HistogramV4}. */
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
    /** Press-to-reveal count bubble. Default `true` (brief §4.6). */
    tooltip?: boolean;
    /** Fired when a bin is pressed. */
    onSelect?: (index: number, value: number) => void;
    /** Accessible one-line summary; derived from the data when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 frequency histogram (native)** — a distribution, which is the one bar
 * form whose colour question answers itself.
 *
 * **Bins are one series by definition.** A histogram counts one variable into
 * ordered buckets; there is no second identity to encode, so there is no second
 * colour to spend. The base takes `color?: HistogramColor` and V4 takes a
 * `tone` that changes *which* single colour is used and never *how many* —
 * because a histogram coloured by bin height has spent the identity channel
 * restating the bar length (brief §4.1).
 *
 * The rest of what the base got wrong:
 *
 * - **`borderLeftWidth: 1` in `colors.surface` between bins.** A border eats
 *   into the bin it belongs to, so the first bin ends up a pixel wider than the
 *   rest and the separation is a property of one neighbour rather than of the
 *   pair. It is gone, and — see {@link BIN_GAP} — nothing replaces it: a
 *   histogram's bins are flush, because they are one continuous axis rather
 *   than a row of separate things.
 * - **`colors.muted` as the axis.** A de-emphasised *text* colour doing a
 *   rule's job. The axis is chrome and chrome is `palette.axis` (brief §3.3).
 * - **Square tops.** `CHART_MARK.endRadius` at the data end only, so the family
 *   has one bar silhouette; the baseline stays square because a bar rounded
 *   there floats off its axis (brief §4.4).
 *
 * ## Bin labels thin, they do not rotate
 *
 * HIG's density rule: a chart stays simple and lets people ask for detail. A
 * rotated axis label is a chart admitting it has more labels than room, and on
 * a phone it is unreadable at any angle. So a histogram draws every
 * {@link labelStride}th label upright and leaves the rest to the press bubble.
 *
 * ## The one documented tap-target exception
 *
 * Brief §1 rule 10 names the histogram bin, alongside the heatmap cell, as the
 * place where density genuinely forbids 44 and HIG's absolute floor of 28
 * applies instead — and says the exception holds only where a component states
 * it. This is that statement. The bin's press target is its full-height column
 * slot, carried out to the tap floor **vertically** by `hitSlop`; horizontally
 * it stays inside its slot, because a `hitSlop` wider than the slot would
 * overlap its neighbours' targets and start swallowing their presses, which is
 * a worse failure than a narrow one.
 */
export declare function HistogramV4({ bins, labels, height, max, tone, format, title, summary, caption, loading, emptyLabel, animate, tooltip, onSelect, accessibilityLabel, style, }: HistogramV4Props): React.ReactElement;
//# sourceMappingURL=HistogramV4.d.ts.map
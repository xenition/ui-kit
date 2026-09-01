import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import {
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  type ChartToneV4,
} from '../primitives/internal/v4-chart';
import { CHART_AXIS_VAR, ChartEmptyV4, chartVar, useChartV4 } from './internal-v4';

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

export interface HistogramV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
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

/** `count / ceiling`, clamped, and zero when the ceiling is not a usable divisor. */
function binRatio(value: number, ceiling: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(ceiling) || ceiling <= 0) return 0;
  return Math.min(Math.max(value / ceiling, 0), 1);
}

/** The largest finite bin, or 0 when there is nothing to measure. */
function ceilingOf(values: number[], override?: number): number {
  if (override !== undefined && Number.isFinite(override)) return override;
  const finite = values.filter((v) => Number.isFinite(v));
  return finite.length > 0 ? Math.max(...finite) : 0;
}

/**
 * How many bins pass between two drawn labels.
 *
 * Derived from {@link CHART_DIRECT_LABEL_MAX} rather than picked, so the number
 * of labels a histogram draws and the number of series a chart may direct-label
 * come from one decision instead of two that drift. Never below 1, so a
 * four-bin histogram labels every bin.
 */
function labelStride(count: number): number {
  return Math.max(1, Math.ceil(count / CHART_DIRECT_LABEL_MAX));
}

/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function histogramLabel(
  bins: number[],
  title: string | undefined,
  format: (value: number) => string
): string {
  const finite = bins.filter((v) => Number.isFinite(v));
  const head = `Histogram${title ? `, ${title}` : ''}`;
  const count = `${bins.length} ${bins.length === 1 ? 'bin' : 'bins'}`;
  if (finite.length === 0) return `${head}, ${count}`;
  const lo = Math.min(...finite);
  const hi = Math.max(...finite);
  const range = lo === hi ? format(lo) : `${format(lo)} to ${format(hi)}`;
  return `${head}, ${count}, ${range}`;
}

/**
 * The custom property every mark in this chart reads its fill from.
 *
 * The palette reaches an element as `var(--xen-chart-1)`, and a `var()` in an
 * inline `background-color` is dropped outright by the jsdom CSSOM — the same
 * hazard `internal-v4.tsx` records against `color-mix()`. So the value goes
 * inline as a **custom property**, which no CSSOM validates, and one static
 * rule turns it into paint — which is also how every bin gets its colour from
 * one declaration instead of one string per bin.
 */
const MARK_FILL = '--xen-v4-mark-fill';

/** The one `<style>` id this component injects from. Idempotent. */
export const HISTOGRAM_V4_STYLE_ID = 'xen-v4-histogram-styles';

/** Paint, keyed off the chart's own root attribute. */
export const HISTOGRAM_V4_CSS = `
[data-xen-v4-histogram] [data-xen-v4-bin] { background-color: var(${MARK_FILL}); }
[data-xen-v4-histogram] [data-xen-v4-chart-axis] { background-color: ${CHART_AXIS_VAR}; }
[data-xen-v4-histogram] [data-xen-v4-chart-indicator] {
  width: ${CHART_MARK.dotSize}px;
  height: ${CHART_MARK.dotSize}px;
  border-radius: ${CHART_MARK.dotSize}px;
  background-color: var(${MARK_FILL});
}
`;

/**
 * **A histogram's bins sit flush.** The ruling on brief §4.4's "a
 * `CHART_MARK.gap` of surface separates adjacent bars", which Group B flagged
 * as producing a non-flush histogram — the opposite of what a distribution
 * should look like.
 *
 * The gap rule is about **categorical** bars. There, the gap is doing semantic
 * work: it says *these are separate things*, and it is one of the four
 * secondary encodings rule 5 obliges, because two adjacent fills a dichromat
 * reads as one colour are still visibly two bars when a hairline of page runs
 * between them.
 *
 * A histogram's bins are not separate things. They are **one continuous axis**
 * cut into buckets, and the bucket edges are adjacent by construction — the
 * right-hand edge of bin 3 *is* the left-hand edge of bin 4. Page between them
 * says there is a range of the variable that fell in neither bucket, which is
 * false for every histogram ever drawn. That is not a style preference; it is
 * the chart making a claim about the data that the data does not support, and
 * it is why every reference implementation of a histogram — and every
 * statistics textbook — draws the bars touching.
 *
 * Rule 5 is satisfied without the gap here anyway, and satisfied more cheaply
 * than anywhere else in the module: **a histogram is one series**, so colour is
 * not carrying identity at all and there is no adjacent pair for a reader to
 * confuse. The encoding a histogram needs is the step in the outline where one
 * bin's height meets the next, which flush bars give and a gap actually
 * weakens.
 *
 * Zero rather than "no `gap` property" so the bin row, the label row and the
 * press-bubble row read from one binding: the three are laid out with the same
 * flex rule and a gap on one of them silently misaligns a label from its bin.
 */
const BIN_GAP = 0;

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
export const HistogramV4 = React.forwardRef<HTMLDivElement, HistogramV4Props>(function HistogramV4(
  {
    bins,
    labels,
    height = 120,
    max,
    tone,
    format = String,
    title,
    summary,
    caption,
    loading = false,
    emptyLabel = 'No data',
    animate = true,
    tooltip = true,
    onSelect,
    className,
    style,
    ...rest
  },
  ref
) {
  const chart = useChartV4();
  injectStyleOnce(HISTOGRAM_V4_STYLE_ID, HISTOGRAM_V4_CSS);
  const [hovered, setHovered] = React.useState<number | null>(null);

  const label = histogramLabel(bins, title, format);
  const fill = tone ? `var(--xen-${tone})` : chartVar(0);

  const header =
    title || summary || caption ? (
      <div className="flex min-w-0 flex-col gap-xs">
        {title ? (
          <TextV4 size="base" weight="semibold" numberOfLines={1}>
            {title}
          </TextV4>
        ) : null}
        {summary ? (
          <TextV4 size="2xl" weight="bold" numeric="tabular">
            {summary}
          </TextV4>
        ) : null}
        {caption ? (
          <TextV4 size="sm" tone="mutedText">
            {caption}
          </TextV4>
        ) : null}
      </div>
    ) : null;

  const frame = (children: React.ReactNode): React.ReactElement => (
    <div
      ref={ref}
      data-xen-v4-histogram=""
      {...chart.rootProps}
      style={{ ...chart.rootProps.style, [MARK_FILL]: fill, ...style } as React.CSSProperties}
      className={cn('flex w-full flex-col gap-sm', className)}
      {...rest}
    >
      {header}
      {children}
    </div>
  );

  if (loading) {
    return frame(
      <div aria-busy="true" aria-label={label} role="img">
        <SkeletonV4 variant="rect" width="100%" height={height} />
      </div>
    );
  }
  if (bins.length === 0) return frame(<ChartEmptyV4 label={emptyLabel} height={height} />);

  const ceiling = ceilingOf(bins, max);
  const stride = labelStride(bins.length);

  return frame(
    <div
      role="img"
      aria-label={label}
      className="flex w-full flex-col"
      style={{ position: 'relative' }}
    >
      <div
        data-xen-v4-chart=""
        data-xen-v4-chart-plot=""
        {...(animate ? { 'data-animate': 'true' } : {})}
        className="flex w-full flex-col"
        style={{ height }}
      >
        <div className="flex w-full flex-1 items-end" style={{ gap: BIN_GAP }}>
          {bins.map((count, i) => (
            <div
              key={i}
              data-xen-v4-bin-hit=""
              className="flex h-full min-w-0 flex-1 cursor-default items-end"
              onPointerEnter={tooltip ? () => setHovered(i) : undefined}
              onPointerLeave={tooltip ? () => setHovered(null) : undefined}
              onClick={onSelect ? () => onSelect(i, count) : undefined}
            >
              <div
                data-xen-v4-bin=""
                className="w-full"
                style={{
                  height: `${binRatio(count, ceiling) * 100}%`,
                  // `1` is the hairline exception in rule 1: an empty bin is
                  // still a bin, and a gap in a distribution is information.
                  minHeight: 1,
                  borderTopLeftRadius: CHART_MARK.endRadius,
                  borderTopRightRadius: CHART_MARK.endRadius,
                }}
              />
            </div>
          ))}
        </div>
        <div data-xen-v4-chart-axis="" style={{ height: 1 }} />
      </div>
      {labels ? (
        <div className="flex w-full" style={{ gap: BIN_GAP }}>
          {bins.map((_, i) => (
            <TextV4
              key={i}
              size="xs"
              tone="mutedText"
              align="center"
              numberOfLines={1}
              className="min-w-0 flex-1"
            >
              {i % stride === 0 ? (labels[i] ?? '') : ''}
            </TextV4>
          ))}
        </div>
      ) : null}
      {tooltip && hovered !== null && bins[hovered] !== undefined ? (
        <div
          data-xen-v4-chart-tooltip=""
          role="presentation"
          className="pointer-events-none absolute flex items-center gap-xs rounded-[var(--xen-radius-md)] border border-border bg-popover px-sm py-xs"
          style={{
            left: `${((hovered + 0.5) / bins.length) * 100}%`,
            top: 0,
            transform: 'translateX(-50%)',
          }}
        >
          <span data-xen-v4-chart-indicator="" />
          <TextV4 size="xs" tone="onPopover" numeric="tabular">
            {labels?.[hovered] ? `${labels[hovered]}: ` : ''}
            {format(bins[hovered] as number)}
          </TextV4>
        </div>
      ) : null}
    </div>
  );
});

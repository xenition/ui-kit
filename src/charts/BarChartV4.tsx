import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import {
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  type ChartIndicatorV4,
  type ChartToneV4,
} from '../primitives/internal/v4-chart';
import { CHART_AXIS_VAR, ChartEmptyV4, chartVar, useChartV4 } from './internal-v4';

/**
 * The opt-in to status colour, and the only way a V4 chart paints one
 * (brief §4.3).
 *
 * A series wears `success` / `warn` / `danger` when it genuinely *means* good
 * or bad — an error rate, budget overspend, a pass/fail split. A series that
 * is merely first wears slot 1. Brief §1 rule 3 is explicit that a chart takes
 * one or the other and never both, which is why this is a single value on the
 * whole chart rather than a per-bar option: a bar chart where bar 4 is red and
 * "failures" is also red cannot say which red it means.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type BarChartV4Tone = ChartToneV4;

/**
 * The tooltip swatch shapes, following shadcn's `ChartTooltip` (brief §4.6).
 *
 * An **alias for the shared `ChartIndicatorV4`**. The per-component spelling
 * was a barrel-collision workaround from the parallel build — five files
 * exporting one name would have been five collisions — and it is kept as an
 * alias rather than deleted so nothing that imports it has to change.
 */
export type BarChartV4Indicator = ChartIndicatorV4;

export interface BarChartV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
  /** Bar values; each becomes a vertical bar sized by `value / max`. */
  data: number[];
  /** Optional labels rendered under each bar. */
  labels?: string[];
  /** The plot's own height in px. Never auto — shadcn's rule (brief §4.2). */
  height?: number;
  /** Value mapped to a full-height bar; defaults to the largest datum. */
  max?: number;
  /**
   * Status colour, for a series that genuinely means good or bad. Omit it and
   * every bar is slot 1 — see {@link BarChartV4Tone}.
   */
  tone?: BarChartV4Tone;
  /**
   * Draw the value above each bar. Defaults to **on at
   * `CHART_DIRECT_LABEL_MAX` bars or fewer** — direct labels are the strongest
   * secondary encoding this line has (brief §4.4), and above four they collide.
   */
  showValues?: boolean;
  /** How a value is spelled, in the labels and in the accessible sentence. */
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
  /** Hover tooltip carrying the precise value. Default `true` (brief §4.6). */
  tooltip?: boolean;
  /** The tooltip's swatch shape. */
  indicator?: BarChartV4Indicator;
  /**
   * Fired when a bar is clicked.
   *
   * `title` and `onSelect` are `Omit`ted from the inherited
   * `HTMLAttributes<HTMLDivElement>` on purpose: the DOM's `title` is a browser
   * tooltip and the DOM's `onSelect` is a text-selection event, and both would
   * silently win the name over the figure props §4.2 and §4.6 ask for. The
   * native twin has no such collision, so this is the one place where keeping
   * prop parity means subtracting from the web element's own surface.
   */
  onSelect?: (index: number, value: number) => void;
}

/**
 * `value / ceiling`, clamped, and **zero when the ceiling is not a usable
 * divisor**.
 *
 * The base charts route this through `safeMax`, which floors the ceiling at 1
 * — so a chart of `[0]` renders a bar at 0/1 and a chart of `[0.4]` renders one
 * at 40% of the plot, which is a lie about a single-datum series. Guarding the
 * divisor here instead keeps the honest answer (a flat chart is flat) and still
 * never produces `NaN` or `Infinity`, which is the single-datum defect the
 * spec asserts against.
 */
function barRatio(value: number, ceiling: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(ceiling) || ceiling <= 0) return 0;
  return Math.min(Math.max(value / ceiling, 0), 1);
}

/** The largest finite datum, or 0 when there is nothing to measure. */
function ceilingOf(values: number[], override?: number): number {
  if (override !== undefined && Number.isFinite(override)) return override;
  const finite = values.filter((v) => Number.isFinite(v));
  return finite.length > 0 ? Math.max(...finite) : 0;
}

/**
 * The sentence a screen reader gets (brief §1 rule 6, §4.8).
 *
 * HIG is explicit that a rendered chart plus a visible title is *not*
 * accessible — the textual representation is the accessibility story. So the
 * default names the form, the headline, the count and the range, and it
 * singularises at one datum rather than announcing "1 bars".
 */
function barChartLabel(
  data: number[],
  title: string | undefined,
  format: (value: number) => string
): string {
  const finite = data.filter((v) => Number.isFinite(v));
  const head = `Bar chart${title ? `, ${title}` : ''}`;
  const count = `${data.length} ${data.length === 1 ? 'bar' : 'bars'}`;
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
 * rule turns it into paint. It is also how the fill reaches four different
 * elements (the bars, the tooltip's swatch) from one declaration on the root
 * rather than four copies of the same string.
 */
const MARK_FILL = '--xen-v4-mark-fill';

/** The one `<style>` id this component injects from. Idempotent. */
export const BAR_CHART_V4_STYLE_ID = 'xen-v4-bar-chart-styles';

/**
 * Paint, keyed off the chart's own root attribute so it cannot reach another
 * component's marks. Every number in it is `CHART_MARK`, interpolated rather
 * than retyped (brief §1 rule 1).
 */
export const BAR_CHART_V4_CSS = `
[data-xen-v4-bar-chart] [data-xen-v4-bar] { background-color: var(${MARK_FILL}); }
[data-xen-v4-bar-chart] [data-xen-v4-chart-axis] { background-color: ${CHART_AXIS_VAR}; }
[data-xen-v4-bar-chart] [data-xen-v4-chart-indicator] { width: ${CHART_MARK.dotSize}px; }
[data-xen-v4-bar-chart] [data-xen-v4-chart-indicator][data-shape="dot"] {
  height: ${CHART_MARK.dotSize}px;
  border-radius: ${CHART_MARK.dotSize}px;
  background-color: var(${MARK_FILL});
}
[data-xen-v4-bar-chart] [data-xen-v4-chart-indicator][data-shape="line"] {
  border-top: ${CHART_MARK.stroke}px solid var(${MARK_FILL});
}
[data-xen-v4-bar-chart] [data-xen-v4-chart-indicator][data-shape="dashed"] {
  border-top: ${CHART_MARK.stroke}px dashed var(${MARK_FILL});
}
`;

/**
 * **V4 vertical bar chart** — the bar family's reference implementation, and
 * where four of the brief's rules land at once.
 *
 * The base is five decisions the V4 line exists to retire:
 *
 * 1. **`color?: ChartColor` as an identity.** The base takes `'primary' |
 *    'accent' | 'success' | 'warn' | 'danger'` and paints every bar with it, so
 *    a caller who wanted a second bar chart on the page reached for `warn` and
 *    got a chart that reads as a warning. V4 has one categorical answer — slot
 *    1, from the shared palette — and one status answer, {@link
 *    BarChartV4Props.tone}, which is opt-in and means something (brief §1
 *    rule 3, §4.3).
 * 2. **Colour by value.** Brief §4.1 forbids it and this component is where the
 *    temptation is strongest: bar *length* already encodes magnitude, so
 *    spending the identity channel on it says nothing new and costs the reader
 *    the one channel that could have told two series apart. A single-series bar
 *    chart is **one colour** for every bar.
 * 3. **`stroke="var(--xen-muted)"` as the axis.** `muted` is a *text* colour
 *    with no contrast promise as a rule; the axis is chrome, and chrome is
 *    {@link CHART_AXIS_VAR} — the derived neutral at `CHART_AXIS_MIX`, one step
 *    more present than the grid behind it (brief §3.3).
 * 4. **`rx={2}` on the whole rect.** A bar rounded at the baseline floats off
 *    its axis. `CHART_MARK.endRadius` rounds the **data end only** (brief
 *    §4.4), which is the difference between a bar that sits on an axis and a
 *    lozenge hovering near one.
 * 5. **No secondary encoding.** The palette's worst adjacent CVD ΔE is 6.5,
 *    inside the 6–8 floor band, and that band is legal only with a second
 *    channel. Here it is `CHART_MARK.gap` of page between adjacent bars plus
 *    direct value labels at four bars or fewer.
 *
 * ## Why this twin is flex and not `<svg>`
 *
 * The base draws `<rect>`s into a 320-unit viewBox under
 * `preserveAspectRatio="none"`, which scales x and y by different factors the
 * moment the container is not 320 wide. Under that transform `CHART_MARK.gap`
 * is not 2px and `CHART_MARK.endRadius` is not a 4px corner — both are
 * whatever the container width happens to make them, and the corner comes out
 * as a stretched ellipse. Those two constants are the *whole* mark spec for
 * this family, so a rendering that cannot honour them exactly is not an
 * implementation of it.
 *
 * Laying the bars out as flex children instead keeps both in real pixels, makes
 * each bar a genuine hit target rather than an SVG node with no padding, and
 * costs nothing: a bar chart has no curves, no path data and no clipping. The
 * line family keeps its SVG, because a polyline genuinely needs one. The
 * palette plumbing is unchanged either way — {@link useChartV4} puts the custom
 * properties on the root and `[data-xen-v4-chart]` picks the scheme in CSS, on
 * a `<div>` exactly as on an `<svg>`.
 *
 * ## Tap targets
 *
 * Rule 10 asks for 44 of hit area on anything a pointer can hit. Each bar's hit
 * area is its full-height column slot, so at the default 120 height it clears
 * 44 on the vertical axis and takes the whole slot on the horizontal — which is
 * the most a bar chart can offer, since 12 bars in a 320-wide card cannot each
 * be 44 wide. A chart with more bars than its width can carry is a composition
 * problem (facet it, or bin it into a {@link HistogramV4}), not a padding one.
 */
export const BarChartV4 = React.forwardRef<HTMLDivElement, BarChartV4Props>(function BarChartV4(
  {
    data,
    labels,
    height = 120,
    max,
    tone,
    showValues,
    format = String,
    title,
    summary,
    caption,
    loading = false,
    emptyLabel = 'No data',
    animate = true,
    tooltip = true,
    indicator = 'dot',
    onSelect,
    className,
    style,
    ...rest
  },
  ref
) {
  // Hooks run before every early return — `useChartV4` injects the sheet and
  // memoises the palette, and a component that skips it on the empty path has
  // a different hook count on its next render.
  const chart = useChartV4();
  injectStyleOnce(BAR_CHART_V4_STYLE_ID, BAR_CHART_V4_CSS);
  const [hovered, setHovered] = React.useState<number | null>(null);

  const label = barChartLabel(data, title, format);

  // Status is a *fill* here (rule 3): the bar is painted with it, and the
  // direct label beside it is what discharges the "never colour alone"
  // obligation. Without a tone the answer is slot 1, always — never a cycle,
  // never the value.
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
      data-xen-v4-bar-chart=""
      {...chart.rootProps}
      style={{ ...chart.rootProps.style, [MARK_FILL]: fill, ...style } as React.CSSProperties}
      className={cn('flex w-full flex-col gap-sm', className)}
      {...rest}
    >
      {header}
      {children}
    </div>
  );

  // Loading and empty both keep the plot's footprint. A chart that collapses to
  // zero height while its data is in flight is the single most common dashboard
  // jank and is free to avoid (brief §4.5).
  if (loading) {
    return frame(
      <div aria-busy="true" aria-label={label} role="img">
        <SkeletonV4 variant="rect" width="100%" height={height} />
      </div>
    );
  }
  if (data.length === 0) return frame(<ChartEmptyV4 label={emptyLabel} height={height} />);

  const ceiling = ceilingOf(data, max);
  const directLabels = showValues ?? data.length <= CHART_DIRECT_LABEL_MAX;

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
        {/*
          The value row is a row of the plot rather than a label floated over
          each bar: reserving the space is what stops a full-height bar's label
          from clipping out of the plot, and it keeps every bar measured against
          the same remaining height instead of against a box the tallest label
          silently shrank.
        */}
        {directLabels ? (
          <div className="flex w-full" style={{ gap: CHART_MARK.gap }}>
            {data.map((value, i) => (
              <TextV4
                key={i}
                data-xen-v4-chart-value=""
                size="xs"
                tone="mutedText"
                align="center"
                numeric="tabular"
                className="min-w-0 flex-1 truncate"
              >
                {format(value)}
              </TextV4>
            ))}
          </div>
        ) : null}
        <div className="flex w-full flex-1 items-end" style={{ gap: CHART_MARK.gap }}>
          {data.map((value, i) => (
            <div
              key={i}
              data-xen-v4-bar-hit=""
              className="flex h-full min-w-0 flex-1 cursor-default items-end"
              onPointerEnter={tooltip ? () => setHovered(i) : undefined}
              onPointerLeave={tooltip ? () => setHovered(null) : undefined}
              onClick={onSelect ? () => onSelect(i, value) : undefined}
            >
              <div
                data-xen-v4-bar=""
                className="w-full"
                style={{
                  height: `${barRatio(value, ceiling) * 100}%`,
                  // `1` is the hairline exception in rule 1: a zero-height bar
                  // is invisible, and a datum that exists should be visible as
                  // a datum even when its value is 0.
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
        <div className="flex w-full" style={{ gap: CHART_MARK.gap }}>
          {labels.map((l, i) => (
            <TextV4
              key={i}
              size="xs"
              tone="mutedText"
              align="center"
              numberOfLines={1}
              className="min-w-0 flex-1"
            >
              {l}
            </TextV4>
          ))}
        </div>
      ) : null}
      {tooltip && hovered !== null && data[hovered] !== undefined ? (
        <div
          data-xen-v4-chart-tooltip=""
          role="presentation"
          className="pointer-events-none absolute flex items-center gap-xs rounded-[var(--xen-radius-md)] border border-border bg-popover px-sm py-xs"
          style={{
            left: `${((hovered + 0.5) / data.length) * 100}%`,
            top: 0,
            transform: 'translateX(-50%)',
          }}
        >
          <span data-xen-v4-chart-indicator="" data-shape={indicator} />
          <TextV4 size="xs" tone="onPopover" numeric="tabular">
            {labels?.[hovered] ? `${labels[hovered]}: ` : ''}
            {format(data[hovered] as number)}
          </TextV4>
        </div>
      ) : null}
    </div>
  );
});

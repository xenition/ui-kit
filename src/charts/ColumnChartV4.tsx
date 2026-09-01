import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import {
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  type ChartToneV4,
} from '../primitives/internal/v4-chart';
import { CHART_AXIS_VAR, CHART_GRID_VAR, ChartEmptyV4, chartVar, useChartV4 } from './internal-v4';

/**
 * The opt-in to status colour, and the only way this chart paints one
 * (brief §4.3).
 *
 * A bar chart wears `success` / `warn` / `danger` when its series genuinely
 * *means* good or bad. A series that is merely first wears slot 1. Rule 3 is
 * explicit that a chart takes one or the other and never both, which is why
 * this is one value for the whole chart rather than a per-row option.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type ColumnChartV4Tone = ChartToneV4;

export interface ColumnChartV4Datum {
  label: string;
  value: number;
}

export interface ColumnChartV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
  /** Labelled values, rendered one per row as a horizontal bar. */
  data: ColumnChartV4Datum[];
  /** Value mapped to a full-width bar; defaults to the largest datum. */
  max?: number;
  /** Per-bar track height in px. */
  barHeight?: number;
  /**
   * Show the numeric value beside each label. Defaults to **on at
   * `CHART_DIRECT_LABEL_MAX` rows or fewer** — direct labels are the strongest
   * secondary encoding this line has (brief §4.4). The base defaulted this
   * `false`, which left a chart whose only encoding was bar length and a
   * palette that needs a second channel.
   */
  showValues?: boolean;
  /** Status colour. Omit it and every bar is slot 1 — see {@link ColumnChartV4Tone}. */
  tone?: ColumnChartV4Tone;
  /** How a value is spelled, in the labels and in the accessible sentence. */
  format?: (value: number) => string;
  /** The descriptive headline. HIG's rule: say the takeaway, not the axes. */
  title?: string;
  /** The one loud number this figure is evidence for. */
  summary?: string;
  /** The quiet line — "vs last month", "last 30 days". */
  caption?: string;
  /**
   * The footprint the **empty and loading** states hold, in px.
   *
   * A row list has no plot height of its own — it is as tall as its rows — so
   * unlike every other chart in this family `height` does not size the plot.
   * It exists because brief §4.5 asks that all three states keep the footprint,
   * and a list that renders nothing while its data is in flight is exactly the
   * reflow that section is about.
   */
  height?: number;
  /** Render a skeleton at the footprint instead of the rows. */
  loading?: boolean;
  /** What the empty state says. */
  emptyLabel?: string;
  /** Play the entrance reveal, once. Default `true` (brief §4.7). */
  animate?: boolean;
  /**
   * Reveal a hovered row's value even when {@link ColumnChartV4Props.showValues}
   * is off. Default `true` (brief §4.6).
   */
  tooltip?: boolean;
  /** Fired when a row is clicked. See the note on the bar chart's `onSelect`. */
  onSelect?: (index: number, value: number) => void;
}

/** `value / ceiling`, clamped, and zero when the ceiling is not a usable divisor. */
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

/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function columnChartLabel(
  data: ColumnChartV4Datum[],
  title: string | undefined,
  format: (value: number) => string
): string {
  const finite = data.map((d) => d.value).filter((v) => Number.isFinite(v));
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
 * rule turns it into paint.
 */
const MARK_FILL = '--xen-v4-mark-fill';

/** The one `<style>` id this component injects from. Idempotent. */
export const COLUMN_CHART_V4_STYLE_ID = 'xen-v4-column-chart-styles';

/**
 * Paint, keyed off the chart's own root attribute so it cannot reach another
 * component's marks. The three chrome roles are distinct on purpose: the fill
 * is data, the track is grid, the baseline is axis (brief §3.3).
 */
export const COLUMN_CHART_V4_CSS = `
[data-xen-v4-column-chart] [data-xen-v4-bar] { background-color: var(${MARK_FILL}); }
[data-xen-v4-column-chart] [data-xen-v4-chart-track] { background-color: ${CHART_GRID_VAR}; }
[data-xen-v4-column-chart] [data-xen-v4-chart-axis] { background-color: ${CHART_AXIS_VAR}; }
`;

/**
 * **V4 horizontal bar chart** — one labelled row per datum.
 *
 * What the base got wrong, in the order it misleads a reader:
 *
 * 1. **`color?: ChartColor` as an identity.** `colorVar(color)` paints every
 *    bar with a semantic slot, so a second chart on the page reached for `warn`
 *    and became a chart that reads as a warning. V4 has one categorical answer
 *    — slot 1 from the shared palette — and one status answer, `tone`, which is
 *    opt-in and means something (brief §1 rule 3, §4.3).
 * 2. **Never colour by value.** A bar's *length* already encodes magnitude
 *    (brief §4.1); spending the identity channel on it says nothing new. Every
 *    bar here is one colour.
 * 3. **`fill="var(--xen-border)"` as the track.** `border` is a hairline
 *    colour; a track is chrome, and chrome is {@link CHART_GRID_VAR} — the
 *    derived neutral at `CHART_GRID_MIX`, which follows the scheme with no dark
 *    rule of its own. The **baseline** is one step more present at
 *    {@link CHART_AXIS_VAR}, and this chart has a real one: a horizontal bar
 *    grows rightward from a vertical axis at x = 0, which the base drew as
 *    nothing at all.
 * 4. **`rx={5}` on both ends.** A bar rounded at the baseline floats off its
 *    axis. `CHART_MARK.endRadius` rounds the **data end only** (brief §4.4) —
 *    here the right edge — and the track is rounded to match so a full bar and
 *    its track share one silhouette.
 * 5. **`showValues` defaulting off.** The palette's worst adjacent CVD ΔE is
 *    6.5, inside the 6–8 floor band, and that band is legal only with a second
 *    channel. At four rows or fewer the value label is that channel and it is
 *    now on by default; above four it stays available and the row labels carry
 *    identity on their own.
 *
 * ## Rows, not marks
 *
 * This is the one chart in the bar family that is really a *list*, so each row
 * is a real hit target at the 44 floor (`MIN_TAP_CLASS`, rule 10) rather than a
 * 12px-tall SVG node with no padding, and the rows sit on the spacing rhythm
 * rather than on `CHART_MARK.gap`: the constant is the hairline of page between
 * two fills that would otherwise *touch*, and two labelled rows never touch.
 * The gap obligation is discharged with room to spare.
 */
export const ColumnChartV4 = React.forwardRef<HTMLDivElement, ColumnChartV4Props>(
  function ColumnChartV4(
    {
      data,
      max,
      barHeight = 12,
      showValues,
      tone,
      format = String,
      title,
      summary,
      caption,
      height = 120,
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
    injectStyleOnce(COLUMN_CHART_V4_STYLE_ID, COLUMN_CHART_V4_CSS);
    const [hovered, setHovered] = React.useState<number | null>(null);

    const label = columnChartLabel(data, title, format);
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
        data-xen-v4-column-chart=""
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
    if (data.length === 0) return frame(<ChartEmptyV4 label={emptyLabel} height={height} />);

    const ceiling = ceilingOf(
      data.map((d) => d.value),
      max
    );
    const directLabels = showValues ?? data.length <= CHART_DIRECT_LABEL_MAX;

    return frame(
      <div
        role="img"
        aria-label={label}
        data-xen-v4-chart=""
        data-xen-v4-chart-plot=""
        {...(animate ? { 'data-animate': 'true' } : {})}
        className="flex w-full flex-col gap-sm"
      >
        {data.map((d, i) => {
          const showValue = directLabels || (tooltip && hovered === i);
          return (
            <div
              key={i}
              data-xen-v4-bar-hit=""
              className={cn('flex flex-col justify-center gap-xs', MIN_TAP_CLASS)}
              onPointerEnter={tooltip ? () => setHovered(i) : undefined}
              onPointerLeave={tooltip ? () => setHovered(null) : undefined}
              onClick={onSelect ? () => onSelect(i, d.value) : undefined}
            >
              <div className="flex items-center justify-between gap-sm">
                <TextV4 size="xs" tone="mutedText" numberOfLines={1} className="min-w-0 flex-1">
                  {d.label}
                </TextV4>
                {showValue ? (
                  <TextV4
                    data-xen-v4-chart-value=""
                    // A direct label is simply there; a label the pointer
                    // reveals is a reveal, and takes the line's shared tip
                    // fade. Same marker either way, so the two cannot be
                    // painted differently.
                    data-reveal={directLabels ? undefined : 'hover'}
                    size="xs"
                    tone="mutedText"
                    numeric="tabular"
                    className="shrink-0"
                  >
                    {format(d.value)}
                  </TextV4>
                ) : null}
              </div>
              <div className="flex w-full items-stretch">
                {/*
                  The baseline. A horizontal bar grows from x = 0, and a chart
                  whose bars start at an invisible origin is a row of loose
                  lozenges — which is what the base rendered.
                */}
                <div data-xen-v4-chart-axis="" style={{ width: 1 }} />
                <div
                  data-xen-v4-chart-track=""
                  className="min-w-0 flex-1"
                  style={{
                    height: barHeight,
                    borderTopRightRadius: CHART_MARK.endRadius,
                    borderBottomRightRadius: CHART_MARK.endRadius,
                  }}
                >
                  <div
                    data-xen-v4-bar=""
                    style={{
                      width: `${barRatio(d.value, ceiling) * 100}%`,
                      height: '100%',
                      // `1` is the hairline exception in rule 1: a datum that
                      // exists should be visible as a datum even at 0.
                      minWidth: 1,
                      borderTopRightRadius: CHART_MARK.endRadius,
                      borderBottomRightRadius: CHART_MARK.endRadius,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

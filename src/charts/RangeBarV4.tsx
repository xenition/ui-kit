import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import {
  CHART_MARK,
  type ChartToneV4,
} from '../primitives/internal/v4-chart';
import { CHART_AXIS_VAR, CHART_GRID_VAR, ChartEmptyV4, chartVar, useChartV4 } from './internal-v4';

/**
 * The opt-in to status colour, and the only way this chart paints one
 * (brief §4.3).
 *
 * A range genuinely means something bad often enough to earn the prop — a
 * latency band over its budget, a temperature outside its safe window — and it
 * ships with the visible `start`–`end` label, never colour alone.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type RangeBarV4Tone = ChartToneV4;

export interface RangeBarV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
  /** Start of the highlighted range, in domain units. */
  start: number;
  /** End of the highlighted range, in domain units. */
  end: number;
  /** Domain minimum — the track's left edge. */
  domainMin?: number;
  /** Domain maximum — the track's right edge. */
  domainMax?: number;
  /** Track height in px. */
  height?: number;
  /** Status colour. Omit it and the range is slot 1 — see {@link RangeBarV4Tone}. */
  tone?: RangeBarV4Tone;
  /**
   * Show the domain ends and the range itself in words. Default `true` — one
   * mark is well inside `CHART_DIRECT_LABEL_MAX`, and a floating bar with no
   * numbers anywhere is a picture of a range rather than a reading of one.
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
  /** Render a skeleton at the track's footprint instead of the track. */
  loading?: boolean;
  /** What the empty state says. Keeps the footprint either way (brief §4.5). */
  emptyLabel?: string;
  /** Play the entrance reveal, once. Default `true` (brief §4.7). */
  animate?: boolean;
  /**
   * Reveal the range in words on hover even when
   * {@link RangeBarV4Props.showValues} is off. Default `true` (brief §4.6).
   */
  tooltip?: boolean;
  /** Fired when the bar is clicked. See the note on the bar chart's `onSelect`. */
  onSelect?: (start: number, end: number) => void;
}

/** Where a domain value falls on the track, as a fraction in `[0, 1]`. */
function position(value: number, domainMin: number, span: number): number {
  if (!Number.isFinite(value) || span <= 0) return 0;
  return Math.min(Math.max((value - domainMin) / span, 0), 1);
}

/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function rangeBarLabel(
  lo: number,
  hi: number,
  domainMin: number,
  domainMax: number,
  title: string | undefined,
  format: (value: number) => string
): string {
  const head = `Range bar${title ? `, ${title}` : ''}`;
  const range = lo === hi ? format(lo) : `${format(lo)} to ${format(hi)}`;
  return `${head}, ${range}, on a scale of ${format(domainMin)} to ${format(domainMax)}`;
}

/**
 * The custom property the range mark reads its fill from.
 *
 * The palette reaches an element as `var(--xen-chart-1)`, and a `var()` in an
 * inline `background-color` is dropped outright by the jsdom CSSOM — the same
 * hazard `internal-v4.tsx` records against `color-mix()`. So the value goes
 * inline as a **custom property**, which no CSSOM validates, and one static
 * rule turns it into paint.
 */
const MARK_FILL = '--xen-v4-mark-fill';

/** The one `<style>` id this component injects from. Idempotent. */
export const RANGE_BAR_V4_STYLE_ID = 'xen-v4-range-bar-styles';

/**
 * Paint, keyed off the chart's own root attribute. Three chrome roles, kept
 * distinct: the range is data, the track is grid, the domain rule is axis
 * (brief §3.3).
 */
export const RANGE_BAR_V4_CSS = `
[data-xen-v4-range-bar] [data-xen-v4-range] { background-color: var(${MARK_FILL}); }
[data-xen-v4-range-bar] [data-xen-v4-chart-track] { background-color: ${CHART_GRID_VAR}; }
[data-xen-v4-range-bar] [data-xen-v4-chart-axis] { background-color: ${CHART_AXIS_VAR}; }
`;

/**
 * **V4 floating bar** — one band, `start` to `end`, on a domain.
 *
 * Web has never had this component. `RangeBar` exists only under
 * `native/charts/`, which is why `COMPONENTS.md` counts 20 and the web module
 * ships 16 (brief §6). It is built here as V4 only — there is no base to
 * mirror, so there is no base to write — with the native props verbatim and
 * `className` in place of `style`.
 *
 * **This is the one bar form rounded at both ends**, and the reason is worth
 * stating because it is the exception that proves brief §4.4's rule. Every
 * other bar in this family has a baseline: it grows from zero, and rounding the
 * end it grows *from* lifts it off its own axis. A range bar has no baseline.
 * Both of its ends are data — `start` is as much a measurement as `end` — so
 * `CHART_MARK.endRadius` applies to both, and a square end here would read as a
 * bar that had been clipped rather than one that had been measured.
 *
 * What it takes from the shared decisions:
 *
 * - **Track from {@link CHART_GRID_VAR}**, not `colors.border`. The native base
 *   paints `colors.border` — a hairline colour doing a fill's job, and one that
 *   does not follow the scheme the way the derived chrome neutral does.
 * - **The domain axis from {@link CHART_AXIS_VAR}**, one step more present than
 *   the track behind it (brief §3.3). The native base draws no axis at all, so
 *   its range floats on a grey pill with nothing to read it against.
 * - **Slot 1, or a `tone`.** Never `color?: ChartColor` as an identity: the
 *   native base's `color = 'primary'` default is a semantic slot standing in
 *   for a series colour, which is what brief §1 rule 2 exists to retire.
 * - **A zero-width range is a point, not nothing.** `start === end` is a real
 *   reading — a distribution collapsed to one value — so the mark floors at
 *   `CHART_MARK.dotSize`, this line's smallest painted point, rather than at
 *   the 1px hairline that would make it look like a rendering artefact.
 *
 * The value labels sit **under the axis** rather than floating over the mark.
 * Centring an unmeasured label over a percentage offset is not something React
 * Native can do without measuring first, and a twin pair where one platform
 * labels in place and the other labels underneath is a parity break dressed up
 * as a platform difference.
 */
export const RangeBarV4 = React.forwardRef<HTMLDivElement, RangeBarV4Props>(function RangeBarV4(
  {
    start,
    end,
    domainMin = 0,
    domainMax = 100,
    height = 10,
    tone,
    showValues = true,
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
  injectStyleOnce(RANGE_BAR_V4_STYLE_ID, RANGE_BAR_V4_CSS);
  const [hovered, setHovered] = React.useState(false);

  const lo = Math.min(start, end);
  const hi = Math.max(start, end);
  const label = rangeBarLabel(lo, hi, domainMin, domainMax, title, format);
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
      data-xen-v4-range-bar=""
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

  const span = domainMax - domainMin;
  // Not-a-number endpoints and an inverted or collapsed domain are all the same
  // picture: a track with nothing readable on it. The base divides by
  // `Math.max(domainMax - domainMin, 1)` and draws a mark anyway, which puts a
  // confident-looking band at an arbitrary place (brief §4.5).
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || !Number.isFinite(span) || span <= 0) {
    return frame(<ChartEmptyV4 label={emptyLabel} height={height} />);
  }

  const left = position(lo, domainMin, span);
  const right = position(hi, domainMin, span);
  const showRange = showValues || (tooltip && hovered);

  return frame(
    <div role="img" aria-label={label} className="flex w-full flex-col gap-xs">
      <div
        data-xen-v4-chart=""
        data-xen-v4-chart-plot=""
        {...(animate ? { 'data-animate': 'true' } : {})}
        className={cn('flex w-full items-center', MIN_TAP_CLASS)}
        onPointerEnter={tooltip ? () => setHovered(true) : undefined}
        onPointerLeave={tooltip ? () => setHovered(false) : undefined}
        onClick={onSelect ? () => onSelect(lo, hi) : undefined}
      >
        <div
          data-xen-v4-chart-track=""
          className="relative w-full"
          style={{ height, borderRadius: CHART_MARK.endRadius }}
        >
          <div
            data-xen-v4-range=""
            // The line's shared "my length is the value" marker. A range moves
            // at both ends, so it is `left` as well as `width` that eases.
            data-xen-v4-chart-fill=""
            className="absolute top-0"
            style={{
              left: `${left * 100}%`,
              width: `${(right - left) * 100}%`,
              height: '100%',
              // A range of zero width is a point, and a point in this line is
              // `dotSize` — below that it stops reading as a mark at all.
              minWidth: CHART_MARK.dotSize,
              // Both ends, and only here: neither end of a range is a baseline.
              borderRadius: CHART_MARK.endRadius,
            }}
          />
        </div>
      </div>
      <div data-xen-v4-chart-axis="" style={{ height: 1 }} />
      {showRange ? (
        <div className="flex w-full items-baseline justify-between gap-sm">
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {format(domainMin)}
          </TextV4>
          <TextV4
            data-xen-v4-chart-value=""
            size="xs"
            tone="mutedText"
            weight="semibold"
            numeric="tabular"
          >
            {lo === hi ? format(lo) : `${format(lo)}–${format(hi)}`}
          </TextV4>
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {format(domainMax)}
          </TextV4>
        </div>
      ) : null}
    </div>
  );
});

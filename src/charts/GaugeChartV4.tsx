import * as React from 'react';
import { TextV4 } from '../primitives/TextV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { CHART_GRID_VAR, ChartEmptyV4, chartVar, useChartV4 } from './internal-v4';
import { ChartFigureV4, polarV4, toneVarV4, type ChartToneV4 } from './PieChartV4';
import { radialThicknessV4 } from './ProgressRingV4';

/** Two decimals, and never `NaN` in a path `d`. */
const coord = (n: number): string => (Number.isFinite(n) ? n.toFixed(2) : '0');

/**
 * A point on the gauge's semicircle. `t` in `[0, 1]` walks 180° → 0°, i.e.
 * left to right across the top half, which is the direction every reviewed
 * system draws a gauge in.
 */
function gaugePoint(cx: number, cy: number, r: number, t: number): [number, number] {
  const a = Math.PI * (1 - t);
  const [x, y] = polarV4(cx, cy, r, -a);
  return [x, y];
}

export interface GaugeChartV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** Current value. Clamped into `[min, max]`; non-finite reads as `min`. */
  value: number;
  /** Left end of the arc. Default 0. */
  min?: number;
  /** Right end of the arc. Default 100. */
  max?: number;
  /** Width in px; the height is derived from the semicircle. Default 200. */
  size?: number;
  /** Arc thickness in px. Omit for the family's derived thickness. */
  thickness?: number;
  /**
   * Opt in to a status hue (§1 rule 3) — a gauge that genuinely reads "over
   * budget" or "capacity critical". Omitted, the fill is slot 1.
   */
  tone?: ChartToneV4;
  /** The descriptive headline. HIG's rule: say the takeaway. */
  title?: string;
  /**
   * The one loud number, drawn in the arc's well. Defaults to the clamped
   * `value`; pass a formatted string ("£48,210", "72%") to override it.
   */
  summary?: string;
  /** The quiet line under the title. */
  caption?: string;
  /** Draw the `summary`. Default `true`. */
  showValue?: boolean;
  /** Swap the plot for a `SkeletonV4` at the same footprint (§4.5). */
  loading?: boolean;
  /** The empty state's wording. */
  emptyLabel?: string;
  /** Run the entrance reveal. Default `true`; reduced motion fades instead. */
  animate?: boolean;
}

/**
 * **V4 gauge** — a single value against a scale, so it is a figure with a
 * `summary` and **no legend**.
 *
 * That sentence is brief §5's whole direction for this component, and it is
 * load-bearing rather than descriptive: a legend is the identity channel's
 * redundancy (§4.8) and exists "whenever there are two or more series". One
 * series has no identity to disambiguate, so a legend on a gauge would be a
 * swatch next to the only colour on screen. The redundancy obligation is
 * discharged by the visible number instead, which is the strongest secondary
 * encoding the line has.
 *
 * Four changes against the base.
 *
 * 1. **The track is chrome.** `var(--xen-border)` was a hairline colour doing a
 *    track's job (§3, decision 3). It is `CHART_GRID_VAR` now — the derived
 *    neutral the whole line's grid takes, which follows the scheme without a
 *    dark rule of its own.
 * 2. **`strokeWidth={10}` became a derived thickness.** §5 asks for this by
 *    name; `radialThicknessV4` is the family's answer and is shared with
 *    `ProgressRingV4` and `DonutChartV4` so the three cannot drift.
 * 3. **The needle is gone.** It encoded the value a second time — the arc's end
 *    already *is* the value — and it cost `strokeWidth={2}` and `r={4}`, both
 *    on §1 rule 1's list of literals this pass exists to remove. Removing it is
 *    also what lets the well hold a number at the figure's own type step
 *    instead of the base's `fontSize={size * 0.14}`, which was a font size
 *    computed from a pixel width and belonged to no scale at all.
 * 4. **The fill is a palette slot or a `tone`.** The base's `color?: ChartColor`
 *    defaulted to `'primary'` and accepted `'danger'` as though the two were
 *    the same kind of choice. They are not: one is identity, one is state
 *    (§4.3), and only `tone` reaches a status hue.
 *
 * The empty state is a non-positive span. `min === max` is a gauge with no
 * scale, which the base papered over with `max - min || 1` — a silent lie that
 * draws a full arc for every value.
 */
export const GaugeChartV4 = React.forwardRef<HTMLDivElement, GaugeChartV4Props>(
  function GaugeChartV4(
    {
      value,
      min = 0,
      max = 100,
      size = 200,
      thickness,
      tone,
      title,
      summary,
      caption,
      showValue = true,
      loading = false,
      emptyLabel,
      animate = true,
      className,
      ...rest
    },
    ref
  ) {
    const chart = useChartV4(animate);

    const arcWidth =
      thickness === undefined || !Number.isFinite(thickness)
        ? radialThicknessV4(size)
        : Math.max(thickness, 0);
    // The arc is a half-disc plus half a stroke above and below the centre
    // line, so the block is never taller than it needs to be and the caller's
    // grid row does not move when the gauge appears.
    const height = size / 2 + arcWidth;

    const frame = (plot: React.ReactNode): React.ReactElement => (
      <ChartFigureV4
        ref={ref}
        title={title}
        caption={caption}
        className={className}
        {...rest}
      >
        {plot}
      </ChartFigureV4>
    );

    if (loading) return frame(<SkeletonV4 variant="rect" width={size} height={height} />);

    const span = max - min;
    if (!Number.isFinite(span) || span <= 0) {
      return frame(<ChartEmptyV4 label={emptyLabel} height={height} />);
    }

    const clamped = Number.isFinite(value) ? Math.min(Math.max(value, min), max) : min;
    const t = (clamped - min) / span;

    const cx = size / 2;
    const cy = size / 2;
    const r = Math.max(size / 2 - arcWidth / 2, 0);

    const [sx, sy] = gaugePoint(cx, cy, r, 0);
    const [ex, ey] = gaugePoint(cx, cy, r, 1);
    const track = `M${coord(sx)} ${coord(sy)} A${coord(r)} ${coord(r)} 0 0 1 ${coord(ex)} ${coord(ey)}`;
    /*
      The value arc is the TRACK's geometry, revealed by a dash.

      It used to be its own shorter arc, ending at `gaugePoint(t)` with a
      large-arc flag that flipped at the halfway mark. That draws the same
      picture, but its length lives in the path `d` — and `d` is not a property
      CSS can interpolate across a changing arc flag, so a gauge whose value
      moved after mount jumped from one arc to the next.

      `stroke-dashoffset` is a number on one fixed path, which is exactly what
      a transition can carry, and it is the spelling `ProgressRingV4` already
      uses — the two radial members of this family now measure themselves the
      same way instead of drifting.

      The arc is a semicircle, so its length is `π r` with no approximation.
    */
    const arcLength = Math.PI * r;

    const stroke = tone === undefined ? chartVar(0) : toneVarV4(tone);
    const centre = summary ?? String(clamped);

    return frame(
      <div className="relative inline-block" style={{ width: size, height }}>
        <svg
          {...chart.rootProps}
          viewBox={`0 0 ${size} ${height}`}
          width={size}
          height={height}
          role="img"
          aria-label={`Gauge, ${clamped} of ${max}`}
        >
          <path
            d={track}
            fill="none"
            stroke={CHART_GRID_VAR}
            strokeWidth={arcWidth}
            strokeLinecap="round"
          />
          {/*
            At `t === 0` the value arc's start and end coincide, and an arc
            command between two identical points draws nothing — except with a
            round cap, where some renderers put a dot at the left end and
            others put nothing, so "zero" looks like a small non-zero. Skipping
            the element is the one rendering both agree on.
          */}
          {t > 0 ? (
            <path
              // The line's shared "my length is the value" marker.
              data-xen-v4-chart-fill=""
              d={track}
              fill="none"
              stroke={stroke}
              strokeWidth={arcWidth}
              strokeLinecap="round"
              strokeDasharray={arcLength}
              // A full gauge is `t === 1`, which lands the offset at exactly 0
              // — no rounding, no seam, and never `NaN`, because `r` is
              // floored at zero and `t` is clamped into `[0, 1]`.
              strokeDashoffset={arcLength * (1 - t)}
            />
          ) : null}
        </svg>
        {showValue ? (
          // Already spoken by the `<svg>`'s label, so the visible copy is
          // hidden rather than announced twice.
          <span
            aria-hidden="true"
            data-xen-v4-gauge-value=""
            className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
          >
            <TextV4 size="2xl" weight="bold" numeric="tabular">
              {centre}
            </TextV4>
          </span>
        ) : null}
      </div>
    );
  }
);

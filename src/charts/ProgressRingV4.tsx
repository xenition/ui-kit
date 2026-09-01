import * as React from 'react';
import { cn } from '../primitives/cn';
import { TextV4 } from '../primitives/TextV4';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import { CHART_GRID_VAR, ChartEmptyV4, chartVar, useChartV4 } from './internal-v4';
import { ChartLoadingV4, toneVarV4, type ChartToneV4 } from './PieChartV4';

/**
 * Ring thickness as a fraction of the diameter.
 *
 * A geometric ratio, which is the one category of bare number brief §1 rule 1
 * allows, and it is a **ratio** on purpose: the base wrote `strokeWidth={10}`
 * and `thickness = 10`, which is a third of a 30px ring and a twentieth of a
 * 200px one. §5 asks for exactly this — "the `strokeWidth={10}` becomes a
 * derived thickness" — so the ring's weight follows its size and a small ring
 * reads as a small version of the same component rather than as a different
 * one.
 *
 * The value reproduces the base's own proportion at its default size (a 120
 * ring at `thickness = 12`), so nothing that looked right stops looking right.
 */
export const RADIAL_THICKNESS_RATIO = 0.1;

/**
 * The radial family's one ring thickness, shared by `ProgressRingV4`,
 * `GaugeChartV4` and `DonutChartV4`.
 *
 * Floored at `CHART_MARK.dotSize`, because a track thinner than the smallest
 * mark the line will paint has stopped being a track: it reads as a hairline
 * border and the reader loses the "this is a proportion" cue entirely.
 */
export function radialThicknessV4(size: number): number {
  const derived = Number.isFinite(size) ? size * RADIAL_THICKNESS_RATIO : 0;
  return Math.max(derived, CHART_MARK.dotSize);
}

export interface ProgressRingV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current value. Clamped into `[0, max]`; non-finite reads as zero. */
  value: number;
  /** The value that fills the ring. Default 100. */
  max?: number;
  /** Outer diameter in px. Default 120. */
  size?: number;
  /** Ring thickness in px. Omit for the family's derived thickness. */
  thickness?: number;
  /**
   * Opt in to a status hue (§1 rule 3). Omitted, the ring is slot 1 — the
   * brand hue itself, which is what every reviewed system does for a
   * single-series form and what makes a ring match the card it sits in.
   */
  tone?: ChartToneV4;
  /** Centre text. Overrides the percentage. */
  label?: string;
  /** Show the rounded percentage in the centre when there is no `label`. */
  showValue?: boolean;
  /** Swap the ring for a `SkeletonV4` at the same footprint (§4.5). */
  loading?: boolean;
  /** The empty state's wording. */
  emptyLabel?: string;
  /** Run the entrance reveal. Default `true`; reduced motion fades instead. */
  animate?: boolean;
}

/**
 * **V4 progress ring** — a *mark*, not a figure, and the one component of the
 * radial family that deliberately takes none of §4.2's frame.
 *
 * Brief §4.2 names it in the exception: "Marks-only components (`Sparkline`,
 * `MiniBar`, `ProgressRing` at small sizes) take none of this: they are a mark
 * inside someone else's figure." It is what goes in a table cell, a list row or
 * a `StatCard`, so a title and a legend attached to it would be a second figure
 * frame inside the caller's own. It still states its value in words — rule 6 is
 * not waived for a mark — through the `aria-label` on its `<svg>`.
 *
 * Three fixes against the base.
 *
 * 1. **The track is chrome, not a border.** The base painted it
 *    `var(--xen-border)`, which is a *hairline* colour doing a track's job —
 *    §3's third decision names that exact substitution as the bug. `CHART_GRID_VAR`
 *    is the derived chrome neutral, mixed from `onSurface` so it follows the
 *    theme with no dark rule of its own; `--xen-border` is a single flat value
 *    and reads as a drawn edge around a hole rather than as the unfilled part
 *    of a measure.
 * 2. **The progress arc is a palette slot, not a semantic token.** `chartVar(0)`
 *    is the brand hue and is the same colour a `SparklineV4` in the same card
 *    takes, which is the point of slot 1 sitting at `+0` rotation. `tone` is
 *    the opt-in for a ring that genuinely means good or bad, and it is the only
 *    path to a status hue (§4.3).
 * 3. **The thickness is derived.** See {@link RADIAL_THICKNESS_RATIO}: a fixed
 *    `10` is a third of a small ring and a rounding error on a large one.
 *
 * The empty state is `max <= 0` — a ring with no scale cannot be drawn without
 * dividing by zero, and the base returned a bare string for it, which §4.5
 * rules out ("never a bare string, never `null`") because the caller cannot
 * tell "no data yet" from "the request failed".
 */
export const ProgressRingV4 = React.forwardRef<HTMLDivElement, ProgressRingV4Props>(
  function ProgressRingV4(
    {
      value,
      max = 100,
      size = 120,
      thickness,
      tone,
      label,
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

    const shell = (body: React.ReactNode): React.ReactElement => (
      <div
        ref={ref}
        data-xen-v4-progress-ring=""
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: size, height: size }}
        {...rest}
      >
        {body}
      </div>
    );

    if (loading) return shell(<ChartLoadingV4 size={size} />);
    if (!Number.isFinite(max) || max <= 0) {
      return shell(<ChartEmptyV4 label={emptyLabel} height={size} />);
    }

    const clamped = Number.isFinite(value) ? Math.min(Math.max(value, 0), max) : 0;
    const ratio = clamped / max;
    const percent = Math.round(ratio * 100);

    const ringWidth =
      thickness === undefined || !Number.isFinite(thickness)
        ? radialThicknessV4(size)
        : Math.max(thickness, 0);
    // The stroke straddles the path, so the radius is inset by half of it or
    // the ring paints outside its own footprint.
    const r = Math.max((size - ringWidth) / 2, 0);
    const c = 2 * Math.PI * r;
    const cx = size / 2;

    const stroke = tone === undefined ? chartVar(0) : toneVarV4(tone);
    const centre = label ?? (showValue ? `${percent}%` : undefined);

    return shell(
      <>
        <svg
          {...chart.rootProps}
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="img"
          aria-label={`Progress ring, ${percent}%`}
        >
          <circle cx={cx} cy={cx} r={r} fill="none" stroke={CHART_GRID_VAR} strokeWidth={ringWidth} />
          {ratio > 0 ? (
            <circle
              // The line's shared "my length is the value" marker. The arc's
              // length is its dash offset, so that is what eases when the
              // value changes after mount — 40% to 75% travels rather than
              // redrawing.
              data-xen-v4-chart-fill=""
              cx={cx}
              cy={cx}
              r={r}
              fill="none"
              stroke={stroke}
              strokeWidth={ringWidth}
              strokeLinecap="round"
              strokeDasharray={c}
              // A full ring is `ratio === 1`, which lands the offset at exactly
              // 0 — no rounding, no seam, no `NaN`, because `c` is finite for
              // every finite `size` and `r` is floored at zero.
              strokeDashoffset={c * (1 - ratio)}
              transform={`rotate(-90 ${cx} ${cx})`}
            />
          ) : null}
        </svg>
        {centre === undefined ? null : (
          <span
            aria-hidden="true"
            data-xen-v4-ring-center=""
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <TextV4 size="lg" weight="semibold" numeric="tabular">
              {centre}
            </TextV4>
          </span>
        )}
      </>
    );
  }
);

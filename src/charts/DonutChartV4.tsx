import * as React from 'react';
import { cn } from '../primitives/cn';
import { TextV4 } from '../primitives/TextV4';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import { ChartEmptyV4, useChartV4 } from './internal-v4';
import {
  ChartFigureV4,
  ChartLoadingV4,
  PIE_OTHER_LABEL,
  RadialLegendV4,
  annulusPathV4,
  foldPieDataV4,
  segmentFillV4,
  segmentLegendLabelV4,
  shareOfV4,
  type PieDatumV4,
  type PieSegmentV4,
} from './PieChartV4';
import { radialThicknessV4 } from './ProgressRingV4';

export type { PieDatumV4 as DonutDatumV4 } from './PieChartV4';

export interface DonutChartV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** The segments. Six or more are sorted and folded into "Other". */
  data: readonly PieDatumV4[];
  /** Outer diameter in px, and the plot's whole footprint. Default 160. */
  size?: number;
  /**
   * Ring thickness **as a fraction of the outer radius**, `0` to `1`. Omit for
   * the family's derived thickness.
   *
   * The bases disagreed on what this prop even meant: web took a fraction
   * (`0.42`), native took pixels (`32`), so the same number produced a hairline
   * on one twin and a solid disc on the other. That is a prop-parity break of
   * the kind brief §1 rule 7 exists to close, and V4 closes it on the fraction,
   * because a thickness in pixels does not survive a caller changing `size`.
   */
  thickness?: number;
  /** The descriptive headline. HIG's rule: say the takeaway. */
  title?: string;
  /**
   * The one loud number, drawn **in the hole** — brief §5's "donut's centre is
   * a slot for `summary`".
   */
  summary?: string;
  /** The quiet line under the title. */
  caption?: string;
  /** Show the legend. Default `true` at two or more segments. */
  legend?: boolean;
  /** Swap the plot for a `SkeletonV4` at the same footprint. */
  loading?: boolean;
  /** The empty state's wording. */
  emptyLabel?: string;
  /** What the folded tail is called in the legend. Default `'Other'`. */
  otherLabel?: string;
  /** Run the entrance reveal. Default `true`; reduced motion fades instead. */
  animate?: boolean;
}

/**
 * **V4 donut chart** — the pie's sibling, and the one radial form with a place
 * to put the number.
 *
 * Everything `PieChartV4` changed applies here for the same reasons: slots in
 * assignment order instead of a status arc, `CHART_MARK.gap` of surface between
 * segments instead of `strokeWidth={1}`, and the "Other" fold at six or more
 * rather than a palette that wraps. Three things are this component's own.
 *
 * 1. **The hole is a slot, not a hole.** Brief §5 is explicit — "donut's centre
 *    is a slot for `summary`" — and §3 puts the number above the plot in the
 *    reading order for a reason: "the number is bigger than the chart is loud".
 *    A donut is the one form where those two land in the same place, so
 *    `summary` is typeset in the middle at the figure's `2xl` bold rather than
 *    the base's hand-rolled `text-lg font-semibold`, and the caption sits under
 *    it in the same well. The base's `centerLabel` is retired: it took a raw
 *    string at a size nothing else in the kit used.
 * 2. **The segments are real annuli.** The base drew full pie wedges and then
 *    punched a `--xen-surface` circle over the top of them. That works until
 *    the donut sits on anything that is not `--xen-surface` — a `card`, a
 *    tinted panel, an image — at which point a surface-coloured disc appears in
 *    the middle of the chart. V4 draws the ring itself, so the hole is actually
 *    a hole and whatever is behind the chart shows through it.
 * 3. **The thickness is derived.** `radialThicknessV4` is the family's one
 *    answer, shared with `GaugeChartV4` and `ProgressRingV4`, so the three do
 *    not each pick a ring weight; a caller who wants something else passes a
 *    fraction of the radius rather than a pixel count that stops being right
 *    the moment `size` changes.
 */
export const DonutChartV4 = React.forwardRef<HTMLDivElement, DonutChartV4Props>(
  function DonutChartV4(
    {
      data,
      size = 160,
      thickness,
      title,
      summary,
      caption,
      legend,
      loading = false,
      emptyLabel,
      otherLabel = PIE_OTHER_LABEL,
      animate = true,
      className,
      ...rest
    },
    ref
  ) {
    const chart = useChartV4(animate);
    const fold = React.useMemo(() => foldPieDataV4(data, otherLabel), [data, otherLabel]);

    const frame = (plot: React.ReactNode, legendNode?: React.ReactNode): React.ReactElement => (
      <ChartFigureV4
        ref={ref}
        title={title}
        caption={caption}
        legend={legendNode}
        className={className}
        {...rest}
      >
        {plot}
      </ChartFigureV4>
    );

    if (loading) return frame(<ChartLoadingV4 size={size} />);
    if (fold.segments.length === 0 || fold.total <= 0) {
      return frame(<ChartEmptyV4 label={emptyLabel} height={size} />);
    }

    const cx = size / 2;
    const cy = size / 2;
    const rOuter = size / 2 - CHART_MARK.gap / 2;
    // A fraction of the *outer radius*, clamped so a caller cannot ask for a
    // ring thicker than the circle or thin enough to vanish.
    const ringWidth =
      thickness === undefined || !Number.isFinite(thickness)
        ? radialThicknessV4(size)
        : Math.min(Math.max(thickness, 0), 1) * rOuter;
    const rInner = Math.max(rOuter - ringWidth, 0);

    const showLegend = legend ?? fold.segments.length > 1;
    const legendNode = showLegend ? (
      <RadialLegendV4
        items={fold.segments.map((segment, i) => ({
            label: segmentLegendLabelV4(segment),
          slot: i,
          ...(segment.tone === undefined ? {} : { tone: segment.tone }),
          value: `${shareOfV4(segment.value, fold.total)}%`,
        }))}
      />
    ) : undefined;

    const top = fold.segments.reduce((a, b) => (b.value > a.value ? b : a));
    const spoken =
      `Donut chart, ${fold.segments.length} segment${fold.segments.length === 1 ? '' : 's'}` +
      (summary === undefined ? '' : `, ${summary}`) +
      `, largest ${top.label} at ${shareOfV4(top.value, fold.total)}%` +
      (fold.foldedCount > 0
        ? `, ${fold.foldedCount} smaller categories folded into ${otherLabel}`
        : '');

    let angle = -Math.PI / 2;
    const single = fold.segments.length === 1;
    const only = fold.segments[0] as PieSegmentV4;

    return frame(
      <div className="relative inline-block" style={{ width: size, height: size }}>
        <svg
          {...chart.rootProps}
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="img"
          aria-label={spoken}
        >
          {single ? (
            // A whole ring is 360°, which an arc path cannot express — its two
            // endpoints coincide and the renderer draws nothing at all. Two
            // concentric circles with `fill-rule="evenodd"` on one path is the
            // shape that survives it, and it keeps the hole transparent, which
            // the base's overpainted disc did not.
            <path
              d={
                `M${cx} ${cy - rOuter} A${rOuter} ${rOuter} 0 1 0 ${cx} ${cy + rOuter} ` +
                `A${rOuter} ${rOuter} 0 1 0 ${cx} ${cy - rOuter} Z ` +
                `M${cx} ${cy - rInner} A${rInner} ${rInner} 0 1 1 ${cx} ${cy + rInner} ` +
                `A${rInner} ${rInner} 0 1 1 ${cx} ${cy - rInner} Z`
              }
              fillRule="evenodd"
              fill={segmentFillV4(only, 0)}
            >
              <title>{`${only.label}: ${only.value}`}</title>
            </path>
          ) : (
            fold.segments.map((segment, i) => {
              const a0 = angle;
              const a1 = angle + (segment.value / fold.total) * Math.PI * 2;
              angle = a1;
              return (
                <path
                  key={segment.label}
                  d={annulusPathV4(cx, cy, rOuter, rInner, a0, a1)}
                  fill={segmentFillV4(segment, i)}
                  stroke="var(--xen-surface)"
                  strokeWidth={CHART_MARK.gap}
                >
                  <title>{`${segment.label}: ${segment.value}`}</title>
                </path>
              );
            })
          )}
        </svg>
        {summary === undefined ? null : (
          // Spoken by the `<svg>`'s label already, so the visual copy is hidden
          // from assistive tech rather than read out a second time.
          <span
            aria-hidden="true"
            data-xen-v4-donut-center=""
            className={cn('pointer-events-none absolute inset-0', 'flex items-center justify-center')}
          >
            <TextV4 size="2xl" weight="bold" numeric="tabular">
              {summary}
            </TextV4>
          </span>
        )}
      </div>,
      legendNode
    );
  }
);

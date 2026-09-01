import * as React from 'react';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { CHART_GRID_VAR, useChartV4 } from './internal-v4';
import { CHART_MARK } from '../primitives/internal/v4-chart';
import { ChartDotV4, seriesInkV4, type ChartToneV4 } from './LineChartV4';

export interface SparklineV4Props
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'slot'> {
  /** Trend values, drawn left to right as one compact line. */
  data: number[];
  /** The viewBox width. */
  width?: number;
  /** The viewBox height. */
  height?: number;
  /**
   * Which categorical slot the line is painted from. Default `0` — the brand
   * hue itself, which is why a sparkline in a `TrendCardV4` matches the card
   * it sits in (see `CHART_HUE_OFFSETS`: "slot 1 is the brand hue at +0").
   */
  slot?: number;
  /**
   * Paint the line with a **status** hue instead of its slot, because the
   * series genuinely means good or bad. Ships with a label from whatever
   * figure the mark sits inside, never colour alone (brief §1 rule 3).
   */
  tone?: ChartToneV4;
  /** Value at the top of the box. Defaults to the largest datum. */
  max?: number;
  /** Value at the bottom of the box. Defaults to the smallest datum. */
  min?: number;
  /** Show the loading placeholder at the mark's own footprint. */
  loading?: boolean;
  /** Play the entrance reveal. Default `true`. */
  animate?: boolean;
  /**
   * The spoken sentence. Derived when omitted — brief §1 rule 6 applies to a
   * mark exactly as it does to a figure: a rendered trend that says nothing in
   * words is not accessible, however small it is.
   */
  'aria-label'?: string;
}

/**
 * How much of the box the line is inset by, so a datum at the very top or the
 * very bottom is not clipped by the viewBox edge.
 *
 * Geometry, and the one thing the base got right here — kept, but expressed as
 * half a dot rather than as `const pad = 2`, because what actually has to fit
 * is the painted dot of a single-datum series.
 */
const PAD = CHART_MARK.dotSize / 2;

/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n: number): number => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);

/**
 * **V4 sparkline** — a **mark**, not a figure.
 *
 * Brief §5 Group A is explicit: no title, no legend, no axis. HIG's "match
 * chart size to functionality" is the argument — a sparkline is a deliberate
 * size class that lives *inside* someone else's figure (a `TrendCardV4`, a
 * table cell, a row), and it carries none of §4.2's frame. Everything the
 * reader needs in words comes from the figure around it; what this component
 * owes is the shape and one honest sentence for a screen reader.
 *
 * ## What the base got wrong
 *
 * 1. **Colour was a semantic token.** `color = 'primary'` → `var(--xen-primary)`.
 *    A sparkline is a one-series mark, so it takes **slot 1** — which is the
 *    brand hue at `+0` rotation, so it lands where the base landed *and* it
 *    now belongs to the same palette as every other chart in the product,
 *    rather than to a token that happens to look similar.
 * 2. **`strokeWidth={1.5}` and `r={2}` were typed in.** Both are on brief §1
 *    rule 1's list of literals to remove. They are {@link CHART_MARK.stroke}
 *    and {@link CHART_MARK.dotSize} now.
 * 3. **The empty state dropped the footprint.** `ChartEmpty` renders a
 *    `text-sm` "No data" span, which in a 100×28 slot is both too big to fit
 *    and a different height from the mark it replaces — so a table of
 *    sparklines reflows the instant one row has no history. §4.5's rule is
 *    that all three states keep the footprint.
 * 4. **The twins were different components.** The web one is a polyline; the
 *    native one fakes it with `View` bars. Same name, same props, two
 *    different pictures. The native V4 moves to `react-native-svg` and this
 *    file is what it now matches.
 *
 * ## The empty state is a rule, not a sentence
 *
 * §4.5 asks for `ChartEmptyV4` and forbids a bare string or `null`. At a
 * mark's size neither is available: `ChartEmptyV4`'s label does not fit in 28
 * pixels of height, and shrinking it would be inventing a font size. So the
 * documented mark-scale reading of that rule is a **recessive baseline rule at
 * `CHART_GRID_VAR` across the mark's own footprint** — visibly "a sparkline
 * with nothing in it" rather than a gap — with the "no data" sentence carried
 * where §4.8 says the chart's meaning lives anyway: the `aria-label`.
 * `MiniBarV4` reads the rule the same way, for the same reason.
 */
export const SparklineV4 = React.forwardRef<HTMLSpanElement, SparklineV4Props>(
  function SparklineV4(
    {
      data,
      width = 100,
      height = 28,
      slot = 0,
      tone,
      max,
      min,
      loading = false,
      animate = true,
      className,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) {
    const chart = useChartV4(animate);
    const ink = seriesInkV4(slot, tone);

    const box = cn('inline-block align-middle', className);

    if (loading) {
      return (
        <span ref={ref} className={box} {...rest}>
          <SkeletonV4 variant="rect" width={width} height={height} />
        </span>
      );
    }

    if (data.length === 0) {
      return (
        <span
          ref={ref}
          role="img"
          aria-label={ariaLabel ?? 'Sparkline, no data'}
          className={box}
          {...rest}
        >
          <svg
            {...chart.rootProps}
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            preserveAspectRatio="none"
            focusable="false"
            className="overflow-visible"
          >
            <line
              data-xen-v4-chart-empty=""
              x1={0}
              y1={height - PAD}
              x2={width}
              y2={height - PAD}
              stroke={CHART_GRID_VAR}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>
      );
    }

    const hi = max ?? Math.max(...data);
    const lo = min ?? Math.min(...data);
    // A flat series divides by 1 and sits on the centre line. The base had this
    // guard; §4.5 asks the spec to assert it rather than trust it.
    const span = hi - lo || 1;
    const inner = Math.max(height - PAD * 2, 1);

    const points = data.map((v, i) => ({
      // §4.5: one datum is a dot at the centre, not `i / 0`.
      x: data.length === 1 ? width / 2 : PAD + (i / (data.length - 1)) * Math.max(width - PAD * 2, 1),
      y: height - PAD - clamp01((v - lo) / span) * inner,
    }));

    const derived = `Sparkline, ${data.length} point${data.length === 1 ? '' : 's'}, ${Math.min(
      ...data
    )} to ${Math.max(...data)}`;

    return (
      <span ref={ref} role="img" aria-label={ariaLabel ?? derived} className={box} {...rest}>
        <svg
          {...chart.rootProps}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          preserveAspectRatio="none"
          focusable="false"
          className="overflow-visible"
        >
          {points.length === 1 ? (
            <ChartDotV4
              x={(points[0] as { x: number; y: number }).x}
              y={(points[0] as { x: number; y: number }).y}
              ink={ink}
            />
          ) : (
            <polyline
              data-xen-v4-chart-line=""
              points={points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')}
              fill="none"
              stroke={ink}
              strokeWidth={CHART_MARK.stroke}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>
      </span>
    );
  }
);

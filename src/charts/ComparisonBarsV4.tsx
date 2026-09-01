import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import {
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
  foldChartSeries,
} from '../primitives/internal/v4-chart';
import { ChartEmptyV4, chartVar, useChartV4 } from './internal-v4';
import { LegendV4, type LegendV4Item, type LegendV4Tone } from './LegendV4';

export interface ComparisonBarsV4Group {
  /** The group's name, drawn under its bars. */
  label: string;
  /** One value per series, in series order. Short rows simply have fewer bars. */
  values: number[];
}

export interface ComparisonBarsV4Series {
  /** Stable identity for the series. Not rendered. */
  key: string;
  /** The series name, as it appears in the legend. */
  label: string;
  /**
   * Opt this series into a status hue instead of its categorical slot.
   * Use only where it genuinely *means* good or bad (rule 3).
   */
  tone?: LegendV4Tone;
}

export interface ComparisonBarsV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSelect'> {
  /** The groups, in reading order. */
  data: ComparisonBarsV4Group[];
  /**
   * The series being compared within each group, in slot order.
   *
   * Defaults to as many unnamed series as the widest group has values — which
   * renders, but a comparison whose series have no names has no legend worth
   * reading, so pass this.
   */
  series?: ComparisonBarsV4Series[];
  /** The value mapped to a full-height bar. Defaults to the largest datum. */
  max?: number;
  /** The plot's own height in px. Never auto (§4.2). */
  height?: number;
  /** The descriptive headline (§4.2). Say the takeaway. */
  title?: string;
  /** The one loud number, when the figure has one. */
  summary?: string;
  /** The quiet line under the plot — "vs last quarter". */
  caption?: string;
  /** Render the legend. Defaults to `true` at two or more series. */
  legend?: boolean;
  /** Per-bar hover tooltip. Default `true` (§4.6). */
  tooltip?: boolean;
  /**
   * Print each bar's value above it — the direct-label channel (§4.4).
   * Defaults on at `CHART_DIRECT_LABEL_MAX` groups or fewer.
   */
  showValues?: boolean;
  /** Format a value for its direct label and tooltip. Default `String`. */
  valueFormat?: (value: number) => string;
  /** Called when a bar is clicked. */
  onBarSelect?: (groupIndex: number, seriesIndex: number, value: number) => void;
  /** Show the loading placeholder at the plot's footprint instead of the bars. */
  loading?: boolean;
  /** What the empty state says. */
  emptyLabel?: string;
  /** Play the entrance reveal. Default `true` (§4.7). */
  animate?: boolean;
  /** Override the derived accessible sentence (rule 6). */
  'aria-label'?: string;
}

/** The one `<style>` id this component injects from. Idempotent. */
export const COMPARISON_BARS_V4_STYLE_ID = 'xen-v4-comparison-bars-styles';

/**
 * The bar fill and the baseline, as a sheet reading element-scoped custom
 * properties.
 *
 * The obvious spelling — `style={{ backgroundColor: chartVar(si) }}` — is wrong
 * for the reason `internal/nav-v4.ts`, `internal/row-v4.ts` and the V4 surfaces
 * all use sheets: **a CSSOM that does not parse `var()` drops the declaration
 * from an inline `style` outright.** jsdom is one such CSSOM and so is every
 * SSR style extractor built on one, so the bars would come out colourless in a
 * snapshot and in server-rendered HTML before hydration.
 *
 * A *custom* property survives, because React sets it with `setProperty` and a
 * custom property has no value grammar to fail. So the bar carries the choice
 * and this sheet paints it — and the choice still runs through `chartVar`, so
 * the five-slot throw is intact, which a sheet keyed by slot number would have
 * quietly lost.
 */
export const COMPARISON_BARS_V4_CSS = `
[data-xen-v4-bar] {
  background-color: var(--xen-bar-fill);
}
[data-xen-v4-comparison-axis] {
  background-color: var(--xen-chart-axis);
}
`;

/**
 * **V4 grouped comparison bars** — native-only until this pass; this is the web
 * twin, built as V4 with no base to mirror (§6).
 *
 * ## Why this one is flex and not SVG
 *
 * The rest of the web module draws into an inline `<svg>`, and this component
 * deliberately does not. A grouped bar chart is a nested list of rectangles
 * whose *gaps carry meaning* — `CHART_MARK.gap` inside a group, a full spacing
 * step between groups — and a flex row expresses exactly that, in tokens, with
 * the group labels sharing the same flex distribution as the bars they name. In
 * an SVG every one of those gaps would become arithmetic in a `viewBox`, and
 * the group labels would need `<text>` with a font size that no longer follows
 * the type scale.
 *
 * The second reason is parity. §6 says the four new web components take the
 * native props verbatim, and the native twin is `View`/flex; two twins built on
 * one layout model cannot drift the way an SVG and a flex stack would.
 *
 * ## The descending-opacity trick is retired
 *
 * The native base cycles two theme colours and then falls back to
 * `OPACITY_STEPS = [1, 0.6, 0.35, 0.2]`. Three things are wrong with it, and
 * they are the same three the palette module was written to end:
 *
 * 1. **A fourth series at 0.2 alpha reads as disabled**, because 0.38 alpha is
 *    exactly what disabled content is drawn at in this kit. The chart says
 *    "this series is switched off" when it means "this series is fourth".
 * 2. **Alpha is not a separable channel from lightness.** Two series at 0.6 and
 *    0.35 of one hue differ only in lightness, which is the *one* channel the
 *    palette deliberately reserves to keep adjacent slots apart for a dichromat
 *    — so the trick spends the safety margin rather than adding to it.
 * 3. **It cycles.** `seriesColors[si % seriesColors.length]` paints the third
 *    series the first colour again, at a different alpha, which is two
 *    encodings for one fact and neither is legible.
 *
 * V4 takes a slot per series in assignment order, and **folds past the fifth**
 * rather than reaching for a sixth. `chartVar(5)` still throws — asking the
 * palette for a slot it does not have is a mistake in the caller's own code —
 * but a grouped bar chart's series count arrives with the DATA, and a
 * `RangeError` out of render takes the page down. `foldChartSeries` in
 * `primitives/internal/v4-chart.ts` draws that line: the primitive throws, the
 * component folds. The tail's bars share the last slot and the legend carries
 * one row named `CHART_OVERFLOW_LABEL`.
 *
 * The bars are not summed. A group's bars are being *compared*, not composed,
 * so a bar whose height is the sum of the sixth and seventh series would be
 * taller than either and would read as a bigger measurement rather than as a
 * residual — the opposite of what a fold should say.
 *
 * ## The two gaps are the secondary encoding
 *
 * Rule 5 requires it and §5 names it for this component specifically:
 * `CHART_MARK.gap` of page between bars *inside* a group, and a full
 * `spacing.md` between groups. That difference is what makes the grouping
 * readable without colour at all — a reader counts three bars, a space, three
 * bars. The base used a bare `gap: 2` inside groups and `spacing.sm` between
 * them, which is nearly the same ratio arrived at by accident; this is the same
 * idea with both numbers traceable.
 *
 * ## Marks
 *
 * `CHART_MARK.endRadius` at the **data end only** (§4.4). A bar rounded at the
 * baseline floats off its axis, which is precisely what the base does — it sets
 * `borderTopLeftRadius`/`borderTopRightRadius` correctly, and that is the one
 * thing it got right, kept here. The baseline itself is `CHART_AXIS_VAR` at
 * `CHART_MARK.stroke`; the base painted it `colors.muted`, a *text* colour
 * doing an axis's job (§3).
 */
export const ComparisonBarsV4 = React.forwardRef<HTMLDivElement, ComparisonBarsV4Props>(
  function ComparisonBarsV4(
    {
      data,
      series,
      max,
      height = 120,
      title,
      summary,
      caption,
      legend,
      tooltip = true,
      showValues,
      valueFormat = String,
      onBarSelect,
      loading = false,
      emptyLabel = 'No data',
      animate = true,
      className,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(COMPARISON_BARS_V4_STYLE_ID, COMPARISON_BARS_V4_CSS);
    const chart = useChartV4(animate);

    const seriesCount =
      series?.length ?? (data.length === 0 ? 0 : Math.max(...data.map((g) => g.values.length), 0));
    const resolved: ComparisonBarsV4Series[] =
      series ??
      Array.from({ length: seriesCount }, (_, i) => ({
        key: `series-${i + 1}`,
        label: `Series ${i + 1}`,
      }));

    const header =
      title !== undefined || summary !== undefined ? (
        <div className="flex min-w-0 flex-col gap-xs">
          {title !== undefined ? (
            <TextV4 size="base" weight="semibold">
              {title}
            </TextV4>
          ) : null}
          {summary !== undefined ? (
            <TextV4 size="2xl" weight="bold" numeric="tabular">
              {summary}
            </TextV4>
          ) : null}
        </div>
      ) : null;

    const footer =
      caption !== undefined ? (
        <TextV4 size="sm" tone="mutedText">
          {caption}
        </TextV4>
      ) : null;

    const frameClass = cn('flex w-full flex-col gap-md', className);

    if (loading) {
      return (
        <div ref={ref} className={frameClass} {...rest}>
          {header}
          <SkeletonV4 variant="rect" width="100%" height={height} />
          {footer}
        </div>
      );
    }

    if (data.length === 0 || seriesCount === 0) {
      return (
        <div ref={ref} className={frameClass} {...rest}>
          {header}
          <ChartEmptyV4 label={emptyLabel} height={height} />
          {footer}
        </div>
      );
    }

    const values = data.flatMap((g) => g.values).filter(Number.isFinite);
    const ceiling = Math.max(max ?? (values.length > 0 ? Math.max(...values) : 0), 0);
    const lowest = values.length > 0 ? Math.min(...values) : 0;
    const labelled = showValues ?? data.length <= CHART_DIRECT_LABEL_MAX;

    const label =
      ariaLabel ??
      `Grouped bar chart${title !== undefined ? `, ${title}` : ''}, ${data.length} groups, ` +
        `${resolved.length} series, ${valueFormat(lowest)} to ${valueFormat(ceiling)}.`;

    /*
      Past the palette's five slots the tail shares the last one. See the
      component doc: the primitive throws, the component folds, and a grouped
      bar chart's series count is data.
    */
    const fold = foldChartSeries(resolved);
    const slotOf = (si: number): number => Math.min(si, CHART_SERIES_COUNT - 1);

    /**
     * A series' fill. Resolved through `chartVar` on the **folded** slot, so
     * the five-slot rule stays live even for a series whose bars all happen to
     * be zero, and a sixth series shares the fifth slot rather than throwing.
     */
    const fillOf = (si: number): string =>
      resolved[si]?.tone !== undefined
        ? `var(--xen-${resolved[si]?.tone})`
        : chartVar(slotOf(si));

    const legendItems: LegendV4Item[] = fold.didFold
      ? [
          ...fold.kept.map((s, i) => ({
            label: s.label,
            slot: i,
            ...(s.tone !== undefined ? { tone: s.tone } : {}),
          })),
          {
            label: `${CHART_OVERFLOW_LABEL} (${fold.folded.length} series)`,
            slot: CHART_SERIES_COUNT - 1,
          },
        ]
      : resolved.map((s, i) => ({
          label: s.label,
          slot: i,
          ...(s.tone !== undefined ? { tone: s.tone } : {}),
        }));
    const showLegend = legend ?? resolved.length >= 2;

    /** Every group renders the same column structure so the rows stay aligned. */
    const columns = (
      render: (groupIndex: number, seriesIndex: number, value: number) => React.ReactNode
    ): React.ReactNode =>
      data.map((group, gi) => (
        <div key={gi} className="flex min-w-0 flex-1" style={{ gap: CHART_MARK.gap }}>
          {resolved.map((_, si) => (
            <div key={si} className="flex min-w-0 flex-1 flex-col items-center justify-end">
              {render(gi, si, group.values[si] ?? 0)}
            </div>
          ))}
        </div>
      ));

    return (
      <div
        ref={ref}
        data-xen-v4-chart=""
        style={chart.rootProps.style}
        className={frameClass}
        {...rest}
      >
        {header}
        <div {...chart.rootProps} role="img" aria-label={label} className="flex flex-col gap-xs">
          {labelled ? (
            <div className="flex gap-md" aria-hidden="true">
              {columns((_gi, _si, value) => (
                <TextV4 size="xs" tone="mutedText" numeric="tabular">
                  {valueFormat(value)}
                </TextV4>
              ))}
            </div>
          ) : null}
          <div className="flex items-end gap-md" style={{ height }}>
            {columns((gi, si, value) => {
              // A zero ceiling has no scale to map onto; every bar is then the
              // hairline that says "nothing here", not a divide-by-zero.
              const ratio = ceiling === 0 ? 0 : Math.min(Math.max(value / ceiling, 0), 1);
              return (
                <div
                  data-xen-v4-bar=""
                  data-group={gi}
                  data-series={si}
                  role={onBarSelect !== undefined ? 'button' : undefined}
                  tabIndex={onBarSelect !== undefined ? 0 : undefined}
                  aria-label={
                    onBarSelect !== undefined
                      ? `${data[gi]?.label ?? ''} ${resolved[si]?.label ?? ''}: ${valueFormat(value)}`
                      : undefined
                  }
                  onClick={onBarSelect !== undefined ? () => onBarSelect(gi, si, value) : undefined}
                  className="w-full"
                  title={
                    tooltip
                      ? `${data[gi]?.label ?? ''} ${resolved[si]?.label ?? ''}: ${valueFormat(value)}`
                      : undefined
                  }
                  style={
                    {
                      // A bar for a real value is never invisible: the floor is
                      // a hairline, which is what "present but tiny" looks like.
                      height: Math.max(ratio * height, 1),
                      '--xen-bar-fill': fillOf(si),
                      // §4.4: the rounded end is the DATA end. A bar rounded at
                      // the baseline floats off its axis.
                      borderTopLeftRadius: CHART_MARK.endRadius,
                      borderTopRightRadius: CHART_MARK.endRadius,
                      cursor: onBarSelect !== undefined ? 'pointer' : undefined,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
          <div data-xen-v4-comparison-axis="" style={{ height: CHART_MARK.stroke }} />
          <div className="flex gap-md" aria-hidden="true">
            {data.map((group, gi) => (
              <div key={gi} className="flex min-w-0 flex-1 justify-center">
                <TextV4 size="xs" tone="mutedText" align="center">
                  {group.label}
                </TextV4>
              </div>
            ))}
          </div>
        </div>
        {showLegend ? <LegendV4 items={legendItems} /> : null}
        {footer}
      </div>
    );
  }
);

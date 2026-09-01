import * as React from 'react';
import { Animated, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, Line, Path, Polyline } from 'react-native-svg';
import { TextV4 } from '../primitives/TextV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { minTap } from '../primitives/internal/nav-v4';
import { useXenitionTheme } from '../theme';
import { ChartTipV4, useChartPaletteV4 } from './internal-v4';
import {
  CHART_AREA_FILL_ALPHA,
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
  foldChartSeries,
} from '../../primitives/internal/v4-chart';
import {
  CHART_AUTO_DOT_MAX,
  ChartEmptyV4,
  ChartLegendV4,
  ChartSwatchV4,
  plotSeriesV4,
  seriesInkV4,
  thinAxisIndicesV4,
  toSeriesRowsV4,
  useChartRevealV4,
  type ChartFigureV4Props,
  type ChartIndicatorV4,
  type ChartLegendItemV4,
  type ChartSeriesV4,
  type ChartToneV4,
} from './LineChartV4';

/**
 * How much of its line's colour an area fill keeps.
 *
 * Brief §4.4: "Area fills sit under their line at reduced alpha; the line keeps
 * full strength. The fill is context, the line is the data." §5 Group A then
 * says to "retire `fillOpacity` guesses" — and a guess is what the two base
 * twins shipped: `0.18` on web, `0.2` on native, for the same mark.
 *
 * The number now lives in `primitives/internal/v4-chart.ts` beside
 * `CHART_MARK`, where the two twins and `RadarChartV4` read the *same* binding
 * rather than four copies that agree today. Re-exported here so the specs and
 * call sites that read it from this file are unchanged.
 */
export { CHART_AREA_FILL_ALPHA };

/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n: number): number => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);

interface PlotPoint {
  x: number;
  y: number;
}

/**
 * The area under a run of points, closed onto the baseline **or** onto the
 * band beneath it when the chart is stacked.
 *
 * The lower edge is walked in reverse so the path never crosses itself. The
 * base's `M… L last.x base L first.x base Z` shortcut happens to look right
 * for one series over a flat baseline and produces a bow-tie the moment the
 * lower edge is another series — which is precisely what stacking needs, so it
 * is fixed here rather than worked around.
 */
function areaPath(top: PlotPoint[], bottom: PlotPoint[] | null, baseline: number): string {
  if (top.length === 0) return '';
  const first = top[0] as PlotPoint;
  const last = top[top.length - 1] as PlotPoint;
  const up = top
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');
  if (bottom === null) {
    return `${up} L${last.x.toFixed(2)} ${baseline} L${first.x.toFixed(2)} ${baseline} Z`;
  }
  const down = [...bottom]
    .reverse()
    .map((p) => `L${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');
  return `${up} ${down} Z`;
}

const polyOf = (pts: PlotPoint[]): string =>
  pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

export interface AreaChartV4Props extends ChartFigureV4Props {
  /** One series (`number[]`, the base's shape) or several (`number[][]`). */
  data: number[] | number[][];
  /** Names and tones for the series, index-aligned with `data`. */
  series?: ChartSeriesV4[];
  /** Category labels under the plot, one per point. Thinned, never rotated. */
  labels?: string[];
  /** The plot's width in px. */
  width?: number;
  /** Value at the top of the plot. Defaults to the largest datum. */
  max?: number;
  /** Value at the bottom of the plot. Defaults to the smallest datum. */
  min?: number;
  /**
   * Stack the series into bands rather than overlaying them. A stack is the
   * honest form when the series are parts of a whole; an overlay is honest
   * when they are independent quantities. The base offered neither, because it
   * offered one series.
   */
  stacked?: boolean;
  /** Draw a dot at each datum. Automatic at {@link CHART_AUTO_DOT_MAX} or fewer. */
  showDots?: boolean;
  /** A reference rule at the baseline. Default `true`. */
  grid?: boolean;
  /** The press scrubber and its readout. Default `true`. */
  tooltip?: boolean;
  /** How the readout draws its per-series swatch. Default `'line'`. */
  indicator?: ChartIndicatorV4;
  /** Direct series labels at the end of each band. Defaults on at four or fewer. */
  directLabels?: boolean;
  /** How a value is spoken and printed. Default `String`. */
  formatValue?: (value: number) => string;
  /** Fired when a point is pressed. */
  onPointPress?: (index: number) => void;
  /** Play the entrance reveal. Default `true`. */
  animate?: boolean;
  /** The spoken sentence. Derived when omitted (brief §1 rule 6). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * **V4 area chart (native)** — `LineChartV4`'s twin, for the case where the
 * space under the line means something.
 *
 * The frame, the palette, the scrubber, the readout, the legend and the
 * derived label are all `LineChartV4`'s and are **composed from it** rather
 * than re-typed (§1 rule 8). Two things are this component's own:
 *
 * 1. **{@link CHART_AREA_FILL_ALPHA}** replaces the base's
 *    `fillOpacity = 0.2` prop, which was one of two different numbers for one
 *    mark across the twins and is on §1 rule 1's list of literals to retire.
 *    The prop is gone rather than defaulted, because a caller who can set it
 *    is a caller who can put a fill at 0.6 and bury the line.
 * 2. **Stacking, with `CHART_MARK.gap` between bands** (§5 Group A). The gap
 *    is not decoration: it is the secondary encoding the palette's 6–8 CVD
 *    band obliges (§1 rule 5). Two adjacent bands a dichromat cannot separate
 *    by hue are still visibly two bands with a hairline of page between them.
 *    It is painted as a `gap`-wide stroke of `colors.surface` along each
 *    band's lower boundary rather than as an inset in the geometry, so it is
 *    exactly two pixels at any plot size.
 */
export function AreaChartV4({
  data,
  series,
  labels,
  title,
  summary,
  caption,
  legend,
  height = 160,
  width = 320,
  max,
  min,
  stacked = false,
  showDots,
  grid = true,
  tooltip = true,
  indicator = 'line',
  directLabels,
  loading = false,
  emptyLabel = 'No data',
  formatValue = String,
  onPointPress,
  animate = true,
  accessibilityLabel,
  style,
}: AreaChartV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const palette = useChartPaletteV4();
  const [active, setActive] = React.useState<number | null>(null);
  const reveal = useChartRevealV4(animate);

  const statusColors: Record<ChartToneV4, string> = {
    success: colors.success,
    warn: colors.warn,
    danger: colors.danger,
  };

  const rows = toSeriesRowsV4(data);
  const pointCount = rows.reduce((n, row) => Math.max(n, row.length), 0);

  if (loading) {
    return (
      <View style={[{ gap: tokens.spacing.md }, style]}>
        <SkeletonV4 variant="rect" width={width} height={height} />
      </View>
    );
  }
  if (pointCount === 0) {
    return (
      <View style={[{ gap: tokens.spacing.md }, style]}>
        <ChartEmptyV4 label={emptyLabel} height={height} />
      </View>
    );
  }

  // A stack plots cumulative totals; an overlay plots the values themselves.
  const cumulative: number[][] = [];
  rows.forEach((row, i) => {
    const below = cumulative[i - 1];
    cumulative.push(row.map((v, j) => v + (below?.[j] ?? 0)));
  });
  const plotted = stacked ? cumulative : rows;

  const flat = plotted.flat();
  const rawFlat = rows.flat();
  const hi = max ?? Math.max(...flat);
  // A stack is read against zero — a band floating off a non-zero baseline is
  // not a part of a whole any more. An overlay keeps the data's own floor.
  const lo = min ?? (stacked ? Math.min(0, ...flat) : Math.min(...flat));
  const span = hi - lo || 1;
  const baseline = height - clamp01((0 - lo) / span) * height;

  /*
    Past the palette's five slots the tail shares the last one rather than
    throwing. The palette primitive still throws — asking it for a sixth slot is
    a mistake in the caller's own code — but this chart's series count arrives
    with the DATA, and a `RangeError` out of render takes the screen down.
    `foldChartSeries` in `primitives/internal/v4-chart.ts` draws that line: the
    primitive throws, the component folds.

    Bands and lines are not summed the way a stack's or a pie's segments are,
    because a line is not a part of a whole — the average of three series is a
    fourth series nobody asked for. So the tail keeps its own shapes, shares the
    last slot, and the legend carries ONE row for it named
    `CHART_OVERFLOW_LABEL`. What a reader loses is the ability to tell the sixth
    line from the seventh, which is exactly what the palette was refusing to
    promise in the first place.
  */
  const fold = foldChartSeries(plotted);
  const slotOf = (i: number): number => Math.min(i, CHART_SERIES_COUNT - 1);

  const resolved = plotted.map((values, i) => {
    const cfg = series?.[i];
    return {
      key: cfg?.key ?? `series-${i}`,
      label: cfg?.label ?? `Series ${i + 1}`,
      values: rows[i] ?? values,
      ink: seriesInkV4(palette, statusColors, slotOf(i), cfg?.tone),
      points: plotSeriesV4(values, lo, span, width, height),
    };
  });

  const dots = showDots ?? pointCount <= CHART_AUTO_DOT_MAX;
  const showLegend = legend === undefined ? resolved.length >= 2 : legend !== false;
  const legendItems: ChartLegendItemV4[] = Array.isArray(legend)
    ? legend
    : fold.didFold
      ? [
          ...fold.kept.map((_, i) => ({
            key: resolved[i]?.key ?? `series-${i}`,
            label: resolved[i]?.label ?? `Series ${i + 1}`,
            slot: i,
            tone: series?.[i]?.tone,
          })),
          {
            key: 'chart-overflow',
            label: `${CHART_OVERFLOW_LABEL} (${fold.folded.length} series)`,
            slot: CHART_SERIES_COUNT - 1,
          },
        ]
      : resolved.map((s, i) => ({ key: s.key, label: s.label, slot: i, tone: series?.[i]?.tone }));
  const showDirect =
    directLabels ??
    (resolved.length >= 2 && resolved.length <= CHART_DIRECT_LABEL_MAX && series !== undefined);

  const derivedLabel = [
    stacked ? 'Stacked area chart' : 'Area chart',
    title,
    resolved.length > 1 ? `${resolved.length} series` : undefined,
    `${pointCount} point${pointCount === 1 ? '' : 's'}`,
    `${formatValue(Math.min(...rawFlat))} to ${formatValue(Math.max(...rawFlat))}`,
  ]
    .filter(Boolean)
    .join(', ');

  const xOf = (i: number): number => (pointCount === 1 ? width / 2 : (i / (pointCount - 1)) * width);

  const tap = minTap(tokens.spacing);
  const sliceW = width / Math.max(pointCount, 1);
  const slop = {
    top: Math.max(0, (tap - height) / 2),
    bottom: Math.max(0, (tap - height) / 2),
    left: Math.max(0, (tap - sliceW) / 2),
    right: Math.max(0, (tap - sliceW) / 2),
  };

  const readoutAlign: ViewStyle['alignItems'] =
    active === null || pointCount === 1
      ? 'center'
      : active / (pointCount - 1) < 1 / 3
        ? 'flex-start'
        : active / (pointCount - 1) > 2 / 3
          ? 'flex-end'
          : 'center';

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? derivedLabel}
      style={[{ gap: tokens.spacing.md }, style]}
    >
      {title !== undefined || summary !== undefined || caption !== undefined ? (
        <View style={{ gap: tokens.spacing.xs }}>
          {title !== undefined ? (
            <TextV4 size="base" weight="semibold" tone="onSurface">
              {title}
            </TextV4>
          ) : null}
          {summary !== undefined ? (
            <TextV4 size="2xl" weight="bold" tone="onSurface" numeric="tabular">
              {summary}
            </TextV4>
          ) : null}
          {caption !== undefined ? (
            <TextV4 size="sm" tone="mutedText">
              {caption}
            </TextV4>
          ) : null}
        </View>
      ) : null}

      <View style={{ width, height }}>
        <Animated.View style={{ opacity: reveal }}>
          <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {grid ? (
              <Line
                testID="chart-grid"
                x1={0}
                y1={baseline}
                x2={width}
                y2={baseline}
                stroke={palette.grid}
                strokeWidth={1}
              />
            ) : null}

            {/*
              Fills first, every one of them, then the gaps, then the strokes.
              Painting a band's stroke before the next band's fill would bury
              it: the fill is context and the line is the data, so the data
              goes on top (§4.4).
            */}
            {resolved.map((s, i) => (
              <Path
                key={`fill-${s.key}`}
                testID="chart-area"
                d={areaPath(
                  s.points,
                  stacked && i > 0 ? (resolved[i - 1]?.points ?? null) : null,
                  baseline
                )}
                fill={s.ink}
                fillOpacity={CHART_AREA_FILL_ALPHA}
                stroke="none"
              />
            ))}

            {stacked
              ? resolved.slice(0, -1).map((s) => (
                  <Polyline
                    key={`gap-${s.key}`}
                    testID="chart-band-gap"
                    points={polyOf(s.points)}
                    fill="none"
                    stroke={colors.surface}
                    strokeWidth={CHART_MARK.gap}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                ))
              : null}

            {resolved.map((s) => (
              <Polyline
                key={`line-${s.key}`}
                testID="chart-line"
                points={polyOf(s.points)}
                fill="none"
                stroke={s.ink}
                strokeWidth={CHART_MARK.stroke}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}

            {resolved.map((s) =>
              dots || s.points.length === 1
                ? s.points.map((p, i) => (
                    <Circle
                      key={`${s.key}-${i}`}
                      testID="chart-dot"
                      cx={p.x}
                      cy={p.y}
                      r={CHART_MARK.dotSize / 2}
                      fill={s.ink}
                      stroke={palette.ring}
                      strokeWidth={CHART_MARK.ring}
                    />
                  ))
                : null
            )}

            {active !== null && tooltip ? (
              <Line
                testID="chart-crosshair"
                x1={xOf(active)}
                y1={0}
                x2={xOf(active)}
                y2={height}
                stroke={palette.axis}
                strokeWidth={1}
              />
            ) : null}
          </Svg>
        </Animated.View>

        {tooltip || onPointPress !== undefined ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              flexDirection: 'row',
            }}
          >
            {Array.from({ length: pointCount }, (_, i) => (
              <Pressable
                key={`hit-${i}`}
                testID={`chart-hit-${i}`}
                accessibilityRole="button"
                accessibilityLabel={`${labels?.[i] ?? `Point ${i + 1}`}, ${resolved
                  .map((s) => `${s.label} ${formatValue(s.values[i] ?? 0)}`)
                  .join(', ')}`}
                hitSlop={slop}
                style={{ flex: 1 }}
                onPress={() => {
                  if (tooltip) setActive(i);
                  onPointPress?.(i);
                }}
              />
            ))}
          </View>
        ) : null}

        {showDirect
          ? resolved.map((s) => {
              const last = s.points[s.points.length - 1];
              return last === undefined ? null : (
                <View
                  key={`direct-${s.key}`}
                  pointerEvents="none"
                  style={{
                    position: 'absolute',
                    left: last.x + CHART_MARK.dotSize,
                    top: last.y - tokens.typography.scale.xs,
                  }}
                >
                  <TextV4 size="xs" tone="mutedText">
                    {s.label}
                  </TextV4>
                </View>
              );
            })
          : null}

        {active !== null && tooltip ? (
          <View
            pointerEvents="none"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: readoutAlign }}
          >
            <ChartTipV4
              testID="chart-readout"
              style={{
                backgroundColor: colors.popover,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                gap: tokens.spacing.xs,
              }}
            >
              {labels?.[active] !== undefined ? (
                <TextV4 size="xs" tone="mutedText">
                  {labels[active]}
                </TextV4>
              ) : null}
              {resolved.map((s) => {
                const v = s.values[active];
                return v === undefined ? null : (
                  <View
                    key={`tip-${s.key}`}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
                  >
                    <ChartSwatchV4
                      ink={s.ink}
                      indicator={indicator}
                      radiusFull={tokens.radius.full}
                    />
                    <TextV4 size="xs" tone="onPopover">
                      {s.label}
                    </TextV4>
                    <TextV4 size="xs" weight="semibold" tone="onPopover" numeric="tabular">
                      {formatValue(v)}
                    </TextV4>
                  </View>
                );
              })}
            </ChartTipV4>
          </View>
        ) : null}
      </View>

      {labels !== undefined && labels.length > 0 ? (
        <View style={{ width, height: tokens.typography.scale.xs * 2 }}>
          {thinAxisIndicesV4(Math.min(labels.length, pointCount)).map((i) => (
            <View
              key={`axis-${i}`}
              style={{ position: 'absolute', left: xOf(i) - sliceW / 2, width: sliceW * 2 }}
            >
              <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                {labels[i]}
              </TextV4>
            </View>
          ))}
        </View>
      ) : null}

      {showLegend ? (
        <ChartLegendV4 items={legendItems} />
      ) : null}
    </View>
  );
}

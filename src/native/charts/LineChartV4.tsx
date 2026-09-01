import * as React from 'react';
import { Animated, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, Line, Polyline } from 'react-native-svg';
import { TextV4 } from '../primitives/TextV4';
import { LegendV4 } from './LegendV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { minTap } from '../primitives/internal/nav-v4';
import { useXenitionTheme } from '../theme';
import { ChartEmptyV4, ChartTipV4, useChartPaletteV4 } from './internal-v4';
/*
  The tone vocabulary, the slot→ink resolver and the entrance reveal live in
  `SparklineV4` — the peer-FREE file — and are imported here rather than the
  other way round. See that file's `## Why three shared helpers live in the
  smallest file` note: a helper imported from a module that hard-imports
  `react-native-svg` drags the peer in with it, which would have silently
  broken the one fallback brief §7 open question 6 promises.
*/
import { seriesInkV4, useChartRevealV4, type ChartToneV4 } from './SparklineV4';
import {
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_SERIES_COUNT,
  foldChartSeries,
  type ChartIndicatorV4,
  type ChartSeriesV4,
} from '../../primitives/internal/v4-chart';

/**
 * **V4 line chart (native)** — the twin of `charts/LineChartV4.tsx`, and the
 * file that carries the *figure frame* the rest of the native line family
 * composes.
 *
 * Everything about *why* is argued once, on the web twin, and is not repeated
 * here: the multi-series ceiling that made every dashboard reach past the base
 * (brief §5 Group A), the retirement of `SERIES` / `colors[color]` as an
 * identity channel (§1 rules 2–4), `strokeWidth` and dot radius coming from
 * {@link CHART_MARK} (§1 rule 1), and the legend / ring / direct-label
 * redundancy the palette's 6.5 CVD floor obliges (§1 rule 5).
 *
 * What is worth stating here is where the twins deliberately differ, because
 * "prop parity" is a promise about the API and not about the plumbing:
 *
 * 1. **The plot does not stretch.** Web renders into a responsive column and
 *    pays for it with `vector-effect="non-scaling-stroke"` and a round-capped
 *    line standing in for every dot. Native lays out at the `width` it was
 *    given — which is what every existing native chart in this module already
 *    does — so a `<Circle>` really is a circle and `CHART_MARK.stroke` really
 *    is two pixels. No trickery is needed and none is used.
 * 2. **The interaction is press, not hover** (§4.6). A transparent scrubber of
 *    one `Pressable` per point sits over the plot; each slice is the full
 *    height of the plot and carries `hitSlop` out to {@link minTap} on both
 *    axes, so rule 10's 44 floor holds even on an eight-point series in a
 *    32-tall plot. The painted mark stays 8.
 * 3. **The readout is pinned, not anchored.** Web floats a tooltip at the
 *    crosshair's own x. React Native cannot translate by a percentage of an
 *    element's own unmeasured width, and measuring would cost a layout pass on
 *    every scrub frame. So the readout pins to the top edge of the plot and
 *    picks one of three alignments from which third of the plot the active
 *    point falls in — close enough to read as anchored, free of a measurement,
 *    and it never changes the plot's footprint.
 *
 * `react-native-svg` is a **required** peer for this component (brief §7 open
 * question 6: only `SparklineV4` and `MiniBarV4` keep a `View` fallback). Every
 * other SVG chart in this module already requires it.
 */

/**
 * `ChartSeriesV4` — shadcn/ui's config/data split (brief §4.3) — declared here
 * while the native line family built and canonical in
 * `primitives/internal/v4-chart.ts` since. Imported and re-exported, so the
 * call sites that spell it `from './LineChartV4'` are untouched.
 */
export type { ChartSeriesV4 };

/** One row of a legend, when a caller supplies the rows itself. */
export interface ChartLegendItemV4 {
  /** React key and identity. Falls back to the label. */
  key?: string;
  /** The row's text. Never truncated — a clipped identity is no identity. */
  label: string;
  /** Categorical slot to draw the swatch from. Defaults to the row's index. */
  slot?: number;
  /** Status hue instead of a slot. */
  tone?: ChartToneV4;
}

/** How a readout draws its per-series swatch. shadcn's vocabulary (§4.6). */
export type { ChartIndicatorV4 };

/**
 * Above this many points a dot per datum stops being information.
 * Brief §5: "automatic below ~20 points and off above".
 */
export const CHART_AUTO_DOT_MAX = 20;

/** How many horizontal reference rules the plot carries: top, middle, baseline. */
const GRID_ROWS = 3;

/** The most x-axis labels printed before they start thinning (never rotating). */
const AXIS_LABEL_MAX = 6;

/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n: number): number => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);

/** A point in the plot's own pixel space. */
interface PlotPoint {
  x: number;
  y: number;
}

/**
 * The empty state every V4 chart falls back to (brief §4.5).
 *
 * It used to be **defined** here, and this file's own doc comment said it
 * belonged beside `useChartPaletteV4` and was only local because
 * `native/charts/internal-v4.tsx` was closed to this pass's build agents. It
 * has moved there now — a move, not a rewrite — and is re-exported from this
 * file so `AreaChartV4` and anything else that imports it from `LineChartV4`
 * is untouched.
 */
export { ChartEmptyV4 };

/** `number[]` or `number[][]` → always `number[][]`. The base's shape stays valid. */
export function toSeriesRowsV4(data: number[] | number[][]): number[][] {
  if (data.length === 0) return [];
  return typeof data[0] === 'number' ? [data as number[]] : (data as number[][]);
}

/**
 * Scale a series into the plot box.
 *
 * The two guards brief §4.5 asks every spec in this pass to assert: a
 * **single** datum sits at the horizontal centre rather than dividing by
 * `length - 1`, and a **flat** series divides by 1 rather than by `max - min`.
 */
export function plotSeriesV4(
  values: number[],
  lo: number,
  span: number,
  width: number,
  height: number
): PlotPoint[] {
  return values.map((v, i) => ({
    x: values.length === 1 ? width / 2 : (i / (values.length - 1)) * width,
    y: height - clamp01((v - lo) / span) * height,
  }));
}

/** Evenly-spaced indices to print an axis label at, at most `max` of them. */
export function thinAxisIndicesV4(count: number, max = AXIS_LABEL_MAX): number[] {
  if (count <= max) return Array.from({ length: count }, (_, i) => i);
  const step = (count - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => Math.round(i * step));
}

/**
 * A legend swatch at {@link CHART_MARK.dotSize} — brief §4.8: "its swatch is
 * `dotSize`, not a 10×10 literal", which is exactly what the base `Legend`
 * ships (`width: 10, height: 10`).
 */
export function ChartSwatchV4({
  ink,
  indicator,
  radiusFull,
}: {
  ink: string;
  indicator: ChartIndicatorV4;
  radiusFull: number;
}): React.ReactElement {
  if (indicator === 'dot') {
    return (
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: CHART_MARK.dotSize,
          height: CHART_MARK.dotSize,
          borderRadius: radiusFull,
          backgroundColor: ink,
        }}
      />
    );
  }
  if (indicator === 'dashed') {
    // React Native has no `strokeDasharray` on a View, so a dash is two
    // segments with a gap of surface between them — which is the same
    // `CHART_MARK.gap` idea every fill in this module uses, at swatch scale.
    return (
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ flexDirection: 'row', gap: CHART_MARK.gap }}
      >
        {[0, 1].map((i) => (
          <View
            key={i}
            style={{
              width: (CHART_MARK.dotSize - CHART_MARK.gap) / 2,
              height: CHART_MARK.stroke,
              backgroundColor: ink,
            }}
          />
        ))}
      </View>
    );
  }
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        width: CHART_MARK.dotSize,
        height: CHART_MARK.stroke,
        backgroundColor: ink,
      }}
    />
  );
}

/**
 * The native line family's legend.
 *
 * This used to be the markup itself — `LegendV4` was Group D's component and
 * was not on disk while this group built, so the shape it is specified to have
 * was drawn here instead. **The body is now `LegendV4`**, and with it the
 * signature loses the four resolution parameters (`palette`, `statusColors`,
 * `gap`, `radiusFull`): `LegendV4` reads all four from the theme itself, and
 * threading them through a second component was only ever a symptom of the
 * legend being drawn in the wrong file. The web twin's `ChartLegendV4` takes
 * `items` and `indicator` and nothing else, so this is also rule 7's prop
 * parity being restored rather than broken.
 */
export function ChartLegendV4({
  items,
  indicator = 'dot',
}: {
  items: ChartLegendItemV4[];
  indicator?: ChartIndicatorV4;
}): React.ReactElement {
  return (
    <LegendV4
      indicator={indicator}
      items={items.map((item, i) => ({
        key: item.key ?? item.label,
        label: item.label,
        slot: item.slot ?? i,
        ...(item.tone === undefined ? {} : { tone: item.tone }),
      }))}
    />
  );
}

/**
 * The shared props of every **figure** in the line family (brief §4.2), which
 * `LineChartV4` and `AreaChartV4` wear and `SparklineV4` / `MiniBarV4`
 * deliberately do not — they are marks inside someone else's figure.
 */
export interface ChartFigureV4Props {
  /** The descriptive headline. HIG's rule: say the takeaway, not the axis names. */
  title?: string;
  /** The one loud number. Read before the plot, which is the evidence for it. */
  summary?: string;
  /** The quiet line — "vs last month", "last 30 days". */
  caption?: string;
  /** Defaults to `true` at two or more series — the identity channel's redundancy. */
  legend?: boolean | ChartLegendItemV4[];
  /** The plot's own height in px. Never auto; a declared footprint stops reflow. */
  height?: number;
  /** Render the loading skeleton at the plot's footprint instead of the plot. */
  loading?: boolean;
  /** What the empty state says. */
  emptyLabel?: string;
}

export interface LineChartV4Props extends ChartFigureV4Props {
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
   * Draw a dot at each datum. Defaults to **automatic**: on at
   * {@link CHART_AUTO_DOT_MAX} points or fewer, off above.
   */
  showDots?: boolean;
  /** Horizontal reference rules behind the plot. Default `true`. */
  grid?: boolean;
  /** The press scrubber and its readout. Default `true` (§4.6). */
  tooltip?: boolean;
  /** How the readout draws its per-series swatch. Default `'line'`. */
  indicator?: ChartIndicatorV4;
  /** Direct series labels at the end of each line. Defaults on at four or fewer. */
  directLabels?: boolean;
  /** How a value is spoken and printed. Default `String`. */
  formatValue?: (value: number) => string;
  /** Fired when a point is pressed. */
  onPointPress?: (index: number) => void;
  /** Play the entrance reveal. Kept for parity; see the note in the body. */
  animate?: boolean;
  /** The spoken sentence. Derived when omitted (brief §1 rule 6). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export function LineChartV4({
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
}: LineChartV4Props): React.ReactElement {
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

  const flat = rows.flat();
  const hi = max ?? Math.max(...flat);
  const lo = min ?? Math.min(...flat);
  // A flat series is a horizontal line through the middle, not a division by
  // zero — §4.5, and the spec asserts it.
  const span = hi - lo || 1;

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
  const fold = foldChartSeries(rows);
  const slotOf = (i: number): number => Math.min(i, CHART_SERIES_COUNT - 1);

  const resolved = rows.map((values, i) => {
    const cfg = series?.[i];
    return {
      key: cfg?.key ?? `series-${i}`,
      label: cfg?.label ?? `Series ${i + 1}`,
      values,
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

  // §4.8: the sentence names the form, the series count and the range. HIG is
  // explicit that a rendered plot plus a visible title is NOT accessible.
  const derivedLabel = [
    'Line chart',
    title,
    resolved.length > 1 ? `${resolved.length} series` : undefined,
    `${pointCount} point${pointCount === 1 ? '' : 's'}`,
    `${formatValue(Math.min(...flat))} to ${formatValue(Math.max(...flat))}`,
  ]
    .filter(Boolean)
    .join(', ');

  const xOf = (i: number): number =>
    pointCount === 1 ? width / 2 : (i / (pointCount - 1)) * width;

  // Rule 10: the painted mark stays 8, the hit area reaches 44 on both axes.
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
      {/*
        §4.2's order — title → summary → plot → axis labels → legend — and
        NN/g's F-pattern argument for it: the most important number belongs
        first, and the plot underneath is the evidence rather than the claim
        (§3.1, "the number is bigger than the chart is loud").
      */}
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
          {/*
            Chrome, not data. `palette.grid` is `onSurface` at `CHART_GRID_MIX`;
            the base painted its axes `colors.muted` — a TEXT colour doing an
            axis's job (brief §3.3).
          */}
          {grid
            ? Array.from({ length: GRID_ROWS }, (_, i) => {
                const y = (i / (GRID_ROWS - 1)) * height;
                return (
                  <Line
                    key={`grid-${i}`}
                    testID="chart-grid"
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke={palette.grid}
                    strokeWidth={1}
                  />
                );
              })
            : null}

          {resolved.map((s) => (
            <Polyline
              key={s.key}
              testID="chart-line"
              points={s.points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')}
              fill="none"
              stroke={s.ink}
              strokeWidth={CHART_MARK.stroke}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}

          {/*
            §4.5: "a line of one point is a dot at the centre". A one-point
            polyline paints nothing at all, which is the empty-looking chart a
            caller reports as "the data never arrived".

            The `ring` of surface (§4.4) is the dot's own stroke, so two points
            that land on top of each other still read as two.
          */}
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

        {/*
          The scrubber. One transparent slice per point, each the full height
          of the plot and slopped out to 44 on both axes — rule 10's floor
          without inflating the painted mark past `CHART_MARK.dotSize`.
        */}
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

        {/*
          Direct labels — the strongest secondary encoding available at four or
          fewer series (§4.4). Positioned from the plot's own pixel space,
          which native has and web does not (see the file header).
        */}
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
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              alignItems: readoutAlign,
            }}
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
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: tokens.spacing.xs,
                    }}
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

      {showLegend ? <ChartLegendV4 items={legendItems} /> : null}
    </View>
  );
}

/**
 * The number of categorical slots, re-exported so a caller can guard before it
 * hands over a sixth series rather than learning about the cap from a thrown
 * `RangeError` in production.
 */
export { CHART_SERIES_COUNT };

/**
 * Re-exported so a caller composing the line family has one import site, and
 * so `AreaChartV4` does not have to know that the peer-free mark is where
 * they physically live.
 */
export { seriesInkV4, useChartRevealV4, type ChartToneV4 };

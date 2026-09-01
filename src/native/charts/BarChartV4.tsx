import * as React from 'react';
import { Animated, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  type ChartIndicatorV4,
  type ChartToneV4,
} from '../../primitives/internal/v4-chart';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { EASING_ENTER, EASING_STANDARD, V4_MOTION } from '../primitives/internal/motion-v4';
import { minTap } from '../primitives/internal/nav-v4';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { useXenitionTheme } from '../theme';
import { ChartTipV4, chartSlotColor, useChartPaletteV4 } from './internal-v4';

/**
 * The opt-in to status colour, and the only way a V4 chart paints one
 * (brief §4.3).
 *
 * A series wears `success` / `warn` / `danger` when it genuinely *means* good
 * or bad — an error rate, budget overspend, a pass/fail split. A series that is
 * merely first wears slot 1. Brief §1 rule 3 is explicit that a chart takes one
 * or the other and never both, which is why this is a single value on the whole
 * chart rather than a per-bar option: a bar chart where bar 4 is red and
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

export interface BarChartV4Props {
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
  /** Press-to-reveal value bubble. Default `true` (brief §4.6). */
  tooltip?: boolean;
  /** The tooltip's swatch shape. */
  indicator?: BarChartV4Indicator;
  /** Fired when a bar is pressed. */
  onSelect?: (index: number, value: number) => void;
  /** Accessible one-line summary; derived from the data when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * `value / ceiling`, clamped, and **zero when the ceiling is not a usable
 * divisor**.
 *
 * The base floors the ceiling at 1 (`Math.max(max ?? Math.max(...data), 1)`),
 * so a chart of `[0.4]` renders a bar at 40% of the plot — a lie about a
 * single-datum series. Guarding the divisor instead keeps the honest answer (a
 * flat chart is flat) and still never produces `NaN` or `Infinity`, which is
 * the single-datum defect the spec asserts against.
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
 * The entrance reveal (brief §4.7), as an opacity ramp.
 *
 * Web wipes the plot in with `transform: scaleY(0.94)` and
 * `transform-origin: bottom`; React Native has no transform origin, so the same
 * scale would grow the plot out of its own centre and lift the bars off the
 * axis for 400ms — the exact thing `CHART_MARK.endRadius` exists to prevent.
 * So native's reveal is the fade, which is also what the web twin degrades to
 * under reduced motion: the two platforms converge on one look rather than
 * diverging into two.
 *
 * Reduced motion shortens it to `standard` rather than removing it. An element
 * that appears with no transition at all reads as a glitch (`design.md`
 * §36.10) — the same relief every other V4 surface takes.
 *
 * Deliberately local to this file rather than added to `charts/internal-v4.ts`:
 * three other agents are building in this module concurrently and a shared file
 * edited by four hands is a merge conflict, not a refactor. Folding the five
 * copies into one hook is a coordinator's job once the pass lands.
 */
function useChartRevealV4(animate: boolean): Animated.Value {
  const reduced = useReducedMotion();
  const progress = React.useRef(new Animated.Value(animate ? 0 : 1)).current;

  React.useEffect(() => {
    if (!animate) {
      progress.setValue(1);
      return undefined;
    }
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: reduced ? V4_MOTION.standard : V4_MOTION.enter,
      easing: reduced ? EASING_STANDARD : EASING_ENTER,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [animate, reduced, progress]);

  return progress;
}

/**
 * **V4 vertical bar chart (native)** — the twin of `charts/BarChartV4`, prop
 * for prop.
 *
 * The base is five decisions the V4 line exists to retire:
 *
 * 1. **`color?: ChartColor` as an identity.** `colors[color]` paints every bar
 *    with a semantic slot, so a second bar chart on the screen reached for
 *    `warn` and became a chart that reads as a warning. V4 has one categorical
 *    answer — slot 1 from the shared palette — and one status answer,
 *    {@link BarChartV4Props.tone}, which is opt-in and means something.
 * 2. **Colour by value.** Brief §4.1 forbids it, and a bar chart is where the
 *    temptation is strongest: bar *length* already encodes magnitude. A
 *    single-series bar chart is **one colour** for every bar.
 * 3. **`colors.muted` as the axis.** `muted` is a de-emphasised *text* colour
 *    with no contrast promise as a rule. The axis is chrome and chrome is
 *    `palette.axis` — the derived neutral at `CHART_AXIS_MIX`, one step more
 *    present than the grid behind it (brief §3.3).
 * 4. **`radius.sm` on the bar top.** Right idea, wrong source: the mark
 *    geometry belongs to `CHART_MARK`, so one bar chart in the kit cannot round
 *    at 4 while the next rounds at whatever the seed's `radius.sm` compiled to
 *    — on a `sharp` seed the base's bars have no rounded end at all.
 *    `CHART_MARK.endRadius` rounds the **data end only**; a bar rounded at the
 *    baseline floats off its axis (brief §4.4).
 * 5. **`gap: tokens.spacing.xs` between bars.** A spacing token doing a mark's
 *    job, and 4 where the mark spec says 2. `CHART_MARK.gap` is the surface
 *    showing between two fills, and it is one of the secondary encodings the
 *    palette's 6–8 CVD band obliges (brief §1 rule 5).
 *
 * Press is native's answer to web's hover (brief §4.6): a bar reveals its
 * precise value and fires {@link BarChartV4Props.onSelect}. Each bar's target
 * is its full-height column slot, carried out to rule 10's 44 floor
 * *vertically* by `hitSlop`; horizontally it stays inside its slot, because a
 * `hitSlop` wider than the slot overlaps the neighbouring bar's target and
 * starts answering the wrong bar.
 *
 * No `react-native-svg`. A bar chart has no curves, no path data and no
 * clipping, so flex `View`s draw it exactly — and unlike an SVG under
 * `preserveAspectRatio`, they keep `CHART_MARK.gap` at 2 real pixels and
 * `CHART_MARK.endRadius` at a real 4px corner at every container width.
 */
export function BarChartV4({
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
  accessibilityLabel,
  style,
}: BarChartV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const palette = useChartPaletteV4();
  const progress = useChartRevealV4(animate);
  const [selected, setSelected] = React.useState<number | null>(null);

  const label = accessibilityLabel ?? barChartLabel(data, title, format);
  // Status is a *fill* here (rule 3); the visible value label beside it is what
  // discharges the "never colour alone" obligation.
  const fill = tone ? colors[tone] : chartSlotColor(palette, 0);
  // How far the press target grows past the painted plot to reach the 44 floor.
  const slop = Math.max(0, (minTap(tokens.spacing) - height) / 2);

  const header =
    title || summary || caption ? (
      <View style={{ gap: tokens.spacing.xs }}>
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
      </View>
    ) : null;

  const frame = (children: React.ReactNode): React.ReactElement => (
    <View
      accessibilityRole="image"
      accessibilityLabel={label}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      {header}
      {children}
    </View>
  );

  // Loading and empty both keep the plot's footprint. A chart that collapses to
  // zero height while its data is in flight is the most common dashboard jank
  // and is free to avoid (brief §4.5).
  if (loading) return frame(<SkeletonV4 variant="rect" width="100%" height={height} />);
  if (data.length === 0) {
    return frame(
      <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      </View>
    );
  }

  const ceiling = ceilingOf(data, max);
  const directLabels = showValues ?? data.length <= CHART_DIRECT_LABEL_MAX;
  const bubble = tooltip && selected !== null && data[selected] !== undefined ? selected : null;

  return frame(
    <View>
      {/*
        The press bubble is a row of slot-width cells rather than an absolutely
        positioned popover: RN has no percentage `translateX`, so a popover
        would need a measured width before it could centre itself, and a
        tooltip that jumps on its second frame is worse than one that lines up
        with its own column by construction.
      */}
      {bubble !== null ? (
        <View style={{ flexDirection: 'row', gap: CHART_MARK.gap }}>
          {data.map((_, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center' }}>
              {i === bubble ? (
                <ChartTipV4
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    backgroundColor: colors.popover,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.md,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                  }}
                >
                  <View
                    style={
                      indicator === 'dot'
                        ? {
                            width: CHART_MARK.dotSize,
                            height: CHART_MARK.dotSize,
                            borderRadius: CHART_MARK.dotSize,
                            backgroundColor: fill,
                          }
                        : {
                            width: CHART_MARK.dotSize,
                            height: CHART_MARK.stroke,
                            backgroundColor: indicator === 'dashed' ? undefined : fill,
                            borderTopWidth: indicator === 'dashed' ? CHART_MARK.stroke : 0,
                            borderStyle: 'dashed',
                            borderColor: fill,
                          }
                    }
                  />
                  <TextV4 size="xs" tone="onPopover" numeric="tabular">
                    {`${labels?.[bubble] ? `${labels[bubble]}: ` : ''}${format(
                      data[bubble] as number
                    )}`}
                  </TextV4>
                </ChartTipV4>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
      <Animated.View testID="xen-v4-chart-plot" style={{ height, opacity: progress }}>
        {directLabels ? (
          <View style={{ flexDirection: 'row', gap: CHART_MARK.gap }}>
            {data.map((value, i) => (
              <TextV4
                key={i}
                size="xs"
                tone="mutedText"
                align="center"
                numeric="tabular"
                numberOfLines={1}
                style={{ flex: 1 }}
              >
                {format(value)}
              </TextV4>
            ))}
          </View>
        ) : null}
        <View
          testID="xen-v4-bar-row"
          style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: CHART_MARK.gap }}
        >
          {data.map((value, i) => (
            <Pressable
              key={i}
              testID="xen-v4-bar-hit"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              // Rule 10's 44 floor, as far as a bar chart can honour it. The
              // target grows *vertically* to reach it; it cannot grow
              // horizontally without eating the neighbouring bar's target,
              // and a chart that answers the wrong bar is a worse failure than
              // one with a narrow one. A chart with more bars than its width
              // can carry is a composition problem — facet it, or bin it into
              // a `HistogramV4`.
              hitSlop={{ top: slop, bottom: slop }}
              onPress={() => {
                setSelected((current) => (current === i ? null : i));
                onSelect?.(i, value);
              }}
              style={{ flex: 1, height: '100%', justifyContent: 'flex-end' }}
            >
              <View
                testID="xen-v4-bar"
                style={{
                  height: `${barRatio(value, ceiling) * 100}%`,
                  // `1` is the hairline exception in rule 1: a datum that
                  // exists should be visible as a datum even at 0.
                  minHeight: 1,
                  backgroundColor: fill,
                  borderTopLeftRadius: CHART_MARK.endRadius,
                  borderTopRightRadius: CHART_MARK.endRadius,
                }}
              />
            </Pressable>
          ))}
        </View>
        <View testID="xen-v4-chart-axis" style={{ height: 1, backgroundColor: palette.axis }} />
      </Animated.View>
      {labels ? (
        <View style={{ flexDirection: 'row', gap: CHART_MARK.gap }}>
          {labels.map((l, i) => (
            <TextV4
              key={i}
              size="xs"
              tone="mutedText"
              align="center"
              numberOfLines={1}
              style={{ flex: 1 }}
            >
              {l}
            </TextV4>
          ))}
        </View>
      ) : null}
    </View>
  );
}

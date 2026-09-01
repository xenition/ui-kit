import * as React from 'react';
import { Animated, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  foldChartSeries,
  type ChartToneV4,
} from '../../primitives/internal/v4-chart';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { EASING_ENTER, EASING_STANDARD, V4_MOTION } from '../primitives/internal/motion-v4';
import { minTap } from '../primitives/internal/nav-v4';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { useXenitionTheme } from '../theme';
import { chartSlotColor, useChartPaletteV4 } from './internal-v4';
import { LegendV4 } from './LegendV4';

/**
 * The opt-in to status colour, and the only way a segment paints one
 * (brief §4.3).
 *
 * A stack is the one bar form where status is often the *right* answer — a
 * pass/fail split, a budget under/over — so `tone` is per segment here rather
 * than per chart. Rule 3's "one or the other, never both" is enforced instead:
 * either every segment declares a tone or none does.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type StackedBarV4Tone = ChartToneV4;

export interface StackedBarV4Segment {
  /** The segment's share of the total. Negative values are clamped to 0. */
  value: number;
  /**
   * What this segment is. Carried by the legend, the press bubble and the
   * accessible sentence — a stack without labels is a bar of colours.
   */
  label?: string;
  /** Status colour for this segment. All segments or none — see {@link StackedBarV4Tone}. */
  tone?: StackedBarV4Tone;
}

export interface StackedBarV4Props {
  /** Segments laid end to end; each width is its share of the total. */
  segments: StackedBarV4Segment[];
  /** Bar height in px. */
  height?: number;
  /**
   * Show the legend. Defaults to **on at two or more segments** — brief §1
   * rule 5: the legend is the identity channel's redundancy and is not
   * optional where colour is carrying identity.
   */
  legend?: boolean;
  /**
   * Show each segment's value in the legend. Defaults to **on at
   * `CHART_DIRECT_LABEL_MAX` segments or fewer**. See {@link StackedBarV4} for
   * why a stack's direct labels live in the legend rather than in the bar.
   */
  showValues?: boolean;
  /** How a value is spelled, in the legend, the bubble and the sentence. */
  format?: (value: number) => string;
  /** The descriptive headline. HIG's rule: say the takeaway, not the axes. */
  title?: string;
  /** The one loud number this figure is evidence for. */
  summary?: string;
  /** The quiet line — "vs last month", "last 30 days". */
  caption?: string;
  /** Render a skeleton at the bar's footprint instead of the bar. */
  loading?: boolean;
  /** What the empty state says. Keeps the footprint either way (brief §4.5). */
  emptyLabel?: string;
  /** Play the entrance reveal, once. Default `true` (brief §4.7). */
  animate?: boolean;
  /** Press-to-reveal value bubble. Default `true` (brief §4.6). */
  tooltip?: boolean;
  /** Fired when a segment is pressed. */
  onSelect?: (index: number, value: number) => void;
  /** Accessible one-line summary; derived from the data when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** A segment's non-negative contribution. `NaN` and `-1` both count as nothing. */
function share(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Rule 3, enforced rather than documented.
 *
 * The palette module already throws rather than cycling past slot 5, on the
 * grounds that a silent second meaning for one colour is worse than a loud
 * failure. Mixing status hues with slot hues in one stack is the same defect
 * wearing a different hat, so it gets the same answer.
 */
function assertOneColourVocabulary(segments: StackedBarV4Segment[]): void {
  const toned = segments.filter((s) => s.tone !== undefined).length;
  if (toned !== 0 && toned !== segments.length) {
    throw new RangeError(
      '@xenition/ui charts: a stacked bar carries status colour or slot colour, never both. ' +
        `${toned} of ${segments.length} segments declare a tone — give every segment one, or none.`
    );
  }
}

/**
 * Fold a stack that is longer than the palette, instead of crashing on it.
 *
 * `chartSlotColor` throws past the fifth slot, and it is right to: asking the
 * palette for a sixth slot is a mistake in the caller's own code. But a
 * stack's segment count arrives with the **data** — six lines on an expenses
 * breakdown from a live API — and a `RangeError` thrown out of render takes
 * the whole screen down. The split the shared module draws is exactly this:
 * *the primitive throws, the component folds* (see `foldChartSeries`).
 *
 * A stack is a composition — the parts add up to the whole — so the tail is
 * **summed** into one segment named {@link CHART_OVERFLOW_LABEL}, the same
 * answer `PieChartV4` gives for the same reason. The total is unchanged, which
 * is the property a stack must not lose: a bar that dropped its sixth segment
 * would silently rescale every other one.
 *
 * Not sorted, deliberately: a stack's order is the composition the caller
 * chose. A **toned** stack never folds — it is not spending the categorical
 * palette, and the residual of a pass/fail split is neither passing nor
 * failing. Keep in step with the web twin.
 */
function foldSegmentsV4(segments: StackedBarV4Segment[]): StackedBarV4Segment[] {
  if (segments.some((s) => s.tone !== undefined)) return segments;
  const fold = foldChartSeries(segments);
  if (!fold.didFold) return fold.kept;
  return [
    ...fold.kept,
    {
      value: fold.folded.reduce((sum, s) => sum + share(s.value), 0),
      label: CHART_OVERFLOW_LABEL,
    },
  ];
}

/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function stackedBarLabel(
  segments: StackedBarV4Segment[],
  total: number,
  title: string | undefined
): string {
  const head = `Stacked bar${title ? `, ${title}` : ''}`;
  const count = `${segments.length} ${segments.length === 1 ? 'segment' : 'segments'}`;
  if (total <= 0) return `${head}, ${count}`;
  const parts = segments.map((s, i) => {
    const name = s.label ?? `Segment ${i + 1}`;
    return `${name} ${Math.round((share(s.value) / total) * 100)}%`;
  });
  return `${head}, ${count}, ${parts.join(', ')}`;
}

/**
 * The entrance reveal (brief §4.7), as an opacity ramp. See the note in
 * `BarChartV4` for why native fades where web wipes, and why the hook is local
 * to each file for the length of this pass.
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
 * **V4 stacked bar (native)** — one horizontal bar split into its parts, the
 * twin of `charts/StackedBarV4` prop for prop.
 *
 * The base is the module's clearest example of the defect this whole pass
 * exists to fix, and it makes the mistake twice:
 *
 * 1. **`colors[s.color ?? 'primary']`.** Every segment is a semantic slot, so a
 *    caller who wanted four distinguishable parts reached for `success`,
 *    `warn` and `danger` and got a revenue split that reads as a health
 *    indicator. Nothing is wrong with segment 4; it is simply fourth. V4 takes
 *    the shared palette's slots in order, and status is opt-in per
 *    {@link StackedBarV4Tone}.
 * 2. **`opacity` as the way to tell segments apart.** The base's own doc
 *    comment recommends it: "distinguish series by varying the `opacity` of one
 *    theme color". Opacity is not a categorical channel — it is a *magnitude*
 *    channel, so a descending ramp says the fourth segment matters less than
 *    the first, and at the bottom of the ramp it says the fourth segment is
 *    **disabled**, because 0.38 of a colour is exactly what `v4-state.ts` uses
 *    to mean that. Retired outright: every segment is painted at full strength.
 *
 * ## The gap is the encoding
 *
 * `CHART_MARK.gap` of page between segments is not a style choice, it is the
 * secondary encoding the palette's 6.5 adjacent CVD ΔE obliges (brief §1
 * rule 5). Two segments a dichromat cannot separate by hue are still visibly
 * two segments when a hairline of page runs between them — and a stack is the
 * one form where every pair of series is guaranteed to be adjacent, so it needs
 * it most. The base laid its segments flush inside a clipped pill.
 *
 * ## Where a stack's direct labels go
 *
 * Brief §4.4 asks for direct labels at four series or fewer, and a stack cannot
 * take them in place: a segment is as wide as its share, so the 8% segment has
 * no room for "8%" and the label that does not fit is the one the reader most
 * wanted. The legend carries the values instead — same channel, same
 * four-or-fewer rule, somewhere they fit.
 *
 * ## Rounding
 *
 * `CHART_MARK.endRadius` at the **data end only** (brief §4.4): the stack's
 * right edge is where the total lands, its left edge is the baseline. The
 * base's `borderRadius: radius.full` with `overflow: 'hidden'` rounded both,
 * and on a `sharp` seed rounded neither.
 */
export function StackedBarV4({
  segments,
  height = 16,
  legend,
  showValues,
  format = String,
  title,
  summary,
  caption,
  loading = false,
  emptyLabel = 'No data',
  animate = true,
  tooltip = true,
  onSelect,
  accessibilityLabel,
  style,
}: StackedBarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const palette = useChartPaletteV4();
  const progress = useChartRevealV4(animate);
  const [selected, setSelected] = React.useState<number | null>(null);

  assertOneColourVocabulary(segments);

  // Everything below draws the **folded** stack: past the palette's five slots
  // the tail is summed into one "Other" segment rather than thrown at. See
  // {@link foldSegmentsV4}.
  const drawn = foldSegmentsV4(segments);
  const total = drawn.reduce((sum, s) => sum + share(s.value), 0);
  const label = accessibilityLabel ?? stackedBarLabel(drawn, total, title);
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

  if (loading) return frame(<SkeletonV4 variant="rect" width="100%" height={height} />);
  // No segments and an all-zero stack are the same picture — a bar with nothing
  // in it — so they get the same answer.
  if (drawn.length === 0 || total <= 0) {
    return frame(
      <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      </View>
    );
  }

  const showLegend = legend ?? drawn.length >= 2;
  const legendValues = showValues ?? drawn.length <= CHART_DIRECT_LABEL_MAX;
  const fillOf = (segment: StackedBarV4Segment, i: number): string =>
    segment.tone ? colors[segment.tone] : chartSlotColor(palette, i);
  const last = drawn.length - 1;
  const bubble =
    tooltip && selected !== null && drawn[selected] !== undefined ? selected : null;

  return frame(
    <View style={{ gap: tokens.spacing.sm }}>
      {bubble !== null ? (
        <View
          style={{
            alignSelf: 'flex-start',
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
            style={{
              width: CHART_MARK.dotSize,
              height: CHART_MARK.dotSize,
              borderRadius: CHART_MARK.dotSize,
              backgroundColor: fillOf(drawn[bubble] as StackedBarV4Segment, bubble),
            }}
          />
          <TextV4 size="xs" tone="onPopover" numeric="tabular">
            {`${drawn[bubble]?.label ? `${drawn[bubble]?.label}: ` : ''}${format(
              drawn[bubble]?.value as number
            )}`}
          </TextV4>
        </View>
      ) : null}
      <Animated.View
        testID="xen-v4-chart-plot"
        style={{
          flexDirection: 'row',
          height,
          gap: CHART_MARK.gap,
          opacity: progress,
        }}
      >
        {drawn.map((segment, i) => {
          const value = share(segment.value);
          if (value <= 0) return null;
          return (
            <Pressable
              key={i}
              testID="xen-v4-segment"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              // The bar is 16 tall by default, under the tap floor, so the
              // press target grows vertically to reach it (rule 10). It cannot
              // grow horizontally without eating the neighbouring segment's
              // target, which would be a worse failure than a short one.
              hitSlop={{ top: slop, bottom: slop }}
              onPress={() => {
                setSelected((current) => (current === i ? null : i));
                onSelect?.(i, segment.value);
              }}
              style={{
                flexGrow: value / total,
                flexBasis: 0,
                height: '100%',
                // `1` is the hairline exception in rule 1: a segment that
                // exists must be visible, however small its share.
                minWidth: 1,
                backgroundColor: fillOf(segment, i),
                borderTopRightRadius: i === last ? CHART_MARK.endRadius : 0,
                borderBottomRightRadius: i === last ? CHART_MARK.endRadius : 0,
              }}
            />
          );
        })}
      </Animated.View>
      {/*
        The legend is the shared `LegendV4`, not a local one. It was local
        because that component was Group D's and was not on disk while this
        group built; the swap also retires the `numberOfLines={1}` this file
        had on the label, which is the one thing `LegendV4` is explicit that a
        legend must never do — a clipped legend label is an unreadable
        identity, and identity is the only reason the legend exists.

        `testID` carries the module-wide hook the rest of this module's specs
        query by, because native has one test id per view where the web twin
        can wear both its own attribute and the module's.
      */}
      {showLegend ? (
        <LegendV4
          testID="xen-v4-chart-legend"
          items={drawn.map((segment, i) => ({
            key: String(i),
            label: segment.label ?? `Segment ${i + 1}`,
            slot: i,
            ...(segment.tone === undefined ? {} : { tone: segment.tone }),
            ...(legendValues ? { value: format(segment.value) } : {}),
          }))}
        />
      ) : null}
    </View>
  );
}

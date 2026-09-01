import * as React from 'react';
import { Animated, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
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
 * The opt-in to status colour, and the only way this chart paints one
 * (brief §4.3).
 *
 * A distribution wears `success` / `warn` / `danger` when the thing it counts
 * genuinely *means* good or bad. It is still **one colour for every bin**; a
 * tone changes which colour, never how many.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type HistogramV4Tone = ChartToneV4;

export interface HistogramV4Props {
  /** Bin counts; each becomes a vertical bar sized by `count / max`. */
  bins: number[];
  /** Bin edge labels. Drawn **thinned**, never rotated — see {@link HistogramV4}. */
  labels?: string[];
  /** The plot's own height in px. Never auto — shadcn's rule (brief §4.2). */
  height?: number;
  /** Count mapped to a full-height bin; defaults to the largest bin. */
  max?: number;
  /** Status colour. Omit it and every bin is slot 1 — see {@link HistogramV4Tone}. */
  tone?: HistogramV4Tone;
  /** How a count is spelled, in the tooltip and in the accessible sentence. */
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
  /** Press-to-reveal count bubble. Default `true` (brief §4.6). */
  tooltip?: boolean;
  /** Fired when a bin is pressed. */
  onSelect?: (index: number, value: number) => void;
  /** Accessible one-line summary; derived from the data when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** `count / ceiling`, clamped, and zero when the ceiling is not a usable divisor. */
function binRatio(value: number, ceiling: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(ceiling) || ceiling <= 0) return 0;
  return Math.min(Math.max(value / ceiling, 0), 1);
}

/** The largest finite bin, or 0 when there is nothing to measure. */
function ceilingOf(values: number[], override?: number): number {
  if (override !== undefined && Number.isFinite(override)) return override;
  const finite = values.filter((v) => Number.isFinite(v));
  return finite.length > 0 ? Math.max(...finite) : 0;
}

/**
 * How many bins pass between two drawn labels.
 *
 * Derived from {@link CHART_DIRECT_LABEL_MAX} rather than picked, so the number
 * of labels a histogram draws and the number of series a chart may direct-label
 * come from one decision instead of two that drift.
 */
function labelStride(count: number): number {
  return Math.max(1, Math.ceil(count / CHART_DIRECT_LABEL_MAX));
}

/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function histogramLabel(
  bins: number[],
  title: string | undefined,
  format: (value: number) => string
): string {
  const finite = bins.filter((v) => Number.isFinite(v));
  const head = `Histogram${title ? `, ${title}` : ''}`;
  const count = `${bins.length} ${bins.length === 1 ? 'bin' : 'bins'}`;
  if (finite.length === 0) return `${head}, ${count}`;
  const lo = Math.min(...finite);
  const hi = Math.max(...finite);
  const range = lo === hi ? format(lo) : `${format(lo)} to ${format(hi)}`;
  return `${head}, ${count}, ${range}`;
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
 * **A histogram's bins sit flush.** The ruling on brief §4.4's "a
 * `CHART_MARK.gap` of surface separates adjacent bars", which Group B flagged
 * as producing a non-flush histogram — the opposite of what a distribution
 * should look like.
 *
 * The gap rule is about **categorical** bars. There, the gap is doing semantic
 * work: it says *these are separate things*, and it is one of the four
 * secondary encodings rule 5 obliges, because two adjacent fills a dichromat
 * reads as one colour are still visibly two bars when a hairline of page runs
 * between them.
 *
 * A histogram's bins are not separate things. They are **one continuous axis**
 * cut into buckets, and the bucket edges are adjacent by construction — the
 * right-hand edge of bin 3 *is* the left-hand edge of bin 4. Page between them
 * says there is a range of the variable that fell in neither bucket, which is
 * false for every histogram ever drawn. That is not a style preference; it is
 * the chart making a claim about the data that the data does not support, and
 * it is why every reference implementation of a histogram — and every
 * statistics textbook — draws the bars touching.
 *
 * Rule 5 is satisfied without the gap here anyway, and satisfied more cheaply
 * than anywhere else in the module: **a histogram is one series**, so colour is
 * not carrying identity at all and there is no adjacent pair for a reader to
 * confuse. The encoding a histogram needs is the step in the outline where one
 * bin's height meets the next, which flush bars give and a gap actually
 * weakens.
 *
 * Zero rather than "no `gap` property" so the bin row, the label row and the
 * press-bubble row read from one binding: the three are laid out with the same
 * flex rule and a gap on one of them silently misaligns a label from its bin.
 */
const BIN_GAP = 0;

/**
 * **V4 frequency histogram (native)** — a distribution, which is the one bar
 * form whose colour question answers itself.
 *
 * **Bins are one series by definition.** A histogram counts one variable into
 * ordered buckets; there is no second identity to encode, so there is no second
 * colour to spend. The base takes `color?: HistogramColor` and V4 takes a
 * `tone` that changes *which* single colour is used and never *how many* —
 * because a histogram coloured by bin height has spent the identity channel
 * restating the bar length (brief §4.1).
 *
 * The rest of what the base got wrong:
 *
 * - **`borderLeftWidth: 1` in `colors.surface` between bins.** A border eats
 *   into the bin it belongs to, so the first bin ends up a pixel wider than the
 *   rest and the separation is a property of one neighbour rather than of the
 *   pair. It is gone, and — see {@link BIN_GAP} — nothing replaces it: a
 *   histogram's bins are flush, because they are one continuous axis rather
 *   than a row of separate things.
 * - **`colors.muted` as the axis.** A de-emphasised *text* colour doing a
 *   rule's job. The axis is chrome and chrome is `palette.axis` (brief §3.3).
 * - **Square tops.** `CHART_MARK.endRadius` at the data end only, so the family
 *   has one bar silhouette; the baseline stays square because a bar rounded
 *   there floats off its axis (brief §4.4).
 *
 * ## Bin labels thin, they do not rotate
 *
 * HIG's density rule: a chart stays simple and lets people ask for detail. A
 * rotated axis label is a chart admitting it has more labels than room, and on
 * a phone it is unreadable at any angle. So a histogram draws every
 * {@link labelStride}th label upright and leaves the rest to the press bubble.
 *
 * ## The one documented tap-target exception
 *
 * Brief §1 rule 10 names the histogram bin, alongside the heatmap cell, as the
 * place where density genuinely forbids 44 and HIG's absolute floor of 28
 * applies instead — and says the exception holds only where a component states
 * it. This is that statement. The bin's press target is its full-height column
 * slot, carried out to the tap floor **vertically** by `hitSlop`; horizontally
 * it stays inside its slot, because a `hitSlop` wider than the slot would
 * overlap its neighbours' targets and start swallowing their presses, which is
 * a worse failure than a narrow one.
 */
export function HistogramV4({
  bins,
  labels,
  height = 120,
  max,
  tone,
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
}: HistogramV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const palette = useChartPaletteV4();
  const progress = useChartRevealV4(animate);
  const [selected, setSelected] = React.useState<number | null>(null);

  const label = accessibilityLabel ?? histogramLabel(bins, title, format);
  const fill = tone ? colors[tone] : chartSlotColor(palette, 0);
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
  if (bins.length === 0) {
    return frame(
      <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      </View>
    );
  }

  const ceiling = ceilingOf(bins, max);
  const stride = labelStride(bins.length);
  const bubble = tooltip && selected !== null && bins[selected] !== undefined ? selected : null;

  return frame(
    <View>
      {bubble !== null ? (
        <View style={{ flexDirection: 'row', gap: BIN_GAP }}>
          {bins.map((_, i) => (
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
                    style={{
                      width: CHART_MARK.dotSize,
                      height: CHART_MARK.dotSize,
                      borderRadius: CHART_MARK.dotSize,
                      backgroundColor: fill,
                    }}
                  />
                  <TextV4 size="xs" tone="onPopover" numeric="tabular">
                    {`${labels?.[bubble] ? `${labels[bubble]}: ` : ''}${format(
                      bins[bubble] as number
                    )}`}
                  </TextV4>
                </ChartTipV4>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
      <Animated.View testID="xen-v4-chart-plot" style={{ height, opacity: progress }}>
        <View
          testID="xen-v4-bin-row"
          style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: BIN_GAP }}
        >
          {bins.map((count, i) => (
            <Pressable
              key={i}
              testID="xen-v4-bin-hit"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              hitSlop={{ top: slop, bottom: slop }}
              onPress={() => {
                setSelected((current) => (current === i ? null : i));
                onSelect?.(i, count);
              }}
              style={{ flex: 1, height: '100%', justifyContent: 'flex-end' }}
            >
              <View
                testID="xen-v4-bin"
                style={{
                  height: `${binRatio(count, ceiling) * 100}%`,
                  // `1` is the hairline exception in rule 1: an empty bin is
                  // still a bin, and a gap in a distribution is information.
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
        <View style={{ flexDirection: 'row', gap: BIN_GAP }}>
          {bins.map((_, i) => (
            <TextV4
              key={i}
              size="xs"
              tone="mutedText"
              align="center"
              numberOfLines={1}
              style={{ flex: 1 }}
            >
              {i % stride === 0 ? (labels[i] ?? '') : ''}
            </TextV4>
          ))}
        </View>
      ) : null}
    </View>
  );
}

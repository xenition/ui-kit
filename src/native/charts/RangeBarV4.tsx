import * as React from 'react';
import { Animated, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  CHART_MARK,
  type ChartToneV4,
} from '../../primitives/internal/v4-chart';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { EASING_ENTER, EASING_STANDARD, V4_MOTION } from '../primitives/internal/motion-v4';
import { minTap } from '../primitives/internal/nav-v4';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { useXenitionTheme } from '../theme';
import { chartSlotColor, useChartPaletteV4 } from './internal-v4';

/**
 * The opt-in to status colour, and the only way this chart paints one
 * (brief §4.3).
 *
 * A range genuinely means something bad often enough to earn the prop — a
 * latency band over its budget, a temperature outside its safe window — and it
 * ships with the visible `start`–`end` label, never colour alone.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type RangeBarV4Tone = ChartToneV4;

export interface RangeBarV4Props {
  /** Start of the highlighted range, in domain units. */
  start: number;
  /** End of the highlighted range, in domain units. */
  end: number;
  /** Domain minimum — the track's left edge. */
  domainMin?: number;
  /** Domain maximum — the track's right edge. */
  domainMax?: number;
  /** Track height in px. */
  height?: number;
  /** Status colour. Omit it and the range is slot 1 — see {@link RangeBarV4Tone}. */
  tone?: RangeBarV4Tone;
  /**
   * Show the domain ends and the range itself in words. Default `true` — one
   * mark is well inside `CHART_DIRECT_LABEL_MAX`, and a floating bar with no
   * numbers anywhere is a picture of a range rather than a reading of one.
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
  /** Render a skeleton at the track's footprint instead of the track. */
  loading?: boolean;
  /** What the empty state says. Keeps the footprint either way (brief §4.5). */
  emptyLabel?: string;
  /** Play the entrance reveal, once. Default `true` (brief §4.7). */
  animate?: boolean;
  /**
   * Reveal the range in words on press even when
   * {@link RangeBarV4Props.showValues} is off. Default `true` (brief §4.6).
   */
  tooltip?: boolean;
  /** Fired when the bar is pressed. */
  onSelect?: (start: number, end: number) => void;
  /** Accessible one-line summary; derived from the data when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Where a domain value falls on the track, as a fraction in `[0, 1]`. */
function position(value: number, domainMin: number, span: number): number {
  if (!Number.isFinite(value) || span <= 0) return 0;
  return Math.min(Math.max((value - domainMin) / span, 0), 1);
}

/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function rangeBarLabel(
  lo: number,
  hi: number,
  domainMin: number,
  domainMax: number,
  title: string | undefined,
  format: (value: number) => string
): string {
  const head = `Range bar${title ? `, ${title}` : ''}`;
  const range = lo === hi ? format(lo) : `${format(lo)} to ${format(hi)}`;
  return `${head}, ${range}, on a scale of ${format(domainMin)} to ${format(domainMax)}`;
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
 * **V4 floating bar (native)** — one band, `start` to `end`, on a domain.
 *
 * **This is the one bar form rounded at both ends**, and the reason is worth
 * stating because it is the exception that proves brief §4.4's rule. Every
 * other bar in this family has a baseline: it grows from zero, and rounding the
 * end it grows *from* lifts it off its own axis. A range bar has no baseline.
 * Both of its ends are data — `start` is as much a measurement as `end` — so
 * `CHART_MARK.endRadius` applies to both, and a square end here would read as a
 * bar that had been clipped rather than one that had been measured.
 *
 * What the base got wrong:
 *
 * - **`colors.border` as the track.** A hairline colour doing a fill's job, and
 *   one that does not follow the scheme the way the derived chrome neutral
 *   does. The track is `palette.grid` (brief §3.3).
 * - **No axis at all.** The range floats on a grey pill with nothing to read it
 *   against. V4 draws the domain axis at `palette.axis`, one step more present
 *   than the track behind it.
 * - **`color = 'primary'` as an identity.** A semantic slot standing in for a
 *   series colour, which is what brief §1 rule 2 exists to retire. Slot 1, or a
 *   `tone` that means something.
 * - **`radius.full` on the track and the fill.** Seed-dependent: on a `sharp`
 *   seed both compile to 0 and the range loses its ends entirely.
 *   `CHART_MARK.endRadius` is the mark spec and does not move with the seed.
 * - **`Math.max(domainMax - domainMin, 1)` as the divisor.** A collapsed or
 *   inverted domain then draws a confident-looking band at an arbitrary place.
 *   V4 renders the empty state instead, at the same footprint (brief §4.5).
 * - **A zero-width range drawn as nothing.** `start === end` is a real reading
 *   — a distribution collapsed to one value — so the mark floors at
 *   `CHART_MARK.dotSize`, this line's smallest painted point.
 *
 * The value labels sit **under the axis** rather than floating over the mark:
 * centring an unmeasured label over a percentage offset is not something React
 * Native can do without measuring first, and a twin pair where one platform
 * labels in place and the other labels underneath is a parity break dressed up
 * as a platform difference.
 */
export function RangeBarV4({
  start,
  end,
  domainMin = 0,
  domainMax = 100,
  height = 10,
  tone,
  showValues = true,
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
}: RangeBarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const palette = useChartPaletteV4();
  const progress = useChartRevealV4(animate);
  const [pressed, setPressed] = React.useState(false);

  const lo = Math.min(start, end);
  const hi = Math.max(start, end);
  const label = accessibilityLabel ?? rangeBarLabel(lo, hi, domainMin, domainMax, title, format);
  const fill = tone ? colors[tone] : chartSlotColor(palette, 0);

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

  const span = domainMax - domainMin;
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || !Number.isFinite(span) || span <= 0) {
    return frame(
      <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      </View>
    );
  }

  const left = position(lo, domainMin, span);
  const right = position(hi, domainMin, span);
  const showRange = showValues || (tooltip && pressed);

  return frame(
    <View style={{ gap: tokens.spacing.xs }}>
      <Pressable
        testID="xen-v4-range-hit"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        onPress={() => {
          setPressed((current) => !current);
          onSelect?.(lo, hi);
        }}
        style={{ minHeight: minTap(tokens.spacing), justifyContent: 'center' }}
      >
        <Animated.View
          testID="xen-v4-chart-track"
          style={{
            height,
            backgroundColor: palette.grid,
            borderRadius: CHART_MARK.endRadius,
            opacity: progress,
          }}
        >
          <View
            testID="xen-v4-range"
            style={{
              position: 'absolute',
              top: 0,
              left: `${left * 100}%`,
              width: `${(right - left) * 100}%`,
              height: '100%',
              // A range of zero width is a point, and a point in this line is
              // `dotSize` — below that it stops reading as a mark at all.
              minWidth: CHART_MARK.dotSize,
              backgroundColor: fill,
              // Both ends, and only here: neither end of a range is a baseline.
              borderRadius: CHART_MARK.endRadius,
            }}
          />
        </Animated.View>
      </Pressable>
      <View testID="xen-v4-chart-axis" style={{ height: 1, backgroundColor: palette.axis }} />
      {showRange ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
          }}
        >
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {format(domainMin)}
          </TextV4>
          <TextV4
            testID="xen-v4-chart-value"
            size="xs"
            tone="mutedText"
            weight="semibold"
            numeric="tabular"
          >
            {lo === hi ? format(lo) : `${format(lo)}–${format(hi)}`}
          </TextV4>
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {format(domainMax)}
          </TextV4>
        </View>
      ) : null}
    </View>
  );
}

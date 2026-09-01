import * as React from 'react';
import { Animated, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { TextV4 } from '../primitives/TextV4';
import { useXenitionTheme } from '../theme';
import { chartSlotColor, useChartPaletteV4, useChartValueV4 } from './internal-v4';
import {
  ChartFigureV4,
  ChartLoadingV4,
  ChartRevealV4,
  RadialEmptyV4,
  coordV4,
  polarV4,
  toneColorV4,
  type ChartToneV4,
} from './PieChartV4';
import { radialThicknessV4 } from './ProgressRingV4';

/**
 * A point on the gauge's semicircle. `t` in `[0, 1]` walks 180° → 0°, i.e. left
 * to right across the top half, which is the direction every reviewed system
 * draws a gauge in.
 */
function gaugePoint(cx: number, cy: number, r: number, t: number): [number, number] {
  return polarV4(cx, cy, r, -Math.PI * (1 - t));
}

export interface GaugeChartV4Props {
  /** Current value. Clamped into `[min, max]`; non-finite reads as `min`. */
  value: number;
  /**
   * Left end of the arc. Default 0.
   *
   * The web base had a `min` and the native base did not, so the same gauge
   * could not be written twice. §1 rule 7 closes the gap on the richer side.
   */
  min?: number;
  /** Right end of the arc. Default 100. */
  max?: number;
  /** Width in px; the height is derived from the semicircle. Default 200. */
  size?: number;
  /** Arc thickness in px. Omit for the family's derived thickness. */
  thickness?: number;
  /**
   * Opt in to a status hue (§1 rule 3) — a gauge that genuinely reads "over
   * budget" or "capacity critical". Omitted, the fill is slot 1.
   */
  tone?: ChartToneV4;
  /** The descriptive headline. HIG's rule: say the takeaway. */
  title?: string;
  /**
   * The one loud number, drawn in the arc's well. Defaults to the clamped
   * `value`; pass a formatted string ("£48,210", "72%") to override it.
   */
  summary?: string;
  /** The quiet line under the title. */
  caption?: string;
  /** Draw the `summary`. Default `true`. */
  showValue?: boolean;
  /** Swap the plot for a `SkeletonV4` at the same footprint (§4.5). */
  loading?: boolean;
  /** The empty state's wording. */
  emptyLabel?: string;
  /** Run the entrance reveal. Default `true`; Reduce Motion shortens it. */
  animate?: boolean;
  /** Overrides the derived sentence (§1 rule 6). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * `Path`, driven. Built once at module scope — `createAnimatedComponent`
 * returns a component class, and rebuilding it per render would remount the
 * arc on every frame.
 */
const AnimatedPath = Animated.createAnimatedComponent(Path);

/**
 * The value arc, as its own component so its length can be an animated value.
 *
 * ## Why the arc is the whole track now
 *
 * The value used to live in the path `d`: a shorter arc ending at
 * `gaugePoint(t)`, with a large-arc flag that flipped at the halfway mark.
 * That draws the same picture, but a path string is not something a value can
 * travel along — and the flag flipping means even a renderer that interpolated
 * `d` could not interpolate this one. So a gauge whose number changed after
 * mount jumped from one arc to the next.
 *
 * The geometry is now the track's, revealed by a dash: one fixed path, with
 * the value as `strokeDashoffset`, which is a single number and therefore
 * something {@link useChartValueV4} can carry. It is also the spelling
 * `ProgressRingV4` uses, so the two radial members of this family measure
 * themselves the same way instead of drifting.
 *
 * A full gauge is `t === 1`, which lands the offset at exactly 0 — no
 * rounding, no seam, and never `NaN`, because `r` is floored at zero and `t`
 * is clamped into `[0, 1]`.
 */
function GaugeArcV4({
  d,
  stroke,
  strokeWidth,
  arcLength,
  t,
}: {
  d: string;
  stroke: string;
  strokeWidth: number;
  arcLength: number;
  t: number;
}): React.ReactElement {
  const offset = useChartValueV4(arcLength * (1 - t));

  return (
    <AnimatedPath
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={arcLength}
      strokeDashoffset={offset}
    />
  );
}

/**
 * **V4 gauge** — a single value against a scale, so it is a figure with a
 * `summary` and **no legend**.
 *
 * Requires `react-native-svg` (§7 open question 6).
 *
 * That sentence is §5's whole direction for this component and it is
 * load-bearing rather than descriptive: a legend is the identity channel's
 * redundancy (§4.8) and exists "whenever there are two or more series". One
 * series has no identity to disambiguate, so a legend here would be a swatch
 * next to the only colour on screen. The redundancy obligation is discharged by
 * the visible number instead — the strongest secondary encoding the line has.
 *
 * Four changes against the base.
 *
 * 1. **The track is chrome.** `colors.border` was a hairline colour doing a
 *    track's job (§3, decision 3). It is `palette.grid` now — the derived
 *    neutral the whole line's grid takes.
 * 2. **`thickness={18}` became a derived thickness.** §5 asks for this by name;
 *    `radialThicknessV4` is the family's answer, shared with `ProgressRingV4`
 *    and `DonutChartV4` so the three cannot drift.
 * 3. **The needle is gone.** It encoded the value a second time — the arc's end
 *    already *is* the value — and it cost a `strokeWidth={2}` literal. Removing
 *    it also lets the well hold the number at the figure's own type step.
 * 4. **The fill is a palette slot or a `tone`.** The base's
 *    `color?: keyof SemanticColors` defaulted to `'primary'` and accepted
 *    `'danger'` as though the two were the same kind of choice. They are not:
 *    one is identity, one is state (§4.3).
 *
 * The empty state is a non-positive span. `min === max` is a gauge with no
 * scale; the web base papered over it with `max - min || 1`, a silent lie that
 * draws a full arc for every value.
 */
export function GaugeChartV4({
  value,
  min = 0,
  max = 100,
  size = 200,
  thickness,
  tone,
  title,
  summary,
  caption,
  showValue = true,
  loading = false,
  emptyLabel,
  animate = true,
  accessibilityLabel,
  style,
}: GaugeChartV4Props): React.ReactElement {
  const { colors } = useXenitionTheme();
  const palette = useChartPaletteV4();

  const arcWidth =
    thickness === undefined || !Number.isFinite(thickness)
      ? radialThicknessV4(size)
      : Math.max(thickness, 0);
  // A half-disc plus half a stroke above and below the centre line, so the
  // block is never taller than it needs to be and the caller's row does not
  // move when the gauge appears.
  const height = size / 2 + arcWidth;

  const frame = (plot: React.ReactNode): React.ReactElement => (
    <ChartFigureV4 title={title} caption={caption} style={style}>
      {plot}
    </ChartFigureV4>
  );

  if (loading) return frame(<ChartLoadingV4 width={size} height={height} circle={false} />);

  const span = max - min;
  if (!Number.isFinite(span) || span <= 0) {
    return frame(<RadialEmptyV4 label={emptyLabel} width={size} height={height} />);
  }

  const clamped = Number.isFinite(value) ? Math.min(Math.max(value, min), max) : min;
  const t = (clamped - min) / span;

  const cx = size / 2;
  const cy = size / 2;
  const r = Math.max(size / 2 - arcWidth / 2, 0);

  const [sx, sy] = gaugePoint(cx, cy, r, 0);
  const [ex, ey] = gaugePoint(cx, cy, r, 1);
  const track = `M${coordV4(sx)} ${coordV4(sy)} A${coordV4(r)} ${coordV4(r)} 0 0 1 ${coordV4(ex)} ${coordV4(ey)}`;
  // The arc is a semicircle, so its length is `π r` with no approximation.
  // See {@link GaugeArcV4} for why the value is a dash offset now.
  const arcLength = Math.PI * r;

  const stroke = tone === undefined ? chartSlotColor(palette, 0) : toneColorV4(colors, tone);
  const centre = summary ?? String(clamped);

  return frame(
    <ChartRevealV4 animate={animate}>
      <View
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel ?? `Gauge, ${clamped} of ${max}`}
        style={{ width: size, height, alignItems: 'center', justifyContent: 'flex-end' }}
      >
        <Svg width={size} height={height} viewBox={`0 0 ${size} ${height}`}>
          <G>
            <Path
              d={track}
              fill="none"
              stroke={palette.grid}
              strokeWidth={arcWidth}
              strokeLinecap="round"
            />
            {/*
              At `t === 0` the value arc's endpoints coincide, and an arc
              between two identical points draws nothing — except under a round
              cap, where some backends put a dot at the left end. Skipping the
              element is the one rendering they all agree on.
            */}
            {t > 0 ? (
              <GaugeArcV4
                d={track}
                stroke={stroke}
                strokeWidth={arcWidth}
                arcLength={arcLength}
                t={t}
              />
            ) : null}
          </G>
        </Svg>
        {showValue ? (
          // Already spoken by the plot's own label, so the visible copy is
          // hidden rather than read out twice.
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ position: 'absolute', bottom: 0 }}
          >
            <TextV4 size="2xl" weight="bold" numeric="tabular">
              {centre}
            </TextV4>
          </View>
        ) : null}
      </View>
    </ChartRevealV4>
  );
}

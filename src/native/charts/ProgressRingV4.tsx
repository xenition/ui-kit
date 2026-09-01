import * as React from 'react';
import { Animated, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { CHART_MARK } from '../../primitives/internal/v4-chart';
import { TextV4 } from '../primitives/TextV4';
import { useXenitionTheme } from '../theme';
import { chartSlotColor, useChartPaletteV4, useChartValueV4 } from './internal-v4';
import {
  ChartLoadingV4,
  ChartRevealV4,
  RadialEmptyV4,
  toneColorV4,
  type ChartToneV4,
} from './PieChartV4';

/**
 * Ring thickness as a fraction of the diameter.
 *
 * A geometric ratio, which is the one category of bare number §1 rule 1 allows,
 * and a **ratio** on purpose: the base wrote `strokeWidth={12}` here and
 * `thickness={18}` on the gauge, which are a fifth of a small ring and a
 * twentieth of a large one. §5 asks for exactly this — "the `strokeWidth={10}`
 * becomes a derived thickness" — so the ring's weight follows its size and a
 * small ring reads as a small version of the same component rather than as a
 * different one.
 *
 * The value reproduces the base's own proportion at its default size (a 120
 * ring at `strokeWidth = 12`), so nothing that looked right stops looking
 * right. Keep in step with the web twin.
 */
export const RADIAL_THICKNESS_RATIO = 0.1;

/**
 * The radial family's one ring thickness, shared by `ProgressRingV4`,
 * `GaugeChartV4` and `DonutChartV4`.
 *
 * Floored at `CHART_MARK.dotSize`, because a track thinner than the smallest
 * mark the line will paint has stopped being a track: it reads as a border and
 * the "this is a proportion" cue is gone.
 */
export function radialThicknessV4(size: number): number {
  const derived = Number.isFinite(size) ? size * RADIAL_THICKNESS_RATIO : 0;
  return Math.max(derived, CHART_MARK.dotSize);
}

export interface ProgressRingV4Props {
  /** Current value. Clamped into `[0, max]`; non-finite reads as zero. */
  value: number;
  /** The value that fills the ring. Default 100. */
  max?: number;
  /** Outer diameter in px. Default 120. */
  size?: number;
  /**
   * Ring thickness in px. Omit for the family's derived thickness.
   *
   * Named `thickness` on both twins now. The native base called it
   * `strokeWidth` and the web base called it `thickness` for the same number —
   * a parity break §1 rule 7 closes rather than deepens.
   */
  thickness?: number;
  /**
   * Opt in to a status hue (§1 rule 3). Omitted, the ring is slot 1 — the brand
   * hue itself, which is what makes a ring match the card it sits in.
   */
  tone?: ChartToneV4;
  /** Centre text. Overrides the percentage. */
  label?: string;
  /** Show the rounded percentage in the centre when there is no `label`. */
  showValue?: boolean;
  /** Swap the ring for a `SkeletonV4` at the same footprint (§4.5). */
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
 * `Circle`, driven.
 *
 * `Animated.createAnimatedComponent` at module scope rather than inside the
 * component: it builds a class, and building it per render would remount the
 * arc on every frame.
 */
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * The value arc, as its own component so its length can be an animated value.
 *
 * ## Why the dash is a length and an offset now
 *
 * It used to be `strokeDasharray={`${circumference * ratio} ${circumference}`}`
 * — the value lived inside a two-number *string*, which nothing can
 * interpolate, so a ring whose number changed after mount snapped to its new
 * length. The dash array is now the constant circumference and the value is
 * the **offset**, which is one number and therefore something
 * {@link useChartValueV4} can carry. It is also exactly the spelling the web
 * twin uses, so the two rings measure themselves the same way.
 *
 * A full ring is `ratio === 1`, which lands the offset at exactly 0 — no
 * rounding, no seam, no `NaN`, because `circumference` is finite for every
 * finite size and `r` is floored at zero.
 */
function RingArcV4({
  cx,
  r,
  stroke,
  strokeWidth,
  circumference,
  ratio,
}: {
  cx: number;
  r: number;
  stroke: string;
  strokeWidth: number;
  circumference: number;
  ratio: number;
}): React.ReactElement {
  const offset = useChartValueV4(circumference * (1 - ratio));

  return (
    <AnimatedCircle
      cx={cx}
      cy={cx}
      r={r}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={circumference}
      strokeDashoffset={offset}
    />
  );
}

/**
 * **V4 progress ring** — a *mark*, not a figure, and the one component of the
 * radial family that deliberately takes none of §4.2's frame.
 *
 * Requires `react-native-svg` (§7 open question 6).
 *
 * §4.2 names it in the exception: "Marks-only components (`Sparkline`,
 * `MiniBar`, `ProgressRing` at small sizes) take none of this: they are a mark
 * inside someone else's figure." It goes in a row, a tile or a `StatCardV4`, so
 * a title and a legend hung off it would be a second figure frame inside the
 * caller's own. It still states its value in words — rule 6 is not waived for a
 * mark — through `accessibilityLabel`.
 *
 * Three fixes against the base.
 *
 * 1. **The track is chrome, not a border.** The base painted it `colors.border`
 *    — a hairline colour doing a track's job, which §3's third decision names
 *    as the bug. `palette.grid` is the derived chrome neutral, mixed from
 *    `onSurface` so it follows the scheme; `colors.border` is a single flat
 *    value and reads as a drawn edge around a hole rather than as the unfilled
 *    part of a measure.
 * 2. **The arc is a palette slot, not a semantic token.** `palette.series[0]`
 *    is the brand hue and the same colour a `SparklineV4` in the same card
 *    takes, which is the point of slot 1 sitting at `+0` rotation. `tone` is
 *    the only path to a status hue (§4.3), and it exists for a ring that
 *    genuinely means good or bad.
 * 3. **The thickness is derived.** See {@link RADIAL_THICKNESS_RATIO}.
 *
 * The empty state is `max <= 0`. The base returned a bare `<Text>` for it,
 * which §4.5 rules out — "never a bare string, never `null`" — and which
 * collapsed the layout the moment data was late.
 */
export function ProgressRingV4({
  value,
  max = 100,
  size = 120,
  thickness,
  tone,
  label,
  showValue = true,
  loading = false,
  emptyLabel,
  animate = true,
  accessibilityLabel,
  style,
}: ProgressRingV4Props): React.ReactElement {
  const { colors } = useXenitionTheme();
  const palette = useChartPaletteV4();

  const shell = (body: React.ReactNode): React.ReactElement => (
    <View
      style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}
    >
      {body}
    </View>
  );

  if (loading) return shell(<ChartLoadingV4 width={size} height={size} />);
  if (!Number.isFinite(max) || max <= 0) {
    return shell(<RadialEmptyV4 label={emptyLabel} width={size} height={size} />);
  }

  const clamped = Number.isFinite(value) ? Math.min(Math.max(value, 0), max) : 0;
  const ratio = clamped / max;
  const percent = Math.round(ratio * 100);

  const ringWidth =
    thickness === undefined || !Number.isFinite(thickness)
      ? radialThicknessV4(size)
      : Math.max(thickness, 0);
  // The stroke straddles the path, so the radius is inset by half of it or the
  // ring paints outside its own footprint.
  const r = Math.max((size - ringWidth) / 2, 0);
  const circumference = 2 * Math.PI * r;
  const stroke = tone === undefined ? chartSlotColor(palette, 0) : toneColorV4(colors, tone);
  const centre = label ?? (showValue ? `${percent}%` : undefined);

  return shell(
    <ChartRevealV4 animate={animate}>
      <View
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel ?? `Progress ring, ${percent}%`}
        style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
      >
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={palette.grid}
              strokeWidth={ringWidth}
            />
            {/*
              A zero-length dash under a round cap is a dot on some renderers
              and nothing on others, so "zero" would look like a small non-zero.
              Skipping the element is the one rendering every backend agrees on.
            */}
            {ratio > 0 ? (
              <RingArcV4
                cx={size / 2}
                r={r}
                stroke={stroke}
                strokeWidth={ringWidth}
                circumference={circumference}
                ratio={ratio}
              />
            ) : null}
          </G>
        </Svg>
        {centre === undefined ? null : (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ position: 'absolute' }}
          >
            <TextV4 size="lg" weight="semibold" numeric="tabular">
              {centre}
            </TextV4>
          </View>
        )}
      </View>
    </ChartRevealV4>
  );
}

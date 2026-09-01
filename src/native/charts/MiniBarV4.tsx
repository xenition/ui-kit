import * as React from 'react';
import { Animated, View, type StyleProp, type ViewStyle } from 'react-native';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { useXenitionTheme } from '../theme';
import { useChartPaletteV4 } from './internal-v4';
// From the peer-free mark, not from `LineChartV4`: a mini bar needs no SVG
// at all, and importing from the figure would pull `react-native-svg` into a
// component that has no use for it. See `SparklineV4`'s note.
import { seriesInkV4, useChartRevealV4, type ChartToneV4 } from './SparklineV4';

export interface MiniBarV4Props {
  /** Current value. */
  value: number;
  /** Value mapped to a full-width fill. Default `100`. */
  max?: number;
  /**
   * Which categorical slot the fill is painted from. Default `0` — the brand
   * hue itself, so a mini bar beside a stat matches the product rather than
   * introducing a colour of its own.
   */
  slot?: number;
  /**
   * Paint the fill with a **status** hue instead of its slot, because the
   * value genuinely means good or bad — budget overspend, an error rate. It
   * ships with a label from the figure the mark sits in, never colour alone
   * (brief §1 rule 3).
   */
  tone?: ChartToneV4;
  /**
   * Track height in px. Defaults to `spacing.sm` — the base's `6` is not on
   * any scale the kit owns, and brief §1 rule 1 makes no exception for a small
   * number. The prop stays, so a caller who needs 6 can still say 6.
   */
  height?: number;
  /** Show the loading placeholder at the mark's own footprint. */
  loading?: boolean;
  /** Play the entrance reveal. Default `true`. */
  animate?: boolean;
  /** How the value is spoken. Default `String`. */
  formatValue?: (value: number) => string;
  /** The spoken sentence. Derived when omitted (brief §1 rule 6). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * **V4 mini bar (native)** — a **mark**, not a figure: one slot, no title, no
 * legend, no axis (brief §5 Group A). It is what goes beside a number in a row
 * when the number alone does not say "of how much" — a quota, a budget, a
 * completion.
 *
 * ## What the base got wrong
 *
 * 1. **Colour was a semantic token.** `colors[color]` over the whole
 *    `SemanticColors` keyspace, which let a caller paint a neutral quota
 *    `warn` because it happened to be the fourth bar on the screen (§1 rules
 *    2–3). It takes slot 1, or a declared `tone`, and nothing else.
 * 2. **The track was `colors.border`.** A border is a *hairline* colour doing
 *    a chart-chrome job — the same defect brief §3.3 records against the axes
 *    the bases paint with `colors.muted`. The track is chrome, so it is
 *    `palette.grid`: `onSurface` at `CHART_GRID_MIX`, which follows the theme
 *    with no dark rule of its own.
 * 3. **`height = 6`.** Not on the spacing scale, so it defaults to
 *    `spacing.sm`.
 * 4. **`value / max` was half-guarded.** The base floored `max` at 1 and did
 *    **not** clamp the ratio, so a `NaN` value produced `width: "NaN%"` — a
 *    silently empty track with no error. That is the divide-by-zero class
 *    §4.5 asks every spec in this pass to assert against, and it is guarded at
 *    both ends here.
 *
 * ## Why both ends are round
 *
 * Brief §4.4 puts `CHART_MARK.endRadius` at the **data end only**, "because a
 * bar rounded at the baseline floats off its axis". That rule is about a bar
 * standing on an axis. A mini bar is a **meter**: a pill track with a pill
 * fill inside it, sharing an edge with the track rather than sitting on a
 * baseline — the shape the kit's progress controls already take. So the fill
 * is `radius.full` at both ends, and §4.4 is untouched where it applies.
 *
 * `react-native-svg` is **not** required: a pill is the one mark that is
 * better as a `View` than as an SVG, and this is one of the two components
 * brief §7 open question 6 exempts.
 */
export function MiniBarV4({
  value,
  max = 100,
  slot = 0,
  tone,
  height,
  loading = false,
  animate = true,
  formatValue = String,
  accessibilityLabel,
  style,
}: MiniBarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const palette = useChartPaletteV4();
  const reveal = useChartRevealV4(animate);

  const statusColors: Record<ChartToneV4, string> = {
    success: colors.success,
    warn: colors.warn,
    danger: colors.danger,
  };

  const bar = height ?? tokens.spacing.sm;
  const ceiling = Math.max(Number.isFinite(max) ? max : 1, 1);
  const raw = value / ceiling;
  const ratio = Number.isFinite(raw) ? Math.min(Math.max(raw, 0), 1) : 0;

  if (loading) {
    return (
      <View style={style}>
        <SkeletonV4 variant="rect" height={bar} />
      </View>
    );
  }

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? `${formatValue(value)} of ${formatValue(ceiling)}`}
      testID="minibar-track"
      style={[
        {
          height: bar,
          backgroundColor: palette.grid,
          borderRadius: tokens.radius.full,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        testID="minibar-fill"
        style={{
          opacity: reveal,
          width: `${ratio * 100}%`,
          height: '100%',
          backgroundColor: seriesInkV4(palette, statusColors, slot, tone),
          borderRadius: tokens.radius.full,
        }}
      />
    </View>
  );
}

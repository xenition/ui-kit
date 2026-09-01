import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ChartToneV4 } from './PieChartV4';
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
export declare const RADIAL_THICKNESS_RATIO = 0.1;
/**
 * The radial family's one ring thickness, shared by `ProgressRingV4`,
 * `GaugeChartV4` and `DonutChartV4`.
 *
 * Floored at `CHART_MARK.dotSize`, because a track thinner than the smallest
 * mark the line will paint has stopped being a track: it reads as a border and
 * the "this is a proportion" cue is gone.
 */
export declare function radialThicknessV4(size: number): number;
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
export declare function ProgressRingV4({ value, max, size, thickness, tone, label, showValue, loading, emptyLabel, animate, accessibilityLabel, style, }: ProgressRingV4Props): React.ReactElement;
//# sourceMappingURL=ProgressRingV4.d.ts.map
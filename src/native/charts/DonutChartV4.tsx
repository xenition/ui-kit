import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { CHART_MARK } from '../../primitives/internal/v4-chart';
import { TextV4 } from '../primitives/TextV4';
import { useXenitionTheme } from '../theme';
import { useChartPaletteV4 } from './internal-v4';
import {
  ChartFigureV4,
  ChartLoadingV4,
  ChartRevealV4,
  PIE_OTHER_LABEL,
  RadialEmptyV4,
  RadialLegendV4,
  annulusPathV4,
  coordV4,
  foldPieDataV4,
  segmentFillV4,
  segmentLegendLabelV4,
  shareOfV4,
  type PieDatumV4,
  type PieSegmentV4,
} from './PieChartV4';
import { radialThicknessV4 } from './ProgressRingV4';

export type { PieDatumV4 as DonutDatumV4 } from './PieChartV4';

export interface DonutChartV4Props {
  /** The segments. Six or more are sorted and folded into "Other". */
  data: readonly PieDatumV4[];
  /** Outer diameter in px, and the plot's whole footprint. Default 160. */
  size?: number;
  /**
   * Ring thickness **as a fraction of the outer radius**, `0` to `1`. Omit for
   * the family's derived thickness.
   *
   * The bases disagreed on what this prop meant: web took a fraction (`0.42`),
   * native took pixels (`32`), so the same number produced a hairline on one
   * twin and a solid disc on the other. That is the prop-parity break §1 rule 7
   * exists to close, and V4 closes it on the fraction — a thickness in pixels
   * does not survive a caller changing `size`.
   */
  thickness?: number;
  /** The descriptive headline. HIG's rule: say the takeaway. */
  title?: string;
  /**
   * The one loud number, drawn **in the hole** — §5's "donut's centre is a slot
   * for `summary`". Replaces the base's `centerLabel`.
   */
  summary?: string;
  /** The quiet line under the title. */
  caption?: string;
  /** Show the legend. Default `true` at two or more segments. */
  legend?: boolean;
  /** Swap the plot for a `SkeletonV4` at the same footprint. */
  loading?: boolean;
  /** The empty state's wording. */
  emptyLabel?: string;
  /** What the folded tail is called in the legend. Default `'Other'`. */
  otherLabel?: string;
  /** Run the entrance reveal. Default `true`; Reduce Motion shortens it. */
  animate?: boolean;
  /** Overrides the derived sentence (§1 rule 6). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * **V4 donut chart** — the pie's sibling, and the one radial form with a place
 * to put the number.
 *
 * Requires `react-native-svg` (§7 open question 6).
 *
 * Everything `PieChartV4` changed applies here for the same reasons: slots in
 * assignment order instead of a status arc, `CHART_MARK.gap` of page between
 * segments instead of nothing at all, and the "Other" fold at six or more
 * instead of the base's descending-opacity wrap. Three things are this
 * component's own.
 *
 * 1. **The hole is a slot, not a hole.** §5: "donut's centre is a slot for
 *    `summary`", and §3 puts the number ahead of the plot in the reading order
 *    because "the number is bigger than the chart is loud". A donut is the one
 *    form where those land in the same place. The base's `centerLabel` is
 *    retired — it took a raw string at `typography.scale.lg` on the heading
 *    face, a treatment nothing else in the kit used.
 * 2. **The hole is transparent.** The base drew full pie wedges and then
 *    painted a `colors.surface` circle over them, which works until the donut
 *    sits on a card, a tinted panel or an image — at which point a
 *    surface-coloured disc appears in the middle of the chart. It also meant
 *    the *single-segment* case punched its hole and the multi-segment case did
 *    not, so a filtered donut changed shape. V4 draws real annuli.
 * 3. **The thickness is derived.** `radialThicknessV4` is the family's one
 *    answer, shared with `GaugeChartV4` and `ProgressRingV4`.
 */
export function DonutChartV4({
  data,
  size = 160,
  thickness,
  title,
  summary,
  caption,
  legend,
  loading = false,
  emptyLabel,
  otherLabel = PIE_OTHER_LABEL,
  animate = true,
  accessibilityLabel,
  style,
}: DonutChartV4Props): React.ReactElement {
  const { colors } = useXenitionTheme();
  const palette = useChartPaletteV4();
  const fold = React.useMemo(() => foldPieDataV4(data, otherLabel), [data, otherLabel]);

  const frame = (plot: React.ReactNode, legendNode?: React.ReactNode): React.ReactElement => (
    <ChartFigureV4 title={title} caption={caption} legend={legendNode} style={style}>
      {plot}
    </ChartFigureV4>
  );

  if (loading) return frame(<ChartLoadingV4 width={size} height={size} />);
  if (fold.segments.length === 0 || fold.total <= 0) {
    return frame(<RadialEmptyV4 label={emptyLabel} width={size} height={size} />);
  }

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - CHART_MARK.gap / 2;
  const ringWidth =
    thickness === undefined || !Number.isFinite(thickness)
      ? radialThicknessV4(size)
      : Math.min(Math.max(thickness, 0), 1) * rOuter;
  const rInner = Math.max(rOuter - ringWidth, 0);

  const showLegend = legend ?? fold.segments.length > 1;
  const legendNode = showLegend ? (
    <RadialLegendV4
      items={fold.segments.map((segment, i) => ({
        label: segmentLegendLabelV4(segment),
        slot: i,
        ...(segment.tone === undefined ? {} : { tone: segment.tone }),
        value: `${shareOfV4(segment.value, fold.total)}%`,
      }))}
    />
  ) : undefined;

  const top = fold.segments.reduce((a, b) => (b.value > a.value ? b : a));
  const spoken =
    accessibilityLabel ??
    `Donut chart, ${fold.segments.length} segment${fold.segments.length === 1 ? '' : 's'}` +
      (summary === undefined ? '' : `, ${summary}`) +
      `, largest ${top.label} at ${shareOfV4(top.value, fold.total)}%` +
      (fold.foldedCount > 0
        ? `, ${fold.foldedCount} smaller categories folded into ${otherLabel}`
        : '');

  let angle = -Math.PI / 2;
  const only = fold.segments[0] as PieSegmentV4;
  // A whole ring is 360°, which an arc path cannot express: the two endpoints
  // coincide and nothing is drawn. Two full circles in one path with an
  // even-odd fill rule is the shape that survives it, and it keeps the hole
  // transparent — which the base's overpainted disc did not.
  const fullRing =
    `M${coordV4(cx)} ${coordV4(cy - rOuter)} A${coordV4(rOuter)} ${coordV4(rOuter)} 0 1 0 ${coordV4(cx)} ${coordV4(cy + rOuter)} ` +
    `A${coordV4(rOuter)} ${coordV4(rOuter)} 0 1 0 ${coordV4(cx)} ${coordV4(cy - rOuter)} Z ` +
    `M${coordV4(cx)} ${coordV4(cy - rInner)} A${coordV4(rInner)} ${coordV4(rInner)} 0 1 1 ${coordV4(cx)} ${coordV4(cy + rInner)} ` +
    `A${coordV4(rInner)} ${coordV4(rInner)} 0 1 1 ${coordV4(cx)} ${coordV4(cy - rInner)} Z`;

  return frame(
    <ChartRevealV4 animate={animate}>
      <View
        accessibilityRole="image"
        accessibilityLabel={spoken}
        style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
      >
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G>
            {fold.segments.length === 1 ? (
              <Path
                d={fullRing}
                fillRule="evenodd"
                fill={segmentFillV4(palette, colors, only, 0)}
              />
            ) : (
              fold.segments.map((segment, i) => {
                const a0 = angle;
                const a1 = angle + (segment.value / fold.total) * Math.PI * 2;
                angle = a1;
                return (
                  <Path
                    key={segment.label}
                    d={annulusPathV4(cx, cy, rOuter, rInner, a0, a1)}
                    fill={segmentFillV4(palette, colors, segment, i)}
                    stroke={palette.ring}
                    strokeWidth={CHART_MARK.gap}
                  />
                );
              })
            )}
          </G>
        </Svg>
        {summary === undefined ? null : (
          // Already spoken by the plot's own label, so the visible copy is
          // hidden rather than read out twice.
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ position: 'absolute' }}
          >
            <TextV4 size="2xl" weight="bold" numeric="tabular">
              {summary}
            </TextV4>
          </View>
        )}
      </View>
    </ChartRevealV4>,
    legendNode
  );
}

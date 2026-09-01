/**
 * `@xenition/ui/native/charts` — token-bound data-visualization components for
 * React Native. Two families live here: View/flex-based charts (bars, cells,
 * stacked rectangles) built from `View`/`Text` primitives, and SVG charts
 * (line/area/pie/donut/radar/gauge/ring/scatter) built on `react-native-svg`
 * (an optional peer dep). Both express series/intensity via theme colors +
 * opacity and never hardcode a hex.
 */

export { BarChart } from './BarChart';
export type { BarChartProps, ChartColor } from './BarChart';

export { ColumnChart } from './ColumnChart';
export type { ColumnChartProps, ColumnChartDatum, ColumnChartColor } from './ColumnChart';

export { MiniBar } from './MiniBar';
export type { MiniBarProps, MiniBarColor } from './MiniBar';

export { Sparkline } from './Sparkline';
export type { SparklineProps, SparklineColor } from './Sparkline';

export { StackedBar } from './StackedBar';
export type { StackedBarProps, StackedBarSegment, StackedBarColor } from './StackedBar';

export { Histogram } from './Histogram';
export type { HistogramProps, HistogramColor } from './Histogram';

export { Heatmap } from './Heatmap';
export type { HeatmapProps, HeatmapColor } from './Heatmap';

export { RangeBar } from './RangeBar';
export type { RangeBarProps, RangeBarColor } from './RangeBar';

export { TrendCard } from './TrendCard';
export type { TrendCardProps, TrendCardColor } from './TrendCard';

export { Legend } from './Legend';
export type { LegendProps, LegendItem, LegendColor } from './Legend';

export { ProgressBars } from './ProgressBars';
export type { ProgressBarsProps, ProgressBarsItem, ProgressBarsColor } from './ProgressBars';

export { ComparisonBars } from './ComparisonBars';
export type { ComparisonBarsProps, ComparisonBarsGroup, ComparisonBarsColor } from './ComparisonBars';

// SVG-based charts (require the optional `react-native-svg` peer dep).

export { LineChart } from './LineChart';
export type { LineChartProps, LineChartDatum, LineChartColor } from './LineChart';

export { AreaChart } from './AreaChart';
export type { AreaChartProps, AreaChartDatum, AreaChartColor } from './AreaChart';

export { PieChart } from './PieChart';
export type { PieChartProps, PieChartDatum, PieChartColor } from './PieChart';

export { DonutChart } from './DonutChart';
export type { DonutChartProps, DonutChartDatum, DonutChartColor } from './DonutChart';

export { RadarChart } from './RadarChart';
export type { RadarChartProps, RadarChartColor } from './RadarChart';

export { GaugeChart } from './GaugeChart';
export type { GaugeChartProps, GaugeChartColor } from './GaugeChart';

export { ProgressRing } from './ProgressRing';
export type { ProgressRingProps, ProgressRingColor } from './ProgressRing';

export { ScatterChart } from './ScatterChart';
export type { ScatterChartProps, ScatterPoint, ScatterChartColor } from './ScatterChart';

/* ------------------------------------------------------------------------ *
 * The V4 line
 *
 * Twenty components on the current design pattern, and the palette module
 * behind them. See `CHARTS-V4-BRIEF.md` for the pass, and
 * `primitives/internal/v4-chart.ts` for how the palette is derived and the
 * validator run that locked it.
 *
 * Exported explicitly rather than with `export *`, because several V4 files
 * legitimately re-export the same shared name (`ChartToneV4`,
 * `CHART_AREA_FILL_ALPHA`) so their own call sites keep working. A star export
 * would make those ambiguous.
 *
 * Everything except `SparklineV4` and `MiniBarV4` requires the optional
 * `react-native-svg` peer dep. Those two keep a `View` fallback, and they own
 * the helpers the SVG components import — never the other way round, because a
 * fallback that reaches into an SVG module throws on `require` in exactly the
 * app it exists for.
 * ------------------------------------------------------------------------ */

export {
  CHART_AREA_FILL_ALPHA,
  CHART_DIRECT_LABEL_MAX,
  CHART_MARK,
  CHART_OVERFLOW_LABEL,
  CHART_RAMP_STEPS,
  CHART_SCATTER_SERIES_CAP,
  CHART_SERIES_COUNT,
  foldChartSeries,
} from '../../primitives/internal/v4-chart';
export type {
  ChartFold,
  ChartIndicatorV4,
  ChartSeriesV4,
  ChartToneV4,
} from '../../primitives/internal/v4-chart';

export { ChartEmptyV4, chartSlotColor, useChartPaletteV4 } from './internal-v4';
export type { ChartPaletteV4 } from './internal-v4';

export { LineChartV4, CHART_AUTO_DOT_MAX } from './LineChartV4';
export type { LineChartV4Props, ChartFigureV4Props, ChartLegendItemV4 } from './LineChartV4';

export { AreaChartV4 } from './AreaChartV4';
export type { AreaChartV4Props } from './AreaChartV4';

export { SparklineV4, SPARKLINE_V4_HAS_SVG } from './SparklineV4';
export type { SparklineV4Props } from './SparklineV4';

export { TrendCardV4 } from './TrendCardV4';
export type { TrendCardV4Props, TrendCardV4Trend } from './TrendCardV4';

export { MiniBarV4 } from './MiniBarV4';
export type { MiniBarV4Props } from './MiniBarV4';

export { BarChartV4 } from './BarChartV4';
export type { BarChartV4Props, BarChartV4Tone, BarChartV4Indicator } from './BarChartV4';

export { ColumnChartV4 } from './ColumnChartV4';
export type { ColumnChartV4Props, ColumnChartV4Datum, ColumnChartV4Tone } from './ColumnChartV4';

export { HistogramV4 } from './HistogramV4';
export type { HistogramV4Props, HistogramV4Tone } from './HistogramV4';

export { StackedBarV4 } from './StackedBarV4';
export type { StackedBarV4Props, StackedBarV4Segment, StackedBarV4Tone } from './StackedBarV4';

export { RangeBarV4 } from './RangeBarV4';
export type { RangeBarV4Props, RangeBarV4Tone } from './RangeBarV4';

export { PieChartV4, PIE_OTHER_LABEL, foldPieDataV4 } from './PieChartV4';
export type { PieChartV4Props, PieDatumV4, PieSegmentV4, PieFoldV4 } from './PieChartV4';

export { DonutChartV4 } from './DonutChartV4';
export type { DonutChartV4Props } from './DonutChartV4';

export { GaugeChartV4 } from './GaugeChartV4';
export type { GaugeChartV4Props } from './GaugeChartV4';

export { ProgressRingV4, radialThicknessV4 } from './ProgressRingV4';
export type { ProgressRingV4Props } from './ProgressRingV4';

export { RadarChartV4, RADAR_SERIES_CAP } from './RadarChartV4';
export type { RadarChartV4Props } from './RadarChartV4';

export { HeatmapV4, HEATMAP_V4_TAP_MIN } from './HeatmapV4';
export type { HeatmapV4Props, HeatmapV4Cell } from './HeatmapV4';

export { ScatterChartV4 } from './ScatterChartV4';
export type { ScatterChartV4Props, ScatterPointV4, ScatterSeriesV4 } from './ScatterChartV4';

export { ComparisonBarsV4 } from './ComparisonBarsV4';
export type {
  ComparisonBarsV4Props,
  ComparisonBarsV4Group,
  ComparisonBarsV4Series,
} from './ComparisonBarsV4';

export { ProgressBarsV4 } from './ProgressBarsV4';
export type { ProgressBarsV4Props, ProgressBarsV4Item } from './ProgressBarsV4';

export { LegendV4 } from './LegendV4';
export type { LegendV4Props, LegendV4Item, LegendV4Tone } from './LegendV4';

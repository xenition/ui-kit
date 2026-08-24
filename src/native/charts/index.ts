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

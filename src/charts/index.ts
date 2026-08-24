/**
 * `@xenition/ui/charts` — inline-SVG, token-bound data-visualization components
 * for React DOM. Every fill/stroke references a `--xen-*` CSS custom property
 * (or a token class); no literal colors and no charting dependency. This is the
 * web parity of `@xenition/ui/native/charts`.
 */

export { ChartEmpty, colorVar, seriesColor, SERIES } from './internal';
export type { ChartColor } from './internal';

export { LineChart } from './LineChart';
export type { LineChartProps } from './LineChart';

export { AreaChart } from './AreaChart';
export type { AreaChartProps } from './AreaChart';

export { BarChart } from './BarChart';
export type { BarChartProps } from './BarChart';

export { ColumnChart } from './ColumnChart';
export type { ColumnChartProps, ColumnChartDatum } from './ColumnChart';

export { PieChart } from './PieChart';
export type { PieChartProps, PieDatum } from './PieChart';

export { DonutChart } from './DonutChart';
export type { DonutChartProps } from './DonutChart';

export { RadarChart } from './RadarChart';
export type { RadarChartProps } from './RadarChart';

export { GaugeChart } from './GaugeChart';
export type { GaugeChartProps } from './GaugeChart';

export { ProgressRing } from './ProgressRing';
export type { ProgressRingProps } from './ProgressRing';

export { ScatterChart } from './ScatterChart';
export type { ScatterChartProps, ScatterPoint } from './ScatterChart';

export { Sparkline } from './Sparkline';
export type { SparklineProps } from './Sparkline';

export { StackedBar } from './StackedBar';
export type { StackedBarProps, StackedBarSegment } from './StackedBar';

export { Histogram } from './Histogram';
export type { HistogramProps } from './Histogram';

export { Heatmap } from './Heatmap';
export type { HeatmapProps } from './Heatmap';

export { TrendCard } from './TrendCard';
export type { TrendCardProps } from './TrendCard';

export { Legend } from './Legend';
export type { LegendProps, LegendItem } from './Legend';

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHARTS_V4_SHARED = exports.CHARTS_V4_ROSTER = void 0;
/**
 * The twenty components the V4 charts line ships, by name.
 *
 * This exists so the two barrel specs check the **same** list. Jest runs web
 * and native as separate projects — a web spec cannot import `react-native`
 * and a native spec cannot import the web adapter — so parity cannot be
 * asserted inside one file. Two specs reading one roster is the next best
 * thing, and it is what makes "the same twenty on both twins" a real check
 * rather than two lists that happen to agree today.
 *
 * Typed out rather than globbed from the directory, on purpose. A test that
 * enumerates `*V4.tsx` and asserts each file is exported passes trivially the
 * day someone deletes a file. Adding the twenty-first component means adding
 * it here.
 */
exports.CHARTS_V4_ROSTER = [
    'AreaChartV4',
    'BarChartV4',
    'ColumnChartV4',
    'ComparisonBarsV4',
    'DonutChartV4',
    'GaugeChartV4',
    'HeatmapV4',
    'HistogramV4',
    'LegendV4',
    'LineChartV4',
    'MiniBarV4',
    'PieChartV4',
    'ProgressBarsV4',
    'ProgressRingV4',
    'RadarChartV4',
    'RangeBarV4',
    'ScatterChartV4',
    'SparklineV4',
    'StackedBarV4',
    'TrendCardV4',
];
/** The shared vocabulary an app needs without reaching into `primitives/internal`. */
exports.CHARTS_V4_SHARED = [
    'CHART_MARK',
    'CHART_SERIES_COUNT',
    'CHART_SCATTER_SERIES_CAP',
    'CHART_OVERFLOW_LABEL',
    'foldChartSeries',
];
//# sourceMappingURL=v4-roster.js.map
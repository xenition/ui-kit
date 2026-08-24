"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeMax = exports.clamp01 = exports.seriesColor = exports.SERIES = exports.colorVar = void 0;
exports.ChartEmpty = ChartEmpty;
const jsx_runtime_1 = require("react/jsx-runtime");
/** CSS custom-property reference for a chart color token. */
const colorVar = (c) => `var(--xen-${c})`;
exports.colorVar = colorVar;
/**
 * Series color cycle (token vars only). Multi-series charts index into this and
 * additionally vary opacity, so no literal colors are ever introduced.
 */
exports.SERIES = ['primary', 'accent', 'success', 'warn', 'danger'];
/** Token var for the i-th series, wrapping the cycle and guarding the index. */
const seriesColor = (i) => {
    const n = exports.SERIES.length;
    const key = exports.SERIES[((i % n) + n) % n] ?? 'primary';
    return (0, exports.colorVar)(key);
};
exports.seriesColor = seriesColor;
/**
 * Shared empty-state — rendered by every chart when handed no data. Uses the
 * `text-muted` token class (no literal color).
 */
function ChartEmpty({ label = 'No data' }) {
    return (0, jsx_runtime_1.jsx)("span", { className: "text-muted text-sm", children: label });
}
/** Clamp a ratio into `[0, 1]`, treating NaN as 0. */
const clamp01 = (n) => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);
exports.clamp01 = clamp01;
/** Largest finite value in a list, floored at 1 so it is safe as a divisor. */
const safeMax = (values, override) => Math.max(override ?? (values.length > 0 ? Math.max(...values) : 1), 1);
exports.safeMax = safeMax;
//# sourceMappingURL=internal.js.map
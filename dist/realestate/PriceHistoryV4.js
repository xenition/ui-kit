"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceHistoryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const internal_1 = require("../charts/internal");
const CHART_W = 240;
/**
 * PriceHistory — **V4** "listing" design (web parity of the native V4). The
 * editorial, price-forward take on a listing's price-over-time card: the
 * **latest price big**, the net change from the first point (tinted `success`
 * up / `danger` down / `muted` flat), and a token-colored line/area chart of the
 * series with a dot on every point (the event markers). Same props/behavior as
 * {@link PriceHistoryProps} — guards empty input with a muted note and never
 * indexes an empty array. All colors from `--xen-*` token vars/classes (no
 * literals); money uses the shared `formatMoney`.
 */
exports.PriceHistoryV4 = React.forwardRef(function PriceHistoryV4({ points, currency = 'USD', title = 'Price history', chartHeight = 48, className, ...rest }, ref) {
    const shell = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: title }), children] }));
    if (points.length === 0) {
        return shell((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No price history" }));
    }
    const first = points[0];
    const last = points[points.length - 1];
    const delta = last.cents - first.cents;
    const trendClass = delta > 0 ? 'text-success' : delta < 0 ? 'text-danger' : 'text-muted';
    const arrow = delta > 0 ? '▲' : delta < 0 ? '▼' : '→';
    const pct = first.cents !== 0 ? Math.round((delta / first.cents) * 100) : 0;
    const chartColor = (0, internal_1.colorVar)(delta >= 0 ? 'success' : 'danger');
    const series = points.map((p) => p.cents);
    const hi = Math.max(...series);
    const lo = Math.min(...series);
    const range = hi - lo || 1;
    const pad = 3;
    const h = chartHeight;
    const pts = series.map((v, i) => {
        const x = series.length === 1 ? CHART_W / 2 : pad + (i / (series.length - 1)) * (CHART_W - pad * 2);
        const y = h - pad - ((v - lo) / range) * (h - pad * 2);
        return { x, y };
    });
    const line = pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    const area = `${pad},${h} ${line} ${(CHART_W - pad).toFixed(2)},${h}`;
    return shell((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-surface", children: (0, commerce_1.formatMoney)(last.cents, currency) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', trendClass), children: `${arrow} ${Math.abs(pct)}%` })] }), (0, jsx_runtime_1.jsxs)("svg", { viewBox: `0 0 ${CHART_W} ${h}`, width: "100%", height: h, preserveAspectRatio: "none", role: "img", "aria-label": `Price history chart, ${points.length} points, ${delta >= 0 ? 'up' : 'down'} ${Math.abs(pct)} percent`, className: "w-full", children: [series.length > 1 ? ((0, jsx_runtime_1.jsx)("polygon", { points: area, fill: chartColor, fillOpacity: 0.12, stroke: "none" })) : null, series.length === 1 ? ((0, jsx_runtime_1.jsx)("circle", { cx: pts[0].x, cy: pts[0].y, r: 3, fill: chartColor })) : ((0, jsx_runtime_1.jsx)("polyline", { points: line, fill: "none", stroke: chartColor, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" })), pts.map((p, i) => ((0, jsx_runtime_1.jsx)("circle", { cx: p.x, cy: p.y, r: 2.5, fill: chartColor }, i)))] }), last.label || first.label ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: first.label ?? '' }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: last.label ?? '' })] })) : null] }));
});
//# sourceMappingURL=PriceHistoryV4.js.map
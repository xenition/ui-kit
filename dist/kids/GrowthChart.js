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
exports.GrowthChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const commerce_1 = require("../commerce");
const METRIC_META = {
    height: { glyph: '📏', label: 'Height' },
    weight: { glyph: '⚖️', label: 'Weight' },
    head: { glyph: '🧢', label: 'Head circumference' },
    other: { glyph: '📈', label: 'Growth' },
};
/** Chart color tokens that also map to an `Icon` color slot (all but `accent`). */
const ICON_COLOR = {
    primary: 'primary',
    accent: 'primary',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
    muted: 'muted',
};
/**
 * A child's growth curve — a titled {@link Card} wrapping the shared
 * {@link LineChart} with a latest-value + percentile readout. Reuses the charts
 * module rather than re-plotting. Renders the shared {@link EmptyState} when
 * `data` is empty. Token-bound throughout — no literal colors.
 */
exports.GrowthChart = React.forwardRef(function GrowthChart({ data, metric = 'height', unit, percentile, color = 'primary', height = 160, loading = false, emptyLabel = 'No measurements logged yet', className, ...rest }, ref) {
    const meta = METRIC_META[metric] ?? METRIC_META.other;
    const series = Array.isArray(data) ? data : [];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "data-xen-growth-chart": "", "aria-label": "Loading growth chart", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "w-full animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200", style: { height } })] }) }));
    }
    if (series.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "data-xen-growth-chart": "", "aria-label": emptyLabel, className: className, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDCC9" }), title: `${meta.glyph} ${meta.label}`, description: emptyLabel, ...rest }));
    }
    const latest = series[series.length - 1];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-growth-chart": "", "aria-label": `${meta.label} growth${latest !== undefined ? `, latest ${latest}${unit ? ` ${unit}` : ''}` : ''}${percentile ? `, ${percentile}` : ''}`, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-base font-bold text-on-surface", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "base", color: ICON_COLOR[color] }), " ", meta.label] }), latest !== undefined ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-lg font-extrabold text-primary", children: [latest, unit ? ` ${unit}` : ''] })) : null] }), percentile ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: percentile }) : null, (0, jsx_runtime_1.jsx)("div", { className: "mt-3", children: (0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: series, color: color, height: height, showDots: true, "aria-label": `${meta.label} over time` }) })] }));
});
//# sourceMappingURL=GrowthChart.js.map
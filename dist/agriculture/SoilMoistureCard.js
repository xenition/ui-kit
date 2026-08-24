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
exports.SoilMoistureCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const STATUS_META = {
    dry: { label: 'Dry', text: 'text-warn', icon: 'warn', chart: 'warn', tone: 'warn', progress: 'warn' },
    optimal: {
        label: 'Optimal',
        text: 'text-success',
        icon: 'success',
        chart: 'success',
        tone: 'success',
        progress: 'success',
    },
    wet: {
        label: 'Saturated',
        text: 'text-primary',
        icon: 'primary',
        chart: 'primary',
        tone: 'primary',
        progress: 'primary',
    },
};
function deriveStatus(moisture) {
    if (moisture < 30)
        return 'dry';
    if (moisture > 70)
        return 'wet';
    return 'optimal';
}
/**
 * A soil-moisture panel — a titled {@link Card} showing the current percent
 * (colored by band and paired with a text {@link Badge}, never color alone), a
 * fill {@link Progress}, an optional companion soil-temperature reading, and a
 * recent {@link LineChart} trend. The moisture value is clamped to [0,100] and
 * `status` defaults to a threshold-derived band. An empty `trend` simply omits
 * the chart. Token-bound throughout — no literal colors.
 */
exports.SoilMoistureCard = React.forwardRef(function SoilMoistureCard({ moisture, label, status, trend, soilTemp, title = 'Soil moisture', chartHeight = 90, className, ...rest }, ref) {
    const pct = typeof moisture === 'number' ? Math.max(0, Math.min(100, moisture)) : undefined;
    const band = status ?? (pct != null ? deriveStatus(pct) : 'optimal');
    const meta = STATUS_META[band];
    const series = Array.isArray(trend) ? trend : [];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-soil-moisture-card": "", className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCA7", color: meta.icon, size: "base" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading text-3xl font-bold', meta.text), children: pct != null ? `${pct}` : '—' }), pct != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-base text-muted", children: "%" }) : null, soilTemp != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "ml-2 text-sm text-muted", children: ["\uD83C\uDF21\uFE0F ", soilTemp] })) : null] }), label != null ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-xs text-muted", children: label }) : null, pct != null ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-2", children: (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: meta.progress }) })) : null, series.length > 1 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-3", children: (0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: series, height: chartHeight, color: meta.chart, "aria-label": `${title} trend, ${series.length} samples` }) })) : null] }));
});
//# sourceMappingURL=SoilMoistureCard.js.map
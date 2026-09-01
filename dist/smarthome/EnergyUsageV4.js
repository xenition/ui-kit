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
exports.EnergyUsageV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const BarChart_1 = require("../charts/BarChart");
/**
 * Trend of a usage series — compares the first vs last samples. For **usage**,
 * rising is bad: `up`→danger, `down`→success, `flat`→muted. Returned meaning is
 * always carried by an arrow glyph + label, never color alone.
 */
function usageTrend(data) {
    if (data.length < 2)
        return null;
    const first = data[0];
    const last = data[data.length - 1];
    if (last > first)
        return { glyph: '↑', label: 'Up', color: 'danger' };
    if (last < first)
        return { glyph: '↓', label: 'Down', color: 'success' };
    return { glyph: '→', label: 'Flat', color: 'muted' };
}
const TREND_TEXT = {
    danger: 'text-danger',
    success: 'text-success',
    muted: 'text-muted',
};
/**
 * EnergyUsage — **V4** "ambient" design (web parity of the native V4). The calm
 * take on an energy panel: a **big kWh/cost numeral** leads, a **trend
 * indicator** reads the series (rising usage → danger, falling → success, by
 * arrow + label so it is legible without color), a soft breakdown
 * {@link BarChart} keeps the base's per-period data, and the `title` sits as the
 * period caption. When `data` is empty the card shows a muted "No usage data
 * yet" line instead of an axis. Same props/behavior as {@link EnergyUsageProps};
 * all colors from `--xen-*` token classes (no literals).
 */
exports.EnergyUsageV4 = React.forwardRef(function EnergyUsageV4({ data, labels, title = 'Energy usage', total, unit, color = 'primary', height = 120, className, style, ...rest }, ref) {
    const hasData = data.length > 0;
    const barColor = color === 'accent' ? 'primary' : color;
    const trend = usageTrend(data);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border border-primary/40 bg-primary/[0.12]", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u26A1", color: "primary", size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [total != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-3xl font-extrabold leading-none text-on-surface", children: String(total) }), unit != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-base text-muted", children: unit }) : null] })) : null, (0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-xs)] truncate text-xs text-muted", children: title })] }), trend != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex shrink-0 items-center gap-1 text-sm font-semibold', TREND_TEXT[trend.color]), "aria-label": `Trend ${trend.label}`, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: trend.glyph }), trend.label] })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)]", children: hasData ? ((0, jsx_runtime_1.jsx)(BarChart_1.BarChart, { data: data, labels: labels, height: height, color: barColor, "aria-label": `${title}, ${data.length} periods` })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No usage data yet" })) })] }));
});
//# sourceMappingURL=EnergyUsageV4.js.map
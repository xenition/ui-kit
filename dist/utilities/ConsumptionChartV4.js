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
exports.ConsumptionChartV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * ConsumptionChart — **V4** design. A clean, elevated card that **reuses** the
 * same token-bound `BarChart` / `LineChart` primitives (same data, same series
 * color) rather than drawing its own geometry. A refined header pairs the kind
 * glyph in the signature brand-gradient disc with a derived period total (via
 * `formatUsage`, so it never renders `NaN`) and a small legend. Preserves the
 * loading skeleton and the empty state. Same props/behavior as
 * {@link ConsumptionChartProps}; token-only colors.
 */
exports.ConsumptionChartV4 = React.forwardRef(function ConsumptionChartV4({ kind, data, variant = 'bar', unit, decimals = 0, title, height = 140, loading = false, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    const points = Array.isArray(data) ? data : [];
    const heading = title ?? `${kd.label} usage`;
    const cardClass = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(cardClass, className), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { "aria-busy": "true", "aria-label": "Loading usage chart", className: "flex flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100", style: { height } })] }) }));
    }
    const values = points.map((p) => (Number.isFinite(p.value) ? Math.max(0, p.value) : 0));
    const labels = points.map((p) => p.label);
    const total = values.reduce((sum, v) => sum + v, 0);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(cardClass, className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-[var(--xen-space-md)] flex items-center justify-between gap-[var(--xen-space-md)]", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "lg", color: "onPrimary", "aria-label": `${kd.label} usage` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: heading }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Total ", (0, format_1.formatUsage)(total, u, decimals)] })] })] }) }), points.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No usage recorded yet." })) : variant === 'line' ? ((0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: values, height: height, color: "primary", "aria-label": `${heading} line chart, ${points.length} periods, total ${(0, format_1.formatUsage)(total, u, decimals)}` })) : ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: values, labels: labels, height: height, color: "primary", "aria-label": `${heading} bar chart, ${points.length} periods, total ${(0, format_1.formatUsage)(total, u, decimals)}` })), points.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-primary" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [kd.label, " usage (", u, ")"] })] })) : null] }));
});
//# sourceMappingURL=ConsumptionChartV4.js.map
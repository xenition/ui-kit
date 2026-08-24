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
exports.ConsumptionChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * A consumption-over-time chart card that **reuses** the token-bound `BarChart` /
 * `LineChart` primitives rather than drawing its own geometry. It derives the
 * period total from the data (via `formatUsage`, so it never renders `NaN`),
 * renders an accessible summary, and degrades to an inline empty message when
 * there are no points (guarded indexing throughout). Every color traces to a
 * `--xen-*` token — the charts express series via theme color keys, never a
 * literal. Web parity of the native `ConsumptionChart`.
 */
exports.ConsumptionChart = React.forwardRef(function ConsumptionChart({ kind, data, variant = 'bar', unit, decimals = 0, title, height = 140, loading = false, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    const points = Array.isArray(data) ? data : [];
    const heading = title ?? `${kd.label} usage`;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { "aria-busy": "true", "aria-label": "Loading usage chart", className: "flex flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100", style: { height } })] }) }));
    }
    const values = points.map((p) => (Number.isFinite(p.value) ? Math.max(0, p.value) : 0));
    const labels = points.map((p) => p.label);
    const total = values.reduce((sum, v) => sum + v, 0);
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-[var(--xen-space-md)] flex items-end justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: heading }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Total ", (0, format_1.formatUsage)(total, u, decimals)] })] }), points.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No usage recorded yet." })) : variant === 'line' ? ((0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: values, height: height, color: "primary", "aria-label": `${heading} line chart, ${points.length} periods, total ${(0, format_1.formatUsage)(total, u, decimals)}` })) : ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: values, labels: labels, height: height, color: "primary", "aria-label": `${heading} bar chart, ${points.length} periods, total ${(0, format_1.formatUsage)(total, u, decimals)}` }))] }));
});
//# sourceMappingURL=ConsumptionChart.js.map
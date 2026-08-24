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
exports.DealForecast = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const commerce_1 = require("../commerce");
/**
 * Revenue forecast block — a header with the summed pipeline total (and, when a
 * `targetCents` is given, attainment vs quota) over a reused {@link BarChart} of
 * per-period amounts. Values are integer cents formatted via `formatMoney`; the
 * bar heights are relative so the raw cents map straight to the chart. Renders
 * an empty placeholder for a zero-length series. Bar/text colors are `--xen-*`
 * token classes (`color` is a `ChartColor` token key) — no literals.
 */
exports.DealForecast = React.forwardRef(function DealForecast({ periods, title = 'Forecast', currency = 'USD', targetCents, color = 'primary', height = 128, emptyLabel = 'No forecast data', className, ...rest }, ref) {
    const total = periods.reduce((sum, p) => sum + (Number.isFinite(p.valueCents) ? p.valueCents : 0), 0);
    const attainment = targetCents && targetCents > 0 ? Math.round((total / targetCents) * 100) : undefined;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-muted", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-on-surface", children: (0, commerce_1.formatMoney)(total, currency) })] }), attainment != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "vs target" }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-base font-bold', attainment >= 100 ? 'text-success' : 'text-on-surface'), children: [attainment, "%"] })] })) : null] }), periods.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "py-[var(--xen-space-lg)] text-center text-sm text-muted", children: emptyLabel })) : ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: periods.map((p) => (Number.isFinite(p.valueCents) ? p.valueCents : 0)), labels: periods.map((p) => p.label), color: color, height: height, "aria-label": `Forecast across ${periods.length} periods, total ${(0, commerce_1.formatMoney)(total, currency)}` }))] }));
});
//# sourceMappingURL=DealForecast.js.map
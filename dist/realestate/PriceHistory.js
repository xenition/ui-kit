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
exports.PriceHistory = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const charts_1 = require("../charts");
/**
 * Web parity of the native `PriceHistory`: a listing's price-over-time card —
 * the latest price, the net change from the first point (tinted `success` up /
 * `danger` down / `muted` flat), and a token-bound {@link Sparkline} of the
 * trend. Presentational: cents in, nothing fetches. Guards empty input with a
 * muted note and never indexes an empty array. All colors come from the `--xen-*`
 * tokens — no literal colors.
 */
exports.PriceHistory = React.forwardRef(function PriceHistory({ points, currency = 'USD', title = 'Price history', chartHeight = 48, className, ...rest }, ref) {
    const shell = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2 border border-border bg-surface p-[var(--xen-space-lg)]', 'rounded-[var(--xen-radius-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: title }), children] }));
    if (points.length === 0) {
        return shell((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No price history" }));
    }
    const first = points[0];
    const last = points[points.length - 1];
    const delta = last.cents - first.cents;
    const trendClass = delta > 0 ? 'text-success' : delta < 0 ? 'text-danger' : 'text-muted';
    const arrow = delta > 0 ? '▲' : delta < 0 ? '▼' : '→';
    const pct = first.cents !== 0 ? Math.round((delta / first.cents) * 100) : 0;
    const sparkColor = delta >= 0 ? 'success' : 'danger';
    return shell((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-on-surface", children: (0, commerce_1.formatMoney)(last.cents, currency) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', trendClass), children: `${arrow} ${Math.abs(pct)}%` })] }), (0, jsx_runtime_1.jsx)(charts_1.Sparkline, { data: points.map((p) => p.cents), height: chartHeight, width: 220, color: sparkColor, className: "w-full", "aria-label": `Price history sparkline, ${points.length} points, ${delta >= 0 ? 'up' : 'down'} ${Math.abs(pct)} percent` }), last.label || first.label ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: first.label ?? '' }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: last.label ?? '' })] })) : null] }));
});
//# sourceMappingURL=PriceHistory.js.map
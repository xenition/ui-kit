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
exports.CSATResultCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/** Breakdown bar rows — positive→success, neutral→warn, negative→danger. */
const BREAKDOWN = [
    { key: 'positive', label: 'Positive', bar: 'bg-success' },
    { key: 'neutral', label: 'Neutral', bar: 'bg-warn' },
    { key: 'negative', label: 'Negative', bar: 'bg-danger' },
];
/**
 * CSATResultCard — a gradient "console" results hero for a customer-satisfaction
 * score. The title and a big near-white `score%` numeral sit over a
 * `from-primary-500 to-primary-700` ground, above the response count. A
 * positive/neutral/negative breakdown reads as three token bars
 * (success/warn/danger) whose widths are the share of the total raw counts, each
 * on a frosted track (`bg-primary-50/15`). A calm peak-moment surface,
 * dark-mode safe, every color from the brand + semantic ramps (token-only, no
 * literals). Presentational — shaped counts only, nothing fetches.
 */
exports.CSATResultCard = React.forwardRef(function CSATResultCard({ score, responses, positive, neutral, negative, title = 'Customer satisfaction', className, ...rest }, ref) {
    const pct = Math.round((0, internal_1.clamp)(score, 0, 100));
    const p = Math.max(0, Math.trunc(positive || 0));
    const n = Math.max(0, Math.trunc(neutral || 0));
    const g = Math.max(0, Math.trunc(negative || 0));
    const total = p + n + g;
    const counts = {
        positive: p,
        neutral: n,
        negative: g,
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-100", children: title }), (0, jsx_runtime_1.jsxs)("span", { "aria-label": `${pct} percent satisfaction`, className: "text-5xl font-extrabold leading-none tracking-tight text-primary-50", children: [pct, (0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold", children: "%" })] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-primary-100", children: [responses, " ", responses === 1 ? 'response' : 'responses'] })] }), (0, jsx_runtime_1.jsx)("dl", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: BREAKDOWN.map(({ key, label, bar }) => {
                    const count = counts[key];
                    const width = total > 0 ? Math.round((count / total) * 100) : 0;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("dt", { className: "w-16 shrink-0 text-sm font-semibold text-primary-100", children: label }), (0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": `${label} ${count} of ${total}`, className: "h-2 flex-1 overflow-hidden rounded-full bg-primary-50/15", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', bar), style: { width: `${width}%` } }) }), (0, jsx_runtime_1.jsx)("dd", { className: "w-10 shrink-0 text-right text-sm font-bold text-primary-50", children: count })] }, key));
                }) })] }));
});
//# sourceMappingURL=CSATResultCard.js.map
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
exports.NPSResultCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * NPSResultCard — the survey's NPS **results hero** (V4 "focus" line). The big
 * computed score (`-100`..`100`) sits on a brand gradient ground
 * (`bg-gradient-to-br from-primary-500 to-primary-700`) in near-white ink
 * (`text-primary-50` / `text-primary-100`) with the response count as a frosted
 * caption. Below, a calm surface footer breaks the responses down into three
 * token bars — promoter→success, passive→warn, detractor→danger — each a
 * proportional fill with its raw count, so meaning is never color-only.
 * `promoters` / `passives` / `detractors` are **counts** (not percentages).
 * Presentational only. All colors from `--xen-*` token classes + gradient
 * utilities (no literal colors), dark-mode safe.
 */
exports.NPSResultCard = React.forwardRef(function NPSResultCard({ score, responses, promoters, passives, detractors, title = 'Net Promoter Score', className, ...rest }, ref) {
    const clamped = Math.max(-100, Math.min(100, Math.round(score)));
    const displayScore = clamped > 0 ? `+${clamped}` : `${clamped}`;
    const total = Math.max(0, promoters) + Math.max(0, passives) + Math.max(0, detractors);
    const pct = (n) => (total > 0 ? Math.round((Math.max(0, n) / total) * 100) : 0);
    const segments = [
        { key: 'promoter', label: 'Promoters', count: promoters, bar: 'bg-success', dot: 'bg-success' },
        { key: 'passive', label: 'Passives', count: passives, bar: 'bg-warn', dot: 'bg-warn' },
        { key: 'detractor', label: 'Detractors', count: detractors, bar: 'bg-danger', dot: 'bg-danger' },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-nps-result": "", className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold uppercase tracking-wide text-primary-100", children: title }), (0, jsx_runtime_1.jsx)("p", { "aria-label": `${title}: ${displayScore}`, className: "mt-[var(--xen-space-xs)] text-6xl font-extrabold tracking-tight text-primary-50", children: displayScore }), (0, jsx_runtime_1.jsxs)("span", { className: "mt-[var(--xen-space-sm)] rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-0.5 text-xs font-semibold text-primary-100", children: [responses, " ", responses === 1 ? 'response' : 'responses'] })] }), (0, jsx_runtime_1.jsx)("div", { role: "list", "aria-label": "Response breakdown", className: "flex flex-col gap-sm p-[var(--xen-space-lg)]", children: segments.map((s) => ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", "aria-label": `${s.label}: ${s.count}, ${pct(s.count)}%`, className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs text-sm font-semibold text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-2.5 w-2.5 rounded-full', s.dot) }), s.label] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-bold text-on-surface", children: [Math.max(0, s.count), " \u00B7 ", pct(s.count), "%"] })] }), (0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuenow": pct(s.count), "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": `${s.label} share`, className: "h-2 w-full overflow-hidden rounded-full bg-on-surface/10", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', s.bar), style: { width: `${pct(s.count)}%` } }) })] }, s.key))) })] }));
});
//# sourceMappingURL=NPSResultCard.js.map
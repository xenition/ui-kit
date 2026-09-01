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
exports.UsageComparison = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * This period vs last (web parity) — the clean, trust-first usage card: the
 * utility glyph in a small brand-gradient disc, the current quantity big
 * (`formatUsage`), and a delta chip that spells out the change in **words + an
 * arrow** (never color alone): more usage reads `warn` (⬆), less reads `success`
 * (⬇), equal is muted. Two thin bars compare current against previous by ratio.
 * Token-only colors.
 */
exports.UsageComparison = React.forwardRef(function UsageComparison({ kind, current, previous, unit, period = 'last period', decimals = 0, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    const cur = Number.isFinite(current) ? current : 0;
    const prev = Number.isFinite(previous) ? previous : 0;
    const pct = prev > 0 ? ((cur - prev) / prev) * 100 : cur > 0 ? 100 : 0;
    const direction = cur > prev ? 'more' : cur < prev ? 'less' : 'same';
    const deltaTone = direction === 'more'
        ? { chip: 'bg-warn/10 text-warn', arrow: '⬆', word: 'more' }
        : direction === 'less'
            ? { chip: 'bg-success/10 text-success', arrow: '⬇', word: 'less' }
            : { chip: 'bg-neutral-100 text-muted', arrow: '→', word: 'same as' };
    const max = Math.max(cur, prev, 1);
    const curRatio = (0, format_1.clamp)(cur / max, 0, 1);
    const prevRatio = (0, format_1.clamp)(prev / max, 0, 1);
    const deltaLabel = direction === 'same' ? `Same as ${period}` : `${(0, format_1.formatPct)(Math.abs(pct))} ${deltaTone.word} than ${period}`;
    const Bar = ({ label, value, ratio, strong }) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-on-surface", children: (0, format_1.formatUsage)(value, u, decimals) })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', strong ? 'bg-primary' : 'bg-primary/40'), style: { width: `${ratio * 100}%` } }) })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${kd.label} usage, ${(0, format_1.formatUsage)(cur, u, decimals)}, ${deltaLabel}`, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, color: "onPrimary", size: "xl", "aria-label": `${kd.label} usage` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [kd.label, " this period"] }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-on-surface", children: (0, format_1.formatUsage)(cur, u, decimals) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('mt-[var(--xen-space-md)] inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', deltaTone.chip), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: deltaTone.arrow }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold", children: deltaLabel })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex flex-col gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Bar, { label: "This period", value: cur, ratio: curRatio, strong: true }), (0, jsx_runtime_1.jsx)(Bar, { label: period, value: prev, ratio: prevRatio, strong: false })] })] }));
});
//# sourceMappingURL=UsageComparison.js.map
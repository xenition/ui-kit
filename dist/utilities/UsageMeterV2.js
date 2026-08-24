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
exports.UsageMeterV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * UsageMeter, redesigned (v2): a **big gauge ring**. A large `ProgressRing`
 * centers the period's usage as a percent of allowance, escalating its arc color
 * by threshold (under `warnAt` → primary, over → accent, at/over cap → danger);
 * the utility line and the used / allowance figures stack centered beneath it,
 * with a redundant escalation caption so status is never color-alone. A zero /
 * absent allowance is guarded (no divide-by-zero) and shows the raw usage in the
 * ring instead. Distinct at a glance from v1's inline bar and v3's slim bar. Same
 * props, `formatUsage` quantities, token-pure.
 */
exports.UsageMeterV2 = React.forwardRef(function UsageMeterV2({ kind, used, allowance = 0, unit, decimals = 0, period, warnAt = 0.8, loading = false, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { "aria-busy": "true", "aria-label": "Loading usage", className: "flex flex-col items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[140px] w-[140px] animate-pulse rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }) }));
    }
    const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
    const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
    const hasCap = cap > 0;
    const ratio = hasCap ? (0, format_1.clamp)(safeUsed / cap, 0, 1.5) : 0;
    const pct = Math.round(ratio * 100);
    const ringColor = !hasCap
        ? 'primary'
        : ratio >= 1
            ? 'danger'
            : ratio >= warnAt
                ? 'accent'
                : 'primary';
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative inline-flex", children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: hasCap ? Math.min(pct, 100) : 0, max: 100, size: 140, thickness: 14, color: ringColor, showValue: false, "aria-label": hasCap
                                ? `${kd.label} usage, ${(0, format_1.formatPct)(pct)} of allowance`
                                : `${kd.label} usage, ${(0, format_1.formatUsage)(safeUsed, u, decimals)}` }), (0, jsx_runtime_1.jsx)("span", { className: "absolute inset-0 flex items-center justify-center text-lg font-bold text-on-surface", children: hasCap ? (0, format_1.formatPct)(pct) : (0, format_1.formatUsage)(safeUsed, u, decimals) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "base", "aria-label": `${kd.label} usage` }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: kd.label })] }), period != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: period }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-on-surface", children: [(0, format_1.formatUsage)(safeUsed, u, decimals), hasCap ? (0, jsx_runtime_1.jsxs)("span", { className: "text-muted", children: [" of ", (0, format_1.formatUsage)(cap, u, decimals)] }) : null] }), hasCap ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', format_1.TEXT_TINT[ringColor]), children: ratio >= 1 ? `Over allowance · ${(0, format_1.formatPct)(pct)}` : `${(0, format_1.formatPct)(pct)} of allowance` })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "No allowance set" }))] })] }) }));
});
//# sourceMappingURL=UsageMeterV2.js.map
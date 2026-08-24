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
exports.UsageMeter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * A consumption gauge for one utility: current usage against an optional
 * allowance, drawn with the token-bound `Progress` bar. The fill tone escalates
 * by threshold (under `warnAt` → primary, over → warn, at/over cap → danger) and
 * the same escalation is echoed in a text percentage, so status is never
 * color-alone. Quantities run through `formatUsage` (fixed decimals, no `NaN`
 * leak) and a zero/absent allowance is guarded to avoid divide-by-zero. Every
 * color traces to a `--xen-*` token. Web parity of the native `UsageMeter`.
 */
exports.UsageMeter = React.forwardRef(function UsageMeter({ kind, used, allowance = 0, unit, decimals = 0, period, warnAt = 0.8, loading = false, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { "aria-busy": "true", "aria-label": "Loading usage", className: "flex flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 animate-pulse rounded-full bg-neutral-100" })] }) }));
    }
    const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
    const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
    const hasCap = cap > 0;
    const ratio = hasCap ? (0, format_1.clamp)(safeUsed / cap, 0, 1.5) : 0;
    const pct = Math.round(ratio * 100);
    const tone = !hasCap ? 'primary' : ratio >= 1 ? 'danger' : ratio >= warnAt ? 'warn' : 'primary';
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "lg", "aria-label": `${kd.label} usage` }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: kd.label }), period != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: period }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: (0, format_1.formatUsage)(safeUsed, u, decimals) }), hasCap ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["of ", (0, format_1.formatUsage)(cap, u, decimals)] }) : null] })] }), hasCap ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: Math.min(pct, 100), max: 100, tone: tone, "aria-label": `${kd.label} usage, ${(0, format_1.formatPct)(pct)} of allowance` }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', format_1.TEXT_TINT[tone]), children: ratio >= 1 ? `Over allowance · ${(0, format_1.formatPct)(pct)}` : `${(0, format_1.formatPct)(pct)} of allowance` })] })) : null] }));
});
//# sourceMappingURL=UsageMeter.js.map
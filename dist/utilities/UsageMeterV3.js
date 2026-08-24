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
exports.UsageMeterV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * UsageMeter, redesigned (v3): a **slim inline bar**. A one-line header pairs the
 * utility glyph + label on the left with a right-aligned percent, then a single
 * thin `Progress` track carries the fill; a tiny used / allowance caption sits
 * under it. No card, no ring — the most compact of the three, for stacking many
 * meters in a list. The fill tone escalates by threshold and is echoed in the
 * percent text so status is never color-alone; a zero / absent allowance is
 * guarded. Same props, `formatUsage` quantities, token-pure.
 */
exports.UsageMeterV3 = React.forwardRef(function UsageMeterV3({ kind, used, allowance = 0, unit, decimals = 0, period, warnAt = 0.8, loading = false, className, ...rest }, ref) {
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading usage", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-1.5 animate-pulse rounded-full bg-neutral-100" })] }));
    }
    const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
    const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
    const hasCap = cap > 0;
    const ratio = hasCap ? (0, format_1.clamp)(safeUsed / cap, 0, 1.5) : 0;
    const pct = Math.round(ratio * 100);
    const tone = !hasCap ? 'primary' : ratio >= 1 ? 'danger' : ratio >= warnAt ? 'warn' : 'primary';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: kd.glyph, size: "sm", "aria-label": `${kd.label} usage` }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: kd.label }), period != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\u00B7 ", period] }) : null, hasCap ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('ml-auto text-sm font-bold', format_1.TEXT_TINT[tone]), children: (0, format_1.formatPct)(pct) })) : null] }), hasCap ? ((0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: Math.min(pct, 100), max: 100, tone: tone, "aria-label": `${kd.label}, ${(0, format_1.formatPct)(pct)} of allowance` })) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: hasCap
                    ? `${(0, format_1.formatUsage)(safeUsed, u, decimals)} of ${(0, format_1.formatUsage)(cap, u, decimals)}`
                    : (0, format_1.formatUsage)(safeUsed, u, decimals) })] }));
});
//# sourceMappingURL=UsageMeterV3.js.map
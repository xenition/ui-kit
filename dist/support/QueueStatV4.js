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
exports.QueueStatV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
// Chip tone → soft-tint token utility classes (background + on-tone text).
// Token-only; the calm line keeps a single soft tint, never a saturated fill.
const CHIP_CLASS = {
    neutral: 'bg-muted/10 text-muted',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warn: 'bg-warn/10 text-warn',
    danger: 'bg-danger/10 text-danger',
};
function inferTrend(delta) {
    if (typeof delta === 'number') {
        if (delta > 0)
            return 'up';
        if (delta < 0)
            return 'down';
    }
    return 'flat';
}
// Delta tone → token color + glyph. up → success, down → danger, flat → muted —
// mirrors the base `Statistic` mapping so tone stays consistent.
const TREND_CLASS = {
    up: 'text-success',
    down: 'text-danger',
    flat: 'text-muted',
};
const TREND_ARROW = {
    up: '▲',
    down: '▼',
    flat: '→',
};
/**
 * QueueStat — **V4** "calm console" design (web parity of the native V4). A clean
 * KPI tile: a muted caption, a **big** value numeral (`text-3xl`, weight 800),
 * an optional unit suffix, and an optional delta indicator colored by tone
 * (up→success / down→danger / flat→muted, per the base) with a matching glyph.
 * An optional leading glyph sits in a soft-tint chip whose tone follows the
 * base's `tone` mapping. Same props/behavior as {@link QueueStatProps}; all
 * colors from `--xen-*` token classes (no literal hex). Supports a `loading`
 * placeholder and an optional card surface.
 */
exports.QueueStatV4 = React.forwardRef(function QueueStatV4({ label, value, delta, trend, suffix, tone = 'neutral', glyph, loading = false, card = true, className, ...rest }, ref) {
    const resolvedTrend = trend ?? inferTrend(delta);
    const inner = loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading metric", "aria-busy": "true", className: "flex animate-pulse flex-col gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-1/2 rounded bg-on-surface/10" }), (0, jsx_runtime_1.jsx)("span", { className: "h-8 w-[35%] rounded bg-on-surface/10" })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-xl', CHIP_CLASS[tone] ?? CHIP_CLASS.neutral), children: glyph })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-end gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold leading-none text-on-surface", children: value }), suffix != null ? (0, jsx_runtime_1.jsx)("span", { className: "pb-0.5 text-base text-muted", children: suffix }) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex items-center gap-1 text-sm font-semibold', TREND_CLASS[resolvedTrend]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs", children: TREND_ARROW[resolvedTrend] }), String(delta)] })) : null] })] }));
    if (!card) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": `${label}: ${String(value)}`, className: className, ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, "aria-label": `${label}: ${String(value)}`, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)] shadow-sm', className), ...rest, children: inner }));
});
//# sourceMappingURL=QueueStatV4.js.map
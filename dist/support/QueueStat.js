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
exports.QueueStat = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Statistic_1 = require("../primitives/Statistic");
// Chip tone → token utility classes (background + on-tone text). Token-only.
const CHIP_CLASS = {
    neutral: 'bg-neutral-100 text-muted',
    primary: 'bg-primary-50 text-primary',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
};
/**
 * A single queue KPI tile — a leading tinted glyph chip plus a `Statistic`
 * (caption, big value, optional delta/suffix). Built for helpdesk dashboards
 * ("Open", "Waiting", "Breached SLA", "CSAT"). The chip tone maps to token
 * classes; the delta arrow/tone comes from the underlying `Statistic`. Supports
 * a `loading` placeholder. No literal hex.
 */
exports.QueueStat = React.forwardRef(function QueueStat({ label, value, delta, trend, suffix, tone = 'neutral', glyph, loading = false, card = true, className, ...rest }, ref) {
    const inner = loading ? ((0, jsx_runtime_1.jsxs)("div", { "aria-label": "Loading metric", "aria-busy": "true", className: "flex animate-pulse flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-1/2 rounded bg-neutral-100" }), (0, jsx_runtime_1.jsx)("span", { className: "h-7 w-[35%] rounded bg-neutral-100" })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-lg', CHIP_CLASS[tone] ?? CHIP_CLASS.neutral), children: glyph })) : null, (0, jsx_runtime_1.jsx)(Statistic_1.Statistic, { className: "flex-1", label: label, value: value, delta: delta, trend: trend, suffix: suffix })] }));
    if (!card) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": `${label}: ${String(value)}`, className: className, ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, "aria-label": `${label}: ${String(value)}`, className: (0, cn_1.cn)('p-[var(--xen-space-md)]', className), ...rest, children: inner }));
});
//# sourceMappingURL=QueueStat.js.map
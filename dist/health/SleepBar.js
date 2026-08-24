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
exports.SleepBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const QUALITY_COLOR = {
    poor: 'danger',
    fair: 'warn',
    good: 'primary',
    excellent: 'success',
};
const QUALITY_LABEL = {
    poor: 'Poor',
    fair: 'Fair',
    good: 'Good',
    excellent: 'Excellent',
};
/**
 * A sleep-duration summary: hours slept versus goal drawn as a single fill bar,
 * a color-coded quality tag, and optional bed / wake times. The bar color comes
 * from `quality` (falling back to `primary`). Guards `goal <= 0`. Web parity of
 * the native `SleepBar`; token-only colors.
 */
exports.SleepBar = React.forwardRef(function SleepBar({ hours, goal = 8, quality, bedtime, wakeTime, className, ...rest }, ref) {
    const safeGoal = Math.max(goal, 0);
    const safeHours = Math.max(hours, 0);
    const ratio = safeGoal > 0 ? Math.min(safeHours / safeGoal, 1) : 0;
    const tone = quality ? QUALITY_COLOR[quality] : 'primary';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `Sleep: ${safeHours} hours${safeGoal > 0 ? ` of ${safeGoal}` : ''}${quality ? `, ${QUALITY_LABEL[quality]} quality` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: "\uD83D\uDE34" }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-surface", children: safeHours }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: ["h", safeGoal > 0 ? ` / ${safeGoal}h` : ''] })] }), quality ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', internal_1.TEXT_CLASS[tone]), children: QUALITY_LABEL[quality] })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 overflow-hidden rounded-full bg-border", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', internal_1.BG_CLASS[tone]), style: { width: `${ratio * 100}%` } }) }), bedtime || wakeTime ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: bedtime ? `🌙 ${bedtime}` : '' }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: wakeTime ? `☀️ ${wakeTime}` : '' })] })) : null] }));
});
//# sourceMappingURL=SleepBar.js.map
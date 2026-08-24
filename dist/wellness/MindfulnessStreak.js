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
exports.MindfulnessStreak = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const TONE_KEY = {
    primary: 'primary',
    accent: 'accent',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * A mindfulness streak card (web parity of the native block): a flame + big day
 * count, an optional best-streak stat, and a 7-day dot strip where practiced
 * days fill in the tone color and missed days read as a muted track (state via
 * fill + a11y label, not color alone). At `count` 0 it drops the flame and shows
 * an encouraging prompt. Token-only colors.
 */
exports.MindfulnessStreak = React.forwardRef(function MindfulnessStreak({ count, best, week, tone = 'primary', unit = 'day', emptyLabel = 'Start your streak', className }, ref) {
    const slot = TONE_KEY[tone] ?? 'primary';
    const active = count > 0;
    const last7 = (week ?? []).slice(-7);
    const summary = active
        ? `${count} ${unit}${count === 1 ? '' : 's'} streak${best != null ? `, best ${best}` : ''}`
        : emptyLabel;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-mindfulness-streak": "", "aria-label": summary, className: (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-14 w-14 items-center justify-center rounded-full text-xl', _tokens_1.SLOT_TINT[slot]), children: active ? '🔥' : '🌱' }), (0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: active ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading text-3xl font-extrabold', _tokens_1.SLOT_TEXT[slot]), children: count }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: [unit, count === 1 ? '' : 's'] })] }), best != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Best ", best, " ", unit, best === 1 ? '' : 's'] })) : null] })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: emptyLabel })) })] }), last7.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-between", children: DAY_LABELS.map((day, i) => {
                    const done = last7[i] === true;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-label": `${done ? 'Practiced' : 'Missed'}, day ${i + 1}`, className: (0, cn_1.cn)('flex h-[22px] w-[22px] items-center justify-center rounded-full border text-xs', done ? (0, cn_1.cn)('border-transparent', _tokens_1.SLOT_BG[slot], _tokens_1.SLOT_ON[slot]) : 'border-border bg-neutral-200'), children: done ? '✓' : '' }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: day })] }, i));
                }) })) : null] }));
});
//# sourceMappingURL=MindfulnessStreak.js.map
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
exports.MoodTrend = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
const MOOD_BAR = {
    awful: { level: 1, color: 'danger' },
    bad: { level: 2, color: 'warn' },
    okay: { level: 3, color: 'muted' },
    good: { level: 4, color: 'primary' },
    great: { level: 5, color: 'success' },
};
/**
 * MoodTrend — a week of mood at a glance: a clean card with one vertical bar per
 * day, its height set by the mood level (awful→great, 1..5 of a fixed max) and
 * its fill the mood's semantic color. The card stays calm (surface + border);
 * only the bars carry color, and each day's mood is announced (state, not color
 * alone). Empty data shows a muted note. Token-only colors.
 */
exports.MoodTrend = React.forwardRef(function MoodTrend({ data, title = 'Mood this week', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", className: (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-5 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), data.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No mood data yet." })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex items-end justify-between gap-[var(--xen-space-xs)]", style: { height: 120 }, children: data.map((point, i) => {
                    const meta = MOOD_BAR[point.mood] ?? MOOD_BAR.okay;
                    const heightPct = Math.max(4, (meta.level / 5) * 100);
                    return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${point.label}: ${point.mood}`, className: "flex h-full flex-1 flex-col items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-1 items-end justify-center", children: (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('w-full rounded-[var(--xen-radius-sm)]', _tokens_1.SLOT_BG[meta.color]), style: { height: `${heightPct}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: "w-full truncate text-center text-xs text-muted", children: point.label })] }, `${point.label}-${i}`));
                }) }))] }));
});
//# sourceMappingURL=MoodTrend.js.map
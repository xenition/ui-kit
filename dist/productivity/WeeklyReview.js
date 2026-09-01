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
exports.WeeklyReview = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * WeeklyReview — the weekly stats / streak hero for the productivity V4 "flow"
 * line. A brand-gradient panel that closes the week: a big near-white
 * **completed** numeral, a 7-bar mini chart of per-day completions (bars in
 * near-white opacity steps), a streak flame tile, an optional focus-hours tile,
 * and an optional "Share" CTA. Presentational — shaped data + a callback, nothing
 * fetches. Every color derives from the brand ramp via `--xen-*` token classes
 * and gradient utilities — no literals, light + dark.
 */
exports.WeeklyReview = React.forwardRef(function WeeklyReview({ completed, streakDays, perDay, focusHours, onShare, className, ...rest }, ref) {
    const total = Math.max(0, Math.trunc(completed || 0));
    const bars = perDay ?? [];
    const max = bars.reduce((m, d) => Math.max(m, d.count), 0);
    const Tile = ({ glyph, label, value }) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "lg", "aria-hidden": true }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-primary-50", children: value }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-primary-100", children: label })] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-primary-100", children: "This week" }), (0, jsx_runtime_1.jsx)("p", { "aria-label": `${total} tasks completed this week`, className: "text-4xl font-extrabold tracking-tight text-primary-50", children: total }), (0, jsx_runtime_1.jsx)("p", { className: "text-base font-semibold text-primary-100", children: total === 1 ? 'task completed' : 'tasks completed' })] }), onShare ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Share weekly review", onClick: onShare, className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2197", size: "lg", "aria-hidden": true }) })) : null] }), bars.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": `Completed per day: ${bars.map((d) => `${d.label} ${d.count}`).join(', ')}`, className: "flex items-end gap-[var(--xen-space-sm)]", style: { height: 96 }, children: bars.map((d, i) => {
                    const ratio = max > 0 ? d.count / max : 0;
                    // Near-white opacity steps: taller bars read brighter.
                    const opacityClass = ratio >= 0.75
                        ? 'bg-primary-50/90'
                        : ratio >= 0.5
                            ? 'bg-primary-50/70'
                            : ratio >= 0.25
                                ? 'bg-primary-50/50'
                                : 'bg-primary-50/30';
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-1 items-end", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full rounded-[var(--xen-radius-sm)]', opacityClass), style: { height: `${Math.max(6, ratio * 100)}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary-100", children: d.label })] }, `${d.label}-${i}`));
                }) })) : null, streakDays != null || focusHours ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [streakDays != null ? ((0, jsx_runtime_1.jsx)(Tile, { glyph: "\uD83D\uDD25", label: "Day streak", value: String(Math.max(0, Math.trunc(streakDays))) })) : null, focusHours ? (0, jsx_runtime_1.jsx)(Tile, { glyph: "\u23F1\uFE0F", label: "Focus time", value: focusHours }) : null] })) : null] }));
});
//# sourceMappingURL=WeeklyReview.js.map
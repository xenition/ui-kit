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
exports.ProgressCalendar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
const TONE_KEY = {
    primary: 'primary',
    accent: 'accent',
    success: 'success',
};
/**
 * Per-level `bg-*` fill class per tone — the web analog of the native
 * `withAlpha(accent, LEVEL_ALPHA[level])` heatmap. Index 0 is unused (level 0
 * uses a neutral track). Every entry is a `--xen-*`-bound utility.
 */
const LEVEL_BG = {
    primary: ['', 'bg-primary/20', 'bg-primary/50', 'bg-primary'],
    accent: ['', 'bg-accent/20', 'bg-accent/50', 'bg-accent'],
    success: ['', 'bg-success/20', 'bg-success/50', 'bg-success'],
};
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
/**
 * A month completion calendar (web parity of the native block): a weekday header
 * and a 7-column grid of day cells tinted by a 0–3 completion `level` (a soft
 * heatmap), with today's cell ringed. Completion is conveyed by fill density
 * plus the a11y label, never color alone; leading blanks come from
 * `startWeekday`. Interactive cells are real `<button>`s. Empty `days` shows a
 * note. Token-only colors.
 */
exports.ProgressCalendar = React.forwardRef(function ProgressCalendar({ title, days, startWeekday = 0, tone = 'primary', showWeekdays = true, onSelectDay, emptyLabel = 'No activity this month.', className, }, ref) {
    const toneKey = tone in TONE_KEY ? tone : 'primary';
    const slot = TONE_KEY[toneKey];
    const shell = (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]', className);
    if (days.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-progress-calendar": "", "aria-label": emptyLabel, className: shell, children: [title ? (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel })] }));
    }
    // Build a flat cell list: leading blanks, then one cell per day.
    const lead = ((startWeekday % 7) + 7) % 7;
    const cells = [...Array.from({ length: lead }, () => null), ...days];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-progress-calendar": "", className: shell, children: [title ? (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }) : null, showWeekdays ? ((0, jsx_runtime_1.jsx)("div", { className: "flex", children: WEEKDAYS.map((w, i) => ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: w }) }, i))) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap", children: cells.map((cell, i) => {
                    if (cell == null) {
                        return (0, jsx_runtime_1.jsx)("div", { className: "aspect-square w-[calc(100%/7)] p-0.5" }, `blank-${i}`);
                    }
                    const level = Math.min(Math.max(cell.level ?? 0, 0), 3);
                    const filled = level > 0;
                    const bg = filled ? LEVEL_BG[toneKey][level] : 'bg-neutral-200';
                    const fg = level >= 2 ? _tokens_1.SLOT_ON[slot] : 'text-on-surface';
                    const label = `Day ${cell.day}, ${level === 0 ? 'no activity' : `level ${level}`}${cell.today ? ', today' : ''}`;
                    const inner = ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex h-full w-full items-center justify-center rounded-[var(--xen-radius-sm)] text-xs', bg, fg, cell.today && (0, cn_1.cn)('border-2', _tokens_1.SLOT_BORDER[slot])), children: cell.day }));
                    return ((0, jsx_runtime_1.jsx)("div", { className: "aspect-square w-[calc(100%/7)] p-0.5", children: onSelectDay ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: () => onSelectDay(cell), className: "h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-sm)]", children: inner })) : ((0, jsx_runtime_1.jsx)("div", { "aria-label": label, className: "h-full w-full", children: inner })) }, `day-${cell.day}-${i}`));
                }) })] }));
});
//# sourceMappingURL=ProgressCalendar.js.map
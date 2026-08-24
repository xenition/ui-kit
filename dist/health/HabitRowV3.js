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
exports.HabitRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** How many streak dots the minimal line renders at most. */
const MAX_DOTS = 7;
/**
 * HabitRow — **minimal line** design (v3). A single quiet line: a small round
 * check on the left, the habit name, a compact row of week dots (the last
 * {@link MAX_DOTS} filled in `success`), then a `flame + count`. A left accent
 * bar switches to `success` when done; no surface fill — separation comes from
 * spacing. Tapping toggles `done`. Same props as {@link HabitRowProps};
 * token-only colors.
 */
exports.HabitRowV3 = React.forwardRef(function HabitRowV3({ name, done, streak = 0, meta, onToggle, className, ...rest }, ref) {
    const safeStreak = Math.max(Math.floor(streak), 0);
    const a11y = `${name}, ${done ? 'done' : 'not done'}${safeStreak > 0 ? `, ${safeStreak} day streak` : ''}`;
    const filled = Math.min(safeStreak, MAX_DOTS);
    const dots = Array.from({ length: MAX_DOTS }, (_, i) => i < filled);
    const box = ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2', done ? 'border-success bg-success' : 'border-border bg-surface'), children: done ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-[10px] font-extrabold leading-none text-on-success", children: "\u2713" })) : null }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [box, (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold', done ? 'text-muted line-through' : 'text-on-surface'), children: name }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: meta }) : null] }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex shrink-0 items-center gap-[3px]", children: dots.map((on, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 w-1.5 rounded-full', on ? 'bg-success' : 'bg-border') }, i))) }), safeStreak > 0 ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex shrink-0 items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm leading-none", children: "\uD83D\uDD25" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-warn", children: safeStreak })] })) : null] }));
    const lineClass = 'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] border-l-2 py-[var(--xen-space-sm)] pl-[var(--xen-space-sm)] pr-[var(--xen-space-xs)]';
    const accent = done ? 'border-success' : 'border-border';
    if (!onToggle) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(lineClass, accent, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "checkbox", "aria-checked": done, "aria-label": a11y, tabIndex: 0, onClick: () => onToggle(!done), onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggle(!done);
            }
        }, className: (0, cn_1.cn)(lineClass, accent, 'cursor-pointer transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: body }));
});
//# sourceMappingURL=HabitRowV3.js.map
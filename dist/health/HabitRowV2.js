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
exports.HabitRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * HabitRow — **circular tile** design (v2). A grid-friendly square: a large
 * ring (full & `success` when done, an empty `border` track when not) with a
 * check in its center, the habit name beneath, and a streak flame chip. The
 * whole tile is one tap target that toggles `done`. Elevated surface that lifts
 * on hover. Same props as {@link HabitRowProps}; token-only colors.
 */
exports.HabitRowV2 = React.forwardRef(function HabitRowV2({ name, done, streak = 0, meta, onToggle, className, ...rest }, ref) {
    const safeStreak = Math.max(Math.floor(streak), 0);
    const a11y = `${name}, ${done ? 'done' : 'not done'}${safeStreak > 0 ? `, ${safeStreak} day streak` : ''}`;
    const ring = ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-[68px] w-[68px] items-center justify-center rounded-full border-4', done ? 'border-success bg-success/10' : 'border-border bg-surface'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-2xl font-extrabold', done ? 'text-success' : 'text-muted'), children: done ? '✓' : '' }) }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [ring, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('line-clamp-2 text-center text-sm font-bold', done ? 'text-on-surface' : 'text-muted'), children: name }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-center text-xs text-muted", children: meta }) : null, safeStreak > 0 ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)] rounded-full bg-warn/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm leading-none", children: "\uD83D\uDD25" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-warn", children: safeStreak })] })) : null] }));
    const tileClass = 'flex flex-col items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] shadow-md';
    if (!onToggle) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(tileClass, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "checkbox", "aria-checked": done, "aria-label": a11y, tabIndex: 0, onClick: () => onToggle(!done), onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggle(!done);
            }
        }, className: (0, cn_1.cn)(tileClass, 'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...rest, children: body }));
});
//# sourceMappingURL=HabitRowV2.js.map
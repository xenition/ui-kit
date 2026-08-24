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
exports.MealCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const MEAL_META = {
    breakfast: { glyph: '🍳', label: 'Breakfast', tintBg: 'bg-warn/10' },
    lunch: { glyph: '🥗', label: 'Lunch', tintBg: 'bg-success/10' },
    dinner: { glyph: '🍽️', label: 'Dinner', tintBg: 'bg-primary/10' },
    snack: { glyph: '🍎', label: 'Snack', tintBg: 'bg-accent/10' },
};
const MACRO_META = [
    { key: 'protein', label: 'P', tone: 'primary' },
    { key: 'carbs', label: 'C', tone: 'warn' },
    { key: 'fat', label: 'F', tone: 'accent' },
];
/**
 * MealCard — **image-hero** design (v2). A tall tinted hero banner (standing in
 * for a dish photo) carries the meal glyph large and centered, with the meal tag
 * top-left and a calories chip top-right; macro chips (P/C/F) overlay the bottom
 * of the hero. The dish name sits below. Elevated surface that lifts on hover.
 * Same props as {@link MealCardProps}; token-only colors.
 */
exports.MealCardV2 = React.forwardRef(function MealCardV2({ name, variant, calories, macros, time, onPress, className, ...rest }, ref) {
    const meta = MEAL_META[variant];
    const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
    const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex h-28 items-center justify-center p-[var(--xen-space-sm)]', meta.tintBg), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-5xl leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)] rounded-full bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-semibold text-on-surface", children: meta.label }), calories != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] rounded-full bg-on-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-surface", children: [calories, " kcal"] })) : null, shownMacros.length ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-[var(--xen-space-sm)] left-[var(--xen-space-sm)] flex gap-[var(--xen-space-xs)]", children: shownMacros.map((m) => ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-xs)] rounded-full bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-semibold', internal_1.TEXT_CLASS[m.tone]), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 w-1.5 rounded-full', internal_1.BG_CLASS[m.tone]) }), m.label, " ", macros?.[m.key], "g"] }, m.key))) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-base font-bold text-on-surface", children: name }), time ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: time }) : null] })] }));
    const shell = 'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md';
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(shell, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", "aria-label": a11y, tabIndex: 0, onClick: onPress, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPress();
            }
        }, className: (0, cn_1.cn)(shell, 'cursor-pointer text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...rest, children: body }));
});
//# sourceMappingURL=MealCardV2.js.map
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
exports.MealCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const MEAL_META = {
    breakfast: { glyph: '🍳', label: 'Breakfast' },
    lunch: { glyph: '🥗', label: 'Lunch' },
    dinner: { glyph: '🍽️', label: 'Dinner' },
    snack: { glyph: '🍎', label: 'Snack' },
};
const MACRO_META = [
    { key: 'protein', label: 'Protein', color: 'primary' },
    { key: 'carbs', label: 'Carbs', color: 'warn' },
    { key: 'fat', label: 'Fat', color: 'accent' },
];
/**
 * A logged-meal card: meal-slot icon + tag, dish name, calories, and a
 * color-coded protein / carbs / fat macro strip. Macros with no value are
 * omitted. Web parity of the native `MealCard`; clickable when `onPress` is set,
 * token-only colors.
 */
exports.MealCard = React.forwardRef(function MealCard({ name, variant, calories, macros, time, onPress, className, ...rest }, ref) {
    const meta = MEAL_META[variant];
    const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
    const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: meta.label }), time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: time }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: name })] })] }), calories != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-lg font-bold text-on-surface", children: [calories, " ", (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-normal text-muted", children: "kcal" })] })) : null, shownMacros.length ? ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-[var(--xen-space-lg)]", children: shownMacros.map((m) => ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2 w-2 shrink-0 rounded-full', internal_1.BG_CLASS[m.color]) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [m.label, " ", macros?.[m.key], "g"] })] }, m.key))) })) : null] }));
    const shell = 'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]';
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(shell, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", "aria-label": a11y, tabIndex: 0, onClick: onPress, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPress();
            }
        }, className: (0, cn_1.cn)(shell, 'cursor-pointer text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: body }));
});
//# sourceMappingURL=MealCard.js.map
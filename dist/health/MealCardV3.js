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
exports.MealCardV3 = void 0;
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
    { key: 'protein', label: 'Protein', tone: 'primary' },
    { key: 'carbs', label: 'Carbs', tone: 'warn' },
    { key: 'fat', label: 'Fat', tone: 'accent' },
];
/**
 * MealCard — **dense macro-bar line** design (v3). A tight two-row entry: glyph,
 * dish name, and calories value-first on the top line; a single stacked
 * proportional macro bar (protein / carbs / fat, by grams) with `Ng` counts
 * beneath. Borderless and compact — ideal for long food logs. Same props as
 * {@link MealCardProps}; token-only colors.
 */
exports.MealCardV3 = React.forwardRef(function MealCardV3({ name, variant, calories, macros, time, onPress, className, ...rest }, ref) {
    const meta = MEAL_META[variant];
    const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
    const total = shownMacros.reduce((sum, m) => sum + Math.max(macros?.[m.key] ?? 0, 0), 0);
    const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-base font-semibold text-on-surface", children: name }), calories != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "shrink-0 text-base font-extrabold text-on-surface", children: [calories, (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-normal text-muted", children: " kcal" })] })) : time ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: time })) : null] }), shownMacros.length && total > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": `Macros: ${shownMacros.map((m) => `${m.label} ${macros?.[m.key]}g`).join(', ')}`, className: "flex h-1.5 overflow-hidden rounded-full bg-border", children: shownMacros.map((m) => {
                            const grams = Math.max(macros?.[m.key] ?? 0, 0);
                            return (0, jsx_runtime_1.jsx)("span", { className: internal_1.BG_CLASS[m.tone], style: { flex: `${grams / total}` } }, m.key);
                        }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-[var(--xen-space-md)]", children: shownMacros.map((m) => ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TEXT_CLASS[m.tone]), children: [m.label, " ", macros?.[m.key], "g"] }, m.key))) })] })) : null] }));
    const shell = 'flex flex-col gap-[var(--xen-space-xs)] py-[var(--xen-space-sm)] px-[var(--xen-space-sm)]';
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(shell, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", "aria-label": a11y, tabIndex: 0, onClick: onPress, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPress();
            }
        }, className: (0, cn_1.cn)(shell, 'cursor-pointer text-left transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: body }));
});
//# sourceMappingURL=MealCardV3.js.map
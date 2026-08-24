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
exports.FeedingSchedule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const MEAL_GLYPH = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🦴',
    treat: '🍬',
};
/**
 * A daily feeding checklist: each row is a meal-time icon, food + portion, and a
 * tappable fed/not-fed control (a real `role="checkbox"` `<button>`). A summary
 * chip counts fed vs. total. Renders a shared empty state. Fed state is conveyed
 * by a check glyph + `aria-checked` (not color alone). Token-only colors.
 */
exports.FeedingSchedule = React.forwardRef(function FeedingSchedule({ meals, title = 'Feeding schedule', onToggle, emptyLabel = 'No meals scheduled', className }, ref) {
    if (meals.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "aria-label": emptyLabel, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83C\uDF7D\uFE0F" }), title: title, description: emptyLabel, className: className }));
    }
    const fedCount = meals.filter((m) => m.fed).length;
    const allFed = fedCount === meals.length;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("p", { className: (0, cn_1.cn)('text-sm font-semibold', allFed ? 'text-success' : 'text-muted'), children: [fedCount, "/", meals.length, " fed"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: meals.map((meal, i) => {
                    const fed = meal.fed ?? false;
                    const row = ((0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": "true", children: MEAL_GLYPH[meal.type] ?? '🍽️' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1 text-left", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-base font-semibold text-on-surface', fed && 'line-through'), children: meal.food }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [meal.time, meal.amount ? ` · ${meal.amount}` : ''] })] }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-6 w-6 items-center justify-center rounded-full border', fed ? 'border-success bg-success text-on-success' : 'border-border bg-transparent'), children: fed ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold", children: "\u2713" }) : null })] }));
                    if (!onToggle) {
                        return ((0, jsx_runtime_1.jsx)("div", { "aria-label": `${meal.food}, ${meal.time}, ${fed ? 'fed' : 'not fed'}`, children: row }, meal.id ?? i));
                    }
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": fed, "aria-label": `${meal.food}, ${meal.time}, ${fed ? 'fed' : 'not fed'}`, onClick: () => onToggle(i, !fed), className: "w-full rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: row }, meal.id ?? i));
                }) })] }));
});
//# sourceMappingURL=FeedingSchedule.js.map
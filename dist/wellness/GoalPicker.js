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
exports.GoalPicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * GoalPicker — a wrap of selectable goal chips. Unselected chips are clean
 * (surface + border, on-surface text); color arrives only on the chosen ones,
 * which flip to the primary fill with on-primary text and a `✓`. Selection is
 * announced (`aria-pressed`) and marked with the check, so it never rests on
 * color alone. Token-only colors.
 */
exports.GoalPicker = React.forwardRef(function GoalPicker({ goals, selected, onToggle, title, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [title ? (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: goals.map((goal) => {
                    const isSelected = selected.includes(goal.id);
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "button", "aria-pressed": isSelected, "aria-label": goal.label, onClick: () => onToggle(goal.id), className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', isSelected
                            ? 'border-primary bg-primary font-bold text-on-primary'
                            : 'border-border bg-surface font-semibold text-on-surface'), children: [goal.glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: goal.glyph })) : null, (0, jsx_runtime_1.jsx)("span", { children: goal.label }), isSelected ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "font-bold text-on-primary", children: "\u2713" })) : null] }, goal.id));
                }) })] }));
});
//# sourceMappingURL=GoalPicker.js.map
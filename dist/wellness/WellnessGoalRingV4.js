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
exports.WellnessGoalRingV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const charts_1 = require("../charts");
/**
 * WellnessGoalRingV4 — the calm redesign of {@link WellnessGoalRing}. Same props,
 * defaults, size, ring color, and "No goal set" empty state. Only the visuals
 * change: a clean centered surface card where the "✓ Goal met" note becomes a
 * small gradient pill (the single calm accent) once the goal is met.
 */
exports.WellnessGoalRingV4 = React.forwardRef(function WellnessGoalRingV4({ label, value, goal, unit, color = 'primary', size = 132, showMetBadge = true, className, ...rest }, ref) {
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-wellness-goal-ring": "", "aria-label": `${label}: no goal set`, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5', 'flex flex-col items-center gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No goal set" })] }));
    }
    const pct = Math.round((Math.min(Math.max(value, 0), goal) / goal) * 100);
    const met = value >= goal;
    const unitSuffix = unit ? ` ${unit}` : '';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-wellness-goal-ring": "", "aria-label": `${label}: ${value} of ${goal}${unitSuffix}, ${pct}%${met ? ', goal met' : ''}`, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5', 'flex flex-col items-center gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: value, max: goal, size: size, color: color, showValue: true }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: [value, " / ", goal, unitSuffix] }), met && showMetBadge ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-gradient-to-r from-primary-400 to-primary-700 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-on-primary", children: "\u2713 Goal met" })) : null] }));
});
//# sourceMappingURL=WellnessGoalRingV4.js.map
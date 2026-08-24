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
exports.PetActivityRingV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const charts_1 = require("../charts");
const META = {
    walk: { glyph: '🐾', label: 'Walk', unit: 'min', color: 'primary' },
    play: { glyph: '🎾', label: 'Play', unit: 'min', color: 'accent' },
    exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', color: 'success' },
    steps: { glyph: '👣', label: 'Steps', unit: '', color: 'warn' },
    calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'danger' },
};
const TEXT = { primary: 'text-primary', accent: 'text-accent', success: 'text-success', warn: 'text-warn', danger: 'text-danger' };
/**
 * PetActivityRing, redesigned (v2): a **bold stat medallion**. A large ring with
 * the glyph + value in the center, the label and value/goal beneath, and a "Goal
 * met ✓" pill once complete. Bigger and more celebratory than v1. Same props,
 * token-only.
 */
exports.PetActivityRingV2 = React.forwardRef(function PetActivityRingV2({ variant, value, goal, size = 132, color, showCaption = true, className }, ref) {
    const meta = META[variant];
    const arc = color ?? meta.color;
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label}: no goal set`, className: (0, cn_1.cn)('flex flex-col items-center gap-1', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl", "aria-hidden": true, children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No goal set" })] }));
    }
    const clamped = Math.min(Math.max(value, 0), goal);
    const pct = Math.round((clamped / goal) * 100);
    const met = clamped >= goal;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col items-center gap-2', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center", children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: value, max: goal, size: size, thickness: 12, color: arc, "aria-label": `${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}` }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", "aria-hidden": true, children: meta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-lg font-bold', TEXT[arc] ?? 'text-on-surface'), children: [pct, "%"] })] })] }), showCaption ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: meta.label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [clamped, " / ", goal, meta.unit ? ` ${meta.unit}` : ''] }), met ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success", children: "Goal met \u2713" })) : null] })) : null] }));
});
//# sourceMappingURL=PetActivityRingV2.js.map
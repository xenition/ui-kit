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
exports.PetActivityRingV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const META = {
    walk: { glyph: '🐾', label: 'Walk', unit: 'min', fill: 'bg-primary' },
    play: { glyph: '🎾', label: 'Play', unit: 'min', fill: 'bg-accent' },
    exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', fill: 'bg-success' },
    steps: { glyph: '👣', label: 'Steps', unit: '', fill: 'bg-warn' },
    calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', fill: 'bg-danger' },
};
/**
 * PetActivityRing, redesigned (v3): a **compact activity bar**. No ring — a glyph,
 * an inline "label · value/goal unit · N%" readout, and a thin fill bar. A dense
 * row for stacking several activities. The opposite of v2's medallion. Same
 * props, token-only. (`size`/`color` are accepted for parity.)
 */
exports.PetActivityRingV3 = React.forwardRef(function PetActivityRingV3({ variant, value, goal, size, color, showCaption = true, className }, ref) {
    void size;
    void color;
    const meta = META[variant];
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label}: no goal set`, className: (0, cn_1.cn)('flex items-center gap-2', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No goal set" })] }));
    }
    const clamped = Math.min(Math.max(value, 0), goal);
    const pct = Math.round((clamped / goal) * 100);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%`, className: (0, cn_1.cn)('flex items-center gap-3', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [showCaption ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-baseline justify-between text-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-on-surface", children: meta.label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-muted", children: [clamped, "/", goal, meta.unit ? ` ${meta.unit}` : '', " \u00B7 ", pct, "%"] })] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', meta.fill), style: { width: `${pct}%` } }) })] })] }));
});
//# sourceMappingURL=PetActivityRingV3.js.map
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
exports.PetActivityRingV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const charts_1 = require("../charts");
const _tokens_1 = require("./_tokens");
/** Per-variant glyph / label / unit / default color — copied from the base component. */
const VARIANT_META = {
    walk: { glyph: '🐾', label: 'Walk', unit: 'min', color: 'primary' },
    play: { glyph: '🎾', label: 'Play', unit: 'min', color: 'accent' },
    exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', color: 'success' },
    steps: { glyph: '👣', label: 'Steps', unit: '', color: 'warn' },
    calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'danger' },
};
/**
 * PetActivityRing — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a single activity goal ring: an elevated rounded card
 * with a soft shadow wrapping the charts {@link ProgressRing} (kept token-fed and
 * unchanged from the base), a big legible central value, and the label + glyph
 * carried in a soft-primary chip beneath. Same props/behavior as
 * {@link PetActivityRingProps}: honors `variant` (walk / play / exercise / steps /
 * calories) with its glyph/label/unit, the `color` override and the `size` prop,
 * and guards a non-positive goal with a muted "No goal set" note. All colors from
 * `--xen-*` token classes (no literals).
 */
exports.PetActivityRingV4 = React.forwardRef(function PetActivityRingV4({ variant, value, goal, size = 120, color, showCaption = true, className }, ref) {
    const meta = VARIANT_META[variant];
    const arcColor = color ?? meta.color;
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label}: no goal set`, className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl", "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No goal set" })] }));
    }
    const clamped = Math.min(Math.max(value, 0), goal);
    const pct = Math.round((clamped / goal) * 100);
    const met = clamped >= goal;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md', className), children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: value, max: goal, size: size, color: arcColor, "aria-label": `${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}` }), (0, jsx_runtime_1.jsxs)("span", { className: "text-3xl font-bold text-on-surface", children: [pct, "%"] }), showCaption ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold', _tokens_1.SLOT_TEXT[arcColor]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), met ? `✓ ${meta.label} goal met` : meta.label] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [clamped, " / ", goal, meta.unit ? ` ${meta.unit}` : ''] })] })) : null] }));
});
//# sourceMappingURL=PetActivityRingV4.js.map
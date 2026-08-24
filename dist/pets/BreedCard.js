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
exports.BreedCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const SIZE_LABEL = {
    toy: 'Toy',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    giant: 'Giant',
};
const ENERGY_META = {
    low: { label: 'Low energy', dots: 1, slot: 'success' },
    moderate: { label: 'Moderate energy', dots: 2, slot: 'warn' },
    high: { label: 'High energy', dots: 3, slot: 'danger' },
};
/**
 * A breed reference card: banner (photo or emoji placeholder), name + species,
 * a stat row (size class, lifespan), a labelled energy meter, and temperament
 * trait chips. Activatable `role="button"` when `onClick` is set. The energy
 * level is conveyed by both dots and a text label. Token-only colors; a styled
 * `div` placeholder stands in for a real breed photo.
 */
exports.BreedCard = React.forwardRef(function BreedCard({ name, species, photoUrl, glyph = '🐾', size, energy, lifespan, traits, onClick, className }, ref) {
    const energyMeta = energy ? ENERGY_META[energy] : undefined;
    const safeTraits = traits ?? [];
    const a11y = `${name}${species ? `, ${species}` : ''}${size ? `, ${SIZE_LABEL[size]}` : ''}`;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: onClick, onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('overflow-hidden bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)]', interactive && 'cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-24 items-center justify-center bg-border", "aria-hidden": "true", children: photoUrl ? ((0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: glyph })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), species ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: species }) : null] }), size || lifespan ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-xl)]", children: [size ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Size" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-surface", children: SIZE_LABEL[size] })] })) : null, lifespan ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Lifespan" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-surface", children: lifespan })] })) : null] })) : null, energyMeta ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", "aria-label": energyMeta.label, children: [[0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2 w-2 rounded-full', i < energyMeta.dots ? _tokens_1.SLOT_BG[energyMeta.slot] : 'bg-border') }, i))), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: energyMeta.label })] })) : null, safeTraits.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: safeTraits.slice(0, 5).map((t, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: t }, i))) })) : null] })] }));
});
//# sourceMappingURL=BreedCard.js.map
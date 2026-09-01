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
exports.BreedCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const SIZE_META = {
    toy: { glyph: '🐁', label: 'Toy' },
    small: { glyph: '🐇', label: 'Small' },
    medium: { glyph: '🐕', label: 'Medium' },
    large: { glyph: '🐎', label: 'Large' },
    giant: { glyph: '🐘', label: 'Giant' },
};
const ENERGY_META = {
    low: { glyph: '🌙', label: 'Low energy', tone: 'success' },
    moderate: { glyph: '⚡', label: 'Moderate energy', tone: 'warn' },
    high: { glyph: '🔥', label: 'High energy', tone: 'danger' },
};
/**
 * BreedCard — **V4** "companion" design (web parity of the native V4). The warm,
 * friendly take on a breed reference card: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the breed photo/glyph in a soft-primary
 * tinted well, a bold breed name, a muted species line, size + energy shown as
 * labelled glyph Badges (never color alone), lifespan as a soft-primary chip, and
 * temperament traits as soft-primary chips. Same props/behavior as
 * {@link BreedCardProps}; activatable `role="button"` when `onClick` is set. All
 * colors from `--xen-*` token classes (no literals).
 */
exports.BreedCardV4 = React.forwardRef(function BreedCardV4({ name, species, photoUrl, glyph = '🐾', size, energy, lifespan, traits, onClick, className, variant = 'card' }, ref) {
    const sizeMeta = size ? SIZE_META[size] : undefined;
    const energyMeta = energy ? ENERGY_META[energy] : undefined;
    const safeTraits = traits ?? [];
    const a11y = `${name}${species ? `, ${species}` : ''}${sizeMeta ? `, ${sizeMeta.label}` : ''}${energyMeta ? `, ${energyMeta.label}` : ''}`;
    const interactive = onClick != null;
    // ── compact ─────────────────────────────────────────────────────────────────
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: onClick, onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-sm)] shadow-md', interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-lg", "aria-hidden": "true", children: photoUrl ? (0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: "", className: "h-full w-full object-cover" }) : glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: name }), species ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: species }) : null] }), sizeMeta ? ((0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: "primary", variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sizeMeta.glyph }), " ", sizeMeta.label] })) : null, energyMeta ? ((0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(energyMeta.tone), variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: energyMeta.glyph }), " ", energyMeta.label] })) : null] }));
    }
    // ── card (default) ────────────────────────────────────────────────────────────
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: onClick, onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md', interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-xl", "aria-hidden": "true", children: photoUrl ? (0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: "", className: "h-full w-full object-cover" }) : glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), species ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: species }) : null] })] }), sizeMeta || energyMeta ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [sizeMeta ? ((0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: "primary", variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sizeMeta.glyph }), " ", sizeMeta.label] })) : null, energyMeta ? ((0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(energyMeta.tone), variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: energyMeta.glyph }), " ", energyMeta.label] })) : null] })) : null, lifespan ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm text-on-surface", children: ["\u23F3 ", lifespan] }) })) : null, safeTraits.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: safeTraits.slice(0, 5).map((t, i) => ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs text-on-surface", children: t }, i))) })) : null] }));
});
//# sourceMappingURL=BreedCardV4.js.map
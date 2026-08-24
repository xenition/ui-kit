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
exports.AdoptionCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const STATUS = {
    available: { label: 'Available', tone: 'success' },
    pending: { label: 'Pending', tone: 'warn' },
    adopted: { label: 'Adopted', tone: 'neutral' },
    fostered: { label: 'Fostered', tone: 'primary' },
};
/**
 * AdoptionCard, redesigned (v2): a **full-bleed cover card**. The photo fills a
 * tall banner with a favorite ♥ floating top-right and the status chip top-left;
 * the name, breed·age·sex, shelter, fee, and Apply CTA sit on the surface below.
 * Elevated, hover-lift. Same props as {@link AdoptionCard}, token-only.
 */
exports.AdoptionCardV2 = React.forwardRef(function AdoptionCardV2({ name, breed, age, sex, shelter, photoUrl, glyph = '🐾', fee, status, favorited, applyLabel = 'Apply to adopt', onApply, onFavorite, onClick, className }, ref) {
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const meta = [breed, age, sex].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-adoption-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name}${breed ? `, ${breed}` : ''}, ${st.label}`, onClick: onClick, onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative h-40 bg-neutral-100", children: [photoUrl ? ((0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: name, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center text-5xl", children: glyph })), (0, jsx_runtime_1.jsx)("div", { className: "absolute left-2 top-2", children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: st.tone, children: st.label }) }), onFavorite ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": favorited ? 'Unfavorite' : 'Favorite', "aria-pressed": !!favorited, onClick: (e) => { e.stopPropagation(); onFavorite(); }, className: "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-base", children: (0, jsx_runtime_1.jsx)("span", { className: favorited ? 'text-danger' : 'text-muted', children: favorited ? '♥' : '♡' }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: name }), fee ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: fee }) : null] }), meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: meta.join(' · ') }) : null, shelter ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["\uD83C\uDFE0 ", shelter] }) : null, status !== 'adopted' && onApply ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "mt-1 w-full", onClick: (e) => { e.stopPropagation(); onApply(); }, children: applyLabel })) : null] })] }));
});
//# sourceMappingURL=AdoptionCardV2.js.map
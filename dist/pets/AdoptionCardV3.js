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
exports.AdoptionCardV3 = void 0;
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
 * AdoptionCard, redesigned (v3): a **dense adoption row**. A small thumbnail, the
 * name over a breed·age·shelter line, the status badge, a compact favorite ♥, and
 * a small Apply button — hairline-bordered for a shelter list. The opposite of
 * v2's cover card. Same props, token-only.
 */
exports.AdoptionCardV3 = React.forwardRef(function AdoptionCardV3({ name, breed, age, sex, shelter, photoUrl, glyph = '🐾', fee, status, favorited, applyLabel = 'Apply', onApply, onFavorite, onClick, className }, ref) {
    void sex;
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const meta = [breed, age, shelter].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-adoption-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name}${breed ? `, ${breed}` : ''}, ${st.label}`, onClick: onClick, onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-2xl", children: photoUrl ? (0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: name, className: "h-full w-full object-cover" }) : glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta.join(' · ') }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: st.tone, children: st.label }), onFavorite ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": favorited ? 'Unfavorite' : 'Favorite', "aria-pressed": !!favorited, onClick: (e) => { e.stopPropagation(); onFavorite(); }, className: (0, cn_1.cn)('text-lg', favorited ? 'text-danger' : 'text-muted'), children: favorited ? '♥' : '♡' })) : null, status !== 'adopted' && onApply ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", onClick: (e) => { e.stopPropagation(); onApply(); }, children: applyLabel })) : null] }));
});
//# sourceMappingURL=AdoptionCardV3.js.map
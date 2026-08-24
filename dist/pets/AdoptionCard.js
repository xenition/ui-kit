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
exports.AdoptionCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const STATUS_META = {
    available: { label: 'Available', tone: 'success' },
    pending: { label: 'Pending', tone: 'warn' },
    adopted: { label: 'Adopted', tone: 'neutral' },
    fostered: { label: 'In foster', tone: 'accent' },
};
/**
 * An adoption listing card: photo banner (or emoji placeholder), name + breed,
 * age/sex meta, shelter, a status chip, an optional fee, and adopt + favorite
 * actions (real `<button>`s that don't bubble to the card). The whole card is
 * activatable when `onClick` is set. Availability reads via a labelled chip (not
 * color alone). Token-only colors; a styled `div` stands in for the pet photo.
 */
exports.AdoptionCard = React.forwardRef(function AdoptionCard({ name, breed, age, sex, shelter, photoUrl, glyph = '🐾', fee, status, favorited = false, applyLabel = 'Apply to adopt', onApply, onFavorite, onClick, className, }, ref) {
    const statusMeta = STATUS_META[status];
    const meta = [age, sex, breed].filter(Boolean).join(' · ');
    const showApply = onApply != null && status !== 'adopted';
    const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: onClick, onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('overflow-hidden bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)]', interactive && 'cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex h-[120px] items-center justify-center bg-border", children: [photoUrl ? ((0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-3xl", "aria-hidden": "true", children: glyph })), (0, jsx_runtime_1.jsx)("div", { className: "absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(statusMeta.tone), children: statusMeta.label }) }), onFavorite ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": favorited, "aria-label": favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`, onClick: (e) => {
                            e.stopPropagation();
                            onFavorite();
                        }, className: (0, cn_1.cn)('absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex h-8 w-8 items-center justify-center rounded-full bg-surface text-base', favorited ? 'text-danger' : 'text-muted'), children: favorited ? '♥' : '♡' })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: meta }) : null, shelter ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["\uD83D\uDCCD ", shelter] }) : null, fee || showApply ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex items-center justify-between gap-[var(--xen-space-sm)]", children: [fee ? (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: fee }) : (0, jsx_runtime_1.jsx)("span", {}), showApply ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onClick: (e) => {
                                    e.stopPropagation();
                                    onApply?.();
                                }, children: applyLabel })) : null] })) : null] })] }));
});
//# sourceMappingURL=AdoptionCard.js.map
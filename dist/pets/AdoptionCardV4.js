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
exports.AdoptionCardV4 = void 0;
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
 * AdoptionCard — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on an adoption listing: an elevated rounded card with a
 * soft shadow, a photo banner (or a big glyph in a soft-primary tinted well), a
 * frosted favorite heart, a labelled status chip, and the fee shown as a
 * soft-primary chip beside a rounded adopt CTA. Same props/behavior as
 * {@link AdoptionCardProps}; availability reads via a labelled chip (never color
 * alone). All colors from `--xen-*` token classes (no literals); the whole card
 * is a keyboard-activatable button when `onClick` is set.
 */
exports.AdoptionCardV4 = React.forwardRef(function AdoptionCardV4({ name, breed, age, sex, shelter, photoUrl, glyph = '🐾', fee, status, favorited = false, applyLabel = 'Apply to adopt', onApply, onFavorite, onClick, className, variant = 'cover', }, ref) {
    const statusMeta = STATUS_META[status];
    const meta = [age, sex, breed].filter(Boolean).join(' · ');
    const showApply = onApply != null && status !== 'adopted';
    const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
    const interactive = onClick != null;
    const statusBadge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(statusMeta.tone), variant: "soft", children: statusMeta.label }));
    const feeChip = fee ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold text-on-surface", children: fee })) : null;
    const applyButton = showApply ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onClick: (e) => {
            e.stopPropagation();
            onApply?.();
        }, children: applyLabel })) : null;
    const favoriteButton = (extraClass) => onFavorite ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": favorited, "aria-label": favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`, onClick: (e) => {
            e.stopPropagation();
            onFavorite();
        }, className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-full bg-surface/90 text-lg shadow-sm', favorited ? 'text-danger' : 'text-muted', extraClass), children: favorited ? '♥' : '♡' })) : null;
    const shellClass = (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-md', interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className);
    const shellProps = {
        ref,
        role: interactive ? 'button' : undefined,
        tabIndex: interactive ? 0 : undefined,
        'aria-label': a11y,
        onClick,
        onKeyDown: interactive ? (0, _tokens_1.activateOnKey)(onClick) : undefined,
    };
    // ── list ──────────────────────────────────────────────────────────────────
    if (variant === 'list') {
        return ((0, jsx_runtime_1.jsx)("div", { ...shellProps, className: shellClass, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-md)] p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative h-[88px] w-[88px] flex-none overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-primary/10", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: photoUrl ? ((0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-3xl", "aria-hidden": "true", children: glyph })) }), favoriteButton('absolute right-1 top-1 h-9 w-9')] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: name }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: meta }) : null, shelter ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["\uD83D\uDCCD ", shelter] }) : null, (0, jsx_runtime_1.jsx)("div", { children: statusBadge }), fee || showApply ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex items-center justify-between gap-[var(--xen-space-sm)]", children: [feeChip ?? (0, jsx_runtime_1.jsx)("span", {}), applyButton] })) : null] })] }) }));
    }
    // ── compact ─────────────────────────────────────────────────────────────────
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsx)("div", { ...shellProps, className: shellClass, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary/10 text-lg", "aria-hidden": "true", children: glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: name }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta }) : null] }), statusBadge, feeChip, favoriteButton('')] }) }));
    }
    // ── cover (default) ──────────────────────────────────────────────────────────
    return ((0, jsx_runtime_1.jsxs)("div", { ...shellProps, className: shellClass, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex h-[132px] items-center justify-center bg-primary/10", children: [photoUrl ? ((0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-4xl", "aria-hidden": "true", children: glyph })), (0, jsx_runtime_1.jsx)("div", { className: "absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(statusMeta.tone), variant: "soft", children: statusMeta.label }) }), onFavorite ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": favorited, "aria-label": favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`, onClick: (e) => {
                            e.stopPropagation();
                            onFavorite();
                        }, className: (0, cn_1.cn)('absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-lg shadow-sm', favorited ? 'text-danger' : 'text-muted'), children: favorited ? '♥' : '♡' })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: meta }) : null, shelter ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["\uD83D\uDCCD ", shelter] }) : null, fee || showApply ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex items-center justify-between gap-[var(--xen-space-sm)]", children: [fee ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold text-on-surface", children: fee })) : ((0, jsx_runtime_1.jsx)("span", {})), showApply ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onClick: (e) => {
                                    e.stopPropagation();
                                    onApply?.();
                                }, children: applyLabel })) : null] })) : null] })] }));
});
//# sourceMappingURL=AdoptionCardV4.js.map
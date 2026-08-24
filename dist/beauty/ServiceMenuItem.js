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
exports.ServiceMenuItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const CATEGORY_META = {
    hair: { glyph: '💇', label: 'Hair', text: 'text-primary' },
    nails: { glyph: '💅', label: 'Nails', text: 'text-accent' },
    skin: { glyph: '✨', label: 'Skin', text: 'text-success' },
    massage: { glyph: '💆', label: 'Massage', text: 'text-primary' },
    makeup: { glyph: '💄', label: 'Makeup', text: 'text-danger' },
    brows: { glyph: '👁️', label: 'Brows', text: 'text-accent' },
    waxing: { glyph: '🕯️', label: 'Waxing', text: 'text-warn' },
    spa: { glyph: '🧖', label: 'Spa', text: 'text-success' },
};
/**
 * A single salon/spa service-menu row: category icon + tag, name, optional
 * description, a duration chip, and a right-aligned price (integer cents via
 * {@link formatMoney}). `popular` adds a soft marker; `unavailable` dims the row
 * and blocks the press. When interactive the whole row is a `role="button"` with
 * keyboard support and a spoken label carrying the price/duration. Token-only
 * colors — no literals.
 */
exports.ServiceMenuItem = React.forwardRef(function ServiceMenuItem({ name, priceCents, currency = 'USD', category = 'spa', durationMin, description, popular = false, unavailable = false, pricePrefix, formatMoney: format = commerce_1.formatMoney, onClick, className, ...rest }, ref) {
    const meta = CATEGORY_META[category] ?? CATEGORY_META.spa;
    const priceText = `${pricePrefix ? `${pricePrefix} ` : ''}${format(priceCents, currency)}`;
    const interactive = !unavailable && !!onClick;
    const a11yLabel = `${name}, ${meta.label}${durationMin != null ? `, ${durationMin} minutes` : ''}, ${priceText}${unavailable ? ', unavailable' : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-service-menu-item": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11yLabel, "aria-disabled": unavailable || undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', interactive && 'cursor-pointer transition-opacity hover:opacity-95', unavailable && 'opacity-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-lg", children: (0, jsx_runtime_1.jsx)("span", { className: meta.text, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name }), popular ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 rounded-[var(--xen-radius-sm)] bg-accent-50 px-[var(--xen-space-xs)] py-px text-xs font-bold text-accent", children: "Popular" })) : null] }), description ? ((0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-muted", children: description })) : null, durationMin != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [durationMin, " min"] })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-base font-bold text-on-surface", children: priceText })] }));
});
//# sourceMappingURL=ServiceMenuItem.js.map
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
exports.TreatmentCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const TREATMENT_META = {
    facial: { glyph: '🧖', label: 'Facial', text: 'text-success' },
    massage: { glyph: '💆', label: 'Massage', text: 'text-primary' },
    body: { glyph: '🌿', label: 'Body', text: 'text-accent' },
    nails: { glyph: '💅', label: 'Nails', text: 'text-accent' },
    hair: { glyph: '💇', label: 'Hair', text: 'text-primary' },
    wellness: { glyph: '🧘', label: 'Wellness', text: 'text-success' },
};
/**
 * A spa/salon treatment card: a hero image band with a category tag, the
 * treatment name, a duration · price meta line, an optional description, and a
 * "Book" CTA. `variant` sets the icon/tag/accent; a missing image degrades to a
 * token-tinted band with the category glyph. When `onClick` is set the body is a
 * `role="button"` with keyboard support. Prices are integer cents via
 * {@link formatMoney}. Token-only colors.
 */
exports.TreatmentCard = React.forwardRef(function TreatmentCard({ name, priceCents, currency = 'USD', variant = 'wellness', durationMin, description, imageUrl, formatMoney: format = commerce_1.formatMoney, bookLabel = 'Book', onBook, onClick, className, ...rest }, ref) {
    const meta = TREATMENT_META[variant] ?? TREATMENT_META.wellness;
    const priceText = format(priceCents, currency);
    const interactive = !!onClick;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-treatment-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${meta.label}: ${name}${durationMin != null ? `, ${durationMin} minutes` : ''}, ${priceText}`, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', interactive && 'cursor-pointer transition-opacity hover:opacity-95', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex h-[132px] items-center justify-center bg-neutral-100", children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: name, className: "absolute inset-0 h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-3xl", children: meta.glyph })), (0, jsx_runtime_1.jsx)("span", { className: "absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)] rounded-full bg-on-surface px-[var(--xen-space-sm)] py-0.5 text-xs font-bold text-surface opacity-80", children: meta.label })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [durationMin != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: [durationMin, " min"] })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', meta.text), children: priceText })] }), description ? ((0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-muted", children: description })) : null, onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onClick: (e) => {
                            e.stopPropagation();
                            onBook();
                        }, children: bookLabel })) : null] })] }));
});
//# sourceMappingURL=TreatmentCard.js.map
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
exports.ListingHero = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const STATUS_TONE = {
    active: 'success',
    pending: 'warn',
    sold: 'danger',
    new: 'primary',
};
const STATUS_LABEL = {
    active: 'Active',
    pending: 'Pending',
    sold: 'Sold',
    new: 'New',
};
/**
 * ListingHero — the property-detail **peak** for the real-estate V4 "listing"
 * line (web parity of the native twin). A full-bleed hero photo with a bottom
 * `listingScrim` gradient carries the near-white price + address; a status chip,
 * a frosted photo counter, and saved/share controls float over the media; the
 * beds/baths/sqft facts read as frosted tiles and a near-white Tour pill anchors
 * the bottom. With no `imageUrl` it falls back to the brand gradient ground
 * (`from-primary-500 to-primary-700`). Presentational — shaped data + callbacks,
 * nothing fetches. Token-only colors (`--xen-*` classes + gradient utilities),
 * dark-mode safe. The `sale`/`rent` variant only changes the price suffix.
 */
exports.ListingHero = React.forwardRef(function ListingHero({ imageUrl, priceCents, currency = 'USD', variant = 'sale', address, locality, status, beds, baths, sqft, photoCount, saved = false, onSave, onShare, onTour, tourLabel = 'Schedule tour', className, ...rest }, ref) {
    const facts = [];
    if (typeof beds === 'number')
        facts.push({ glyph: '🛏', value: `${beds} bd` });
    if (typeof baths === 'number')
        facts.push({ glyph: '🛁', value: `${baths} ba` });
    if (typeof sqft === 'number')
        facts.push({ glyph: '📐', value: `${sqft.toLocaleString()} sqft` });
    const priceText = `${(0, commerce_1.formatMoney)(priceCents, currency)}${variant === 'rent' ? '/mo' : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative isolate flex min-h-[380px] flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 text-primary-50', className), ...rest, children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: address, className: "absolute inset-0 -z-10 h-full w-full object-cover" })) : null, (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-neutral-900/70 to-transparent" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)] p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [status ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], variant: "soft", children: STATUS_LABEL[status] })) : null, typeof photoCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-1 text-xs font-semibold text-primary-50", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCF7" }), photoCount.toLocaleString()] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [onSave ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": saved ? 'Remove from saved' : 'Save listing', "aria-pressed": saved, onClick: onSave, className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: saved ? '❤️' : '🤍', size: "lg", color: "onPrimary", "aria-hidden": "true" }) })) : null, onShare ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Share listing", onClick: onShare, className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2197", size: "lg", color: "onPrimary", "aria-hidden": "true" }) })) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-auto flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("p", { "aria-label": `Price ${priceText}`, className: "text-3xl font-extrabold tracking-tight text-primary-50", children: priceText }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-primary-50", children: address }), locality ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-primary-100", children: locality }) : null] }), facts.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: facts.map((f) => ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-semibold text-primary-50", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: f.glyph }), f.value] }, f.value))) })) : null, onTour ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": tourLabel, onClick: onTour, className: "flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-on-primary py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100", children: tourLabel })) : null] })] }));
});
//# sourceMappingURL=ListingHero.js.map
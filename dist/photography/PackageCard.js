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
exports.PackageCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A photography pricing package — name, tagline, a headline {@link PriceTag}
 * with a unit suffix, a checked feature list, and a select CTA. `featured`
 * rings the card in the accent token and shows a "Popular" `Badge` (a labelled
 * marker, not color alone). Falls back to an empty-features line. Composes
 * `Card`, `Badge`, `Button`, `Icon`, `PriceTag`. Token-only colors.
 */
exports.PackageCard = React.forwardRef(function PackageCard({ name, tagline, priceCents, currency = 'USD', priceSuffix, features, featured = false, featuredLabel = 'Popular', onSelect, ctaLabel = 'Choose package', emptyFeaturesLabel = 'Details coming soon', formatMoney, className, ...rest }, ref) {
    const list = features ?? [];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-package-card": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', featured ? 'border-2 border-accent' : 'border border-border', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-bold text-on-surface", children: name }), tagline ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: tagline }) : null] }), featured ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: featuredLabel }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "lg" }), priceSuffix ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: priceSuffix }) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: list.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyFeaturesLabel })) : (list.map((feature, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm text-on-surface", children: feature })] }, i)))) }), onSelect ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: featured ? 'primary' : 'outline', onClick: onSelect, children: ctaLabel })) : null] }));
});
//# sourceMappingURL=PackageCard.js.map
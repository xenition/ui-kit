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
exports.PackageCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * PackageCard, redesigned (v2): a **bold pricing card**. A centered name/tagline
 * over a large {@link PriceTag} hero and suffix, then a checked feature list and
 * a full-width CTA; featured packages gain an accent ring + ribbon. A punchier
 * pricing block than v1. Same props, token-only.
 */
exports.PackageCardV2 = React.forwardRef(function PackageCardV2({ name, tagline, priceCents, currency = 'USD', priceSuffix, features = [], featured = false, featuredLabel = 'Popular', onSelect, ctaLabel = 'Choose package', emptyFeaturesLabel, formatMoney, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-package-card": "", className: (0, cn_1.cn)('relative flex flex-col items-center gap-3 rounded-lg bg-surface p-md text-center shadow-md', featured && 'ring-2 ring-accent', className), ...rest, children: [featured ? (0, jsx_runtime_1.jsx)("div", { className: "absolute -top-2", children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", children: featuredLabel }) }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: name }), tagline ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: tagline }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "lg" }), priceSuffix ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: priceSuffix }) : null] }), features.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex w-full flex-col gap-1.5 text-left", children: features.map((f, i) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-2 text-sm text-on-surface", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "success" }), " ", f] }, i))) })) : emptyFeaturesLabel ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: emptyFeaturesLabel })) : null, onSelect ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: featured ? 'primary' : 'outline', className: "w-full", onClick: onSelect, children: ctaLabel })) : null] }));
});
//# sourceMappingURL=PackageCardV2.js.map
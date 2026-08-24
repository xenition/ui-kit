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
exports.PackageCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * PackageCard, redesigned (v3): a **compact package row**. The name (+ a Popular
 * chip) over a tagline·first-feature line, the price pinned right with its
 * suffix, and a small CTA — hairline-bordered for a packages list. The opposite
 * of v2's bold pricing card. Same props, token-only.
 */
exports.PackageCardV3 = React.forwardRef(function PackageCardV3({ name, tagline, priceCents, currency = 'USD', priceSuffix, features = [], featured = false, featuredLabel = 'Popular', onSelect, ctaLabel = 'Choose', emptyFeaturesLabel, formatMoney, className, ...rest }, ref) {
    void emptyFeaturesLabel;
    const sub = [tagline, features[0]].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-package-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', featured && 'border-l-2 border-l-accent pl-2', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-1.5 truncate text-sm font-semibold text-on-surface", children: [name, featured ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", children: featuredLabel }) : null] }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "sm" }), priceSuffix ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: priceSuffix }) : null] }), onSelect ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", onClick: onSelect, children: ctaLabel })) : null] }));
});
//# sourceMappingURL=PackageCardV3.js.map
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
exports.PricingTier = exports.PricingTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Responsive row of `PricingTier` cards. */
exports.PricingTable = React.forwardRef(function PricingTable({ className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-pricing": "", className: (0, cn_1.cn)('grid grid-cols-1 items-stretch gap-[var(--xen-space-lg)] md:grid-cols-2 lg:grid-cols-3', className), ...rest }));
});
const CheckIcon = () => ((0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "mt-0.5 shrink-0 text-success", children: (0, jsx_runtime_1.jsx)("path", { d: "M3 8.5l3.5 3.5L13 4.5" }) }));
/** One pricing tier card. */
exports.PricingTier = React.forwardRef(function PricingTier({ name, price, period, description, features = [], featured = false, featuredLabel = 'Most popular', action, className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-pricing-tier": "", "data-featured": featured ? 'true' : 'false', className: (0, cn_1.cn)('relative flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface', 'rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]', featured
            ? 'border-2 border-primary shadow-lg ring-2 ring-primary-300 lg:scale-105'
            : 'border border-border', className), ...rest, children: [featured ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-[var(--xen-radius-full)] bg-primary px-3 py-0.5 text-xs font-semibold text-on-primary", children: featuredLabel })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-semibold", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-3xl font-bold", children: price }), period !== undefined ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: period }) : null] }), description !== undefined ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: description }) : null, features.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-[var(--xen-space-xs)] text-sm", children: features.map((feature, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(CheckIcon, {}), (0, jsx_runtime_1.jsx)("span", { children: feature })] }, index))) })) : null, children, action !== undefined ? (0, jsx_runtime_1.jsx)("div", { className: "mt-auto pt-[var(--xen-space-sm)]", children: action }) : null] }));
});
//# sourceMappingURL=PricingTable.js.map
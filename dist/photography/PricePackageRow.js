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
exports.PricePackageRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A compact à-la-carte price line — label, optional detail, and a right-aligned
 * {@link PriceTag} with a unit suffix. `highlighted` gives the row an accent
 * tint and shows an optional `badgeLabel` (a labelled marker, not color alone).
 * Passing `onClick` exposes it as a keyboard-operable `button` for quote
 * building. Composes `Badge` and `PriceTag`. Token-only colors.
 */
exports.PricePackageRow = React.forwardRef(function PricePackageRow({ label, description, priceCents, currency = 'USD', unitSuffix, highlighted = false, badgeLabel, formatMoney, onClick, className, ...rest }, ref) {
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-price-package-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? label : undefined, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center justify-between gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', highlighted ? 'border-accent bg-accent-50' : 'border-border bg-surface', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: label }), highlighted && badgeLabel ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: badgeLabel }) : null] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: description }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "sm" }), unitSuffix ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: unitSuffix }) : null] })] }));
});
//# sourceMappingURL=PricePackageRow.js.map
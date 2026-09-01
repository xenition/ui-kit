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
exports.PricePackageRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * PricePackageRow — **V4** "studio" design (web parity of the native V4). The
 * clean à-la-carte price line: an elevated surface row (no gradient — pricing
 * stays a crisp, legible surface) with the label set semibold, a muted detail
 * line, and the {@link PriceTag} right-aligned. A `highlighted` row keeps the
 * clean surface but earns a primary ring, a leading ✓ glyph, and a labelled
 * soft-primary chip (`badgeLabel`) — a marker, never color alone. Identical
 * props/behavior to {@link PricePackageRowProps}: honors `formatMoney` and
 * `unitSuffix`; passing `onClick` exposes it as a keyboard-operable `button`
 * (≥44px target) for quote building. All colors from `--xen-*` token classes.
 */
exports.PricePackageRowV4 = React.forwardRef(function PricePackageRowV4({ label, description, priceCents, currency = 'USD', unitSuffix, highlighted = false, badgeLabel, formatMoney, onClick, className, ...rest }, ref) {
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-price-package-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? label : undefined, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex min-h-[44px] items-center justify-between gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-on-surface shadow-md', highlighted ? 'border-2 border-primary ring-1 ring-inset ring-primary' : 'border border-border', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [highlighted ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "primary" }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: label }), highlighted && badgeLabel ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", children: badgeLabel })) : null] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: description }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "sm" }), unitSuffix ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: unitSuffix }) : null] })] }));
});
//# sourceMappingURL=PricePackageRowV4.js.map
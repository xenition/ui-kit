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
exports.PrintOrderRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const STATUS = {
    pending: { label: 'Pending', tone: 'neutral', glyph: '⏳' },
    printing: { label: 'Printing', tone: 'warn', glyph: '🖨' },
    shipped: { label: 'Shipped', tone: 'primary', glyph: '📦' },
    delivered: { label: 'Delivered', tone: 'success', glyph: '✅' },
};
/**
 * PrintOrderRow — **V4** "studio" design (web parity of the native V4). The
 * matted take on a print-order line: an elevated clean-surface row with a leading
 * glyph tile floating inside a thin neutral **mat**, a bold product name, a soft
 * muted meta line (size · finish · ×qty), and a trailing line total
 * ({@link PriceTag} of `unitPriceCents × quantity`) above a labelled status
 * `Badge`. Every `status` value carries glyph + token tone + label (never color
 * alone). Quantity is clamped to at least 1. Identical props/behavior to
 * {@link PrintOrderRowProps}; passing `onClick` makes the whole row a
 * keyboard-operable `button`. All colors from `--xen-*` token classes.
 */
exports.PrintOrderRowV4 = React.forwardRef(function PrintOrderRowV4({ product, size, finish, quantity = 1, unitPriceCents, currency = 'USD', status = 'pending', formatMoney, onClick, className, ...rest }, ref) {
    const qty = Math.max(1, Math.floor(quantity));
    const meta = STATUS[status];
    const interactive = typeof onClick === 'function';
    const metaBits = [];
    if (size)
        metaBits.push(size);
    if (finish)
        metaBits.push(finish);
    metaBits.push(`×${qty}`);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-print-order-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${product}, ${qty}, ${meta.label}` : undefined, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface shadow-md', interactive &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100 text-lg ring-1 ring-inset ring-border", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: product }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: metaBits.join(' · ') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 flex-col items-end gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: unitPriceCents * qty, currency: currency, formatMoney: formatMoney, size: "sm" }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", children: meta.label })] })] }));
});
//# sourceMappingURL=PrintOrderRowV4.js.map
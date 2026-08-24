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
exports.MaterialsRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const MATERIAL_STOCK = {
    'in-stock': { label: 'In stock', glyph: '✓', tone: 'success' },
    low: { label: 'Low', glyph: '▲', tone: 'warn' },
    'back-ordered': { label: 'Back-ordered', glyph: '⋯', tone: 'danger' },
};
/**
 * One line in a materials / parts list: a leading box glyph disc, a name/SKU
 * stack with a quantity × unit-price breakdown, an optional stock pill (text +
 * glyph + a color that traces to a semantic token — never color alone), and a
 * right-aligned extended total (`qty × unit` in integer cents through
 * `formatMoney`, guarded against negatives). Becomes a `role="button"` surface
 * only when `onClick` is supplied. No literals.
 */
exports.MaterialsRow = React.forwardRef(function MaterialsRow({ name, sku, quantity, unit = 'ea', unitCents, stock, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, className, style, }, ref) {
    const sd = stock ? MATERIAL_STOCK[stock] : undefined;
    const qty = Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
    const unitSafe = Math.max(0, Math.trunc(unitCents || 0));
    const totalCents = Math.round(qty * unitSafe);
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${name}, ${qty} ${unit}, ${format(totalCents, currency)}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer', className), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)]', format_1.DISC_TINT.primary), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCE6", "aria-label": "Material" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [qty, " ", unit, " \u00D7 ", format(unitSafe, currency)] }), sku != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\u00B7 ", sku] }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: format(totalCents, currency) }), sd ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, children: `${sd.glyph} ${sd.label}` }) : null] })] }));
});
//# sourceMappingURL=MaterialsRow.js.map
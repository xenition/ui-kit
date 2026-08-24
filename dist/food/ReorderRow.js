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
exports.ReorderRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const commerce_1 = require("../commerce");
/**
 * A past-order row with a one-tap reorder action — thumbnail, title, an items
 * summary, date and total, and a `Reorder` button. The whole row is optionally
 * activatable to open the order. `disabled` dims the row and blocks reordering.
 * Reuses the `Button` primitive and the shared money formatter. Web parity of
 * the native `ReorderRow`; token-only. When `onClick` is set the root is a
 * keyboard-operable `role="button"` so the nested reorder button still works.
 */
exports.ReorderRow = React.forwardRef(function ReorderRow({ title, itemsSummary, dateText, totalCents, currency = 'USD', imageUrl, onReorder, reorderLabel = 'Reorder', onClick, disabled = false, formatMoney = commerce_1.formatMoney, className, ...rest }, ref) {
    const meta = [dateText, typeof totalCents === 'number' ? formatMoney(totalCents, currency) : undefined]
        .filter(Boolean)
        .join(' · ');
    const containerClass = (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', disabled && 'opacity-60', className);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "h-14 w-14 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: title, loading: "lazy", className: "h-full w-full object-cover" })) : null }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-base font-semibold text-on-surface", children: title }), itemsSummary ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: itemsSummary }) : null, meta ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: meta }) : null] }), onReorder ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "secondary", size: "sm", onClick: onReorder, disabled: disabled, children: reorderLabel })) : null] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(containerClass, interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), ...rest, ...(interactive
            ? {
                role: 'button',
                tabIndex: disabled ? -1 : 0,
                'aria-label': `${title}${meta ? `, ${meta}` : ''}`,
                'aria-disabled': disabled || undefined,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), children: inner }));
});
//# sourceMappingURL=ReorderRow.js.map
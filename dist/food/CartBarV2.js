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
exports.CartBarV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * CartBar, alternate design **V2** — an *elevated floating pill*. Instead of a
 * full-width filled bar, V2 is a rounded-full, self-centred pill that hovers
 * above the content with a real drop shadow and a subtle hover lift — the
 * classic "N items · total" FAB-style checkout affordance. Empty and `loading`
 * states behave exactly as the base (collapses to a muted, non-interactive
 * pill). Same props as the base `CartBar`; token-only.
 */
exports.CartBarV2 = React.forwardRef(function CartBarV2({ itemCount, totalCents, currency = 'USD', label = 'View cart', onClick, variant = 'primary', loading = false, emptyLabel = 'Your cart is empty', formatMoney = commerce_1.formatMoney, className, ...rest }, ref) {
    const empty = itemCount <= 0;
    const disabled = empty || loading;
    const accent = variant === 'accent';
    if (empty) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('mx-auto flex w-full max-w-[480px] items-center justify-center rounded-full border border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] text-center text-sm text-muted shadow-sm', className), ...rest, children: emptyLabel }));
    }
    const pillClass = (0, cn_1.cn)('mx-auto flex w-full max-w-[480px] items-center justify-between gap-[var(--xen-space-md)] rounded-full px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] shadow-lg', accent ? 'bg-accent text-on-accent' : 'bg-primary text-on-primary', className);
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex h-[26px] min-w-[26px] items-center justify-center rounded-full px-1 text-sm font-extrabold', accent ? 'bg-on-accent text-accent' : 'bg-on-primary text-primary'), children: itemCount }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold", children: loading ? 'Updating…' : label })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold tabular-nums", children: formatMoney(totalCents, currency) })] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(pillClass, interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', disabled && 'opacity-60'), ...rest, ...(interactive
            ? {
                role: 'button',
                tabIndex: disabled ? -1 : 0,
                'aria-label': `${label}, ${itemCount} items, ${formatMoney(totalCents, currency)}`,
                'aria-disabled': disabled || undefined,
                'aria-busy': loading || undefined,
                onClick: disabled ? undefined : onClick,
                onKeyDown: (e) => {
                    if (disabled)
                        return;
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), children: content }));
});
//# sourceMappingURL=CartBarV2.js.map
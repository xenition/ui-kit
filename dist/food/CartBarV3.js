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
exports.CartBarV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const commerce_1 = require("../commerce");
const MAX_DOTS = 6;
/**
 * CartBar, alternate design **V3** — a *full-width itemised bar*. A surface-
 * toned bar with a top hairline that splits into a summary block (a row of dots
 * previewing how many items are in the cart, plus the running total) and a
 * distinct filled action `Button` — rather than the single filled pill of the
 * base. The Button is the sole activation target so `onClick` never double-
 * fires; empty/`loading` behave as the base. Same props; token-only.
 */
exports.CartBarV3 = React.forwardRef(function CartBarV3({ itemCount, totalCents, currency = 'USD', label = 'View cart', onClick, variant = 'primary', loading = false, emptyLabel = 'Your cart is empty', formatMoney = commerce_1.formatMoney, className, ...rest }, ref) {
    const empty = itemCount <= 0;
    const disabled = empty || loading;
    const accent = variant === 'accent';
    const barClass = (0, cn_1.cn)('flex items-center justify-between gap-[var(--xen-space-md)] border-t border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)]', className);
    if (empty) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(barClass, 'text-sm text-muted'), ...rest, children: (0, jsx_runtime_1.jsx)("span", { className: "flex-1", children: emptyLabel }) }));
    }
    const dotCount = Math.min(MAX_DOTS, Math.max(1, itemCount));
    const dots = Array.from({ length: dotCount }, (_, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-1.5 w-1.5 rounded-full', accent ? 'bg-accent/60' : 'bg-primary/60') }, i)));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": `${itemCount} ${itemCount === 1 ? 'item' : 'items'}, ${formatMoney(totalCents, currency)}`, "aria-busy": loading || undefined, className: barClass, ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [itemCount, " ", itemCount === 1 ? 'item' : 'items'] }), (0, jsx_runtime_1.jsx)("span", { className: "flex items-center gap-[3px]", children: dots }), itemCount > MAX_DOTS ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["+", itemCount - MAX_DOTS] })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold tabular-nums text-on-surface", children: formatMoney(totalCents, currency) })] }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", variant: accent ? 'secondary' : 'primary', disabled: disabled, "aria-busy": loading || undefined, onClick: onClick, children: loading ? 'Updating…' : label })] }));
});
//# sourceMappingURL=CartBarV3.js.map
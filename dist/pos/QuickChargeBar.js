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
exports.QuickChargeBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Spinner_1 = require("../primitives/Spinner");
const internal_1 = require("./internal");
/**
 * The register's charge affordance — the DOM parity of the native
 * `QuickChargeBar`. A sticky footer showing the running total (integer **cents**
 * via `formatMoney`) and item count beside a primary Charge button. An empty
 * cart (`itemCount === 0`) disables charging and swaps the total for an
 * `emptyLabel` hint, so the empty state is conveyed by text and the button's
 * `disabled` attribute, never color alone. The web `Button` has no `loading`
 * prop, so `loading` maps to `disabled` + an inline `Spinner`. Composed from the
 * `Button` primitive; token-only colors.
 */
exports.QuickChargeBar = React.forwardRef(function QuickChargeBar({ totalCents, currency = 'USD', itemCount, onCharge, chargeLabel = 'Charge', loading = false, disabled = false, emptyLabel = 'Cart empty', secondaryAction, variant = 'bar', testID, className, ...rest }, ref) {
    const isEmpty = itemCount === 0;
    const canCharge = !disabled && !isEmpty && !loading;
    const total = (0, internal_1.safeCents)(totalCents);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-quick-charge-bar": "", "data-testid": testID, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)]', variant === 'bar'
            ? 'border-t border-border bg-surface p-[var(--xen-space-md)]'
            : '', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: isEmpty ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "block text-xl font-bold tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(total, currency) }), typeof itemCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "block text-xs text-muted", children: [itemCount, " item", itemCount === 1 ? '' : 's'] })) : null] })) }), secondaryAction ? (0, jsx_runtime_1.jsx)("div", { children: secondaryAction }) : null, (0, jsx_runtime_1.jsxs)(Button_1.Button, { variant: "primary", size: "lg", onClick: onCharge, disabled: !canCharge, children: [loading ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm", className: "mr-[var(--xen-space-xs)]" }) : null, isEmpty ? chargeLabel : `${chargeLabel} ${(0, internal_1.formatMoney)(total, currency)}`] })] }));
});
//# sourceMappingURL=QuickChargeBar.js.map
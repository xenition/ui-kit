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
exports.WalletCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
/** Custody → tinted lead dot + label. */
const KIND_META = {
    hot: { dot: 'bg-primary', label: 'Hot' },
    hardware: { dot: 'bg-success', label: 'Hardware' },
    watch: { dot: 'bg-accent', label: 'Watch-only' },
};
/**
 * WalletCard, redesigned (v3): a **minimal list row** built around a copyable
 * address chip. A single custody-tinted dot leads a label + address stack, where
 * the truncated address sits in a bordered chip that hands the FULL address back
 * through `onCopy`; the fiat balance is right-aligned through {@link MoneyAmount}
 * (integer cents — no drift) over the native amount. No card, just a hairline
 * base rule, so a stack reads as a lean wallet list. Distinct at a glance from
 * the base's card and v2's gradient face. Same props.
 */
exports.WalletCardV3 = React.forwardRef(function WalletCardV3({ address, label = 'Wallet', balanceCents, currency = 'USD', nativeAmount, nativeSymbol, nativeDecimals = 4, kind, variant: _variant, loading = false, onCopy, onClick, className, ...rest }, ref) {
    const meta = kind ? KIND_META[kind] : undefined;
    const short = (0, format_1.truncateHash)(address, 6, 4);
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? label : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] border-b border-border py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-[var(--xen-radius-full)]', meta ? meta.dot : 'bg-muted') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col items-start gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Copy address ${address}`, onClick: onCopy ? () => onCopy(address) : undefined, disabled: !onCopy, className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-full)] border border-border bg-neutral-100 px-[var(--xen-space-sm)] py-0.5', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-on-surface", children: short }), onCopy ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-xs text-muted", children: "\u29C9" })) : null] })] }), loading ? ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading balance", className: "h-5 w-20 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [balanceCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: balanceCents, currency: currency, tone: "neutral", size: "md" })) : null, nativeAmount != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: (0, format_1.formatToken)(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol }) })) : null] }))] }));
});
//# sourceMappingURL=WalletCardV3.js.map
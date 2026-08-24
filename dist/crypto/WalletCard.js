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
exports.WalletCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Badge_1 = require("../primitives/Badge");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
const KIND_META = {
    hot: { label: 'Hot', tone: 'warn', glyph: '🔥' },
    hardware: { label: 'Hardware', tone: 'success', glyph: '🔒' },
    watch: { label: 'Watch-only', tone: 'neutral', glyph: '👁' },
};
/**
 * The header card for a single wallet: a friendly label + custody badge, the
 * total fiat balance (via {@link MoneyAmount}, so the printed value never
 * drifts), the native-token amount, and a pressable truncated-address chip that
 * hands the FULL address back through `onCopy`. Token-bound throughout; the
 * `accent` variant tints the surface from the primary ramp. Web parity of the
 * native `WalletCard`.
 */
exports.WalletCard = React.forwardRef(function WalletCard({ address, label = 'Wallet', balanceCents, currency = 'USD', nativeAmount, nativeSymbol, nativeDecimals = 4, kind, variant = 'elevated', loading = false, onCopy, onClick, className, ...rest }, ref) {
    const short = (0, format_1.truncateHash)(address, 6, 4);
    const kindMeta = kind ? KIND_META[kind] : undefined;
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, "aria-label": interactive ? label : undefined, className: (0, cn_1.cn)(variant === 'accent' && 'bg-primary-50', variant === 'outlined' && 'shadow-none', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-base font-bold text-on-surface", children: label }), kindMeta ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: kindMeta.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: kindMeta.glyph }), " ", kindMeta.label] })) : null] }), loading ? ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading balance", className: "h-8 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [balanceCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: balanceCents, currency: currency, tone: "neutral", size: "xl" })) : null, nativeAmount != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm tabular-nums text-muted", children: (0, format_1.formatToken)(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol }) })) : null] })), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Copy address ${address}`, onClick: onCopy ? () => onCopy(address) : undefined, disabled: !onCopy, className: (0, cn_1.cn)('inline-flex items-center gap-1 self-start rounded-full border border-border bg-neutral-100 px-[var(--xen-space-sm)] py-1', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm tabular-nums text-on-surface", children: short }), onCopy ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs text-muted", children: "\u29C9" })) : null] })] }) }));
});
//# sourceMappingURL=WalletCard.js.map
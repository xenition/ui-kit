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
exports.WalletCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
/** Custody → filled face slot (fill / on-fill text / sheen / chip tint). */
const KIND_META = {
    hot: { fill: 'bg-primary', on: 'text-on-primary', sheen: 'bg-on-primary', chip: 'bg-on-primary/20', glyph: '🔥', label: 'Hot' },
    hardware: { fill: 'bg-success', on: 'text-on-success', sheen: 'bg-on-success', chip: 'bg-on-success/20', glyph: '🔒', label: 'Hardware' },
    watch: { fill: 'bg-accent', on: 'text-on-accent', sheen: 'bg-on-accent', chip: 'bg-on-accent/20', glyph: '👁', label: 'Watch-only' },
};
/**
 * WalletCard, redesigned (v2): a **full gradient wallet-face**. The whole tile is
 * filled from a custody-mapped slot (hot → primary, hardware → success, watch →
 * accent) and lifted with a shadow; a translucent on-color sheen disc reads as a
 * gradient without a literal color. The fiat balance is set large in the
 * guaranteed on-fill text slot (via `formatMoney`, integer cents — no drift),
 * with the custody badge up top and a translucent copyable address chip along the
 * bottom that hands the FULL address back through `onCopy`. Distinct at a glance
 * from the base's small bordered card. Same props.
 */
exports.WalletCardV2 = React.forwardRef(function WalletCardV2({ address, label = 'Wallet', balanceCents, currency = 'USD', nativeAmount, nativeSymbol, nativeDecimals = 4, kind, variant: _variant, loading = false, onCopy, onClick, className, ...rest }, ref) {
    const meta = KIND_META[kind ?? 'hot'];
    const short = (0, format_1.truncateHash)(address, 6, 4);
    const interactive = (0, pressable_1.pressableProps)(onClick);
    const safeBalance = balanceCents != null && Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? label : undefined, className: (0, cn_1.cn)('relative flex min-h-[176px] flex-col justify-between gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)] shadow-lg', meta.fill, meta.on, interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-[var(--xen-radius-full)] opacity-10', meta.sheen) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-base font-bold", children: label }), kind ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-full)] px-[var(--xen-space-sm)] py-1 text-xs font-semibold', meta.chip), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: meta.glyph }), " ", meta.label] })) : null] }), loading ? ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading balance", className: (0, cn_1.cn)('relative h-8 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)]', meta.chip) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs opacity-80", children: "Balance" }), safeBalance != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-bold tabular-nums", children: (0, money_1.formatMoney)(safeBalance, currency) })) : null, nativeAmount != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm tabular-nums opacity-80", children: (0, format_1.formatToken)(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol }) })) : null] })), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Copy address ${address}`, onClick: onCopy ? () => onCopy(address) : undefined, disabled: !onCopy, className: (0, cn_1.cn)('relative inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-[var(--xen-radius-full)] px-[var(--xen-space-sm)] py-1', meta.chip, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm tabular-nums", children: short }), onCopy ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-xs opacity-80", children: "\u29C9" })) : null] })] }));
});
//# sourceMappingURL=WalletCardV2.js.map
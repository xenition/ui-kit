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
exports.AccountCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
const mask_1 = require("./internal/mask");
const pressable_1 = require("./internal/pressable");
const VARIANT_META = {
    checking: { fill: 'bg-primary', on: 'text-on-primary', sub: 'text-on-primary', sheen: 'bg-on-primary', glyph: '🏦', label: 'Checking' },
    savings: { fill: 'bg-success', on: 'text-on-success', sub: 'text-on-success', sheen: 'bg-on-success', glyph: '🐖', label: 'Savings' },
    credit: { fill: 'bg-accent', on: 'text-on-accent', sub: 'text-on-accent', sheen: 'bg-on-accent', glyph: '💳', label: 'Credit' },
};
/**
 * AccountCard, redesigned (v2): a **full credit-card face**. The whole tile is
 * filled with the variant's fill slot (primary / success / accent) and lifted
 * with a shadow; a translucent on-color sheen disc suggests a gradient without a
 * literal color. The balance is set large in the guaranteed on-fill text slot,
 * the name up top, and the masked number along the bottom like an embossed PAN.
 * Distinct at a glance from the base's small glyph tile. Same props, cents.
 */
exports.AccountCardV2 = React.forwardRef(function AccountCardV2({ name, variant, balanceCents, currency = 'USD', accountNumber, icon, onClick, className, ...rest }, ref) {
    const meta = VARIANT_META[variant];
    const interactive = (0, pressable_1.pressableProps)(onClick);
    const safeBalance = Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${name}, ${meta.label} account` : undefined, className: (0, cn_1.cn)('relative flex min-h-[172px] flex-col justify-between overflow-hidden rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)] shadow-lg', meta.fill, meta.on, interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-[var(--xen-radius-full)] opacity-10', meta.sheen) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold", children: name }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs opacity-80', meta.sub), children: meta.label })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl leading-none", children: icon ?? meta.glyph })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs opacity-80', meta.sub), children: "Balance" }), (0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-bold tabular-nums", children: (0, money_1.formatMoney)(safeBalance, currency) })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm tracking-widest tabular-nums opacity-80', meta.sub), children: accountNumber != null ? (0, mask_1.maskAccountNumber)(accountNumber) : '•• ••••' })] }));
});
//# sourceMappingURL=AccountCardV2.js.map
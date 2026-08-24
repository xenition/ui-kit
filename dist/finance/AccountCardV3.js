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
exports.AccountCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const MoneyAmount_1 = require("./MoneyAmount");
const mask_1 = require("./internal/mask");
const pressable_1 = require("./internal/pressable");
const VARIANT_META = {
    checking: { dot: 'bg-primary', label: 'Checking' },
    savings: { dot: 'bg-success', label: 'Savings' },
    credit: { dot: 'bg-accent', label: 'Credit' },
};
/**
 * AccountCard, redesigned (v3): a **minimal list row**. A single colored account
 * dot (the variant accent) leads a name / type stack, with the balance right-
 * aligned through {@link MoneyAmount}. No card, no glyph tile — a hairline base
 * rule is the only separation, so a stack of these reads as a lean account list.
 * Distinct at a glance from the base's bordered card and v2's card face. Same props.
 */
exports.AccountCardV3 = React.forwardRef(function AccountCardV3({ name, variant, balanceCents, currency = 'USD', accountNumber, icon: _icon, onClick, className, ...rest }, ref) {
    const meta = VARIANT_META[variant];
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${name}, ${meta.label} account` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] border-b border-border py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-[var(--xen-radius-full)]', meta.dot) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: accountNumber != null ? (0, mask_1.maskAccountNumber)(accountNumber) : meta.label })] }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: balanceCents, currency: currency, tone: "neutral", size: "md" })] }));
});
//# sourceMappingURL=AccountCardV3.js.map
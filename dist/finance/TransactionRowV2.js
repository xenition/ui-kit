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
exports.TransactionRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const MoneyAmount_1 = require("./MoneyAmount");
const pressable_1 = require("./internal/pressable");
/** Token-bound tint for the leading glyph tile, per semantic slot. */
const TILE_BG = {
    onSurface: 'bg-neutral-100',
    onPrimary: 'bg-primary/10',
    primary: 'bg-primary/10',
    muted: 'bg-muted/10',
    success: 'bg-success/10',
    onSuccess: 'bg-success/10',
    warn: 'bg-warn/10',
    onWarn: 'bg-warn/10',
    danger: 'bg-danger/10',
    onDanger: 'bg-danger/10',
};
/**
 * TransactionRow, redesigned (v2): an elevated **card row**. The category glyph
 * sits in a rounded, tinted tile on the left; the title stacks over a subtitle;
 * and the signed {@link MoneyAmount} is rendered large and bold on the right
 * over its date. Distinct at a glance from the base's borderless avatar-disc
 * row. Same props, integer-cents money, token-pure throughout.
 */
exports.TransactionRowV2 = React.forwardRef(function TransactionRowV2({ title, subtitle, amountCents, currency = 'USD', direction, date, icon, iconColor = 'primary', onClick, className, ...rest }, ref) {
    const signedCents = direction
        ? direction === 'expense'
            ? -Math.abs(amountCents)
            : Math.abs(amountCents)
        : amountCents;
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? title : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-sm', interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', TILE_BG[iconColor]), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon ?? '•', color: iconColor, size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: title }), subtitle != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: subtitle }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: signedCents, currency: currency, tone: direction ?? 'auto', size: "lg", signDisplay: "always" }), date != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: date }) : null] })] }));
});
//# sourceMappingURL=TransactionRowV2.js.map
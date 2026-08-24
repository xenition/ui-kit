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
exports.CashDrawerRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
const SIGN = {
    sale: '+',
    payIn: '+',
    refund: '-',
    payOut: '-',
};
/**
 * One row of a cash-drawer count / register audit — the DOM parity of the native
 * `CashDrawerRow`: opening float, cash sales, pay-ins/outs, expected, counted,
 * and the variance. Money is integer **cents** via `formatMoney`, with in/out
 * movements signed. For `kind="variance"`, pass `expectedCents` and the counted
 * `amountCents` to draw an over/short/balanced **glyph + word** pill and a signed
 * delta — state by text, never color alone. When `onClick` is set the row is a
 * keyboard-operable `role="button"`. Token-only.
 */
exports.CashDrawerRow = React.forwardRef(function CashDrawerRow({ kind, label, amountCents, currency = 'USD', expectedCents, detail, variant = 'default', testID, onClick, onKeyDown, className, ...rest }, ref) {
    const meta = internal_1.CASH_MOVEMENT_META[kind];
    const isTotal = variant === 'total';
    const interactive = typeof onClick === 'function';
    const isVariance = kind === 'variance' && typeof expectedCents === 'number';
    const variance = isVariance
        ? (0, internal_1.varianceMeta)((0, internal_1.safeCents)(expectedCents), (0, internal_1.safeCents)(amountCents))
        : null;
    const sign = SIGN[kind];
    const displayCents = variance ? variance.deltaCents : (0, internal_1.safeCents)(amountCents);
    const amountTone = variance ? variance.meta.tone : 'neutral';
    const amountColor = variance ? internal_1.TONE_TEXT[amountTone] : 'text-on-surface';
    const prefix = variance
        ? variance.deltaCents > 0
            ? '+'
            : variance.deltaCents < 0
                ? '−'
                : ''
        : sign === '+'
            ? '+'
            : sign === '-'
                ? '−'
                : '';
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cash-drawer-row": "", "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive
            ? `${label ?? meta.label}, ${(0, internal_1.formatMoney)(Math.abs(displayCents), currency)}`
            : undefined, onClick: onClick, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex items-center justify-between gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', isTotal ? 'border-t border-border' : '', interactive
            ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            : '', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-muted", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm text-on-surface', isTotal ? 'font-bold' : 'font-medium'), children: label ?? meta.label }), variance ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: variance.meta, variant: "inline", size: "sm" }) : null] }), detail ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: detail }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('tabular-nums', isTotal ? 'text-base' : 'text-sm', isTotal || variance ? 'font-bold' : 'font-medium', amountColor), children: [prefix, (0, internal_1.formatMoney)(Math.abs(displayCents), currency)] })] }));
});
//# sourceMappingURL=CashDrawerRow.js.map
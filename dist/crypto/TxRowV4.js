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
exports.TxRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const money_1 = require("../commerce/money");
const row_v4_1 = require("../dashboard/internal/row-v4");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
const STATUS_META = {
    pending: { label: 'Pending', glyph: '◷', tone: 'warn' },
    confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
    failed: { label: 'Failed', glyph: '✕', tone: 'danger' },
};
/**
 * The amount's ink.
 *
 * A signed movement of money is the one place `success`/`danger` are *not*
 * being spent on identity — this is the same in/out reading `MoneyAmount`
 * gives every figure in the finance module. What changes here is that the ink
 * is the contrast-corrected `*Text` slot rather than the fill.
 */
const AMOUNT_INK = {
    send: 'text-danger-text',
    receive: 'text-success-text',
    none: 'text-on-card',
};
/**
 * **V4 transaction row** — the web twin of the native `TxRowV4`, same props as
 * {@link TxRow} plus `fallbackSymbol`.
 *
 * ## Four changes
 *
 * 1. **The row announces its amount.** `aria-label="Transaction 0x12…cdef,
 *    Confirmed"` sat on the interactive root and replaced the subtree, so the
 *    amount, the fiat value and the timestamp — everything a user scans a
 *    history for — were never spoken.
 * 2. **An amount always carries a unit.** `symbol` is optional and there was
 *    no fallback, so a send rendered as "−0.5" of an unnamed thing. See
 *    `fallbackSymbol`.
 * 3. **The status pill is inked, not filled.** `text-warn` / `text-success` /
 *    `text-danger` are fill slots; the pill is now the module's one badge
 *    shape, which native and web finally agree on.
 * 4. **A press is a state layer on the shared row body**, and the row is a
 *    real `<button>` rather than a `div` carrying `role="button"`, `tabIndex`
 *    and a hand-written Enter/Space handler — three approximations of what a
 *    button already does.
 */
exports.TxRowV4 = React.forwardRef(function TxRowV4({ hash, status = 'confirmed', direction, amount, symbol, decimals = 4, valueCents, currency = 'USD', timestamp, hashLead = 6, hashTail = 4, onClick, fallbackSymbol = '', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    const meta = STATUS_META[status];
    const short = (0, format_1.truncateHash)(hash, hashLead, hashTail);
    const unit = symbol ?? fallbackSymbol;
    const signedAmount = direction && amount != null
        ? direction === 'send'
            ? -Math.abs(amount)
            : Math.abs(amount)
        : amount;
    const amountPrefix = direction === 'send' ? '−' : direction === 'receive' ? '+' : '';
    const amountText = signedAmount != null
        ? `${amountPrefix}${(0, format_1.formatToken)(Math.abs(signedAmount), {
            decimals,
            symbol: unit === '' ? undefined : unit,
        })}`
        : undefined;
    const label = (0, market_v4_1.spokenLine)([
        `Transaction ${short}`,
        meta.label,
        amountText,
        valueCents != null ? (0, money_1.formatMoney)(valueCents, currency) : undefined,
        timestamp,
    ]);
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(timestamp != null), 'rounded-[var(--xen-radius-md)]');
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...market_v4_1.BADGE_V4, className: "shrink-0", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm font-semibold text-on-card', market_v4_1.TABULAR_CLASS), children: short }), timestamp != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: timestamp })) : null] }), amountText != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', market_v4_1.TABULAR_CLASS, AMOUNT_INK[direction ?? 'none']), children: amountText }), valueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: valueCents, currency: currency, tone: "muted", size: "sm" })) : null] })) : null] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)(rowClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: rowClass, children: body })) }));
});
//# sourceMappingURL=TxRowV4.js.map
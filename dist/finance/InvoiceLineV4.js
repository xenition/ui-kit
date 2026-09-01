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
exports.InvoiceLineV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
const ledger_v4_1 = require("./internal/ledger-v4");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
/**
 * **V4 invoice line** — the web twin of the native `InvoiceLineV4`, same props
 * as {@link InvoiceLine}.
 *
 * ## Three changes
 *
 * 1. **A fractional line stops under-reporting.** The total was
 *    `Math.trunc(unitPriceCents) * quantity` — the unit price truncated and
 *    the quantity left alone — so `333 × 3.5` produced `1165.5`, a non-integer
 *    cents value that `MoneyAmount` then floored to **$11.65**, one cent under,
 *    while the breakdown line directly above it honestly printed "3.5 ×
 *    $3.33". The line disagreed with itself on screen. `lineTotal()` rounds
 *    the product once, in cents.
 * 2. **`emphasized` changes something.** It passed `className="font-bold"` to
 *    a `MoneyAmount` that is already `font-bold`, and `cn()` is a plain joiner
 *    — so the grand-total row was indistinguishable from the lines above it
 *    except for one type step. The total row now takes a rule above it and a
 *    bolder description, which is what a total looks like.
 * 3. **The quantity goes through `Intl`, and the caption is legible.** `3.5`
 *    was interpolated straight into the string, so its decimal mark was hard
 *    locked to `.` while the price beside it used the locale's; and the
 *    caption was inked with `muted`, a ramp step with no contrast promise.
 */
exports.InvoiceLineV4 = React.forwardRef(function InvoiceLineV4({ description, unitPriceCents, quantity = 1, currency = 'USD', amountCents, emphasized = false, className, ...rest }, ref) {
    const qty = Number.isFinite(quantity) ? quantity : 1;
    const total = typeof amountCents === 'number' && Number.isFinite(amountCents)
        ? Math.trunc(amountCents)
        : (0, ledger_v4_1.lineTotal)(unitPriceCents, qty);
    const showBreakdown = !emphasized && qty !== 1;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-md py-sm', 
        // A total sits under a rule. `border-t` is a hairline, which is the
        // one thing the border token is for.
        emphasized && 'border-t border-border pt-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm text-on-surface', emphasized ? 'font-bold' : 'font-medium'), children: description }), showBreakdown ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs text-muted-text', ledger_v4_1.TABULAR_CLASS), children: `${new Intl.NumberFormat().format(qty)} × ${(0, money_1.formatMoney)(Number.isFinite(unitPriceCents) ? Math.trunc(unitPriceCents) : 0, currency)}` })) : null] }), (0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: total, currency: currency, tone: "neutral", size: emphasized ? 'md' : 'sm' })] }));
});
//# sourceMappingURL=InvoiceLineV4.js.map
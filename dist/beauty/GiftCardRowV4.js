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
exports.GiftCardRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
const STATUS_META = {
    active: { label: 'Active', tone: 'success' },
    redeemed: { label: 'Redeemed', tone: 'neutral' },
    expired: { label: 'Expired', tone: 'danger' },
    pending: { label: 'Pending', tone: 'warn' },
};
/**
 * **V4 gift card row** — the web twin of the native `GiftCardRowV4`, same
 * props as {@link GiftCardRow} plus `statusLabels`, `balanceLabel` and `last`.
 *
 * ## Four changes
 *
 * 1. **The balance is shown against the face value.** The base printed two
 *    money figures side by side and left the reader to do the division; a
 *    meter answers the only question anyone asks of a gift card.
 * 2. **The code is tabular.** A redemption code is read aloud character by
 *    character and typed into a field.
 * 3. **It is a row from the shared row line.**
 * 4. **Status is a word beside the tone**, and all four words are props.
 *
 * **Renders nothing without an `amountCents`** (§4.5).
 */
exports.GiftCardRowV4 = React.forwardRef(function GiftCardRowV4({ amountCents, balanceCents, currency = 'USD', code, status = 'active', expires, note, formatMoney = money_1.formatMoney, statusLabels, balanceLabel = 'Remaining', last = false, onClick, className, ...rest }, ref) {
    if (typeof amountCents !== 'number' || !Number.isFinite(amountCents))
        return null;
    const meta = STATUS_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const face = formatMoney(amountCents, currency);
    const hasBalance = typeof balanceCents === 'number' && Number.isFinite(balanceCents) && amountCents > 0;
    const balance = hasBalance ? formatMoney(balanceCents, currency) : null;
    const pct = hasBalance
        ? Math.max(0, Math.min(100, (balanceCents / amountCents) * 100))
        : null;
    const caption = (0, salon_v4_1.metaLine)([code, expires, note]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-gift-card": status, "data-xen-v4-chrome": onClick ? 'on-surface' : undefined, role: onClick ? 'button' : undefined, onClick: onClick, "aria-label": (0, salon_v4_1.metaLine)([balance ?? face, balance ? `of ${face}` : null, word, caption]), className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(true), !last && (0, row_v4_1.rowEdgeClass)(), className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]", children: balance ?? face }), balance ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: ["/ ", face] })) : null] }), caption ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: caption })) : null, pct != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "mt-xs flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: meta.tone === 'danger' ? 'danger' : 'primary' }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: balanceLabel })] })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word }) })] }));
});
//# sourceMappingURL=GiftCardRowV4.js.map
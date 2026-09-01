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
exports.TaxSummaryCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const format_1 = require("./internal/format");
const civic_v4_1 = require("./internal/civic-v4");
/**
 * Status → word, glyph and tone.
 *
 * `filed` is `neutral`: having filed is a stage of the year, not an outcome,
 * and a brand-coloured pill beside a green Paid reads as a second verdict.
 */
const STATUS_V4 = {
    owed: { label: 'Balance due', glyph: '💳', tone: 'warn' },
    refund: { label: 'Refund', glyph: '💵', tone: 'success' },
    paid: { label: 'Paid', glyph: '✓', tone: 'success' },
    overdue: { label: 'Overdue', glyph: '!', tone: 'danger' },
    filed: { label: 'Filed', glyph: '📄', tone: civic_v4_1.IDENTITY_TONE },
};
/**
 * **V4 tax summary** — the web twin of the native `TaxSummaryCardV4`, same
 * props as {@link TaxSummaryCard} plus `statusLabels`, `dueLabel` and
 * `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **The due date stops being an afterthought.** It was a muted 12px line —
 *    the same size and colour as the "Paid" caption — with nothing at all
 *    linking it to `overdue`, on the one component whose whole job is to say
 *    when money is owed. It is now a labelled pair, it takes the weight and the
 *    ink its consequence deserves once the account is overdue, and it is what
 *    the overdue announcement leads with.
 * 2. **Overdue announces.** `overdue` is an adverse state by
 *    {@link isAdverse}, and the base had no live region anywhere. The sentence
 *    reaches a polite region one commit after mount, because a live region
 *    announces *changes* and text present at first paint is read by nobody.
 * 3. **Paying takes a confirming press.** "Pay now" was one tap on a ~32px
 *    target with no confirm and no pending state; it arms first, renames
 *    itself, and disarms on blur. It also clears 44.
 * 4. **The amounts are ink, not fills.** `text-success` and `text-danger` are
 *    the *fill* slots and carry no contrast promise as words — the figure a
 *    taxpayer reads takes `success-text` / `danger-text`. The leading disc's
 *    glyph likewise stops being the fill drawn on a tint of itself.
 * 5. **Balance, Paid and Due are label/value pairs**, not sibling spans that
 *    happen to sit above one another — so a reader hears "Balance, $1,240.00"
 *    rather than two disconnected readings — and `filed` stops wearing the
 *    brand colour beside a green Paid.
 */
exports.TaxSummaryCardV4 = React.forwardRef(function TaxSummaryCardV4({ taxYear, taxType, status = 'owed', amountCents, paidCents, dueDate, currency = 'USD', formatMoney: format = format_1.formatMoney, onPay, statusLabels, dueLabel = 'Due', confirmPayLabel = 'Confirm payment', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [armed, setArmed] = React.useState(false);
    const sd = STATUS_V4[status] ?? STATUS_V4.owed;
    const word = statusLabels?.[status] ?? sd.label;
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const overdue = status === 'overdue';
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const isPayable = status === 'owed' || overdue;
    const amountInk = status === 'refund' || status === 'paid'
        ? civic_v4_1.TONE_INK.success
        : overdue
            ? civic_v4_1.TONE_INK.danger
            : 'text-on-surface';
    const amountLabel = status === 'refund' ? 'Refund' : 'Balance';
    const amountText = format(amount, currency);
    const dueText = dueDate != null ? `${dueLabel} ${dueDate}` : undefined;
    const payWord = armed ? confirmPayLabel : 'Pay now';
    const announcement = (0, civic_v4_1.spokenLine)([word, dueText, `${amountLabel} ${amountText}`]);
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
        setAnnounced(adverse ? announcement : '');
    }, [adverse, announcement]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: civic_v4_1.CARD_V4, className: className, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { role: "status", "aria-live": "polite", className: "sr-only", children: announced }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]", style: { background: (0, civic_v4_1.tintGround)(sd.tone) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83E\uDDFE", size: "xl", className: (0, civic_v4_1.tintInkClass)(sd.tone) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col items-start gap-xs", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-base font-bold text-on-surface", children: [taxType ?? 'Tax', " \u00B7 ", taxYear] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${word}` })] })] }), (0, jsx_runtime_1.jsxs)("dl", { className: "mt-md flex items-end justify-between border-t border-border pt-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("dt", { className: "text-xs text-muted-text", children: amountLabel }), (0, jsx_runtime_1.jsx)("dd", { className: (0, cn_1.cn)('text-xl font-bold', amountInk), children: amountText })] }), paidCents != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("dt", { className: "text-xs text-muted-text", children: "Paid" }), (0, jsx_runtime_1.jsx)("dd", { className: "text-base font-semibold text-on-surface", children: format(Math.max(0, Math.trunc(paidCents)), currency) })] })) : null] }), dueDate != null ? ((0, jsx_runtime_1.jsxs)("dl", { className: "mt-sm flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("dt", { className: "text-xs text-muted-text", children: dueLabel }), (0, jsx_runtime_1.jsx)("dd", { className: (0, cn_1.cn)('text-sm font-semibold', 
                        // A deadline that has passed is not a caption any more.
                        overdue ? civic_v4_1.TONE_INK.danger : 'text-on-surface'), children: dueDate })] })) : null, isPayable && onPay != null && amount > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-md flex justify-end", children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: overdue ? 'danger' : 'primary', "aria-label": (0, civic_v4_1.spokenLine)([payWord, amountText, dueText]), onClick: () => {
                        // Money leaving an account has no undo, so the first press only
                        // arms.
                        if (!armed) {
                            setArmed(true);
                            return;
                        }
                        setArmed(false);
                        onPay();
                    }, 
                    // Walking away from an armed payment disarms it.
                    onBlur: () => setArmed(false), children: payWord }) })) : null] }));
});
//# sourceMappingURL=TaxSummaryCardV4.js.map
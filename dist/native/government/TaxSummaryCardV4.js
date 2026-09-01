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
exports.TaxSummaryCardV4 = TaxSummaryCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const civic_v4_1 = require("./internal/civic-v4");
const format_1 = require("./internal/format");
const STATUS_V4 = {
    owed: { label: 'Balance due', glyph: '💳', tone: 'warn' },
    refund: { label: 'Refund', glyph: '💵', tone: 'success' },
    paid: { label: 'Paid', glyph: '✓', tone: 'success' },
    overdue: { label: 'Overdue', glyph: '!', tone: 'danger' },
    filed: { label: 'Filed', glyph: '📄', tone: civic_v4_1.IDENTITY_TONE },
};
/**
 * **V4 tax summary** — same props as {@link TaxSummaryCard} plus
 * `statusLabels`, `dueLabel` and `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **The due date is not an afterthought.** It was a muted `xs` line — the
 *    same size and colour as the "Paid" caption — with nothing linking it to
 *    `overdue`, on a card whose entire consequence is that date. It joins the
 *    spoken name, and on an overdue account it takes the danger ink and a
 *    weight that matches what missing it costs.
 * 2. **Overdue announces.** `isAdverse('overdue')` is true and the base said
 *    it only by tinting a pill; the status line is an assertive live region
 *    now, so an account that goes overdue while the screen is open is heard.
 * 3. **Paying takes a confirming press**, and the button clears 44 —
 *    "Pay now" was one tap on a ~34pt target with no confirm and no pending
 *    state.
 * 4. **The amounts take the contrast-corrected ink.** `colors.success` and
 *    `colors.danger` are *fill* slots with no contrast promise as text, and
 *    the headline balance was drawn in them at `xl`. The card's summary is
 *    also one announced object, which it could not be before without
 *    swallowing the Pay button — so the name sits on the text region and the
 *    button is its sibling.
 * 5. **Having filed is not an outcome.** `filed` was `primary` — a brand
 *    colour on a record of what you did, sitting beside `overdue`, which is a
 *    warning about what you owe. It is `IDENTITY_TONE`, and the disc it tints
 *    follows it.
 */
function TaxSummaryCardV4({ taxYear, taxType, status = 'owed', amountCents, paidCents, dueDate, currency = 'USD', formatMoney: format = format_1.formatMoney, statusLabels, dueLabel = 'Due', confirmPayLabel = 'Confirm payment', onPay, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [armed, setArmed] = React.useState(false);
    const sd = STATUS_V4[status] ?? STATUS_V4.owed;
    const statusWord = statusLabels?.[status] ?? sd.label;
    const overdue = (0, civic_v4_1.isAdverse)(status);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const amountText = format(amount, currency);
    const paidText = paidCents != null ? format(Math.max(0, Math.trunc(paidCents)), currency) : undefined;
    const isPayable = status === 'owed' || status === 'overdue';
    const heading = (0, tone_v4_1.metaLine)([taxType ?? 'Tax', taxYear]);
    const balanceLabel = status === 'refund' ? 'Refund' : 'Balance';
    const dueLine = dueDate ? `${dueLabel} ${dueDate}` : undefined;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const disc = tokens.spacing['2xl'];
    // The amount is a numeral, so it takes the tone's *ink*. Only an outcome —
    // a refund, a settled account, an overdue one — is toned at all; a balance
    // that is simply owed is body copy.
    const amountTone = status === 'refund' || status === 'paid' ? 'success' : overdue ? 'danger' : null;
    const spoken = (0, civic_v4_1.spokenLine)([
        heading,
        statusWord,
        `${balanceLabel} ${amountText}`,
        paidText != null ? `Paid ${paidText}` : null,
        dueLine,
    ]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: civic_v4_1.CARD_V4, style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLiveRegion: overdue ? 'assertive' : 'none', accessibilityLabel: spoken, style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: disc,
                                    height: disc,
                                    borderRadius: tokens.radius.md,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: (0, civic_v4_1.tintGround)(theme, sd.tone),
                                }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83E\uDDFE", size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: heading }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${statusWord}` }) })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            paddingTop: tokens.spacing.md,
                            borderTopWidth: 1,
                            borderTopColor: colors.border,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            gap: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: balanceLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", numeric: "tabular", tone: amountTone === null ? 'onSurface' : undefined, style: amountTone === null ? undefined : { color: (0, civic_v4_1.tintInk)(theme, amountTone) }, children: amountText })] }), paidText != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: "Paid" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numeric: "tabular", tone: "onSurface", children: paidText })] })) : null] }), dueLine != null ? (
                    // The date the account turns on. It is not a caption.
                    (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: overdue ? 'sm' : 'xs', weight: overdue ? 'semibold' : 'regular', tone: overdue ? undefined : 'mutedText', style: overdue ? { color: (0, civic_v4_1.tintInk)(theme, 'danger') } : undefined, children: dueLine })) : null] }), isPayable && onPay != null && amount > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, alignItems: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", tone: overdue ? 'danger' : 'default', accessibilityLabel: armed ? confirmPayLabel : 'Pay now', onPress: () => {
                        // A payment is irreversible; the first press only arms it.
                        if (!armed) {
                            setArmed(true);
                            return;
                        }
                        setArmed(false);
                        onPay();
                    }, style: { minHeight: tap }, children: armed ? confirmPayLabel : 'Pay now' }) })) : null] }));
}
//# sourceMappingURL=TaxSummaryCardV4.js.map
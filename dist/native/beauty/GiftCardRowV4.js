"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardRowV4 = GiftCardRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/** Status → tone and default word. Genuinely a status, so the tones stay. */
const STATUS_META = {
    active: { label: 'Active', tone: 'success' },
    redeemed: { label: 'Redeemed', tone: 'neutral' },
    expired: { label: 'Expired', tone: 'danger' },
    pending: { label: 'Pending', tone: 'warn' },
};
/**
 * **V4 gift card row** — same props as {@link GiftCardRow} plus
 * `statusLabels`, `balanceLabel` and `last`.
 *
 * ## Four changes
 *
 * 1. **The balance is shown against the face value.** The base printed two
 *    money figures side by side and left the reader to do the division; a
 *    meter says "most of it is gone" at a glance, which is the only question
 *    anyone asks of a gift card.
 * 2. **The code is tabular and monospaced by figures.** A redemption code is
 *    read aloud character by character and typed into a field — proportional
 *    digits make that harder for no reason.
 * 3. **It is a row from the shared row line**, with the shared press fill.
 * 4. **Status is a word beside the tone**, and all four words are props.
 *
 * **Renders nothing without an `amountCents`** (§4.5).
 */
function GiftCardRowV4({ amountCents, balanceCents, currency = 'USD', code, status = 'active', expires, note, formatMoney = money_1.formatMoney, statusLabels, balanceLabel = 'Remaining', last = false, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (typeof amountCents !== 'number' || !Number.isFinite(amountCents))
        return null;
    const meta = STATUS_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const face = formatMoney(amountCents, currency);
    const hasBalance = typeof balanceCents === 'number' && Number.isFinite(balanceCents) && amountCents > 0;
    const balance = hasBalance ? formatMoney(balanceCents, currency) : null;
    const pct = hasBalance ? Math.max(0, Math.min(100, (balanceCents / amountCents) * 100)) : null;
    const caption = (0, salon_v4_1.metaLine)([code, expires, note]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: balance ?? face }), balance ? ((0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: ["/ ", face] })) : null] }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", numberOfLines: 1, children: caption })) : null, pct != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: meta.tone === 'danger' ? 'danger' : 'primary' }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: balanceLabel })] })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })] }));
    const name = (0, salon_v4_1.metaLine)([balance ?? face, balance ? `of ${face}` : null, word, caption]);
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=GiftCardRowV4.js.map
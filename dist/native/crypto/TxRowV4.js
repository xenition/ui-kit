"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxRowV4 = TxRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../../commerce/money");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
const STATUS_META = {
    pending: { label: 'Pending', glyph: '◷', tone: 'warn' },
    confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
    failed: { label: 'Failed', glyph: '✕', tone: 'danger' },
};
/** The word that carries the direction, so the sign is never the only cue. */
const DIRECTION_WORD = {
    send: 'Sent',
    receive: 'Received',
};
/**
 * **V4 transaction row** — same props as {@link TxRow} plus `fallbackSymbol`.
 *
 * ## Four changes
 *
 * 1. **The row announces the transaction.** `"Transaction 0x12…cdef,
 *    Confirmed"` was the whole name and it replaced the subtree, so the amount
 *    — the thing a user is scanning a history for — was never spoken. Hash,
 *    status, direction, amount, fiat value and time are one line now.
 * 2. **The amount can carry a unit.** `symbol` is optional and the base had no
 *    fallback, so a send rendered as `−0.5`. See
 *    {@link TxRowV4Props.fallbackSymbol}.
 * 3. **Direction is a word, not a hue.** Send read `danger` and receive read
 *    `success` with nothing but a `+`/`−` beside them; the announced name now
 *    says "Sent" or "Received", and the amount takes the readable `*Text` ink
 *    rather than the raw fill slot.
 * 4. **Press is a state layer** on the shared row recipe, the status chip is
 *    the module's one badge shape, and its glyph — decoration beside a word —
 *    is out of the reader's way.
 */
function TxRowV4({ hash, status = 'confirmed', direction, amount, symbol, fallbackSymbol = '', decimals = 4, valueCents, currency = 'USD', timestamp, hashLead = 6, hashTail = 4, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!hash)
        return null;
    const meta = STATUS_META[status];
    const short = (0, format_1.truncateHash)(hash, hashLead, hashTail);
    const unit = symbol ?? fallbackSymbol;
    const signed = direction && amount != null
        ? direction === 'send'
            ? -Math.abs(amount)
            : Math.abs(amount)
        : amount;
    const prefix = direction === 'send' ? '−' : direction === 'receive' ? '+' : '';
    const amountInk = direction === 'send'
        ? (0, market_v4_1.toneInk)(theme, 'danger')
        : direction === 'receive'
            ? (0, market_v4_1.toneInk)(theme, 'success')
            : colors.onSurface;
    const amountText = signed != null
        ? `${prefix}${(0, format_1.formatToken)(Math.abs(signed), {
            decimals,
            ...(unit !== '' ? { symbol: unit } : {}),
        })}`
        : null;
    const spoken = (0, market_v4_1.spokenLine)([
        `Transaction ${short}`,
        meta.label,
        direction != null ? DIRECTION_WORD[direction] : null,
        amountText,
        valueCents != null ? (0, money_1.formatMoney)(valueCents, currency) : null,
        timestamp,
    ]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: timestamp != null }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...market_v4_1.BADGE_V4, children: `${meta.glyph} ${meta.label}` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", numeric: "tabular", numberOfLines: 1, children: short }), timestamp != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: timestamp })) : null] }), amountText != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", numeric: "tabular", style: { color: amountInk }, children: amountText }), valueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: valueCents, currency: currency, tone: "muted", size: "sm" })) : null] })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=TxRowV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRowV4 = ClaimRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../../commerce/money");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 claim row** — the same props as {@link ClaimRow}, `formatMoney`
 * included; every fix here is structural.
 *
 * ## Six changes
 *
 * 1. **The row announces its amount.** The base named the `Pressable`
 *    `"Claim CLM-20481, Windshield replacement, Approved"` and then drew the
 *    settled amount and the date as *children of that same Pressable*. A
 *    `Pressable` is `accessible` by default and flattens its whole subtree into
 *    one leaf wearing that name, so a screen-reader user working down a claims
 *    list heard a status for every claim and **never once heard how much money
 *    was involved** — which is the only reason anybody opens the screen. The
 *    amount and the date are folded into the name now, joined with commas.
 * 2. **A negative amount is shown, not swallowed.** `Math.max(0, …)` clamped
 *    every amount to zero, so `amountCents={-1}` — a reversal, a sign error
 *    upstream, a clawback — printed `$0.00`, indistinguishable from a real
 *    zero. It now prints what it was given, minus sign and all, because a
 *    number the caller cannot see is a number nobody can correct.
 * 3. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` faded the row's
 *    own content into M3's 0.38 disabled band, so a pressed row and a dead row
 *    looked the same. The row tints its container instead and leaves the ink at
 *    full strength.
 * 4. **It is a row from the shared row family.** `ClaimRow`, `BeneficiaryRow`
 *    and `PolicyDocumentRow` were three heights, three leading slots and three
 *    press treatments in one module; all three now come from
 *    `dashboard/internal/row-v4`, so a claims list scrolled into a documents
 *    list reads as one product.
 * 5. **The status disc is decorative.** It was an `Icon` carrying its own
 *    `accessibilityLabel`, so the status was announced twice on a static row
 *    and read out of a flattened subtree on a pressable one. The disc is hidden
 *    and the word beside it does the talking.
 * 6. **The disc's tint is opaque.** `withAlpha(tint, 0.14)` is a translucent
 *    wash that changes colour with whatever is behind the row; the glyph's
 *    contrast against it was a different number on a card than on the page.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function ClaimRowV4({ claimNumber, title, status, amountCents, currency = 'USD', date, formatMoney: format = money_1.formatMoney, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!title)
        return null;
    const meta = tone_v4_1.CLAIM_STATUS_V4[status] ?? tone_v4_1.CLAIM_STATUS_V4.filed;
    const word = meta.label;
    // No `Math.max(0, …)`: see change 2. `Math.trunc` stays — cents are integers,
    // and a fractional cent is a caller's rounding bug this row cannot fix.
    const amount = typeof amountCents === 'number' && Number.isFinite(amountCents)
        ? format(Math.trunc(amountCents), currency)
        : null;
    const spoken = (0, tone_v4_1.spokenLine)([title, claimNumber, word, amount, date]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: [
                    (0, row_v4_1.rowLeadingStyle)(theme),
                    { borderRadius: tokens.radius.full, backgroundColor: (0, tone_v4_1.pillGround)(theme, meta.tone) },
                ], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", style: { color: (0, tone_v4_1.toneInk)(theme, meta.tone) }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [claimNumber ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, style: { flexShrink: 1 }, children: claimNumber })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tone_v4_1.pillStyle)(theme, meta.tone), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: (0, tone_v4_1.toneInk)(theme, meta.tone) }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: (0, tone_v4_1.toneInk)(theme, meta.tone) }, children: word })] })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, row_v4_1.rowTrailingStyle)(theme), { flexDirection: 'column', alignItems: 'flex-end' }], children: [amount ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: amount })) : null, date ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: date })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=ClaimRowV4.js.map
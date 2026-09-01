"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountCardV4 = AccountCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const appearance_1 = require("../primitives/internal/appearance");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../commerce/money");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
const mask_1 = require("./internal/mask");
const ledger_v4_1 = require("./internal/ledger-v4");
/** The default glyph per account kind. The type is identity, so it gets a shape. */
const VARIANT_GLYPH = {
    checking: '🏦',
    savings: '🐖',
    credit: '💳',
};
const VARIANT_LABEL = {
    checking: 'Checking',
    savings: 'Savings',
    credit: 'Credit',
};
/**
 * **V4 account card** — same props as {@link AccountCard} plus `typeLabels`.
 *
 * ## Four changes
 *
 * 1. **The card announces its balance.** `"Everyday Checking, Checking
 *    account"` on an `accessible` `Pressable` replaced the subtree, so a
 *    reader never heard the one number on the card. The name now carries the
 *    account, its type, the masked number and the balance.
 * 2. **An account type is identity, not status.** A savings account was drawn
 *    `success` and a credit account `accent` — a savings account is not
 *    "healthy", and the green sat directly beside a `MoneyAmount` whose green
 *    means income. The type is a glyph and a neutral chip; the accent ring is
 *    gone.
 * 3. **Press is a state layer**, not `opacity: 0.85`, which is inside M3's
 *    disabled band and made a held card read as an unavailable one.
 * 4. **The captions are `mutedText`** rather than `colors.muted`, a ramp step
 *    with no contrast promise at all.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function AccountCardV4({ name, variant, balanceCents, currency = 'USD', accountNumber, icon, typeLabels, onPress, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const typeLabel = typeLabels?.[variant] ?? VARIANT_LABEL[variant];
    const masked = accountNumber != null ? (0, mask_1.maskAccountNumber)(accountNumber) : null;
    // Appearance overrides the Card's default surface; classic → the Card's own
    // outlined look, unchanged.
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const spoken = (0, ledger_v4_1.spokenLine)([
        name,
        typeLabel,
        masked,
        (0, money_1.formatMoney)(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency),
    ]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [surface, pressed ? { backgroundColor: (0, state_v4_1.pressFill)(theme) } : null, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon ?? VARIANT_GLYPH[variant], color: "onSurface", size: "lg", badge: "soft" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, style: { flexShrink: 1 }, children: name }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: ledger_v4_1.IDENTITY_TONE, ...ledger_v4_1.BADGE_V4, children: typeLabel })] }), masked != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: masked })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: "Balance" }), (0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: balanceCents, currency: currency, tone: "neutral", size: "lg" })] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { borderRadius: tokens.radius.lg }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=AccountCardV4.js.map
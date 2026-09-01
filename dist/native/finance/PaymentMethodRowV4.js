"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodRowV4 = PaymentMethodRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const appearance_1 = require("../primitives/internal/appearance");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const mask_1 = require("./internal/mask");
const ledger_v4_1 = require("./internal/ledger-v4");
const KIND_GLYPH = {
    card: '💳',
    bank: '🏦',
    wallet: '👛',
};
/**
 * A network is **identity**, so it is carried by a word rather than by a
 * colour. `generic` contributes nothing — "Card" beside a card glyph is noise.
 */
const BRAND_LABEL = {
    visa: 'Visa',
    mastercard: 'Mastercard',
    amex: 'Amex',
    generic: '',
};
/**
 * **V4 payment method row** — same props as {@link PaymentMethodRow} plus
 * `defaultLabel` and `brandLabels`.
 *
 * ## Five changes
 *
 * 1. **`brand` is rendered.** It was accepted, documented as driving the
 *    glyph, and destructured into `_brand` — read by nothing — so a Visa row
 *    and an Amex row were the same 💳 and the only way to tell them apart was
 *    whatever the caller happened to put in `label`. The network is now a word
 *    on the supporting line and in the row's spoken name.
 * 2. **It masks with the module's own masker.** `` `•• ${last4}` `` was string
 *    concatenation two files away from `maskAccountNumber`, which also has an
 *    answer for a `last4` that is not four digits — the concatenation printed
 *    `•• 42` for one.
 * 3. **The radio reports `checked`, not `selected`.** A radio's state *is*
 *    checkedness; `selected` on `accessibilityRole="radio"` announces the
 *    wrong thing, and the check glyph beside it was the only other cue.
 * 4. **"Default" stops being `success`.** Being the default payment method is
 *    identity, not health, and the green sat beside amounts whose green means
 *    income.
 * 5. **Press is a state layer** rather than `opacity: 0.85`, the row clears
 *    44, and the supporting line takes `mutedText`.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
function PaymentMethodRowV4({ label, kind = 'card', brand, last4, expiry, icon, isDefault = false, selected = false, defaultLabel = 'Default', brandLabels, onPress, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!label)
        return null;
    const brandLabel = kind === 'card' && brand != null ? (brandLabels?.[brand] ?? BRAND_LABEL[brand]) : '';
    const masked = last4 != null ? (0, mask_1.maskAccountNumber)(last4) : null;
    const sub = (0, tone_v4_1.metaLine)([brandLabel, masked, expiry != null ? `exp ${expiry}` : null]);
    // Appearance surface FIRST; layout AFTER. In every appearance the `selected`
    // ring wins as an overlaid border.
    const surface = appearance === 'classic'
        ? {
            borderWidth: 1,
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: colors.surface,
        }
        : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const name = (0, ledger_v4_1.spokenLine)([label, brandLabel, masked, expiry, isDefault ? defaultLabel : null]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            surface,
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                borderRadius: tokens.radius.md,
            },
            pressed ? { backgroundColor: (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface) } : null,
            selected && appearance !== 'classic'
                ? { borderWidth: 1, borderColor: colors.primary }
                : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon ?? KIND_GLYPH[kind], color: selected ? 'primaryText' : 'onSurface', size: "xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, style: { flexShrink: 1 }, children: label }), isDefault ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: ledger_v4_1.IDENTITY_TONE, ...ledger_v4_1.BADGE_V4, children: defaultLabel })) : null] }), sub !== '' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", numberOfLines: 1, children: sub })) : null] }), selected ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2713", color: "primaryText", size: "lg" }) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", 
        // `checked`, not `selected`: a radio's state is its checkedness, and the
        // check glyph was carrying the whole message on its own.
        accessibilityState: { checked: selected }, accessibilityLabel: name, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=PaymentMethodRowV4.js.map
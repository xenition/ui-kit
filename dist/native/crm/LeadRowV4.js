"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRowV4 = LeadRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../commerce/money");
const internal_1 = require("./internal");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 lead row** — same props as {@link LeadRow} plus `scoreLabel` and
 * `formatScore`.
 *
 * ## Seven changes
 *
 * 1. **The score badge stops being coloured by temperature.** It took its tone
 *    from `TEMPERATURE_META`, so a lead scored **5** rendered a `danger` badge
 *    purely because the lead was `hot` — the colour said nothing about the
 *    number inside it, and a status colour was spent on identity. The badge is
 *    `neutral`; temperature keeps its own glyph and word.
 * 2. **The score carries a unit.** A bare `72` announced as the number
 *    seventy-two and nothing else; `scoreLabel` names it.
 * 3. **`selected` is announced and marked by more than a border colour** — it
 *    gains the leading accent bar the native docblock has always claimed, plus
 *    `accessibilityState`.
 * 4. **The row is only a button when it is interactive.** The base set
 *    `accessibilityRole="button"` unconditionally with `disabled={!onPress}`,
 *    so a plain row announced as a **disabled button**.
 * 5. **The temperature column fits its own label.** "Warm" at 12px does not
 *    fit 28px and nothing truncated it; the column is a full tap width and the
 *    label may wrap.
 * 6. **The glyph scales with Dynamic Type.** It carried
 *    `allowFontScaling={false}` while the word beside it scaled, so the pair
 *    came apart at larger text sizes.
 * 7. **Money is tabular**, plus rules A, B and C.
 *
 * **Renders nothing without a `name`.**
 */
function LeadRowV4({ name, company, temperature, valueCents, currency = 'USD', score, avatarUrl, selected = false, scoreLabel = 'Score', formatScore, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const meta = internal_1.TEMPERATURE_META[temperature];
    const tempInk = (0, crm_v4_1.toneInkOf)(theme, meta.tone);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const money = valueCents != null ? (0, money_1.formatMoney)(valueCents, currency) : null;
    const scoreValue = score != null ? Math.round((0, crm_v4_1.clampPercent)(score) ?? 0) : null;
    const scoreText = scoreValue != null ? (formatScore ?? ((n) => `${n}`))(scoreValue) : null;
    const label = (0, crm_v4_1.spokenLine)([
        `${meta.label} lead`,
        name,
        company,
        money,
        scoreText != null ? `${scoreLabel} ${scoreText}` : null,
    ]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                minHeight: tap,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: pressed
                    ? (0, state_v4_1.pressOver)(theme, selected ? colors.selected : colors.surface, colors.onSurface)
                    : selected
                        ? colors.selected
                        : colors.surface,
            },
            style,
        ], children: [selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: tokens.spacing.xs / 2,
                    alignSelf: 'stretch',
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: tap }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", style: { color: tempInk }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", align: "center", style: { color: tempInk }, children: meta.label })] }), (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "sm", name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: name }), company ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: company })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }, children: [money ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "onSurface", style: crm_v4_1.TABULAR, children: money })) : null, scoreText != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: "neutral", children: scoreText })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: label, accessibilityState: { selected }, testID: testID, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected }, onPress: onPress, testID: testID, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=LeadRowV4.js.map
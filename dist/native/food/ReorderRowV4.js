"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReorderRowV4 = ReorderRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const commerce_1 = require("../commerce");
const menu_v4_1 = require("./internal/menu-v4");
/**
 * **V4 reorder row** — the same props as {@link ReorderRow}.
 *
 * ## Five changes
 *
 * 1. **Reorder is reachable.** It sat inside a `Pressable` that is
 *    `accessible` by default and carried the row's own label, so VoiceOver
 *    flattened the row to one leaf and the button — the entire point of the
 *    component — did not exist. It is a **sibling** of the row's activation
 *    now. (The web twin loses it a different way: the row's `onKeyDown`
 *    cancels Enter's default action on the nested button, so Enter on
 *    "Reorder" opens the old order instead of reordering it.)
 * 2. **The row says what is in the order.** The name was title plus the meta
 *    line; the items summary — "2× Pad Thai, 1× Spring rolls", the thing that
 *    tells a person which past order this is — was pruned with everything else
 *    inside the button role.
 * 3. **`disabled` blocks the handler**, rather than only setting a flag beside
 *    a live one, and it is drawn at M3's 0.38 band on the thumbnail alone —
 *    the base dimmed the whole row to 0.6 and then *brightened* it to 0.9 on
 *    press, so a disabled row lit up under a finger.
 * 4. **The text and trailing slots come from the shared row family**, so a
 *    past order's title column and its action sit on the same rhythm as every
 *    other row in the kit. Only those two: the family's container is
 *    transparent and border-less by design, because there the *container* owns
 *    the card — and this row is its own framed card.
 * 5. **The thumbnail placeholder survives dark mode** — it was
 *    `tokens.ramps.neutral[100]`, which native copies without inverting.
 *
 * **Renders nothing without a `title`.**
 */
function ReorderRowV4({ title, itemsSummary, dateText, totalCents, currency = 'USD', imageUrl, onReorder, reorderLabel = 'Reorder', onPress, disabled = false, formatMoney = commerce_1.formatMoney, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    // The base's 56 thumbnail, composed rather than typed. Not the row family's
    // 44 leading slot: this row draws its own frame and its own leading size.
    const thumb = tokens.spacing['2xl'] + tokens.spacing.sm;
    const totalText = typeof totalCents === 'number' ? formatMoney(totalCents, currency) : null;
    const meta = (0, tone_v4_1.metaLine)([dateText, totalText]);
    // Change 2: the items summary is what identifies a past order.
    const spoken = (0, menu_v4_1.spokenLine)([title, itemsSummary, dateText, totalText]);
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
        },
        style,
    ];
    const summary = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: thumb,
                    height: thumb,
                    flexShrink: 0,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    // The one dim in this component, and it is not on the same element
                    // as the press treatment.
                    opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
                    backgroundColor: (0, menu_v4_1.placeholderGround)(theme),
                }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: title }), itemsSummary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: itemsSummary })) : null, meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: menu_v4_1.TABULAR, children: meta })) : null] })] }));
    const activation = onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, minWidth: 0 }, children: ({ pressed }) => summary(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1, minWidth: 0 }, children: summary(false) }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
            }, children: [activation, onReorder ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", disabled: disabled, 
                        // Change 3: the guard as well as the flag.
                        onPress: disabled ? undefined : onReorder, accessibilityLabel: (0, menu_v4_1.spokenLine)([reorderLabel, title]), style: { minHeight: tap }, children: reorderLabel }) })) : null] }) }));
}
//# sourceMappingURL=ReorderRowV4.js.map
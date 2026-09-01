"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifierListV4 = ModifierListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const commerce_1 = require("../commerce");
const menu_v4_1 = require("./internal/menu-v4");
/** The check / dot indicator, square. `2xl - md` off the scale. */
function markSize(spacing) {
    return spacing['2xl'] - spacing.md;
}
/**
 * **V4 modifier list** — same props as {@link ModifierList} plus
 * `requiredLabel`.
 *
 * ## Five changes
 *
 * 1. **A paid extra is no longer added in silence.** Each row was a
 *    `checkbox` / `radio` carrying `accessibilityLabel={option.label}`, and
 *    both roles are children-presentational — so "Extra cheese" was announced
 *    and "+$1.50" was not. The price delta is part of the row's one name now.
 * 2. **`required` reaches assistive tech.** It was a red word beside the
 *    heading and nothing else; it is folded into the group's name, the way
 *    `LabelV4` folds it into a field's.
 * 3. **A row clears 44.** The rows were roughly 38 tall, on a control a thumb
 *    hits repeatedly while building an order.
 * 4. **Disabled means the handler does not fire**, and it is drawn at M3's
 *    0.38 band rather than a hand-picked 0.5 — and press is a state layer, so
 *    a pressed row no longer reads as an unavailable one.
 * 5. **The empty case is a real empty state**, not a lone grey line.
 */
function ModifierListV4({ options, mode = 'multi', title, required = false, requiredLabel = 'Required', onToggle, currency = 'USD', emptyLabel = 'No options', formatMoney = commerce_1.formatMoney, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const single = mode === 'single';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const mark = markSize(tokens.spacing);
    const groupName = (0, menu_v4_1.spokenLine)([title, required ? requiredLabel : null]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [title ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "base", weight: "semibold", tone: "onSurface", children: title }), required ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: (0, menu_v4_1.toneInk)(theme, 'danger') }, children: requiredLabel })) : null] })) : null, options.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "summary", style: {
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                    paddingVertical: tokens.spacing.lg,
                    paddingHorizontal: tokens.spacing.md,
                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptyLabel }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: single ? 'radiogroup' : undefined, accessibilityLabel: groupName !== '' ? groupName : undefined, style: {
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                    overflow: 'hidden',
                }, children: options.map((option, index) => {
                    const selected = option.selected === true;
                    const disabled = option.disabled === true;
                    const cents = option.priceCents;
                    const hasDelta = typeof cents === 'number' && cents !== 0;
                    const deltaText = hasDelta
                        ? `${cents > 0 ? '+' : '−'}${formatMoney(Math.abs(cents), currency)}`
                        : null;
                    // Change 1: the delta is in the name, because the role prunes it
                    // out of the subtree.
                    const rowName = (0, menu_v4_1.spokenLine)([option.label, deltaText, required ? requiredLabel : null]);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: single ? 'radio' : 'checkbox', accessibilityState: { checked: selected, disabled }, accessibilityLabel: rowName, disabled: disabled, 
                        // Change 4: the guard as well as the flag.
                        onPress: disabled ? undefined : () => onToggle?.(option.id), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            minHeight: tap,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            borderTopWidth: index === 0 ? 0 : 1,
                            borderTopColor: colors.border,
                            opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
                            backgroundColor: pressed
                                ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard)
                                : 'transparent',
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                                    width: mark,
                                    height: mark,
                                    borderRadius: single ? tokens.radius.full : tokens.radius.sm,
                                    borderWidth: 2,
                                    borderColor: selected ? colors.primary : colors.border,
                                    backgroundColor: selected ? colors.primary : colors.card,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: selected ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: single ? '●' : '✓', size: "xs", style: { color: (0, menu_v4_1.onPair)(theme, 'primary') } })) : null }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", style: { flex: 1 }, children: option.label }), deltaText ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: deltaText })) : null] }, option.id));
                }) }))] }));
}
//# sourceMappingURL=ModifierListV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipSelector = TipSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const commerce_1 = require("../commerce");
const DEFAULT_PERCENTS = [10, 15, 20, 25];
/**
 * A row of tip-percentage options rendered as a radio-style segmented control.
 * Each option shows its percentage and, when `subtotalCents` is given, the
 * computed amount. The selected option fills with the `primary` token pair and
 * carries `accessibilityState.checked` so selection is not signalled by color
 * alone. An optional leading "No tip" option emits `null`. Token-only.
 */
function TipSelector({ percents = DEFAULT_PERCENTS, selectedPercent, onSelect, subtotalCents, currency = 'USD', title = 'Add a tip', allowNone = true, formatMoney = commerce_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const choices = [
        ...(allowNone ? [{ key: 'none', percent: null, label: 'No tip' }] : []),
        ...percents.map((p) => ({ key: String(p), percent: p, label: `${p}%` })),
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: choices.map((choice) => {
                    const selected = choice.percent === null
                        ? selectedPercent === null || selectedPercent === undefined
                        : selectedPercent === choice.percent;
                    const amount = choice.percent !== null && typeof subtotalCents === 'number'
                        ? Math.round((subtotalCents * choice.percent) / 100)
                        : null;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, checked: selected }, accessibilityLabel: amount !== null ? `${choice.label}, ${formatMoney(amount, currency)}` : choice.label, onPress: () => onSelect?.(choice.percent), style: ({ pressed }) => ({
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.xs,
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: selected ? colors.primary : colors.border,
                            backgroundColor: selected ? colors.primary : colors.surface,
                            opacity: pressed ? 0.85 : 1,
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: selected ? colors.onPrimary : colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '700',
                                }, children: choice.label }), amount !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: selected ? colors.onPrimary : colors.muted,
                                    fontSize: tokens.typography.scale.xs,
                                }, children: formatMoney(amount, currency) })) : null] }, choice.key));
                }) })] }));
}
//# sourceMappingURL=TipSelector.js.map
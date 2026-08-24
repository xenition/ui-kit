"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifierList = ModifierList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const commerce_1 = require("../commerce");
/**
 * A selectable list of dish modifiers / add-ons. `mode` picks the semantics:
 * `single` behaves like a radio group (announced as `radio`), `multi` like
 * checkboxes (announced as `checkbox`). Each row shows its label, a signed
 * price delta, and a token-drawn check/dot indicator whose selected state is
 * carried in `accessibilityState` (not color alone). Renders an empty row when
 * there are no options. Token-only.
 */
function ModifierList({ options, mode = 'multi', title, required = false, onToggle, currency = 'USD', emptyLabel = 'No options', formatMoney = commerce_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const single = mode === 'single';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [title ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), required ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Required" })) : null] })) : null, options.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: single ? 'radiogroup' : undefined, style: {
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    overflow: 'hidden',
                }, children: options.map((option, index) => {
                    const selected = option.selected === true;
                    const delta = typeof option.priceCents === 'number' && option.priceCents !== 0;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: single ? 'radio' : 'checkbox', accessibilityState: { checked: selected, disabled: option.disabled }, accessibilityLabel: option.label, disabled: option.disabled, onPress: () => onToggle?.(option.id), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            borderTopWidth: index === 0 ? 0 : 1,
                            borderTopColor: colors.border,
                            opacity: option.disabled ? 0.5 : pressed ? 0.8 : 1,
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 22,
                                    height: 22,
                                    borderRadius: single ? tokens.radius.full : tokens.radius.sm,
                                    borderWidth: 2,
                                    borderColor: selected ? colors.primary : colors.border,
                                    backgroundColor: selected ? colors.primary : colors.surface,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: single ? '●' : '✓' })) : null }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: option.label }), delta ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [option.priceCents > 0 ? '+' : '−', formatMoney(Math.abs(option.priceCents), currency)] })) : null] }, option.id));
                }) }))] }));
}
//# sourceMappingURL=ModifierList.js.map
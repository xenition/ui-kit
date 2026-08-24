"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollableTabs = ScrollableTabs;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Horizontally scrollable tab bar for when there are more tabs than fit the
 * viewport (the base `Tabs` is a fixed non-scrolling row). Each tab is a
 * `Pressable` inside a horizontal `ScrollView`, with a token-bound active
 * underline and an optional trailing badge. All colors and spacing come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
function ScrollableTabs({ items, value, onValueChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, accessibilityRole: "tablist", style: [{ borderBottomWidth: 1, borderColor: colors.border }, style], contentContainerStyle: { gap: tokens.spacing.xs }, children: items.map((it) => {
            const active = it.value === value;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityState: { selected: active }, onPress: () => onValueChange(it.value), style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.sm,
                    borderBottomWidth: 2,
                    marginBottom: -1,
                    borderColor: active ? colors.primary : 'transparent',
                }, children: [typeof it.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: active ? colors.primary : colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: active ? '600' : '500',
                        }, children: it.label })) : (it.label), it.badge != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            minWidth: tokens.spacing.md,
                            alignItems: 'center',
                            paddingHorizontal: tokens.spacing.xs,
                            paddingVertical: tokens.spacing.xs / 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: active ? colors.primary : colors.muted,
                        }, children: typeof it.badge === 'string' || typeof it.badge === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: it.badge })) : (it.badge) })) : null] }, it.value));
        }) }));
}
//# sourceMappingURL=ScrollableTabs.js.map
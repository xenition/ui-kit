"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomNav = BottomNav;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
/**
 * Fixed bottom tab bar — the primary mobile navigation pattern. A full-width
 * row of tappable items on a `surface` background with a top hairline in the
 * `border` token; the active item's label renders in the `primary` tone while
 * inactive items use `muted`. Exposes `tablist`/`tab` a11y roles with the
 * selected state. No literal colors.
 */
function BottomNav({ items, active, onChange, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Add the device's bottom safe-area inset to the token padding so the bar
    // clears the home indicator. Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "tablist", style: [
            {
                flexDirection: 'row',
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                paddingBottom: tokens.spacing.sm + insets.bottom,
                paddingTop: tokens.spacing.sm,
            },
            style,
        ], children: items.map((item) => {
            const selected = item.key === active;
            const tone = selected ? colors.primary : colors.muted;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityState: { selected }, accessibilityLabel: item.label, onPress: () => onChange(item.key), style: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.xs,
                }, children: [item.icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: item.icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: selected ? '600' : '400',
                            color: tone,
                        }, children: item.label })] }, item.key));
        }) }));
}
//# sourceMappingURL=BottomNav.js.map
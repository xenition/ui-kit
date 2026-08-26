"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = Tabs;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed tab bar (controlled) — the native mirror of the web `Tabs`. A row of
 * `Pressable` tabs with a token-bound active underline; render the active panel
 * yourself based on `value`. No literal colors.
 */
function Tabs({ items, value, onValueChange, onChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onValueChange ?? onChange;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "tablist", style: [
            { flexDirection: 'row', gap: tokens.spacing.xs, borderBottomWidth: 1, borderColor: colors.border },
            style,
        ], children: items.map((it) => {
            const active = it.value === value;
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityState: { selected: active }, onPress: () => emit?.(it.value), style: {
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.sm,
                    borderBottomWidth: 2,
                    marginBottom: -1,
                    borderColor: active ? colors.primary : 'transparent',
                }, children: typeof it.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: active ? colors.primary : colors.muted,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: '500',
                    }, children: it.label })) : (it.label) }, it.value));
        }) }));
}
//# sourceMappingURL=Tabs.js.map
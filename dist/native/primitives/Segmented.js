"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Segmented = Segmented;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Segmented control (pill toggle group) — the native mirror of the web
 * `Segmented`. A token-bound track holds pressable pills; the active pill lifts
 * onto the surface color. No literal colors.
 */
function Segmented({ options, value, onChange, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "tablist", style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                backgroundColor: colors.border,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.xs,
                gap: tokens.spacing.xs,
            },
            style,
        ], children: options.map((o) => {
            const active = o.value === value;
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityState: { selected: active }, onPress: () => onChange(o.value), style: {
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: active ? colors.surface : 'transparent',
                }, children: typeof o.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: active ? colors.onSurface : colors.muted,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: '500',
                    }, children: o.label })) : (o.label) }, o.value));
        }) }));
}
//# sourceMappingURL=Segmented.js.map
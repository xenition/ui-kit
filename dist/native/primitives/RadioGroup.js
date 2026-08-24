"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = RadioGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DOT = 20;
const INNER = 10;
/**
 * Single-choice radio group — the native mirror of the web `RadioGroup`. A
 * token-bound `Pressable` row per option with a filled dot for the selection.
 * No literal colors.
 */
function RadioGroup({ options, value, onValueChange, orientation = 'vertical', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: [
            {
                flexDirection: orientation === 'vertical' ? 'column' : 'row',
                flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
                gap: tokens.spacing.sm,
            },
            style,
        ], children: options.map((o) => {
            const selected = o.value === value;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled: o.disabled }, disabled: o.disabled, onPress: () => onValueChange?.(o.value), style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    opacity: o.disabled ? 0.5 : 1,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: DOT,
                            height: DOT,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: selected ? colors.primary : colors.border,
                            backgroundColor: colors.surface,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: INNER,
                                height: INNER,
                                borderRadius: tokens.radius.full,
                                backgroundColor: colors.primary,
                            } })) : null }), typeof o.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: o.label })) : (o.label)] }, o.value));
        }) }));
}
//# sourceMappingURL=RadioGroup.js.map
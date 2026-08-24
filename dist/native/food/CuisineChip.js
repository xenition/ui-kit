"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuisineChip = CuisineChip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
/**
 * A pill chip for a cuisine / category filter. When `onPress` is given it acts
 * as a selectable filter and its selected state is carried in
 * `accessibilityState.selected` (never signalled by color alone); without
 * `onPress` it is a static label. Selected chips use the `primary`/`onPrimary`
 * token pair. Token-only.
 */
function CuisineChip({ label, glyph, selected = false, onPress, disabled = false, size = 'md', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const padV = size === 'sm' ? 4 : tokens.spacing.xs;
    const padH = size === 'sm' ? tokens.spacing.sm : tokens.spacing.md;
    const fontSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;
    const fg = selected ? colors.onPrimary : colors.onSurface;
    const chipStyle = [
        {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: padV,
            paddingHorizontal: padH,
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: selected ? colors.primary : colors.surface,
            opacity: disabled ? 0.5 : 1,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [glyph ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "xs", style: { color: fg } }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize, fontWeight: '600' }, children: label })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected, disabled }, disabled: disabled, onPress: onPress, style: ({ pressed }) => [chipStyle, { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: chipStyle, children: inner });
}
//# sourceMappingURL=CuisineChip.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcebreakerChip = IcebreakerChip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * Tappable conversation-starter chip — the native icebreaker. A person picks a
 * prompt to break the ice; `selected` reflects an already-chosen prompt and is
 * surfaced to screen readers via `accessibilityState.selected` (not color
 * alone). All colors derive from theme tokens through `withAlpha` tints — no
 * literal colors.
 */
function IcebreakerChip({ label, value, selected = false, disabled = false, variant = 'soft', size = 'md', glyph, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const padV = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;
    const padH = size === 'sm' ? tokens.spacing.sm : tokens.spacing.md;
    const textKey = size === 'sm' ? 'xs' : 'sm';
    const accent = colors.primary;
    let bg = 'transparent';
    let fg = colors.onSurface;
    let borderColor = 'transparent';
    let borderWidth = 0;
    if (selected) {
        bg = accent;
        fg = colors.onPrimary;
    }
    else if (variant === 'solid') {
        bg = (0, color_1.withAlpha)(accent, 0.2);
        fg = accent;
    }
    else if (variant === 'soft') {
        bg = (0, color_1.withAlpha)(accent, 0.12);
        fg = accent;
    }
    else {
        borderWidth = 1;
        borderColor = colors.border;
        fg = colors.onSurface;
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected, disabled }, accessibilityLabel: label, disabled: disabled, onPress: () => onPress?.(value ?? label), style: ({ pressed }) => [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: bg,
                borderColor,
                borderWidth,
                borderRadius: tokens.radius.full,
                paddingVertical: padV,
                paddingHorizontal: padH,
                opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
            },
            style,
        ], children: [glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale[textKey] }, allowFontScaling: false, children: glyph })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }, children: label })] }));
}
//# sourceMappingURL=IcebreakerChip.js.map
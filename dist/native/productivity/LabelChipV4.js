"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelChipV4 = LabelChipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/** Maps a tone to the semantic slot used for its accent dot + soft tint. */
const SLOT = {
    neutral: 'muted',
    primary: 'primary',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * LabelChip — **V4** "flow" design. The focused-workspace take on a label: a
 * rounded, **soft-tint** chip carrying a small tone-colored dot and its text,
 * with an optional remove (×). Calm and borderless — the tone lives in a gentle
 * `withAlpha` wash rather than an outline, and the single accent dot does the
 * work. Same props/behavior as {@link LabelChipProps} (`tone` dot, `onPress`,
 * `onRemove`); token-only colors via `useXenitionTheme()`.
 */
function LabelChipV4({ label, tone = 'neutral', onRemove, onPress, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = colors[SLOT[tone] ?? 'muted'];
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: accent } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: label }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${label}`, onPress: onRemove, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "\u00D7" }) })) : null] }));
    const containerStyle = [
        {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            backgroundColor: (0, color_1.withAlpha)(accent, 0.1),
            borderRadius: tokens.radius.full,
            paddingVertical: 4,
            paddingHorizontal: tokens.spacing.sm + 2,
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.7 : 1 }], children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: body });
}
//# sourceMappingURL=LabelChipV4.js.map
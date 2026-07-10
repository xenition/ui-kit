"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = Tag;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Maps a tone to its [background, foreground] semantic slots (allowed tokens only). */
const TONE = {
    neutral: ['border', 'onSurface'],
    primary: ['primary', 'onPrimary'],
    success: ['success', 'onPrimary'],
    warn: ['accent', 'onPrimary'],
    danger: ['danger', 'onPrimary'],
};
/**
 * Removable chip/tag — the native mirror of the web `Tag`. Token-bound
 * background/foreground per tone; an optional `onRemove` renders a × button.
 * For filters, keywords, multi-select values. No literal colors.
 */
function Tag({ tone = 'neutral', onRemove, style, children }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [bg, fg] = TONE[tone];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: colors[bg],
                borderRadius: tokens.radius.sm,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: [typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: children })) : (children), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Remove", onPress: onRemove, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: "\u00D7" }) })) : null] }));
}
//# sourceMappingURL=Tag.js.map
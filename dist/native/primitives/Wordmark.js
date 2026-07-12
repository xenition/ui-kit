"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wordmark = Wordmark;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
// Font size + logomark square (px) per size — mirrors the web sm/md/lg scale.
const SIZE = {
    sm: { font: 16, mark: 16 },
    md: { font: 18, mark: 20 },
    lg: { font: 24, mark: 28 },
};
/**
 * Themed brand wordmark — the native mirror of the web `Wordmark`. A token
 * logomark square (primary, rounded) plus the name in bold `onSurface`. Native
 * headings convey the heading font via weight (no `fontFamily`), matching every
 * other native marketing/primitive component. Pass `onPress` to make it a
 * tappable header brand; omit for a static label. Token-only — no literal
 * colors.
 */
function Wordmark({ name, mark, size = 'md', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const dims = SIZE[size];
    const gap = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;
    const defaultMark = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: dims.mark,
            height: dims.mark,
            borderRadius: tokens.radius.sm,
            backgroundColor: colors.primary,
        } }));
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center', gap }, style], children: [mark === undefined ? defaultMark : mark, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    fontSize: dims.font,
                    fontWeight: '700',
                    color: colors.onSurface,
                }, children: name })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: onPress, accessibilityRole: "link", accessibilityLabel: name, children: content }));
    }
    return content;
}
//# sourceMappingURL=Wordmark.js.map
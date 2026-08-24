"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkButton = BookmarkButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A toggle for saving / bookmarking an article. Controlled: it reflects the
 * `bookmarked` prop and calls `onToggle(!bookmarked)` on press — the parent
 * owns the state. Filled accent glyph when saved, muted outline glyph when not.
 * Announces its pressed/selected state to screen readers. Two variants
 * (`icon` / `labeled`). All colors from `SemanticColors`; no literal hex.
 */
function BookmarkButton({ bookmarked, onToggle, variant = 'icon', disabled = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const glyph = bookmarked ? '★' : '☆';
    const glyphColor = bookmarked ? 'accent' : 'muted';
    const label = bookmarked ? 'Saved' : 'Save';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: bookmarked ? 'Remove bookmark' : 'Bookmark article', accessibilityState: { selected: bookmarked, disabled }, disabled: disabled, onPress: () => onToggle(!bookmarked), hitSlop: 8, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: variant === 'labeled' ? tokens.spacing.sm : tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                borderWidth: variant === 'labeled' ? 1 : 0,
                borderColor: colors.border,
                opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "lg", color: glyphColor }), variant === 'labeled' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: bookmarked ? colors.accent : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                }, children: label })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants" }))] }));
}
//# sourceMappingURL=BookmarkButton.js.map
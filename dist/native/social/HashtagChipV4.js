"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashtagChipV4 = HashtagChipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * HashtagChip — **V4** "feed" design. A rounded soft-primary chip: `#tag`
 * rendered in primary on a soft-primary tint, tappable with a ≥44px target.
 * When `active` it fills with the primary color. Same props/behavior as
 * {@link HashtagChipProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`, `link` a11y role.
 */
function HashtagChipV4({ tag, active = false, count, size = 'md', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const bare = tag.replace(/^#/, '');
    const label = `#${bare}`;
    const fontSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "link", accessibilityLabel: label, accessibilityState: { selected: active }, disabled: !onPress, onPress: onPress ? () => onPress(bare) : undefined, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                minHeight: 44,
                gap: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                backgroundColor: active ? colors.primary : (0, color_1.withAlpha)(colors.primary, 0.1),
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
                opacity: pressed ? 0.85 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: active ? colors.onPrimary : colors.primaryText, fontSize, fontWeight: '600' }, children: label }), count != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: active ? colors.onPrimary : (0, color_1.withAlpha)(colors.primaryText, 0.7), fontSize }, children: String(count) })) : null] }));
}
//# sourceMappingURL=HashtagChipV4.js.map
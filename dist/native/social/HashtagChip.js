"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashtagChip = HashtagChip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A tappable hashtag pill. Idle chips read muted-on-surface; `active` chips
 * fill with the primary color. Composes into topic bars, trending lists, and
 * post footers. Token-only, `link` a11y role.
 */
function HashtagChip({ tag, active = false, count, size = 'md', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const bare = tag.replace(/^#/, '');
    const label = `#${bare}`;
    const fontSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;
    const padV = size === 'sm' ? 2 : tokens.spacing.xs;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "link", accessibilityLabel: label, accessibilityState: { selected: active }, disabled: !onPress, onPress: onPress ? () => onPress(bare) : undefined, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.border,
                backgroundColor: active ? colors.primary : colors.surface,
                paddingVertical: padV,
                paddingHorizontal: tokens.spacing.sm,
                opacity: pressed ? 0.85 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: active ? colors.onPrimary : colors.primaryText, fontSize, fontWeight: '600' }, children: label }), count != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: active ? colors.onPrimary : colors.muted, fontSize }, children: String(count) })) : null] }));
}
//# sourceMappingURL=HashtagChip.js.map
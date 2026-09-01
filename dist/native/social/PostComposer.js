"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostComposer = PostComposer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const primitives_1 = require("../primitives");
/**
 * PostComposer — the compose-a-post card for the social V4 "feed" line. A clean
 * surface card pairs the author avatar with a growing text field, a row of
 * soft-primary action glyph buttons (photo / poll / emoji), a live character
 * counter that flips to danger when over `maxLength`, and a primary Post CTA that
 * disables while empty, over the limit, or `posting`. Presentational only —
 * controlled `value` + callbacks. Token-only colors via `useXenitionTheme()`;
 * the ≥44px controls stay accessible and dark-mode safe.
 */
function PostComposer({ authorAvatarUrl, authorName, value, onChangeText, placeholder = "What's on your mind?", onPost, posting = false, maxLength, onAddPhoto, onAddPoll, onAddEmoji, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const softPrimary = tokens.ramps.primary[50];
    const length = value.length;
    const overLimit = maxLength != null && length > maxLength;
    const empty = value.trim().length === 0;
    const disabled = empty || overLimit || posting;
    const Action = ({ label, glyph, onPress }) => onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.md,
            backgroundColor: softPrimary,
            opacity: pressed ? 0.8 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: glyph }) })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: authorAvatarUrl, name: authorName, size: "md", style: { marginTop: 2 } }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { value: value, onChangeText: onChangeText, placeholder: placeholder, placeholderTextColor: colors.muted, accessibilityLabel: placeholder, multiline: true, textAlignVertical: "top", style: {
                            flex: 1,
                            minHeight: 72,
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            lineHeight: tokens.typography.scale.base * 1.5,
                            padding: 0,
                        } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Action, { label: "Add photo", glyph: "\uD83D\uDDBC\uFE0F", onPress: onAddPhoto }), (0, jsx_runtime_1.jsx)(Action, { label: "Add poll", glyph: "\uD83D\uDCCA", onPress: onAddPoll }), (0, jsx_runtime_1.jsx)(Action, { label: "Add emoji", glyph: "\uD83D\uDE0A", onPress: onAddEmoji })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [maxLength != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: { color: overLimit ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [length, "/", maxLength] })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "md", onPress: onPost, disabled: disabled, accessibilityLabel: "Post", style: { minHeight: 44 }, children: posting ? 'Posting…' : 'Post' })] })] })] }));
}
//# sourceMappingURL=PostComposer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePrompt = ProfilePrompt;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
/**
 * A profile prompt + answer block — the native mirror of a dating "prompt" card
 * ("My simple pleasures → …"). The prompt is styled quietly, the answer is the
 * emphasis. Optional tap-to-like affordance surfaces its pressed state through
 * `accessibilityState.selected`, not color. Colors come from theme tokens and
 * `withAlpha` tints — no literal colors. Renders a graceful empty state when the
 * answer is missing.
 */
function ProfilePrompt({ prompt, answer, variant = 'card', glyph, liked = false, onPress, onLike, emptyLabel = 'No answer yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasAnswer = answer != null && answer.trim().length > 0;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, allowFontScaling: false, children: glyph })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: prompt })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            flex: 1,
                            color: hasAnswer ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale[variant === 'quote' ? 'xl' : 'lg'],
                            fontStyle: variant === 'quote' ? 'italic' : 'normal',
                            fontWeight: variant === 'quote' ? '600' : '500',
                        }, children: hasAnswer ? (variant === 'quote' ? `“${answer}”` : answer) : emptyLabel }), onLike ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: liked ? 'Unlike prompt' : 'Like prompt', accessibilityState: { selected: liked }, onPress: onLike, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: liked ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }, children: liked ? '♥' : '♡' }) })) : null] })] }));
    const content = variant === 'plain' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: body })) : variant === 'quote' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                borderLeftWidth: 3,
                borderLeftColor: colors.primary,
                backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06),
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: body })) : ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", padding: "md", style: style, children: body }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${prompt}. ${hasAnswer ? answer : emptyLabel}`, onPress: onPress, children: content }));
    }
    return content;
}
//# sourceMappingURL=ProfilePrompt.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyQuoteCard = DailyQuoteCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const TONE_KEY = {
    primary: 'primary',
    accent: 'accent',
    success: 'success',
};
/**
 * A daily inspiration card: a tinted quote mark, the quote and author, an
 * optional category eyebrow, and favorite / share controls. `favorited` flips
 * the heart glyph and its a11y state (state, not color alone); `loading`
 * renders a skeleton and a missing quote shows an empty note. Token-only colors
 * (semantic slots + a `withAlpha` tint).
 */
function DailyQuoteCard({ quote, author, category, tone = 'primary', favorited = false, loading = false, onFavorite, onShare, emptyLabel = 'No quote today.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = colors[TONE_KEY[tone] ?? 'primary'];
    const containerStyle = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading quote", style: [containerStyle, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "90%", height: tokens.typography.scale.lg }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "75%", height: tokens.typography.scale.lg }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "40%", height: tokens.typography.scale.sm })] }));
    }
    if (!quote) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: [containerStyle, { alignItems: 'center' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: "\uD83D\uDD4A\uFE0F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Quote${author ? ` by ${author}` : ''}: ${quote}`, style: [containerStyle, style], children: [category ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: category })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'], color: (0, color_1.withAlpha)(accent, 0.5) }, children: "\u201C" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            flex: 1,
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '600',
                            lineHeight: Math.round(tokens.typography.scale.lg * 1.4),
                        }, children: quote })] }), author ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }, children: ["\u2014 ", author] })) : null, onFavorite || onShare ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [onFavorite ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: favorited }, accessibilityLabel: favorited ? 'Remove from favorites' : 'Add to favorites', onPress: () => onFavorite(!favorited), style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }, children: favorited ? '♥' : '♡' }) })) : null, onShare ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Share quote", onPress: onShare, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.lg }, children: "\u2197" }) })) : null] })) : null] }));
}
//# sourceMappingURL=DailyQuoteCard.js.map
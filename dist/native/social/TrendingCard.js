"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendingCard = TrendingCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * TrendingCard — **V4** "feed" design. A clean, airy trending-topic card: a
 * muted `#rank · category` context line, the bold `topic`, and the `postCount`
 * as a big muted numeral. An optional `⋯` menu sits at the top-right. Pressed
 * state uses a soft-primary tint (via `withAlpha`). Presentational; token-only
 * colors via `useXenitionTheme()`. Native twin of the web `TrendingCard`.
 */
function TrendingCard({ rank, category, topic, postCount, onPress, onMenu, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const context = [rank != null ? `#${rank}` : null, category].filter(Boolean).join(' · ');
    const a11yLabel = [context, topic, postCount].filter(Boolean).join(', ');
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: tokens.spacing.sm,
            minHeight: 44,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: tokens.spacing.lg,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [context ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: colors.muted }, children: context })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.base, fontWeight: '800', color: colors.onSurface }, children: topic }), postCount ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'], fontWeight: '800', color: colors.muted }, children: postCount })) : null] }), onMenu ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "More options", onPress: onMenu, hitSlop: 8, style: ({ pressed }) => ({
                    width: 44,
                    height: 44,
                    marginTop: -tokens.spacing.xs,
                    marginRight: -tokens.spacing.xs,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.1) : 'transparent',
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, fontWeight: '700', color: colors.muted }, children: "\u22EF" }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, style: ({ pressed }) => [containerStyle, pressed ? { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) } : null], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11yLabel, style: containerStyle, children: inner }));
}
//# sourceMappingURL=TrendingCard.js.map
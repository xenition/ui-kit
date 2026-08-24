"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCard = EventCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
/**
 * Summary tile for a single event — the entry point of the events module.
 * Renders a cover (image or token placeholder), an optional category badge,
 * the title, and a date / time / location meta row. `variant` switches between
 * a full card, a `compact` list row (no cover), and a larger `featured`
 * treatment. The whole card is pressable via `onPress`. All colors come from
 * the compiled theme tokens — no literal colors.
 */
function EventCard({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant = 'default', onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading event", style: containerStyle, children: [!isCompact ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: isFeatured ? 200 : 140, backgroundColor: tokens.ramps.neutral[200] } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.md, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    const metaLine = [date, time].filter(Boolean).join(' · ');
    const cover = !isCompact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: isFeatured ? 200 : 140, width: '100%', backgroundColor: tokens.ramps.neutral[100] }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9F\uFE0F", size: "2xl" }) })), category ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: category }) })) : null] })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md }, children: [isCompact && category ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: category })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                    color: colors.onSurface,
                    fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.base,
                    fontWeight: '700',
                }, children: title }), metaLine ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDDD3\uFE0F", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaLine })] })) : null, location ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCCD", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: location })] })) : null, typeof attendeeCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC65", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `${attendeeCount} going` })] })) : null] }));
    const inner = isCompact ? (body) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cover, body] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => [containerStyle, { flexDirection: isCompact ? 'row' : 'column', opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [containerStyle, { flexDirection: isCompact ? 'row' : 'column' }], children: inner });
}
//# sourceMappingURL=EventCard.js.map
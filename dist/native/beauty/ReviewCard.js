"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewCard = ReviewCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
/**
 * A customer review card: avatar + author, a star `Rating`, an optional service
 * chip and verified badge, the review body, and an optional salon reply block.
 * `variant="compact"` drops the body for dense lists. The verified state is a
 * spoken/labelled note (not color alone). Token-only colors — chips/reply use
 * `withAlpha` tints over semantic slots.
 */
function ReviewCard({ author, rating, text, date, service, avatarUrl, verified = false, variant = 'default', reply, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Review by ${author}, ${rating} out of 5 stars${verified ? ', verified' : ''}${service ? `, for ${service}` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: author, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: author }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }), date ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", date] }) : null] })] }), verified ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1, backgroundColor: (0, color_1.withAlpha)(colors.success, 0.16) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713 Verified" }) })) : null] }), service ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start', borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: service }) })) : null, !compact && text ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.4 }, children: text })) : null, reply ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, borderRadius: tokens.radius.md, padding: tokens.spacing.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.1) }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Response from salon" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: reply })] })) : null] }));
}
//# sourceMappingURL=ReviewCard.js.map
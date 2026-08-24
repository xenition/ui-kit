"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewStars = ReviewStars;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * An aggregate review widget — a large average, a star row, the review count,
 * and an optional per-star distribution drawn as token proportion bars. Bar
 * widths are guarded against a zero total. Token-only colors.
 */
function ReviewStars({ average, total, distribution = [], summary, compact = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const maxCount = distribution.reduce((m, b) => Math.max(m, b.count), 0);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${average} out of 5${typeof total === 'number' ? `, ${total} reviews` : ''}`, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: average.toFixed(1) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: average, size: "sm" }), summary || typeof total === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [summary, typeof total === 'number' ? `${total} reviews` : undefined].filter(Boolean).join(' · ') })) : null] })] }), !compact && distribution.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: distribution.map((b, i) => {
                    const pct = maxCount > 0 ? Math.round((b.count / maxCount) * 100) : 0;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 16, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: b.stars }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.border }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.accent } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 32, textAlign: 'right', color: colors.muted, fontSize: tokens.typography.scale.xs }, children: b.count })] }, `${b.stars}-${i}`));
                }) })) : null] }));
}
//# sourceMappingURL=ReviewStars.js.map
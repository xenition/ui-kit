"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewStarsV4 = ReviewStarsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * ReviewStars — **V4** "journey" design. The boarding-pass take on an aggregate
 * review: the average sits large in near-white ink on a brand-gradient rating
 * badge (the signature V4 touch), the star row and count ride beside it, and the
 * optional per-star distribution is drawn as thin token proportion bars. Bar
 * widths are guarded against a zero total. Same props/behavior as
 * {@link ReviewStarsProps}; token-only colors via `useXenitionTheme()`. Pass
 * `compact` for a single-line layout that hides the distribution.
 */
function ReviewStarsV4({ average, total, distribution = [], summary, compact = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const maxCount = distribution.reduce((m, b) => Math.max(m, b.count), 0);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${average} out of 5${typeof total === 'number' ? `, ${total} reviews` : ''}`, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                            width: 56,
                            height: 56,
                            borderRadius: tokens.radius.lg,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: average.toFixed(1) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: average, size: "sm" }), summary || typeof total === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: [summary, typeof total === 'number' ? `${total} reviews` : undefined].filter(Boolean).join(' · ') })) : null] })] }), !compact && distribution.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: distribution.map((b, i) => {
                    const pct = maxCount > 0 ? Math.round((b.count / maxCount) * 100) : 0;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 16, color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: b.stars }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), start: { x: 0, y: 0 }, end: { x: 1, y: 0 }, style: { width: `${pct}%`, height: 6, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 32, textAlign: 'right', color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: b.count })] }, `${b.stars}-${i}`));
                }) })) : null] }));
}
//# sourceMappingURL=ReviewStarsV4.js.map
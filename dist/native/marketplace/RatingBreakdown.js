"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingBreakdown = RatingBreakdown;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/** Normalize either input shape into a `[1★..5★]` count tuple. */
function toTuple(counts) {
    const get = (star) => {
        const raw = Array.isArray(counts)
            ? counts[star - 1]
            : counts[star];
        return typeof raw === 'number' && raw > 0 ? raw : 0;
    };
    return [get(1), get(2), get(3), get(4), get(5)];
}
/**
 * A review-score distribution — a summary header (average + total count) over
 * five proportional bars, one per star level (5★ at the top). Accepts counts as
 * an ordered array or a `{1..5}` map, derives the average when not supplied, and
 * guards every lookup and the divide-by-zero empty case. Presentational, data
 * only. Reuses `Rating`; token-only colors with a token-derived alpha for the
 * bar track.
 */
function RatingBreakdown({ counts, average, hideSummary = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const tuple = toTuple(counts);
    const total = tuple.reduce((a, b) => a + b, 0);
    const derivedAvg = total > 0 ? tuple.reduce((sum, count, i) => sum + count * (i + 1), 0) / total : 0;
    const avg = typeof average === 'number' ? average : derivedAvg;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [hideSummary ? null : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: avg.toFixed(1) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: avg, size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${total.toLocaleString()} ${total === 1 ? 'rating' : 'ratings'}` })] })] })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [5, 4, 3, 2, 1].map((star) => {
                    const count = tuple[star - 1] ?? 0;
                    const pct = total > 0 ? count / total : 0;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${star} stars, ${count} ${count === 1 ? 'rating' : 'ratings'}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 16, color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'right' }, children: star }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    flex: 1,
                                    height: 8,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, internal_1.withAlpha)(colors.muted, 0.2),
                                    overflow: 'hidden',
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: `${Math.round(pct * 100)}%`,
                                        height: '100%',
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: colors.accent,
                                    } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 32, color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'right' }, children: count })] }, star));
                }) })] }));
}
//# sourceMappingURL=RatingBreakdown.js.map
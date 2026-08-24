"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRatingRow = DriverRatingRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * A rate-your-driver row — the driver identity plus a star control that fires
 * `onRate(stars)` when tapped. Interactive stars are real `Pressable`s with per-
 * star a11y labels and a selected state; when there is no `onRate` (or
 * `variant="readonly"`) it falls back to the read-only `Rating` primitive.
 * Colors come from semantic tokens and `withAlpha` tints — no literal colors.
 * The star count is clamped and indexing is guarded.
 */
function DriverRatingRow({ driverName, avatarUrl, subtitle, value = 0, max = 5, onRate, variant = 'interactive', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const total = Math.max(1, Math.floor(Number.isFinite(max) ? max : 5));
    const filled = Math.max(0, Math.min(total, Math.round(Number.isFinite(value) ? value : 0)));
    const interactive = variant === 'interactive' && Boolean(onRate);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading driver rating", style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    padding: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: !interactive, accessibilityLabel: !interactive ? `${driverName} rated ${filled} of ${total} stars` : undefined, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: avatarUrl, name: driverName, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: driverName }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitle })) : null, interactive ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: `Rate ${driverName}`, style: { flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: Array.from({ length: total }, (_, i) => {
                            const star = i + 1;
                            const on = star <= filled;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityLabel: `${star} star${star > 1 ? 's' : ''}`, accessibilityState: { selected: on }, onPress: () => onRate?.(star), hitSlop: 6, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xl, color: on ? colors.accent : (0, color_1.withAlpha)(colors.muted, 0.5) }, children: on ? '★' : '☆' }) }, star));
                        }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(primitives_2.Rating, { value: filled, max: total, size: "md", showValue: true }) }))] })] }));
}
//# sourceMappingURL=DriverRatingRow.js.map
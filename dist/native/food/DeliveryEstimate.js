"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryEstimate = DeliveryEstimate;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const MODE_GLYPH = { delivery: '🛵', pickup: '🛍️' };
const MODE_CAPTION = {
    delivery: 'Estimated delivery',
    pickup: 'Ready for pickup',
};
/**
 * A compact ETA readout — "25–35 min" with a mode glyph and caption. `variant`
 * renders it inline (glyph + text), as a token-tinted `badge` pill, or as a
 * bordered `card`. `loading` shows an em-dash placeholder. The window text is
 * built defensively so a missing `maxMinutes` collapses to a single value.
 * Token-only.
 */
function DeliveryEstimate({ minMinutes, maxMinutes, mode = 'delivery', variant = 'inline', caption, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const window = typeof maxMinutes === 'number' && maxMinutes > minMinutes
        ? `${minMinutes}–${maxMinutes} min`
        : `${minMinutes} min`;
    const timeText = loading ? '—' : window;
    const captionText = caption ?? MODE_CAPTION[mode];
    const label = `${captionText}: ${loading ? 'estimating' : window}`;
    if (variant === 'badge') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: label, style: [
                {
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    backgroundColor: tokens.ramps.neutral[100],
                    borderRadius: tokens.radius.full,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: MODE_GLYPH[mode], size: "xs" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: timeText })] }));
    }
    if (variant === 'card') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: label, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    padding: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: MODE_GLYPH[mode], size: "xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: timeText }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: captionText })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: label, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: MODE_GLYPH[mode], size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: timeText }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["\u00B7 ", captionText] })] }));
}
//# sourceMappingURL=DeliveryEstimate.js.map
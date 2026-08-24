"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompatibilityMeter = CompatibilityMeter;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
/** Score bands → semantic tone. State is conveyed by label text, not color alone. */
function bandFor(score) {
    if (score >= 80)
        return { tone: 'success', word: 'Great match' };
    if (score >= 55)
        return { tone: 'primary', word: 'Good match' };
    if (score >= 30)
        return { tone: 'accent', word: 'Some overlap' };
    return { tone: 'muted', word: 'Low overlap' };
}
const RING_D = { sm: 48, md: 64, lg: 88 };
/**
 * Compatibility score meter — visualises a 0–100 match score as a token-styled
 * bar, ring dial, or compact pill. The tone shifts across score bands but the
 * band is always spelled out in words ("Great match") and the a11y label states
 * the number, so meaning never rests on color. Colors come from semantic tokens
 * and `withAlpha` tints — no literal colors. Guarded against out-of-range input.
 */
function CompatibilityMeter({ score, label = 'Compatibility', showValue = true, variant = 'bar', size = 'md', loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
    const band = bandFor(clamped);
    const toneColor = colors[band.tone];
    const a11y = `${label}: ${clamped} percent, ${band.word}`;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: `${label}: loading`, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: size === 'lg' ? 14 : 12,
                        width: '55%',
                        borderRadius: tokens.radius.sm,
                        backgroundColor: colors.border,
                    } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: 10,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.border,
                    } })] }));
    }
    if (variant === 'ring') {
        const d = RING_D[size];
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: clamped }, accessibilityLabel: a11y, style: [{ alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: d,
                        height: d,
                        borderRadius: d / 2,
                        borderWidth: Math.max(4, Math.round(d * 0.12)),
                        borderColor: toneColor,
                        backgroundColor: (0, color_1.withAlpha)(toneColor, 0.1),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: showValue ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale[size === 'lg' ? 'xl' : 'base'],
                            fontWeight: '700',
                        }, children: [clamped, "%"] })) : null }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: band.word })] }));
    }
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    gap: tokens.spacing.xs,
                    backgroundColor: (0, color_1.withAlpha)(toneColor, 0.14),
                    borderRadius: tokens.radius.full,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: toneColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [clamped, "% \u00B7 ", band.word] })] }));
    }
    const barTone = band.tone === 'success' ? 'success' : band.tone === 'danger' ? 'danger' : band.tone === 'accent' ? 'warn' : 'primary';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: clamped }, accessibilityLabel: a11y, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }), showValue ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [clamped, "% \u00B7 ", band.word] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: clamped, max: 100, tone: barTone, size: size === 'sm' ? 'sm' : 'md' })] }));
}
//# sourceMappingURL=CompatibilityMeter.js.map
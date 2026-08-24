"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompatibilityMeterV2 = CompatibilityMeterV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/** Score bands → tone + spelled-out word (meaning never rests on color). */
function bandFor(score) {
    if (score >= 80)
        return { tone: 'success', word: 'Great match' };
    if (score >= 55)
        return { tone: 'primary', word: 'Good match' };
    if (score >= 30)
        return { tone: 'accent', word: 'Some overlap' };
    return { tone: 'muted', word: 'Low overlap' };
}
const DIAL = { sm: 72, md: 96, lg: 128 };
/**
 * CompatibilityMeter — design variant **V2**, a bold **score dial**. A large
 * filled, tone-tinted disc makes the numeric percentage the hero, with the label
 * caption above and the spelled-out band word in a pill beneath — a stat-tile
 * feel distinct from the original's slim inline ring. Same
 * `CompatibilityMeterProps`; token-pure tints via `withAlpha`; input is clamped
 * and NaN-guarded; a loading skeleton is included.
 */
function CompatibilityMeterV2({ score, label = 'Compatibility', showValue = true, size = 'md', loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
    const band = bandFor(clamped);
    const tone = colors[band.tone];
    const d = DIAL[size];
    const a11y = `${label}: ${clamped} percent, ${band.word}`;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: `${label}: loading`, style: [{ alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: d, height: d, borderRadius: d / 2, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: 96, borderRadius: tokens.radius.full, backgroundColor: colors.border } })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: clamped }, accessibilityLabel: a11y, style: [{ alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: d,
                    height: d,
                    borderRadius: d / 2,
                    borderWidth: Math.max(6, Math.round(d * 0.09)),
                    borderColor: tone,
                    backgroundColor: (0, color_1.withAlpha)(tone, 0.12),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: showValue ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale[size === 'sm' ? 'xl' : '2xl'], fontWeight: '800' }, children: [clamped, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "%" })] })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    backgroundColor: (0, color_1.withAlpha)(tone, 0.14),
                    borderRadius: tokens.radius.full,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: tone } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: band.word })] })] }));
}
//# sourceMappingURL=CompatibilityMeterV2.js.map
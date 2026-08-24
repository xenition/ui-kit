"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompatibilityMeterV3 = CompatibilityMeterV3;
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
const SEGMENTS = 10;
const SEG_H = { sm: 8, md: 12, lg: 16 };
/**
 * CompatibilityMeter — design variant **V3**, a **segmented bar**. The score is
 * quantised into ten discrete pips that fill in the band tone up to the value —
 * a chunky, glanceable read that is visually distinct from the original's smooth
 * progress bar — with the label, percentage, and a spelled-out band word above.
 * Same `CompatibilityMeterProps`; token-pure; clamped and NaN-guarded; loading
 * skeleton included.
 */
function CompatibilityMeterV3({ score, label = 'Compatibility', showValue = true, size = 'md', loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
    const band = bandFor(clamped);
    const tone = colors[band.tone];
    const filled = Math.round((clamped / 100) * SEGMENTS);
    const h = SEG_H[size];
    const a11y = `${label}: ${clamped} percent, ${band.word}`;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: `${label}: loading`, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 4 }, children: Array.from({ length: SEGMENTS }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: h, borderRadius: tokens.radius.sm, backgroundColor: colors.border } }, i))) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: clamped }, accessibilityLabel: a11y, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: label }), showValue ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [clamped, "% \u00B7 ", band.word] })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: band.word }))] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 4 }, children: Array.from({ length: SEGMENTS }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flex: 1,
                        height: h,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: i < filled ? tone : (0, color_1.withAlpha)(colors.border, 0.7),
                    } }, i))) })] }));
}
//# sourceMappingURL=CompatibilityMeterV3.js.map
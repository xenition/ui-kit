"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPSResultCard = NPSResultCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const focus_1 = require("./internal/focus");
/**
 * NPSResultCard — the survey's NPS **results hero** (V4 "focus" line). The big
 * computed score (`-100`..`100`) sits on a brand gradient ground
 * (`focusGradient`) in near-white ink (`focusInk` / `focusInkSoft`) with the
 * response count as a frosted caption tile. Below, a calm surface footer breaks
 * the responses down into three token bars — promoter→success, passive→warn,
 * detractor→danger — each a proportional fill with its raw count, so meaning is
 * never color-only. `promoters` / `passives` / `detractors` are **counts** (not
 * percentages). Presentational only. Token-only colors via `useXenitionTheme()`
 * + `focus*(tokens.ramps)` (no literals), dark-mode safe.
 */
function NPSResultCard({ score, responses, promoters, passives, detractors, title = 'Net Promoter Score', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, focus_1.focusInk)(r);
    const inkSoft = (0, focus_1.focusInkSoft)(r);
    const clamped = Math.max(-100, Math.min(100, Math.round(score)));
    const displayScore = clamped > 0 ? `+${clamped}` : `${clamped}`;
    const total = Math.max(0, promoters) + Math.max(0, passives) + Math.max(0, detractors);
    const pct = (n) => (total > 0 ? Math.round((Math.max(0, n) / total) * 100) : 0);
    const segments = [
        { key: 'promoter', label: 'Promoters', count: promoters, tone: 'success' },
        { key: 'passive', label: 'Passives', count: passives, tone: 'warn' },
        { key: 'detractor', label: 'Detractors', count: detractors, tone: 'danger' },
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, focus_1.focusGradient)(r), style: { padding: tokens.spacing.xl, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: inkSoft,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            letterSpacing: 0.5,
                            textTransform: 'uppercase',
                        }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `${title}: ${displayScore}`, allowFontScaling: false, style: {
                            color: ink,
                            fontSize: tokens.typography.scale['3xl'] * 1.6,
                            fontWeight: '800',
                            letterSpacing: -1,
                            marginTop: tokens.spacing.xs,
                        }, children: displayScore }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            marginTop: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, focus_1.focusTile)(r),
                            borderWidth: 1,
                            borderColor: (0, focus_1.focusBorder)(r),
                        }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [responses, " ", responses === 1 ? 'response' : 'responses'] }) })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: "Response breakdown", style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: segments.map((s) => {
                    const share = pct(s.count);
                    const tone = colors[s.tone];
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: share }, accessibilityLabel: `${s.label}: ${Math.max(0, s.count)}, ${share}%`, style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: tone } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: s.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [Math.max(0, s.count), " \u00B7 ", share, "%"] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: 8,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1),
                                    overflow: 'hidden',
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${share}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: tone } }) })] }, s.key));
                }) })] }));
}
//# sourceMappingURL=NPSResultCard.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadPlanBarV4 = LoadPlanBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * LoadPlanBar — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a trailer/container load plan: an elevated
 * rounded card with a soft shadow holding a caption row with a big legible
 * **tabular-nums** utilization figure, and a thick stacked capacity bar. Pass
 * `segments` (each a token-ramp slice) or a single `utilization`; the bar fills
 * proportionally and flips to a warn ramp past `warnAt`. Utilization is announced
 * via the `progressbar` role + `accessibilityValue` and echoed in the figure, so
 * fullness is never color-only. Token-only colors via `useXenitionTheme()`.
 */
function LoadPlanBarV4({ segments, utilization, caption, warnAt = 90, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(segments) ? segments : [];
    const total = list.length
        ? (0, internal_1.clampPct)(list.reduce((sum, s) => sum + (0, internal_1.clampPct)(s.pct), 0))
        : (0, internal_1.clampPct)(utilization);
    const over = total >= (0, internal_1.clampPct)(warnAt);
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const rampFor = (emphasis) => {
        if (over)
            return tokens.ramps.accent[400];
        if (emphasis === 'soft')
            return tokens.ramps.primary[200];
        if (emphasis === 'medium')
            return tokens.ramps.primary[400];
        return tokens.ramps.primary[500];
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: loading ? 'Load plan computing' : `Load ${total}% full${over ? ', near capacity' : ''}`, accessibilityValue: loading ? undefined : { min: 0, max: 100, now: total }, style: [shell, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.muted }, children: caption ?? 'Load plan' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontVariant: ['tabular-nums'], color: over ? colors.accent : colors.onSurface }, children: `${total}%` })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden', flexDirection: 'row' }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '35%', height: '100%', backgroundColor: tokens.ramps.neutral[200] } })) : list.length ? (list.map((seg, i) => {
                    const w = (0, internal_1.clampPct)(seg.pct);
                    if (w <= 0)
                        return null;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${w}%`, height: '100%', backgroundColor: rampFor(seg.emphasis), borderRightWidth: i < list.length - 1 ? 1 : 0, borderRightColor: colors.surface } }, seg.id));
                })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${total}%`, height: '100%', backgroundColor: rampFor('strong') } })) }), over ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.1) }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: colors.accent }, children: "\u26A0" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '700', color: colors.accent }, children: "Near capacity" })] })) : null] }));
}
//# sourceMappingURL=LoadPlanBarV4.js.map
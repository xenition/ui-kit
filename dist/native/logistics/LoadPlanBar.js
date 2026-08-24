"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadPlanBar = LoadPlanBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * A stacked capacity/utilization bar for trailer or container load planning.
 * Either pass `segments` (each a token-ramp slice) or a single `utilization`
 * value; the bar fills proportionally and flips to a warn ramp past `warnAt`.
 * Utilization is announced via the `progressbar` role + `accessibilityValue`
 * and echoed in the caption, so fullness is never color-only. No literal
 * colors — every fill is a `tokens.ramps.*` step.
 */
function LoadPlanBar({ segments, utilization, caption, warnAt = 90, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(segments) ? segments : [];
    const total = list.length
        ? (0, internal_1.clampPct)(list.reduce((sum, s) => sum + (0, internal_1.clampPct)(s.pct), 0))
        : (0, internal_1.clampPct)(utilization);
    const over = total >= (0, internal_1.clampPct)(warnAt);
    const rampFor = (emphasis) => {
        if (over)
            return tokens.ramps.accent[400];
        if (emphasis === 'soft')
            return tokens.ramps.primary[200];
        if (emphasis === 'medium')
            return tokens.ramps.primary[400];
        return tokens.ramps.primary[500];
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: loading ? 'Load plan computing' : `Load ${total}% full${over ? ', near capacity' : ''}`, accessibilityValue: loading ? undefined : { min: 0, max: 100, now: total }, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 12,
                    borderRadius: tokens.radius.full,
                    backgroundColor: tokens.ramps.neutral[100],
                    overflow: 'hidden',
                    flexDirection: 'row',
                }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '35%', height: '100%', backgroundColor: tokens.ramps.neutral[200] } })) : list.length ? (list.map((seg, i) => {
                    const w = (0, internal_1.clampPct)(seg.pct);
                    if (w <= 0)
                        return null;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: `${w}%`,
                            height: '100%',
                            backgroundColor: rampFor(seg.emphasis),
                            borderRightWidth: i < list.length - 1 ? 1 : 0,
                            borderRightColor: colors.surface,
                        } }, seg.id));
                })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${total}%`, height: '100%', backgroundColor: rampFor('strong') } })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: caption ?? '' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '700',
                            color: over ? colors.accent : colors.onSurface,
                        }, children: `${total}%${over ? ' · near capacity' : ''}` })] })] }));
}
//# sourceMappingURL=LoadPlanBar.js.map
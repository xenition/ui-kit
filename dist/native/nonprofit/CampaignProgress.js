"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignProgress = CampaignProgress;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * A goal-progress meter for a campaign — a horizontal `bar` or a vertical
 * `thermometer`. The fill is sized to `raised/goal` with the divide-by-zero
 * guarded (`goalPct`) and clamped to [0, 100]. Progress is announced through the
 * `progressbar` role AND printed as a percentage + raised/goal amounts, so state
 * never rests on color alone. Money is integer cents formatted via `formatMoney`.
 * All colors come from the compiled theme tokens — no literal colors.
 */
function CampaignProgress({ raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, variant = 'bar', tone = 'primary', hideAmounts = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = (0, internal_1.goalPct)(raisedCents, goalCents);
    const pctLabel = `${Math.round(pct)}%`;
    const fillColor = tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;
    const meta = [
        typeof donorCount === 'number' ? `${donorCount} donors` : null,
        typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
    ].filter(Boolean);
    const a11y = {
        accessibilityRole: 'progressbar',
        accessibilityValue: { min: 0, max: 100, now: Math.round(pct) },
        accessibilityLabel: `${pctLabel} of goal raised`,
    };
    if (variant === 'thermometer') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-end' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { ...a11y, style: {
                        width: tokens.spacing.lg,
                        height: 140,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.border,
                        overflow: 'hidden',
                        justifyContent: 'flex-end',
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', height: `${pct}%`, backgroundColor: fillColor, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: pctLabel }), !hideAmounts ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `${(0, internal_1.formatMoney)(raisedCents, currency)} of ${(0, internal_1.formatMoney)(goalCents, currency)}` })) : null, meta.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta.join(' · ') })) : null] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [!hideAmounts ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: (0, internal_1.formatMoney)(raisedCents, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `of ${(0, internal_1.formatMoney)(goalCents, currency)}` })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { ...a11y, style: {
                    width: '100%',
                    height: 12,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.border,
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: `${pct}%`, backgroundColor: fillColor, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fillColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: pctLabel }), meta.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta.join(' · ') })) : null] })] }));
}
//# sourceMappingURL=CampaignProgress.js.map
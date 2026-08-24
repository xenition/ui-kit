"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignProgressV2 = CampaignProgressV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * CampaignProgress — design variant **V2**: a **thermometer with a hero total**.
 * A tall vertical column fills bottom-up to `raised/goal` (divide-by-zero guarded
 * via `goalPct`, clamped to [0,100]) beside an oversized raised amount, the goal,
 * a percent, and the donor/days meta. Progress is exposed through the
 * `progressbar` role AND printed as a percentage + amounts, so state never rests
 * on color alone. Same props as {@link CampaignProgressProps}. Token-only; money
 * is integer cents formatted through `formatMoney`.
 */
function CampaignProgressV2({ raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, tone = 'primary', hideAmounts = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = (0, internal_1.goalPct)(raisedCents, goalCents);
    const pctLabel = `${Math.round(pct)}%`;
    const fillHeight = `${pct}%`;
    const fillColor = tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;
    const fillText = tone === 'success' ? colors.successText : tone === 'accent' ? colors.accentText : colors.primaryText;
    const meta = [
        typeof donorCount === 'number' ? `${donorCount} donors` : null,
        typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
    ].filter(Boolean);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', gap: tokens.spacing.lg, alignItems: 'stretch' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: Math.round(pct) }, accessibilityLabel: `${pctLabel} of goal raised`, style: {
                    width: tokens.spacing.xl,
                    minHeight: 180,
                    borderRadius: tokens.radius.full,
                    backgroundColor: tokens.ramps.neutral[100] ?? colors.border,
                    borderWidth: 1,
                    borderColor: colors.border,
                    overflow: 'hidden',
                    justifyContent: 'flex-end',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', height: fillHeight, backgroundColor: fillColor, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'center', gap: tokens.spacing.xs }, children: [!hideAmounts ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: (0, internal_1.formatMoney)(raisedCents, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `raised of ${(0, internal_1.formatMoney)(goalCents, currency)} goal` })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fillText, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: `${pctLabel} funded` }), meta.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta.join(' · ') })) : null] })] }));
}
//# sourceMappingURL=CampaignProgressV2.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignProgressV3 = CampaignProgressV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * CampaignProgress — design variant **V3**: a **slim inline bar**. A single hair
 * bar with the percent sitting on its right and the raised/goal (or meta) tucked
 * underneath — the lightest possible meter, sized to `raised/goal` with the
 * divide-by-zero guarded via `goalPct`. Progress is exposed through the
 * `progressbar` role AND printed as a percentage, so state never rests on color
 * alone. Same props as {@link CampaignProgressProps}. Token-only; money is
 * integer cents formatted through `formatMoney`.
 */
function CampaignProgressV3({ raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, tone = 'primary', hideAmounts = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = (0, internal_1.goalPct)(raisedCents, goalCents);
    const pctLabel = `${Math.round(pct)}%`;
    const fillWidth = `${pct}%`;
    const fillColor = tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;
    const fillText = tone === 'success' ? colors.successText : tone === 'accent' ? colors.accentText : colors.primaryText;
    const meta = [
        typeof donorCount === 'number' ? `${donorCount} donors` : null,
        typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
    ].filter(Boolean);
    const sub = !hideAmounts
        ? `${(0, internal_1.formatMoney)(raisedCents, currency)} of ${(0, internal_1.formatMoney)(goalCents, currency)}`
        : meta.join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: Math.round(pct) }, accessibilityLabel: `${pctLabel} of goal raised`, style: {
                            flex: 1,
                            height: 6,
                            borderRadius: tokens.radius.full,
                            backgroundColor: tokens.ramps.neutral[200] ?? colors.border,
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: fillWidth, backgroundColor: fillColor, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fillText, fontSize: tokens.typography.scale.sm, fontWeight: '800', minWidth: 40, textAlign: 'right' }, children: pctLabel })] }), sub ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: sub }), !hideAmounts && meta.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta.join(' · ') })) : null] })) : null] }));
}
//# sourceMappingURL=CampaignProgressV3.js.map
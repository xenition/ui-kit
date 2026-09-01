"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignProgressV4 = CampaignProgressV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * CampaignProgress — **V4** "rally" design. The warm, mission-driven take on a
 * goal meter: a bold raised numeral, a thick rounded track on a soft-primary
 * well, and the percent + donor/days meta as soft chips; when the goal is met it
 * celebrates with a labelled success note (never color alone). Honors both
 * `variant`s (`bar` / `thermometer`) and every `tone`, identical props/behavior
 * to {@link CampaignProgressProps}. Announced via the `progressbar` role and
 * printed as a percentage + amounts. Token-only colors via `useXenitionTheme()`.
 */
function CampaignProgressV4({ raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, variant = 'bar', tone = 'primary', hideAmounts = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = (0, internal_1.goalPct)(raisedCents, goalCents);
    const pctLabel = `${Math.round(pct)}%`;
    const met = pct >= 100;
    const fillColor = tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;
    const track = (0, color_1.withAlpha)(colors.primary, 0.15);
    const meta = [
        typeof donorCount === 'number' ? `${donorCount} donors` : null,
        typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
    ].filter(Boolean);
    const a11y = {
        accessibilityRole: 'progressbar',
        accessibilityValue: { min: 0, max: 100, now: Math.round(pct) },
        accessibilityLabel: `${pctLabel} of goal raised`,
    };
    const metaChips = meta.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: meta.map((m) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: m }) }, m))) })) : null;
    if (variant === 'thermometer') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-end' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { ...a11y, style: { width: tokens.spacing.lg, height: 140, borderRadius: tokens.radius.full, backgroundColor: track, overflow: 'hidden', justifyContent: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', height: `${pct}%`, backgroundColor: fillColor, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: pctLabel }), !hideAmounts ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `${(0, internal_1.formatMoney)(raisedCents, currency)} of ${(0, internal_1.formatMoney)(goalCents, currency)}` })) : null, met ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "\uD83C\uDF89 Goal reached" }) : null, metaChips] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [!hideAmounts ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: (0, internal_1.formatMoney)(raisedCents, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `of ${(0, internal_1.formatMoney)(goalCents, currency)}` })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { ...a11y, style: { width: '100%', height: 14, borderRadius: tokens.radius.full, backgroundColor: track, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: `${pct}%`, backgroundColor: fillColor, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: met ? colors.success : fillColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: met ? `🎉 ${pctLabel} — goal reached` : pctLabel }), metaChips] })] }));
}
//# sourceMappingURL=CampaignProgressV4.js.map
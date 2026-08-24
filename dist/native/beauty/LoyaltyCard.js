"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyCard = LoyaltyCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const TIER_META = {
    bronze: { label: 'Bronze', glyph: '🥉', color: 'warn' },
    silver: { label: 'Silver', glyph: '🥈', color: 'muted' },
    gold: { label: 'Gold', glyph: '🥇', color: 'accent' },
    platinum: { label: 'Platinum', glyph: '💎', color: 'primary' },
};
/**
 * A membership loyalty card: tier badge, member name/id, a large points balance,
 * and (when `nextTierAt` is set) a progress bar toward the next tier with a
 * remaining-points caption. `tier` drives the accent, glyph, and label — never
 * color alone. Progress is clamped and guards a zero/invalid target. Token-only
 * colors via semantic slots + `withAlpha` tints.
 */
function LoyaltyCard({ memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = TIER_META[tier] ?? TIER_META.bronze;
    const accent = colors[meta.color];
    const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > points;
    const pct = hasTarget ? Math.max(0, Math.min(1, points / nextTierAt)) : 1;
    const remaining = hasTarget ? nextTierAt - points : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} member ${memberName}, ${points} points${hasTarget ? `, ${remaining} to ${nextTierLabel ?? 'next tier'}` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: memberName }), memberId ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: memberId })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: points }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "points" })] }), hasTarget ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.2), overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct * 100}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: accent } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [remaining, " points to ", nextTierLabel ?? 'next tier'] })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Top tier reached" }))] }));
}
//# sourceMappingURL=LoyaltyCard.js.map
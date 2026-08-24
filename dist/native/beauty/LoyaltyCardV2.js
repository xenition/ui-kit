"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyCardV2 = LoyaltyCardV2;
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
 * LoyaltyCard — design variant **V2**: a **gradient membership card**. A tall,
 * rounded card whose accent-tinted surface is layered with two translucent
 * `withAlpha` sheens to read as a diagonal gradient (no gradient dependency),
 * with a "MEMBER" eyebrow + tier badge up top, the member name and spaced-out
 * id styled like an embossed card face, a large points balance, and a progress
 * bar toward the next tier. Where V1 is a flat info card, V2 is the wallet
 * artifact. Same props as {@link LoyaltyCardProps}. Token-only colors.
 */
function LoyaltyCardV2({ memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = TIER_META[tier] ?? TIER_META.bronze;
    const accent = colors[meta.color];
    const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > points;
    const pct = hasTarget ? Math.max(0, Math.min(1, points / nextTierAt)) : 1;
    const remaining = hasTarget ? nextTierAt - points : 0;
    const container = [
        {
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
            backgroundColor: (0, color_1.withAlpha)(accent, 0.18),
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} member ${memberName}, ${points} points${hasTarget ? `, ${remaining} to ${nextTierLabel ?? 'next tier'}` : ''}`, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', top: 0, left: 0, right: 0, height: '55%', backgroundColor: (0, color_1.withAlpha)(accent, 0.12) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', bottom: 0, right: 0, width: '70%', height: '60%', backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.05) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 2 }, children: "MEMBER" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.24),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: memberName }), memberId ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, letterSpacing: 3 }, children: memberId })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: points }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "points" })] }), hasTarget ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.14), overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct * 100}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: accent } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [remaining, " points to ", nextTierLabel ?? 'next tier'] })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Top tier reached" }))] }));
}
//# sourceMappingURL=LoyaltyCardV2.js.map
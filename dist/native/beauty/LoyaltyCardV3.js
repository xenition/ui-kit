"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyCardV3 = LoyaltyCardV3;
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
 * LoyaltyCard — design variant **V3**: a **minimal points row**. A single
 * hairline-ruled line — a tier glyph + label chip and the member name on the
 * left, the points balance on the right, with a tiny "N to next" caption
 * underneath when a target is set. Where V1 is an info card and V2 a wallet
 * artifact, V3 is the compact status row for a header or list. Same props as
 * {@link LoyaltyCardProps}. Token-only colors.
 */
function LoyaltyCardV3({ memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = TIER_META[tier] ?? TIER_META.bronze;
    const accent = colors[meta.color];
    const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > points;
    const remaining = hasTarget ? nextTierAt - points : 0;
    const container = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} member ${memberName}, ${points} points${hasTarget ? `, ${remaining} to ${nextTierLabel ?? 'next tier'}` : ''}`, style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                    backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: memberName }), hasTarget ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [remaining, " to ", nextTierLabel ?? 'next tier'] })) : memberId ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: memberId })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: points }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "pts" })] })] }));
}
//# sourceMappingURL=LoyaltyCardV3.js.map
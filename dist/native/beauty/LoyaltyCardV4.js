"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyCardV4 = LoyaltyCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * Tier → tone, glyph and default word.
 *
 * `silver` takes `neutral` rather than the base's `muted`: both mean "no
 * status", but `muted` is a ramp step with no contrast promise and this is a
 * *label*, not a wash.
 */
const TIER_META = {
    bronze: { label: 'Bronze', glyph: '🥉', tone: 'warn' },
    silver: { label: 'Silver', glyph: '🥈', tone: 'neutral' },
    gold: { label: 'Gold', glyph: '🥇', tone: 'accent' },
    platinum: { label: 'Platinum', glyph: '💎', tone: 'primary' },
};
/**
 * **V4 loyalty card** — same props as {@link LoyaltyCard} plus `tierLabels`,
 * `formatPoints`, `formatRemaining` and `topTierLabel`.
 *
 * ## Four changes
 *
 * 1. **The progress bar is `ProgressV4`.** The base drew its own track and
 *    fill, so the one meter on this card did not match the meters everywhere
 *    else — different height, different radius, no announced value.
 * 2. **The points figure is tabular and formatted.** `1240` is not `1,240` is
 *    not `1.240`, and a loyalty balance is a number a member compares against
 *    a target.
 * 3. **The tier ink is contrast-corrected**, where the base put the fill slot
 *    on text — including `muted`, which promises nothing at all.
 * 4. **A top-tier member is told so** rather than silently getting a full bar
 *    with no explanation.
 *
 * **Renders nothing without a `memberName`** (§4.5).
 */
function LoyaltyCardV4({ memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, tierLabels, formatPoints, formatRemaining, topTierLabel = 'Top tier', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!memberName)
        return null;
    const meta = TIER_META[tier] ?? TIER_META.bronze;
    const word = tierLabels?.[tier] ?? meta.label;
    const total = Number.isFinite(points) ? points : 0;
    const pointsText = (formatPoints ?? ((n) => `${n.toLocaleString()} points`))(total);
    const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > total;
    const pct = hasTarget ? Math.max(0, Math.min(100, (total / nextTierAt) * 100)) : 100;
    const remaining = hasTarget ? nextTierAt - total : 0;
    const remainingText = hasTarget
        ? (formatRemaining ?? ((n, t) => `${n.toLocaleString()} to ${t}`))(remaining, nextTierLabel ?? 'next tier')
        : topTierLabel;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { accessible: true, accessibilityLabel: (0, salon_v4_1.metaLine)([word, memberName, pointsText, remainingText]), style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: memberName }), memberId ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: memberId })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, size: "lg" }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "2xl", weight: "bold", numeric: "tabular", style: { color: (0, salon_v4_1.toneInk)(theme, meta.tone) }, children: pointsText }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: remainingText })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: meta.tone === 'accent' ? 'primary' : 'primary' })] })] }));
}
//# sourceMappingURL=LoyaltyCardV4.js.map
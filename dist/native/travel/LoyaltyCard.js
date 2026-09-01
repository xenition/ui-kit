"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyCard = LoyaltyCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * LoyaltyCard — a **V4** "journey" loyalty card. A miles / points membership card
 * on the brand gradient: the program name and a frosted tier chip up top, the
 * balance (formatted via `toLocaleString()`) in near-white ink, an optional
 * token-driven progress bar toward the next tier, and the member name / id as a
 * frosted footer row. Token-only colors via `useXenitionTheme()` and the
 * `journey*` helpers; dark-mode safe.
 */
function LoyaltyCard({ program, memberName, tier, points, memberId, nextTierPoints, unitLabel = 'points', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, journey_1.journeyInk)(r);
    const inkSoft = (0, journey_1.journeyInkSoft)(r);
    const balance = Math.max(0, Math.trunc(points || 0));
    const hasNext = typeof nextTierPoints === 'number' && nextTierPoints > balance;
    const remaining = hasNext ? nextTierPoints - balance : 0;
    const pct = hasNext ? Math.min(100, Math.max(0, Math.round((balance / nextTierPoints) * 100))) : 0;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: `${program} loyalty card, ${tier}, ${balance.toLocaleString()} ${unitLabel}`, style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyGradient)(r), style: { borderRadius: tokens.radius.lg, overflow: 'hidden', padding: tokens.spacing.lg, gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm }, children: "\u2726" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: ink, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: program })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                borderRadius: tokens.radius.full,
                                borderWidth: 1,
                                borderColor: (0, journey_1.journeyBorder)(r),
                                backgroundColor: (0, journey_1.journeyTile)(r),
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.xs,
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }, children: tier.toUpperCase() }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Balance" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5 }, children: balance.toLocaleString() }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600', marginBottom: 3 }, children: unitLabel })] })] }), hasNext ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: pct }, accessibilityLabel: `${remaining.toLocaleString()} ${unitLabel} to next tier`, style: { height: 8, borderRadius: 4, backgroundColor: (0, journey_1.journeyTile)(r, 0.2), overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: 4, backgroundColor: ink } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: [remaining.toLocaleString(), " ", unitLabel, " to next tier"] })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.md,
                        borderRadius: tokens.radius.md,
                        borderWidth: 1,
                        borderColor: (0, journey_1.journeyBorder)(r),
                        backgroundColor: (0, journey_1.journeyTile)(r),
                        paddingHorizontal: tokens.spacing.md,
                        paddingVertical: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: "Member" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: memberName })] }), memberId ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: "Member ID" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', letterSpacing: 1 }, children: memberId })] })) : null] })] }) }));
}
//# sourceMappingURL=LoyaltyCard.js.map
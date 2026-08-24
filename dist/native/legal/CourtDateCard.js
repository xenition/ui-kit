"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourtDateCard = CourtDateCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A court date / filing deadline card: a leading urgency-tinted date block, the
 * event type and urgency pills (each glyph + word so nothing rests on color
 * alone), and venue / judge / case metadata. A `today` or `soon` urgency drives
 * a token-tinted header rail for at-a-glance triage. All colors are theme tokens
 * — no literals.
 */
function CourtDateCard({ type, date, time, court, judge, caseNumber, urgency = 'upcoming', countdown, variant = 'default', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const typeMeta = internal_1.COURT_EVENT_META[type];
    const urgencyMeta = internal_1.COURT_URGENCY_META[urgency];
    const urgentTint = (0, internal_1.toneColor)(colors, urgencyMeta.tone);
    const highlighted = urgency === 'today' || urgency === 'soon';
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm, opacity: urgency === 'past' ? 0.7 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            minWidth: 52,
                            alignItems: 'center',
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.xs,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: highlighted ? (0, color_1.withAlpha)(urgentTint, 0.16) : (0, color_1.withAlpha)((0, internal_1.toneColor)(colors, typeMeta.tone), 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { fontSize: tokens.typography.scale.lg }, children: typeMeta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: date }), time ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs, marginTop: 2 }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: typeMeta, variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: urgencyMeta, size: "sm" })] })] }), countdown ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: highlighted ? urgentTint : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: countdown })) : null] }), !compact && (court || judge || caseNumber) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [court ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["\uD83C\uDFDB ", court] }) : null, judge ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Before ", judge] }) : null, caseNumber ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: caseNumber }) : null] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${typeMeta.label} on ${date}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=CourtDateCard.js.map
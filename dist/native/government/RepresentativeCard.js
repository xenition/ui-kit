"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepresentativeCard = RepresentativeCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const PARTY_LABEL = {
    democratic: 'Democratic',
    republican: 'Republican',
    independent: 'Independent',
    green: 'Green',
    other: 'Other',
    nonpartisan: 'Nonpartisan',
};
/**
 * An elected-official / representative contact card: avatar, name, office, a
 * neutral party label, jurisdiction, and gated Call / Email actions. Party is a
 * plain label (never encoded by color alone), and an in-office flag reads as a
 * text + glyph badge. Every color traces to a `SemanticColors` slot — no
 * literals.
 */
function RepresentativeCard({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, onCall, onEmail, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const partyLabel = party ? PARTY_LABEL[party] ?? PARTY_LABEL.other : undefined;
    const showCall = onCall != null && phone != null && phone !== '';
    const showEmail = onEmail != null && email != null && email !== '';
    const officeTone = inOffice ? 'success' : 'neutral';
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "elevated", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: photoUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: office }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [partyLabel != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "neutral", variant: "outline", size: "sm", children: partyLabel })) : null, inOffice != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: officeTone, variant: "soft", size: "sm", children: inOffice ? '✓ In office' : '— Former' })) : null] })] })] }), district != null || termInfo != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, gap: 2 }, children: [district != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", district] })) : null, termInfo != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDDF3\uFE0F ", termInfo] })) : null] })) : null, showCall || showEmail ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    justifyContent: 'flex-end',
                }, children: [showCall ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", variant: "outline", onPress: onCall, children: "Call" })) : null, showEmail ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", onPress: onEmail, children: "Email" })) : null] })) : null] }));
}
//# sourceMappingURL=RepresentativeCard.js.map
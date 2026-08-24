"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepresentativeCardV2 = RepresentativeCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const PARTY_LABEL = {
    democratic: 'Democratic',
    republican: 'Republican',
    independent: 'Independent',
    green: 'Green',
    other: 'Other',
    nonpartisan: 'Nonpartisan',
};
/**
 * RepresentativeCard, alternate design **V2** — a centered profile card. A large
 * avatar is centered above the name and office, with the neutral party label and
 * an in-office flag (text + glyph badge, never color alone) on a centered badge
 * row; district / term follow, and full-width Call / Email actions anchor the
 * footer. Same `RepresentativeCardProps`; drops in for `RepresentativeCard`.
 * Token-pure.
 */
function RepresentativeCardV2({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, onCall, onEmail, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const partyLabel = party ? PARTY_LABEL[party] ?? PARTY_LABEL.other : undefined;
    const showCall = onCall != null && phone != null && phone !== '';
    const showEmail = onEmail != null && email != null && email !== '';
    const officeTone = inOffice ? 'success' : 'neutral';
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "elevated", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: photoUrl, name: name, size: "xl" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: office }), partyLabel != null || inOffice != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap', justifyContent: 'center' }, children: [partyLabel != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "neutral", variant: "outline", size: "sm", children: partyLabel })) : null, inOffice != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: officeTone, variant: "soft", size: "sm", children: inOffice ? '✓ In office' : '— Former' })) : null] })) : null, district != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", district] })) : null, termInfo != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDDF3\uFE0F ", termInfo] })) : null] }), showCall || showEmail ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }, children: [showCall ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", variant: "outline", onPress: onCall, style: { flex: 1 }, children: "Call" })) : null, showEmail ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", onPress: onEmail, style: { flex: 1 }, children: "Email" })) : null] })) : null] }) }));
}
//# sourceMappingURL=RepresentativeCardV2.js.map
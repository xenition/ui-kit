"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepresentativeCardV3 = RepresentativeCardV3;
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
 * RepresentativeCard, alternate design **V3** — a compact directory row. A small
 * avatar leads, the name and office stack in the middle beside a neutral party
 * label and an in-office glyph (text + glyph, never color alone), and compact
 * Call / Email actions close the line. Tight rhythm for a representatives list.
 * Same `RepresentativeCardProps`; drops in for `RepresentativeCard`. Token-pure.
 */
function RepresentativeCardV3({ name, office, photoUrl, party, phone, email, inOffice, onCall, onEmail, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const partyLabel = party ? PARTY_LABEL[party] ?? PARTY_LABEL.other : undefined;
    const showCall = onCall != null && phone != null && phone !== '';
    const showEmail = onEmail != null && email != null && email !== '';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: photoUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), inOffice != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: inOffice ? '✓ In office' : '— Former' })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: office }), partyLabel != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "neutral", variant: "outline", size: "sm", children: partyLabel })) : null] })] }), showCall ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", variant: "outline", onPress: onCall, children: "Call" })) : null, showEmail ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", onPress: onEmail, children: "Email" })) : null] }));
}
//# sourceMappingURL=RepresentativeCardV3.js.map
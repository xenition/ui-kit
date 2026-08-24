"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateCard = CertificateCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const VARIANT_META = {
    standard: { seal: '🎓', tone: 'primary', label: 'Certificate of Completion' },
    honors: { seal: '🏅', tone: 'accent', label: 'Certificate with Honors' },
    professional: { seal: '📜', tone: 'success', label: 'Professional Certificate' },
};
/**
 * An earned-certificate card: a seal, the certificate type, the course, the
 * recipient, and issuer / date / credential metadata, plus an optional
 * share/download action. `variant` sets the seal glyph and tone. Token-only
 * colors.
 */
function CertificateCard({ courseTitle, recipient, issuer, issuedOn, credentialId, variant = 'standard', actionLabel = 'Share', onAction, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = VARIANT_META[variant];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} for ${courseTitle}, awarded to ${recipient}`, style: [
            {
                alignItems: 'center',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.xl,
                backgroundColor: colors.surface,
                borderColor: colors[meta.tone],
                borderWidth: 2,
                borderRadius: tokens.radius.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: meta.seal }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.tone], fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }, children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "This certifies that" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700', textAlign: 'center' }, children: recipient }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "has completed" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600', textAlign: 'center' }, children: courseTitle }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2, marginTop: tokens.spacing.sm }, children: [issuer ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Issued by ", issuer] })) : null, issuedOn ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: issuedOn })) : null, credentialId ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["ID: ", credentialId] })) : null] }), onAction ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, alignSelf: 'stretch' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onPress: onAction, children: actionLabel }) })) : null] }));
}
//# sourceMappingURL=CertificateCard.js.map
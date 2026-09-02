"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateCardV4 = CertificateCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const campus_1 = require("./internal/campus");
const VARIANT_META = {
    standard: { seal: '🎓', label: 'Certificate of Completion' },
    honors: { seal: '🏅', label: 'Certificate with Honors' },
    professional: { seal: '📜', label: 'Professional Certificate' },
};
/**
 * CertificateCard — **V4** "campus" design (native twin of the web V4), and the
 * ONE reserved gradient moment of the learning V4 "campus" line: the award hero
 * (seal, certificate type, "This certifies that", recipient) rides a rounded,
 * overflow-hidden `GradientSurface` on the brand gradient (`campusGradient`) in
 * near-white ink (`campusInk` / `campusInkSoft`). The body — the course, plus
 * issuer / date / credential metadata and an optional share action — stays on the
 * plain surface. Reuses the base `variant`
 * (`standard` / `honors` / `professional`), which sets the seal glyph + label.
 * Token-only colors via `useXenitionTheme()` + the campus ramp helpers.
 */
function CertificateCardV4({ courseTitle, recipient, issuer, issuedOn, credentialId, variant = 'standard', actionLabel = 'Share', onAction, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, campus_1.campusInk)(r);
    const inkSoft = (0, campus_1.campusInkSoft)(r);
    const meta = VARIANT_META[variant];
    const shell = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        overflow: 'hidden',
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} for ${courseTitle}, awarded to ${recipient}`, style: [shell, style], children: [(0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, campus_1.campusGradient)(r), style: { alignItems: 'center', gap: tokens.spacing.xs, padding: tokens.spacing.xl }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: meta.seal }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }, children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: "This certifies that" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700', textAlign: 'center' }, children: recipient })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs, padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "has completed" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600', textAlign: 'center' }, children: courseTitle }), issuer || issuedOn || credentialId ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2, marginTop: tokens.spacing.sm }, children: [issuer ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Issued by ", issuer] }) : null, issuedOn ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: issuedOn }) : null, credentialId ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: ["ID: ", credentialId] }) : null] })) : null, onAction ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, alignSelf: 'stretch' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onPress: onAction, children: actionLabel }) })) : null] })] }));
}
//# sourceMappingURL=CertificateCardV4.js.map
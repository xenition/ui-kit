"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorCard = DoctorCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const AVAIL_META = {
    available: { label: 'Available today', tone: 'success', glyph: '●' },
    busy: { label: 'Limited slots', tone: 'warn', glyph: '◐' },
    off: { label: 'Not accepting', tone: 'neutral', glyph: '○' },
};
/**
 * A clinician profile card for a provider directory: avatar, name, specialty,
 * a star rating with review count, an optional credential line, an availability
 * badge (glyph + label + tone), and a "Book" CTA. Informational UI only — not a
 * medical device. Token-only colors.
 */
function DoctorCard({ name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel = 'Book', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = availability ? AVAIL_META[availability] : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: specialty }), credentials ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: credentials })) : null] }), meta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })) : null] }), rating != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating }), reviewCount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [rating.toFixed(1), " (", reviewCount, ")"] })) : null] })) : null, onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onBook, children: bookLabel })) : null] }));
}
//# sourceMappingURL=DoctorCard.js.map
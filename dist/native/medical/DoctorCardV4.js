"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorCardV4 = DoctorCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const AVAIL_META = {
    available: { label: 'Available today', tone: 'success', glyph: '●' },
    busy: { label: 'Limited slots', tone: 'warn', glyph: '◐' },
    off: { label: 'Not accepting', tone: 'neutral', glyph: '○' },
};
/**
 * DoctorCard — **V4** "clinic" design. The calm, clinical take on a clinician
 * profile: an elevated rounded card with a soft shadow, the avatar + name +
 * specialty, a star rating with review count, an optional credential line, a
 * labelled availability badge (glyph + label + tone, never color alone), and a
 * "Book" CTA. Honors the V4 `variant` — `full` (card, default) and `compact`
 * (a dense single row) — identical props/behavior to {@link DoctorCardProps}.
 * Token-only colors via `useXenitionTheme()`. Informational UI only — not a
 * medical device.
 */
function DoctorCardV4({ name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel = 'Book', variant = 'full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = availability ? AVAIL_META[availability] : undefined;
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const a11y = `${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`;
    // ── compact: dense single row ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [shell, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [specialty, rating != null ? ` · ★ ${rating.toFixed(1)}` : ''] })] }), meta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })) : null] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [shell, { padding: tokens.spacing.lg, gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: specialty }), credentials ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: credentials })) : null] }), meta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })) : null] }), rating != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating }), reviewCount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [rating.toFixed(1), " (", reviewCount, ")"] })) : null] })) : null, onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onBook, children: bookLabel })) : null] }));
}
//# sourceMappingURL=DoctorCardV4.js.map
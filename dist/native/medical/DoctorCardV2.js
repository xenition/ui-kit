"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorCardV2 = DoctorCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const AVAIL_META = {
    available: { label: 'Available today', tone: 'success', glyph: '●' },
    busy: { label: 'Limited slots', tone: 'warn', glyph: '◐' },
    off: { label: 'Not accepting', tone: 'neutral', glyph: '○' },
};
/**
 * DoctorCard, redesigned (v2): a **centered profile card**. A large ringed
 * avatar is the hero, with the name, specialty, and credential line stacked and
 * centered beneath it; the star rating and an availability badge (glyph + label)
 * sit centered above a full-width "Book" CTA. Lifted with a shadow and mounted
 * with a fade-in — distinct at a glance from v1's left-aligned row. Same props,
 * token-pure.
 */
function DoctorCardV2({ name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel = 'Book', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const meta = availability ? AVAIL_META[availability] : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityLabel: `${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                alignItems: 'center',
                opacity: enter.opacity,
                transform: enter.transform,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "xl", ring: true }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: specialty }), credentials ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: credentials })) : null] }), rating != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating }), reviewCount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [rating.toFixed(1), " (", reviewCount, ")"] })) : null] })) : null, meta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })) : null, onBook ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'stretch' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onBook, children: bookLabel }) })) : null] }));
}
//# sourceMappingURL=DoctorCardV2.js.map
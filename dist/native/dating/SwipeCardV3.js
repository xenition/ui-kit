"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwipeCardV3 = SwipeCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const DistanceBadge_1 = require("./DistanceBadge");
const STAMP = {
    like: { text: 'LIKE', slot: 'success' },
    nope: { text: 'NOPE', slot: 'danger' },
    superlike: { text: 'SUPER', slot: 'accent' },
};
/**
 * SwipeCard — design variant **V3**, a **framed card with a caption strip**.
 * Unlike the full-bleed V1/V2, the photo is inset inside a padded surface frame
 * (a tasteful, editorial "polaroid"), and the name/age/tagline/distance live in
 * a **solid caption strip below the image** rather than overlaid on it. The
 * decision stamp still floats over the photo. Same `SwipeCardProps`; token-pure;
 * a token placeholder covers missing photos.
 */
function SwipeCardV3({ profile, variant = 'photo', overlay = null, overlayOpacity, aspectRatio = 3 / 4, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const stampOpacity = overlay ? (overlayOpacity ?? 1) : 0;
    const stamp = overlay ? STAMP[overlay] : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: `${title}${profile.tagline ? `. ${profile.tagline}` : ''}`, style: [
            {
                width: '100%',
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                padding: tokens.spacing.sm,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: '100%',
                    aspectRatio: variant === 'compact' ? 16 / 9 : aspectRatio,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    backgroundColor: colors.border,
                }, children: [profile.photoUri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: profile.photoUri }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['3xl'] }, allowFontScaling: false, children: "\uD83D\uDE42" }) })), overlay && stamp ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            position: 'absolute',
                            top: tokens.spacing.md,
                            left: tokens.spacing.md,
                            opacity: Math.max(0, Math.min(1, stampOpacity)),
                            transform: [{ rotate: '-12deg' }],
                            borderWidth: 3,
                            borderColor: colors[stamp.slot],
                            borderRadius: tokens.radius.md,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            backgroundColor: (0, color_1.withAlpha)(colors[stamp.slot], 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[stamp.slot], fontSize: tokens.typography.scale.xl, fontWeight: '800', letterSpacing: 2 }, children: stamp.text }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.xs, paddingTop: tokens.spacing.sm, gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: title }), profile.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm }, accessibilityLabel: "Verified", children: "\u2714" })) : null, profile.online ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success }, accessibilityLabel: "Active now" })) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginLeft: 'auto' }, children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm, unit: "km", variant: "outline" }) })) : null] }), profile.tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: profile.tagline })) : null] })] }));
}
//# sourceMappingURL=SwipeCardV3.js.map
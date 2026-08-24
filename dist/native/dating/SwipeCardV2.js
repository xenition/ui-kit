"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwipeCardV2 = SwipeCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const DistanceBadge_1 = require("./DistanceBadge");
/** Filled decision-stamp spec: a solid tone badge rather than an outline. */
const STAMP = {
    like: { text: 'LIKE', slot: 'success', on: 'onSuccess', side: 'left', rotate: '-8deg' },
    nope: { text: 'NOPE', slot: 'danger', on: 'onDanger', side: 'right', rotate: '8deg' },
    superlike: { text: 'SUPER', slot: 'accent', on: 'onAccent', side: 'left', rotate: '-8deg' },
};
/**
 * SwipeCard — design variant **V2**. A softly **rounded full-bleed** card with a
 * multi-band gradient (not the original's single flat scrim), an inline
 * name·distance line, and a **solid, filled decision stamp** that swings in from
 * the like/nope side. Reads as a plusher, more modern deck card at a glance.
 * Same `SwipeCardProps`, so it drops straight into `SwipeDeck`. Token-pure
 * scrims via `withAlpha` of the neutral ramp; photo-less profiles fall back to a
 * token placeholder.
 */
function SwipeCardV2({ profile, variant = 'photo', overlay = null, overlayOpacity, aspectRatio = 3 / 4, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const stampOpacity = overlay ? (overlayOpacity ?? 1) : 0;
    const scrim = tokens.ramps.neutral[900] ?? colors.onSurface;
    const stamp = overlay ? STAMP[overlay] : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: `${title}${profile.tagline ? `. ${profile.tagline}` : ''}`, style: [
            {
                width: '100%',
                aspectRatio: variant === 'compact' ? 16 / 9 : aspectRatio,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: colors.border,
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [profile.photoUri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: profile.photoUri }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['3xl'] }, allowFontScaling: false, children: "\uD83D\uDE42" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '60%' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', backgroundColor: (0, color_1.withAlpha)(scrim, 0.78) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: '55%', height: '25%', backgroundColor: (0, color_1.withAlpha)(scrim, 0.4) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: '80%', height: '20%', backgroundColor: (0, color_1.withAlpha)(scrim, 0.14) } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: tokens.spacing.md, gap: 6 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: title }), profile.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.base }, accessibilityLabel: "Verified", children: "\u2714" })) : null, profile.online ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.success }, accessibilityLabel: "Active now" })) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginLeft: 'auto' }, children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm, unit: "km", variant: "soft" }) })) : null] }), profile.tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: (0, color_1.withAlpha)(colors.surface, 0.9), fontSize: tokens.typography.scale.sm }, children: profile.tagline })) : null] }), overlay && stamp ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    position: 'absolute',
                    top: tokens.spacing.lg,
                    left: stamp.side === 'left' ? tokens.spacing.lg : undefined,
                    right: stamp.side === 'right' ? tokens.spacing.lg : undefined,
                    opacity: Math.max(0, Math.min(1, stampOpacity)),
                    transform: [{ rotate: stamp.rotate }],
                    backgroundColor: colors[stamp.slot],
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    ...(0, elevation_1.shadow)('md', tokens),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[stamp.on], fontSize: tokens.typography.scale.xl, fontWeight: '800', letterSpacing: 2 }, children: stamp.text }) })) : null] }));
}
//# sourceMappingURL=SwipeCardV2.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwipeCard = SwipeCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const DistanceBadge_1 = require("./DistanceBadge");
const OVERLAY_SPEC = {
    like: { text: 'LIKE', slot: 'success' },
    nope: { text: 'NOPE', slot: 'danger' },
    superlike: { text: 'SUPER', slot: 'accent' },
};
/**
 * A single deck card — the native swipe card. Renders a full-bleed profile photo
 * with a bottom scrim carrying the name/age/tagline and a distance badge, plus a
 * decision stamp (LIKE / NOPE / SUPER) whose opacity tracks drag progress. Used
 * standalone or, more often, driven by `SwipeDeck`. Colors and scrims derive
 * from theme tokens via `withAlpha` — no literal colors. Missing photos fall
 * back to a token placeholder.
 */
function SwipeCard({ profile, variant = 'photo', overlay = null, overlayOpacity, aspectRatio = 3 / 4, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const stampOpacity = overlay ? (overlayOpacity ?? 1) : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: `${title}${profile.tagline ? `. ${profile.tagline}` : ''}`, style: [
            {
                width: '100%',
                aspectRatio: variant === 'compact' ? 16 / 9 : aspectRatio,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: colors.border,
                borderWidth: 1,
                borderColor: colors.border,
            },
            style,
        ], children: [profile.photoUri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: profile.photoUri }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['3xl'] }, allowFontScaling: false, children: "\uD83D\uDE42" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: tokens.spacing.md,
                    gap: tokens.spacing.xs,
                    backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.55),
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: title }), profile.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.sm }, accessibilityLabel: "Verified", children: "\u2714" })) : null, profile.online ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success } })) : null] }), profile.tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: (0, color_1.withAlpha)(colors.surface, 0.9), fontSize: tokens.typography.scale.sm }, children: profile.tagline })) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm, unit: "km", variant: "soft" }) })) : null] }), overlay ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    position: 'absolute',
                    top: tokens.spacing.lg,
                    left: tokens.spacing.lg,
                    opacity: Math.max(0, Math.min(1, stampOpacity)),
                    transform: [{ rotate: '-14deg' }],
                    borderWidth: 3,
                    borderColor: colors[OVERLAY_SPEC[overlay].slot],
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    backgroundColor: (0, color_1.withAlpha)(colors[OVERLAY_SPEC[overlay].slot], 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors[OVERLAY_SPEC[overlay].slot],
                        fontSize: tokens.typography.scale.xl,
                        fontWeight: '800',
                        letterSpacing: 2,
                    }, children: OVERLAY_SPEC[overlay].text }) })) : null] }));
}
//# sourceMappingURL=SwipeCard.js.map
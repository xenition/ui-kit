"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCardV2 = ProfileCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const DistanceBadge_1 = require("./DistanceBadge");
const IcebreakerChip_1 = require("./IcebreakerChip");
const CompatibilityMeterV2_1 = require("./CompatibilityMeterV2");
const LikePassButtons_1 = require("./LikePassButtons");
/**
 * ProfileCard — design variant **V2**. Where the original stacks a photo
 * carousel above separate meter/bio/prompt blocks, V2 is a single **full-bleed
 * hero**: the primary photo fills the card, a bottom gradient scrim carries the
 * name/age, headline and distance, a compatibility pill floats top-right, and a
 * slim detail strip beneath surfaces bio/interests. Same `ProfileCardProps`, so
 * it is a genuine drop-in. Token-pure (scrims are `withAlpha` of the neutral
 * ramp); explicit loading/empty states; array access is guarded.
 * Stays inside its own design line: the meter is {@link CompatibilityMeterV2},
 * not the base one, because an app that picks V2 picks it for every surface it
 * sees.
 */
function ProfileCardV2({ profile, variant = 'full', showActions = false, onAction, onPressInterest, loading = false, emptyLabel = 'No profile to show', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const scrim = tokens.ramps.neutral[900] ?? colors.onSurface;
    const shell = {
        width: '100%',
        borderRadius: tokens.radius.lg,
        overflow: 'hidden',
        backgroundColor: colors.surface,
        ...(0, elevation_1.shadow)('lg', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [shell, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', aspectRatio: 4 / 5, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }));
    }
    if (!profile) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyLabel, style: [
                shell,
                { alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs, padding: tokens.spacing.xl },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'] }, allowFontScaling: false, children: "\uD83D\uDC64" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }));
    }
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const photos = profile.photos ?? [];
    const hero = photos.length > 0 ? photos[0] : undefined;
    const interests = (profile.interests ?? []).slice(0, 4);
    const heroRatio = variant === 'compact' ? 16 / 9 : 4 / 5;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [shell, { opacity: enter.opacity, transform: enter.transform }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: `${title}${profile.headline ? `. ${profile.headline}` : ''}`, style: { width: '100%', aspectRatio: heroRatio, backgroundColor: colors.border }, children: [hero?.uri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: hero.uri }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['3xl'] }, allowFontScaling: false, children: "\uD83D\uDE42" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '72%' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', backgroundColor: (0, color_1.withAlpha)(scrim, 0.8) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: '55%', height: '23%', backgroundColor: (0, color_1.withAlpha)(scrim, 0.42) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: '78%', height: '22%', backgroundColor: (0, color_1.withAlpha)(scrim, 0.16) } })] }), profile.compatibility != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: tokens.spacing.sm,
                            right: tokens.spacing.sm,
                            backgroundColor: colors.surface,
                            borderRadius: tokens.radius.full,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.xs,
                            ...(0, elevation_1.shadow)('sm', tokens),
                        }, children: (0, jsx_runtime_1.jsx)(CompatibilityMeterV2_1.CompatibilityMeterV2, { score: profile.compatibility, variant: "compact", showValue: true }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: title }), profile.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.base }, accessibilityLabel: "Verified", children: "\u2714" })) : null, profile.online ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: "Active now", style: { flexDirection: 'row', alignItems: 'center', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs }, children: "Active" })] })) : null] }), profile.headline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: (0, color_1.withAlpha)(colors.surface, 0.92), fontSize: tokens.typography.scale.sm }, children: profile.headline })) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm, unit: "km", variant: "soft" }) })) : null] })] }), (profile.bio || interests.length > 0 || showActions) && variant !== 'compact' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [profile.bio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, lineHeight: tokens.typography.scale.base * 1.4 }, children: profile.bio })) : null, interests.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(IcebreakerChip_1.IcebreakerChip, { label: interest, variant: "soft", size: "sm", onPress: onPressInterest }, `${interest}-${i}`))) })) : null, showActions ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(LikePassButtons_1.LikePassButtons, { actions: ['pass', 'superlike', 'like'], onAction: onAction }) })) : null] })) : null] }));
}
//# sourceMappingURL=ProfileCardV2.js.map
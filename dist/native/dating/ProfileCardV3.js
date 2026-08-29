"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCardV3 = ProfileCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const DistanceBadge_1 = require("./DistanceBadge");
const IcebreakerChip_1 = require("./IcebreakerChip");
const CompatibilityMeterV3_1 = require("./CompatibilityMeterV3");
const ProfilePrompt_1 = require("./ProfilePrompt");
const LikePassButtons_1 = require("./LikePassButtons");
/**
 * ProfileCard — design variant **V3**, an **editorial split**. A rounded hero
 * photo sits at the top; below it an editorial header (oversized name, headline,
 * distance) leads into the compatibility bar, then the profile **prompts are the
 * hero content** — each rendered as a raised card — followed by an interest rail.
 * Airy, type-led, and unmistakably distinct from the summary (V1) and full-bleed
 * (V2) layouts. Same `ProfileCardProps`. Token-pure; guarded; loading/empty
 * states included.
 * Stays inside its own design line: the meter is {@link CompatibilityMeterV3},
 * not the base one, because an app that picks V3 picks it for every surface it
 * sees.
 */
function ProfileCardV3({ profile, variant = 'full', showActions = false, onAction, onPressInterest, loading = false, emptyLabel = 'No profile to show', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ width: '100%', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', aspectRatio: 5 / 4, borderRadius: tokens.radius.lg, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 22, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }));
    }
    if (!profile) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyLabel, style: [
                {
                    width: '100%',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    padding: tokens.spacing.xl,
                    borderWidth: 1.5,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.lg,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'] }, allowFontScaling: false, children: "\uD83D\uDC64" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }));
    }
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const photos = profile.photos ?? [];
    const hero = photos.length > 0 ? photos[0] : undefined;
    const interests = profile.interests ?? [];
    const prompts = profile.prompts ?? [];
    const heroRatio = variant === 'compact' ? 16 / 9 : 5 / 4;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [{ width: '100%', gap: tokens.spacing.lg }, { opacity: enter.opacity, transform: enter.transform }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: title, style: { width: '100%', aspectRatio: heroRatio, borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.border, ...(0, elevation_1.shadow)('md', tokens) }, children: hero?.uri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: hero.uri }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['3xl'] }, allowFontScaling: false, children: "\uD83D\uDE42" }) })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5 }, children: title }), profile.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg }, accessibilityLabel: "Verified", children: "\u2714" })) : null, profile.online ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: "Active now", style: { flexDirection: 'row', alignItems: 'center', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.successText, fontSize: tokens.typography.scale.xs }, children: "Active" })] })) : null] }), profile.headline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: profile.headline })) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start', marginTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm, variant: "outline" }) })) : null] }), profile.compatibility != null ? (0, jsx_runtime_1.jsx)(CompatibilityMeterV3_1.CompatibilityMeterV3, { score: profile.compatibility }) : null, profile.bio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, lineHeight: tokens.typography.scale.base * 1.5 }, children: profile.bio })) : null, prompts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: prompts.map((p) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { borderRadius: tokens.radius.lg, backgroundColor: colors.surface, ...(0, elevation_1.shadow)('sm', tokens) }, children: (0, jsx_runtime_1.jsx)(ProfilePrompt_1.ProfilePrompt, { prompt: p.prompt, answer: p.answer, variant: "card" }) }, p.id))) })) : null, interests.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' }, children: "Interests" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(IcebreakerChip_1.IcebreakerChip, { label: interest, variant: "outline", size: "sm", onPress: onPressInterest }, `${interest}-${i}`))) })] })) : null, showActions ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.xs,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: (0, color_1.withAlpha)(colors.border, 0.9),
                }, children: (0, jsx_runtime_1.jsx)(LikePassButtons_1.LikePassButtons, { actions: ['rewind', 'pass', 'superlike', 'like'], onAction: onAction }) })) : null] }));
}
//# sourceMappingURL=ProfileCardV3.js.map
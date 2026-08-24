"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCard = ProfileCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const PhotoCarousel_1 = require("./PhotoCarousel");
const DistanceBadge_1 = require("./DistanceBadge");
const CompatibilityMeter_1 = require("./CompatibilityMeter");
const ProfilePrompt_1 = require("./ProfilePrompt");
const IcebreakerChip_1 = require("./IcebreakerChip");
const LikePassButtons_1 = require("./LikePassButtons");
/**
 * A full profile summary — the native profile card. Composes the dating blocks
 * (photo carousel, distance badge, compatibility meter, prompts, interest chips,
 * and an optional action row) into one scrollable-friendly card. `compact`
 * collapses to a headline row for lists. Every color/space reads from theme
 * tokens through the composed primitives — no literal colors. Explicit loading
 * and empty states; array access is guarded.
 */
function ProfileCard({ profile, variant = 'full', showActions = false, onAction, onPressInterest, loading = false, emptyLabel = 'No profile to show', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", padding: "none", style: style, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', aspectRatio: 4 / 5, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 18, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '85%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }));
    }
    if (!profile) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", padding: "lg", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyLabel, style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'] }, allowFontScaling: false, children: "\uD83D\uDC64" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }) }));
    }
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const photos = profile.photos ?? [];
    const interests = profile.interests ?? [];
    const prompts = profile.prompts ?? [];
    const nameRow = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: title }), profile.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, accessibilityLabel: "Verified", children: "\u2714" })) : null, profile.online ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: "Active now", style: { flexDirection: 'row', alignItems: 'center', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs }, children: "Active" })] })) : null] }));
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "interactive", padding: "md", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64 }, children: (0, jsx_runtime_1.jsx)(PhotoCarousel_1.PhotoCarousel, { photos: photos.slice(0, 1), ratio: "square" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [nameRow, profile.headline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: profile.headline })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [profile.distanceKm != null ? (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm }) : null, profile.compatibility != null ? ((0, jsx_runtime_1.jsx)(CompatibilityMeter_1.CompatibilityMeter, { score: profile.compatibility, variant: "compact", showValue: true })) : null] })] })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "elevated", padding: "none", style: style, children: [(0, jsx_runtime_1.jsx)(PhotoCarousel_1.PhotoCarousel, { photos: photos, ratio: "portrait" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [nameRow, profile.headline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: profile.headline })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: profile.distanceKm != null ? (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm }) : null })] }), profile.compatibility != null ? (0, jsx_runtime_1.jsx)(CompatibilityMeter_1.CompatibilityMeter, { score: profile.compatibility }) : null, profile.bio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, lineHeight: tokens.typography.scale.base * 1.4 }, children: profile.bio })) : null, interests.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(IcebreakerChip_1.IcebreakerChip, { label: interest, variant: "soft", size: "sm", onPress: onPressInterest }, `${interest}-${i}`))) })) : null, prompts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: prompts.map((p) => ((0, jsx_runtime_1.jsx)(ProfilePrompt_1.ProfilePrompt, { prompt: p.prompt, answer: p.answer, variant: "card" }, p.id))) })) : null, showActions ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(LikePassButtons_1.LikePassButtons, { actions: ['pass', 'superlike', 'like'], onAction: onAction }) })) : null] })] }));
}
//# sourceMappingURL=ProfileCard.js.map
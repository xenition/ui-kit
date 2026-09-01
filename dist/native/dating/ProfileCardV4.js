"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCardV4 = ProfileCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const PhotoCarouselV4_1 = require("./PhotoCarouselV4");
const DistanceBadgeV4_1 = require("./DistanceBadgeV4");
const CompatibilityMeterV4_1 = require("./CompatibilityMeterV4");
const ProfilePromptV4_1 = require("./ProfilePromptV4");
const IcebreakerChipV4_1 = require("./IcebreakerChipV4");
const LikePassButtonsV4_1 = require("./LikePassButtonsV4");
const profile_v4_1 = require("./internal/profile-v4");
/** The compact variant's thumbnail. */
const THUMB = 64;
/** "Active now" — the word beside the presence dot. */
const ONLINE_WORD = 'Active now';
/**
 * **V4 profile card** — same props as {@link ProfileCard} plus
 * `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A card nobody can press does not look pressable.** The `compact`
 *    variant wore `Card variant="interactive"` — the raise the kit uses to say
 *    "tap me" — on a component with no press handler in its props at all. Each
 *    state now has one variant and it means what it draws: `outlined` while
 *    loading, empty and compact, `elevated` for the full card.
 * 2. **The name is a heading.** It is the one thing a reader needs to jump
 *    between when a screen stacks several profiles, and it was plain text.
 *    The verified mark and the presence word travel with it as one spoken
 *    line rather than as three loose stops.
 * 3. **The photos are not double-rounded.** The full card set `padding="none"`
 *    and dropped a carousel with its own `radius.lg` inside a card with the
 *    same radius — two arcs a pixel or two apart along the top edge, which is
 *    the kind of thing that reads as "unfinished" without anyone being able to
 *    say why. The card clips, the carousel is square.
 * 4. **Loading looks like the card it is about to be, and says so.** The base
 *    drew two `border`-coloured rectangles under a `border`-coloured block —
 *    `border` is a hairline token, and a skeleton built from a translucent or
 *    ramp-step colour is a different grey on every ground. `loadingLabel`
 *    gives the state a name.
 * 5. **The interest chips are hittable.** Every one of them renders at `sm`,
 *    which was about 22px tall; through `IcebreakerChipV4` they clear 44.
 *
 * `onPressInterest` is the native spelling of the web twin's
 * `onClickInterest` — the one permitted press/click split, inherited from the
 * base on both sides.
 */
function ProfileCardV4({ profile, variant = 'full', showActions = false, onAction, onPressInterest, loading = false, emptyLabel = 'No profile to show', loadingLabel = 'Loading profile', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { accessibilityRole: "progressbar", accessibilityLabel: loadingLabel, variant: "outlined", padding: "none", style: [{ overflow: 'hidden' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', aspectRatio: 4 / 5, backgroundColor: (0, profile_v4_1.skeletonFill)(theme) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.typography.scale.lg,
                                width: '55%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, profile_v4_1.skeletonFill)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.typography.scale.sm,
                                width: '85%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, profile_v4_1.skeletonFill)(theme),
                            } })] })] }));
    }
    if (!profile) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "outlined", padding: "lg", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: emptyLabel, style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", allowFontScaling: false, children: "\uD83D\uDC64" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptyLabel })] }) }));
    }
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const photos = profile.photos ?? [];
    const interests = profile.interests ?? [];
    const prompts = profile.prompts ?? [];
    const nameRow = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "header", accessibilityLabel: (0, profile_v4_1.spokenLine)([
            title,
            profile.verified ? 'Verified' : null,
            profile.online ? ONLINE_WORD : null,
        ]), style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", tone: "onCard", children: title }), profile.verified ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", allowFontScaling: false, tone: "primaryText", children: "\u2714" })) : null, profile.online ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing.sm,
                            height: tokens.spacing.sm,
                            borderRadius: tokens.spacing.sm / 2,
                            backgroundColor: colors.success,
                        } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "successText", children: "Active" })] })) : null] }));
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "outlined", padding: "md", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: THUMB, borderRadius: tokens.radius.md, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(PhotoCarouselV4_1.PhotoCarouselV4, { photos: photos.slice(0, 1), ratio: "square", rounded: false, showControls: false }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [nameRow, profile.headline ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: profile.headline })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)(DistanceBadgeV4_1.DistanceBadgeV4, { distance: profile.distanceKm })) : null, profile.compatibility != null ? ((0, jsx_runtime_1.jsx)(CompatibilityMeterV4_1.CompatibilityMeterV4, { score: profile.compatibility, variant: "compact", showValue: true })) : null] })] })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "elevated", padding: "none", style: [{ overflow: 'hidden' }, style], children: [(0, jsx_runtime_1.jsx)(PhotoCarouselV4_1.PhotoCarouselV4, { photos: photos, ratio: "portrait", rounded: false }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [nameRow, profile.headline ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: profile.headline })) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(DistanceBadgeV4_1.DistanceBadgeV4, { distance: profile.distanceKm }) })) : null] }), profile.compatibility != null ? ((0, jsx_runtime_1.jsx)(CompatibilityMeterV4_1.CompatibilityMeterV4, { score: profile.compatibility })) : null, profile.bio ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "onCard", children: profile.bio })) : null, interests.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(IcebreakerChipV4_1.IcebreakerChipV4, { label: interest, variant: "soft", size: "sm", onPress: onPressInterest }, `${interest}-${i}`))) })) : null, prompts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: prompts.map((p) => ((0, jsx_runtime_1.jsx)(ProfilePromptV4_1.ProfilePromptV4, { prompt: p.prompt, answer: p.answer, variant: "card" }, p.id))) })) : null, showActions ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(LikePassButtonsV4_1.LikePassButtonsV4, { onAction: onAction, style: { paddingBottom: 0 } }) })) : null] })] }));
}
//# sourceMappingURL=ProfileCardV4.js.map
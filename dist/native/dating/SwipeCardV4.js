"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwipeStampV4 = SwipeStampV4;
exports.SwipeCardV4 = SwipeCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const LikePassButtonsV4_1 = require("./LikePassButtonsV4");
const DistanceBadgeV4_1 = require("./DistanceBadgeV4");
const profile_v4_1 = require("./internal/profile-v4");
/** The overlay names are the card's; the decisions are the deck's. */
const OVERLAY_DECISION = {
    like: 'like',
    nope: 'pass',
    superlike: 'superlike',
};
const STAMP_TEXT = {
    like: 'LIKE',
    nope: 'NOPE',
    superlike: 'SUPER',
};
/**
 * Where each stamp sits and how far it leans.
 *
 * The base put every stamp at `left: spacing.lg`, so **NOPE was drawn in the
 * LIKE corner** — the one piece of the gesture that tells you which way you
 * are about to throw someone, pointing the wrong way. Positions and rotations
 * mirror each other, and match the web twin exactly.
 */
const STAMP_PLACE = {
    like: { side: 'left', rotate: '-12deg' },
    nope: { side: 'right', rotate: '12deg' },
    superlike: { side: 'center', rotate: '0deg' },
};
/** "Active now" — the word beside the presence dot, so it is not colour alone. */
const ONLINE_WORD = 'Active now';
/**
 * The LIKE / NOPE / SUPER stamp, on its own.
 *
 * It exists as a component because a caller who supplies `renderCard` to
 * `SwipeDeckV4` gets their own card and would otherwise lose the drag feedback
 * entirely; the deck renders these as **siblings** of whatever `renderCard`
 * returned, so a custom card keeps its stamps. The same component exists on
 * the web twin, drawing the same skin at the same rotation.
 *
 * The fill is `ACTION_SKIN`'s — the same tint and ring the matching button in
 * `LikePassButtonsV4` wears — so the stamp a drag reveals and the button that
 * commits it are demonstrably one action. `like` and `pass` are no longer
 * `success` and `danger`.
 */
function SwipeStampV4({ overlay, opacity = 1, labels, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const decision = OVERLAY_DECISION[overlay];
    const tone = profile_v4_1.ACTION_TONE[decision] ?? 'neutral';
    const skin = (0, LikePassButtonsV4_1.ACTION_SKIN)(theme, tone);
    const place = STAMP_PLACE[overlay];
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { pointerEvents: "none", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
            position: 'absolute',
            top: tokens.spacing.lg,
            left: place.side === 'left' ? tokens.spacing.lg : undefined,
            right: place.side === 'right' ? tokens.spacing.lg : undefined,
            alignSelf: place.side === 'center' ? 'center' : undefined,
            opacity: typeof opacity === 'number' ? Math.max(0, Math.min(1, opacity)) : opacity,
            transform: [{ rotate: place.rotate }],
            borderWidth: tokens.spacing.xs,
            borderColor: skin.ring,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            // Opaque, so the stamp does not take the colour of the photo under it.
            backgroundColor: skin.ground,
        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", allowFontScaling: false, style: { color: (0, profile_v4_1.toneInk)(theme, tone), letterSpacing: 2 }, children: labels?.[decision] ?? STAMP_TEXT[overlay] }) }));
}
/**
 * **V4 swipe card** — same props as {@link SwipeCard} plus `verifiedLabel` and
 * `decisionLabels`.
 *
 * ## Five changes
 *
 * 1. **The bottom of the photo is dark in a dark theme.** The scrim was
 *    `withAlpha(colors.onSurface, 0.55)` and the text on it was
 *    `colors.surface` — both of which *invert*. On a dark scheme the scrim
 *    washed near-white and took the near-white name with it, so the one line
 *    identifying the person was unreadable on every card. A photograph does
 *    not follow the scheme, so its scrim does not either: `PHOTO_SCRIM` and
 *    `PHOTO_INK` are fixed in both.
 * 2. **NOPE is in the NOPE corner**, and a stamp is not a status — see
 *    {@link STAMP_PLACE} and {@link SwipeStampV4}. LIKE was `success` and NOPE
 *    `danger`, the two slots that mean something has gone wrong, on the two
 *    ordinary halves of a swipe.
 * 3. **The card is not one `role="img"`.** The base's label was the name and
 *    tagline, and being an image node it *swallowed* the distance badge, the
 *    verified mark and the presence dot — three facts a sighted user could see
 *    and a reader could not reach. The identity line is one spoken group that
 *    contains the verified and presence words.
 * 4. **The distance badge stays its own element** rather than being folded
 *    into that name. `DistanceBadgeV4` already builds a correctly rounded,
 *    unit-bearing phrase; repeating that formatting inside the card's label
 *    would make two places that decide how far away someone is.
 * 5. **A missing photo has a ground, not a `border`.** `border` is a hairline
 *    token; the placeholder is the shared skeleton ground.
 */
function SwipeCardV4({ profile, variant = 'photo', overlay = null, overlayOpacity, aspectRatio = 3 / 4, verifiedLabel = 'Verified', decisionLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                width: '100%',
                aspectRatio: variant === 'compact' ? 16 / 9 : aspectRatio,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: (0, profile_v4_1.placeholderGround)(theme),
                borderWidth: 1,
                borderColor: colors.border,
            },
            style,
        ], children: [profile.photoUri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { accessible: true, accessibilityRole: "image", accessibilityLabel: title, source: { uri: profile.photoUri }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", allowFontScaling: false, children: "\uD83D\uDE42" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: tokens.spacing.md,
                    gap: tokens.spacing.xs,
                    backgroundColor: profile_v4_1.PHOTO_SCRIM,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "header", accessibilityLabel: (0, profile_v4_1.spokenLine)([
                            title,
                            profile.verified ? verifiedLabel : null,
                            profile.online ? ONLINE_WORD : null,
                        ]), style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", style: { color: profile_v4_1.PHOTO_INK }, children: title }), profile.verified ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", allowFontScaling: false, style: { color: profile_v4_1.PHOTO_INK }, children: "\u2714" })) : null, profile.online ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: tokens.spacing.sm,
                                    height: tokens.spacing.sm,
                                    borderRadius: tokens.spacing.sm / 2,
                                    backgroundColor: colors.success,
                                } })) : null] }), profile.tagline ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", numberOfLines: 2, style: { color: profile_v4_1.PHOTO_INK }, children: profile.tagline })) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(DistanceBadgeV4_1.DistanceBadgeV4, { distance: profile.distanceKm, unit: "km", variant: "soft" }) })) : null] }), overlay ? ((0, jsx_runtime_1.jsx)(SwipeStampV4, { overlay: overlay, opacity: overlayOpacity ?? 1, labels: decisionLabels })) : null] }));
}
//# sourceMappingURL=SwipeCardV4.js.map
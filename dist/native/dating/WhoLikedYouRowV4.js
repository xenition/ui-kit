"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhoLikedYouRowV4 = WhoLikedYouRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const profile_v4_1 = require("./internal/profile-v4");
/** Avatar tile geometry — one size on both twins. */
const TILE = 72;
const AVATAR = 64;
/** The tint behind the unlock CTA. */
const CTA_TINT = 0.12;
/**
 * **V4 who-liked-you row** — same props as {@link WhoLikedYouRow} plus
 * `formatCount` and `lockedLabel`.
 *
 * ## Five changes
 *
 * 1. **The like count is not an error.** "14 people liked you" is the most
 *    positive number in the product and the base painted it in `danger`, the
 *    slot reserved for something having gone wrong — a red pill beside
 *    "Liked you" reads as a warning at a glance, which is the opposite of what
 *    it says. It is a `primary` badge.
 * 2. **The lock scrim is dark in a dark theme.** It was
 *    `withAlpha(colors.onSurface, 0.45)` over a face — the ink slot, which is
 *    *light* on a dark scheme, so the veil hiding an identity became a pale
 *    wash that revealed it, with a near-white padlock on top of it. Fixed
 *    photo scrim and photo ink: an obscured face is obscured in both schemes.
 * 3. **A locked tile with nowhere to go is disabled.** With `locked` and no
 *    `onUnlock`, every tile was a button whose press did nothing. It is
 *    genuinely disabled now — announced as such, at M3's 0.38 — rather than
 *    silently inert.
 * 4. **The heading is a heading**, so a reader can jump to the section
 *    instead of walking the rail to find out what it is; the total travels
 *    with it through `formatCount` rather than being a loose numeral.
 * 5. **Press is a state layer, loading is a real skeleton**, and the tiles
 *    are the same size as the web twin's.
 */
function WhoLikedYouRowV4({ likers, total, locked = true, title = 'Liked you', onPressLiker, onUnlock, loading = false, emptyLabel = 'No likes yet — keep swiping!', formatCount, lockedLabel = 'Locked', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const list = likers ?? [];
    const count = total ?? list.length;
    const countText = (formatCount ?? ((n) => `${n} ${n === 1 ? 'like' : 'likes'}`))(count);
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "header", accessibilityLabel: (0, profile_v4_1.spokenLine)([title, count > 0 ? countText : null]), style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            marginBottom: tokens.spacing.sm,
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", children: title }), count > 0 ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", variant: "soft", size: "sm", count: count })) : null] }));
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: `${title}: loading`, style: style, children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: AVATAR,
                            height: AVATAR,
                            borderRadius: AVATAR / 2,
                            backgroundColor: (0, profile_v4_1.skeletonFill)(theme),
                        } }, i))) })] }));
    }
    if (count === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: emptyLabel, style: {
                        borderRadius: tokens.radius.lg,
                        borderWidth: 1,
                        borderColor: colors.border,
                        padding: tokens.spacing.lg,
                        alignItems: 'center',
                    }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptyLabel }) })] }));
    }
    const tile = (liker) => {
        // Locked with no upsell to reach is not a control, it is a picture.
        const dead = locked && !onUnlock;
        const label = locked
            ? lockedLabel
            : (0, profile_v4_1.spokenLine)([liker.name ?? 'Someone', liker.superLiked ? 'super liked you' : null]);
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled: dead }, disabled: dead, onPress: () => (locked ? onUnlock?.() : onPressLiker?.(liker.id)), style: ({ pressed }) => ({
                alignItems: 'center',
                width: TILE,
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed
                    ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface)
                    : 'transparent',
                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, dead),
            }), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: locked ? undefined : liker.photoUri, name: locked ? '?' : liker.name, size: "xl", ring: liker.superLiked }), locked ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: AVATAR / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // Fixed: this veil covers a photograph of a face, and a themed
                                // scrim inverts to a pale wash that shows it.
                                backgroundColor: profile_v4_1.PHOTO_SCRIM,
                            }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", allowFontScaling: false, style: { color: profile_v4_1.PHOTO_INK }, children: "\uD83D\uDD12" }) })) : null] }), !locked ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, style: { maxWidth: TILE - 4 }, children: liker.name ?? 'Someone' })) : null] }, liker.id));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [header, (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm, paddingRight: tokens.spacing.md }, children: list.map(tile) }), locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, profile_v4_1.spokenLine)(['Unlock to see who liked you', countText]), accessibilityState: { disabled: !onUnlock }, disabled: !onUnlock, onPress: onUnlock, style: ({ pressed }) => ({
                    marginTop: tokens.spacing.sm,
                    minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed
                        ? (0, state_v4_1.pressOver)(theme, (0, v4_depth_1.mixToken)(colors.surface, colors.primary, CTA_TINT), colors.primaryText)
                        : (0, v4_depth_1.mixToken)(colors.surface, colors.primary, CTA_TINT),
                    paddingVertical: tokens.spacing.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, !onUnlock),
                }), children: (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "primaryText", children: ["See all ", countText] }) })) : null] }));
}
//# sourceMappingURL=WhoLikedYouRowV4.js.map
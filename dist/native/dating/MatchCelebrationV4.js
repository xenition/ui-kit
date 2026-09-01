"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchCelebrationV4 = MatchCelebrationV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const surface_v4_1 = require("../primitives/internal/surface-v4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const profile_v4_1 = require("./internal/profile-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
/** The tint behind the connector disc between the two avatars. */
const DISC_TINT = 0.14;
/**
 * **V4 match celebration** — same props as {@link MatchCelebration} plus
 * `closeLabel`.
 *
 * ## Five changes
 *
 * 1. **It can be dismissed.** The backdrop was a plain `View`, so on iOS —
 *    where there is no hardware back button to reach `onRequestClose` — a
 *    caller who left `onKeepSwiping` unset had built a celebration with no way
 *    out of it. The backdrop is a `Pressable` now **and** there is an explicit
 *    ✕ in the corner, because tapping outside a dialog is a convention, not an
 *    affordance: nothing on screen says it is there.
 * 2. **The backdrop is dark in a dark theme.** It was
 *    `withAlpha(colors.onSurface, 0.6)` — the ink slot, which is *light* on a
 *    dark scheme, so the overlay meant to push the app back washed it white
 *    instead. `scrimColor` builds it from the elevation colour, which does not
 *    invert, because a shadow does not.
 * 3. **It is a dialog, not an alert.** `role="alert"` interrupts whatever a
 *    screen reader was saying, which is for the genuinely urgent; a match is
 *    delightful, not urgent. It is `role="dialog"` with
 *    `accessibilityViewIsModal`, and the headline is a real heading.
 * 4. **A match is not an error, and a super like looks like one.** The heart
 *    disc was `danger` — the error slot on the happiest moment in the product.
 *    It takes the action's identity tone now, and `variant="superlike"` gets
 *    its own mark and its own tone rather than only different words.
 * 5. **It fits the device.** The modal pays the safe-area insets, the close
 *    control clears 44 with a state layer rather than an opacity, and under
 *    Reduce Motion the fade is dropped instead of played.
 */
function MatchCelebrationV4({ visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping', closeLabel = 'Close', }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // Needs a `SafeAreaProvider` above it (Expo mounts one by default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    if (!visible)
        return null;
    const superlike = variant === 'superlike';
    const heading = title ?? (superlike ? 'Super Like sent!' : "It's a Match!");
    const subtitle = superlike
        ? `You super liked ${match.name}.`
        : `You and ${match.name} liked each other.`;
    // The action's identity, not a status: `like` and `superlike` are ordinary
    // choices, and the base painted the connector with the error slot.
    const tone = (profile_v4_1.ACTION_TONE[superlike ? 'superlike' : 'like'] ?? 'primary');
    const disc = (0, v4_depth_1.mixToken)(colors.surface, (0, tone_v4_1.toneFill)(theme, tone), DISC_TINT);
    const discInk = (0, profile_v4_1.toneInk)(theme, tone);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: true, transparent: true, 
        // Settled, not played: a celebration that cannot animate still appears.
        animationType: reduced ? 'none' : 'fade', onRequestClose: onClose, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable
        // Not in the accessibility tree: a `Pressable` groups its subtree, and
        // a backdrop that announces itself would swallow the whole dialog.
        // Tapping outside is the convention; the ✕ is the affordance.
        , { 
            // Not in the accessibility tree: a `Pressable` groups its subtree, and
            // a backdrop that announces itself would swallow the whole dialog.
            // Tapping outside is the convention; the ✕ is the affordance.
            accessible: false, onPress: onClose, style: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: tokens.spacing.xl,
                paddingTop: tokens.spacing.xl + insets.top,
                paddingBottom: tokens.spacing.xl + insets.bottom,
                backgroundColor: (0, surface_v4_1.scrimColor)(theme),
            }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityViewIsModal: true, role: "dialog", accessibilityLabel: (0, profile_v4_1.spokenLine)([heading, subtitle]), onStartShouldSetResponder: () => true, style: [
                    {
                        width: '100%',
                        maxWidth: 400,
                        alignItems: 'center',
                        gap: tokens.spacing.md,
                        backgroundColor: colors.surface,
                        borderRadius: tokens.radius.lg,
                        padding: tokens.spacing.xl,
                    },
                    (0, surface_v4_1.elevationStyle)(theme.elevation.sheet),
                ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'stretch', alignItems: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: closeLabel, onPress: onClose, style: ({ pressed }) => ({
                                width: (0, chrome_v4_1.minTap)(tokens.spacing),
                                height: (0, chrome_v4_1.minTap)(tokens.spacing),
                                marginTop: -tokens.spacing.md,
                                marginRight: -tokens.spacing.md,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: (0, chrome_v4_1.minTap)(tokens.spacing) / 2,
                                backgroundColor: pressed
                                    ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface)
                                    : 'transparent',
                            }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", tone: "mutedText", allowFontScaling: false, children: "\u2715" }) }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "2xl", weight: "bold", align: "center", style: { color: (0, profile_v4_1.toneInk)(theme, tone) }, children: heading }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [you ? (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: you.photoUri, name: you.name, size: "xl", ring: true }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: tokens.spacing.xl,
                                    height: tokens.spacing.xl,
                                    borderRadius: tokens.spacing.xl / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: disc,
                                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", allowFontScaling: false, style: { color: discInk }, children: superlike ? '★' : '♥' }) }), (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: match.photoUri, name: match.name, size: "xl", ring: true })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: subtitle }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onPress: onMessage, children: messageLabel }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", onPress: onKeepSwiping ?? onClose, children: keepSwipingLabel })] })] }) }) }));
}
//# sourceMappingURL=MatchCelebrationV4.js.map
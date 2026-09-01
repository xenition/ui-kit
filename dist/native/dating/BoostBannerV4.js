"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoostBannerV4 = BoostBannerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const LikePassButtonsV4_1 = require("./LikePassButtonsV4");
const profile_v4_1 = require("./internal/profile-v4");
/**
 * The three upsells.
 *
 * `premium` was `warn` — a status slot spent on an identity, so "Go Premium"
 * wore the same colour as "your payment failed". Identity is carried by the
 * glyph and the headline; the tone is brand or accent, never a status.
 */
const SPEC = {
    boost: {
        glyph: '⚡',
        tone: 'primary',
        title: 'Be seen first',
        subtitle: 'Boost your profile to the top for 30 minutes.',
        cta: 'Boost me',
    },
    superboost: {
        glyph: '🚀',
        tone: 'accent',
        title: 'Super Boost tonight',
        subtitle: 'Up to 100× more profile views during peak hours.',
        cta: 'Super Boost',
    },
    premium: {
        glyph: '★',
        tone: 'primary',
        title: 'Go Premium',
        subtitle: 'Unlimited likes, see who likes you, and more.',
        cta: 'Upgrade',
    },
};
/**
 * A live boost is the same skin, one step stronger — the countdown has to read
 * as a state the banner is *in*, not as the same offer with different words.
 */
const ACTIVE_TINT = 0.2;
/**
 * **V4 boost banner** — same props as {@link BoostBanner} plus
 * `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **`onDismiss` no longer deletes the CTA.** The base branched
 *    `onDismiss ? closeButton : ctaButton`, so a banner you could dismiss was
 *    a banner you could not act on — and `ctaLabel` was accepted, documented
 *    and silently discarded. Nothing said the two props were exclusive
 *    because nobody decided that they were. Both render.
 * 2. **The CTA can be pressed.** It was wrapped in `pointerEvents="none"` —
 *    still drawn, still announced as a button, inert to every tap. The whole
 *    card carried the press instead, which is the third change:
 * 3. **The banner is not a button with buttons inside it.** A `role="button"`
 *    container makes its children presentational on some readers and gives a
 *    switch-control user one target where there are two actions. The banner is
 *    a plain surface now; the CTA and the dismiss are the controls.
 * 4. **Dismiss is a real target.** It was a bare ✕ with `hitSlop={8}` — about
 *    18px of drawn control. It clears 44, presses with a state layer rather
 *    than an `opacity: 0.9`, and its tint is composited so the banner is the
 *    same colour on a card as on the page.
 */
function BoostBannerV4({ variant = 'boost', title, subtitle, ctaLabel, onPress, activeLabel, onDismiss, dismissLabel = 'Dismiss', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const spec = SPEC[variant];
    // The same tint-and-ring recipe the deck's action buttons wear, so an upsell
    // and the boost button it sells are visibly one thing.
    const skin = (0, LikePassButtonsV4_1.ACTION_SKIN)(theme, spec.tone);
    const ink = (0, profile_v4_1.toneInk)(theme, spec.tone);
    const active = activeLabel != null;
    const line = active ? activeLabel : (subtitle ?? spec.subtitle);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: skin.ring,
                // Composited, not `withAlpha`: an upsell shows up on a card, on the
                // page and inside a sheet, and a wash is a different colour on each.
                backgroundColor: active
                    ? (0, v4_depth_1.mixToken)(colors.surface, skin.mix, ACTIVE_TINT)
                    : skin.ground,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: (0, chrome_v4_1.minTap)(tokens.spacing),
                    height: (0, chrome_v4_1.minTap)(tokens.spacing),
                    borderRadius: (0, chrome_v4_1.minTap)(tokens.spacing) / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, v4_depth_1.mixToken)(colors.surface, skin.mix, ACTIVE_TINT),
                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", allowFontScaling: false, children: spec.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "base", weight: "bold", tone: "onSurface", children: title ?? spec.title }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", numberOfLines: 2, 
                        // A running countdown changes under the reader; say so politely.
                        accessibilityLiveRegion: active ? 'polite' : 'none', style: { color: active ? ink : colors.mutedText }, children: line })] }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", onPress: onPress, children: ctaLabel ?? spec.cta }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: dismissLabel, onPress: onDismiss, style: ({ pressed }) => ({
                    width: (0, chrome_v4_1.minTap)(tokens.spacing),
                    height: (0, chrome_v4_1.minTap)(tokens.spacing),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: (0, chrome_v4_1.minTap)(tokens.spacing) / 2,
                    backgroundColor: pressed
                        ? (0, state_v4_1.pressOver)(theme, skin.ground, colors.onSurface)
                        : 'transparent',
                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", tone: "mutedText", allowFontScaling: false, children: "\u2715" }) })) : null] }));
}
//# sourceMappingURL=BoostBannerV4.js.map
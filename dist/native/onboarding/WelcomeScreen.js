"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreen = WelcomeScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
const ProgressDots_1 = require("./ProgressDots");
/**
 * Header controls keep a 44×44 tap target even though the glyph inside is small
 * (spec §2). Geometric, so §10.1 permits the bare number as a named constant.
 */
const TAP_TARGET = 44;
/** The hero panel is roughly 4:3 (spec §3). */
const HERO_ASPECT = 4 / 3;
/**
 * …and is capped at ~38% of screen height, so the CTA never leaves the fold on
 * a small phone (spec §3).
 */
const HERO_MAX_HEIGHT_RATIO = 0.38;
/** The brand medallion promoted to hero size (spec §3). */
const HERO_MEDALLION = 96;
/**
 * A comfortable measure for the subhead — roughly 60 characters. Without it the
 * value line runs the full width of a tablet and stops being readable (spec §4).
 */
const MEASURE_MAX_WIDTH = 420;
/**
 * First-launch welcome — the screen that establishes the onboarding shell.
 *
 * What shipped before was three things stacked in the middle of a grey page: a
 * medallion, a headline, a button. No hero, no header, no footer, no rhythm.
 * This is the anatomy from §1 of the onboarding spec, top to bottom:
 *
 * 1. **header** — back · segmented progress · dismiss, each optional, each a
 *    44×44 tap target;
 * 2. **hero slot** — the caller's `illustration`, or the `logoGlyph` medallion
 *    at hero size, on a tinted 4:3 panel capped at 38% of the screen;
 * 3. **headline block** — centred, `2xl` bold over a muted value line held to a
 *    readable measure;
 * 4. **sticky footer** — the 56-tall `radius.full` {@link GetStartedButton}
 *    with a trailing arrow, and any secondary action BELOW it as a centred
 *    muted link, never beside it competing for the same weight.
 *
 * Every part is optional and the screen composes without any of them: no
 * illustration, no subtitle, no header controls, no secondary action. The
 * `bottomSheet` variant left-aligns the headline block for a sheet
 * presentation — the one place §4 allows it. Every color/spacing traces to a
 * token. No literal colors.
 */
function WelcomeScreen({ title, subtitle, logoGlyph, illustration, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, onBack, onDismiss, stepCount, stepIndex = 0, loading = false, variant = 'centered', style, }) {
    const { colors, tokens, scheme } = (0, theme_1.useXenitionTheme)();
    const { height } = (0, react_native_1.useWindowDimensions)();
    /*
      §3 asks for a `primary[50]` ground under the hero. `tokens.ramps` is not
      scheme-inverted the way the CSS variables are — 50 is the light end of the
      ramp in both schemes — so in dark mode the literal reading of the spec would
      paint a near-white panel on a near-black page. The dark scheme takes the
      other end of the same ramp instead: still a token, still the brand hue,
      still a quiet tint against its own surface.
    */
    const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const centered = variant === 'centered';
    const align = centered ? 'center' : 'left';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.lg,
                }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Go back", onPress: onBack, style: {
                            width: TAP_TARGET,
                            height: TAP_TARGET,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : (
                    // A spacer, not a missing element — otherwise the progress bars slide
                    // left the moment a back button appears.
                    (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: stepCount != null && stepCount > 0 ? ((0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { variant: "bars", count: stepCount, activeIndex: stepIndex })) : null }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: {
                            width: TAP_TARGET,
                            height: TAP_TARGET,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: centered ? 'center' : 'flex-start',
                    paddingHorizontal: tokens.spacing.lg,
                    gap: tokens.spacing.lg,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignSelf: 'stretch',
                            aspectRatio: HERO_ASPECT,
                            maxHeight: height * HERO_MAX_HEIGHT_RATIO,
                            borderRadius: tokens.radius.lg,
                            backgroundColor: heroGround,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: illustration ?? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: HERO_MEDALLION,
                                height: HERO_MEDALLION,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.primary,
                            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph ?? '✦', size: "3xl", color: "onPrimary" }) })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", tone: "onSurface", align: align, numberOfLines: 2, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: align, numberOfLines: 3, style: {
                                    maxWidth: MEASURE_MAX_WIDTH,
                                    alignSelf: centered ? 'center' : 'flex-start',
                                }, children: subtitle })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.md,
                    paddingBottom: tokens.spacing.lg,
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: primaryLabel, onPress: onGetStarted, loading: loading }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: secondaryLabel, onPress: onSecondary, style: {
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: TAP_TARGET,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "medium", tone: "muted", align: "center", children: secondaryLabel }) })) : null] })] }));
}
//# sourceMappingURL=WelcomeScreen.js.map
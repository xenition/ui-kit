"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreenV2 = WelcomeScreenV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
const ProgressDots_1 = require("./ProgressDots");
const motion_1 = require("../primitives/internal/motion");
/** 44×44 header tap targets (spec §2). Geometric — §10.1 permits the constant. */
const TAP_TARGET = 44;
/**
 * The editorial hero runs to the top edge and takes a little under half the
 * screen. Bigger than the base line's 38% cap because there is no panel inset
 * around it — the art IS the top of the screen (spec §11, V2).
 */
const HERO_HEIGHT_RATIO = 0.46;
/** The brand medallion promoted to hero size (spec §3). */
const HERO_MEDALLION = 104;
/** Comfortable measure for the subhead, ~60 characters (spec §4). */
const MEASURE_MAX_WIDTH = 420;
/**
 * First-launch welcome — V2, the **editorial** line.
 *
 * Where the base line insets the hero into a rounded panel below the header,
 * V2 runs it full-bleed to the very top edge and floats the header controls
 * over it, then lifts a `colors.surface` content sheet up over the bottom of
 * the art. The result reads like a magazine opener rather than a centred stack,
 * which is the whole point of the alternate: §11 asks the three lines to differ
 * in idea, not skin.
 *
 * Identical props to {@link WelcomeScreen}, including the §3 `illustration`
 * slot — with the same medallion fallback, so a screen that ships no artwork
 * still looks composed — and the same §5 sticky footer. Token-pure.
 */
function WelcomeScreenV2({ title, subtitle, logoGlyph, illustration, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, onBack, onDismiss, stepCount, stepIndex = 0, loading = false, style, }) {
    const { colors, tokens, scheme } = (0, theme_1.useXenitionTheme)();
    const { height } = (0, react_native_1.useWindowDimensions)();
    const enter = (0, motion_1.useEnter)({ translateY: 14 });
    /*
      §3 asks for a `primary[50]` ground. `tokens.ramps` is not scheme-inverted
      the way the CSS variables are, so in dark mode step 50 would paint a
      near-white panel on a near-black page; the dark scheme takes the far end of
      the same ramp instead. Still a token, still the brand hue.
    */
    const heroGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: height * HERO_HEIGHT_RATIO,
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
                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph ?? '✦', size: "3xl", color: "onPrimary" }) })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.lg,
                }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Go back", onPress: onBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: stepCount != null && stepCount > 0 ? ((0, jsx_runtime_1.jsx)(ProgressDots_1.ProgressDots, { variant: "bars", count: stepCount, activeIndex: stepIndex })) : null }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: {
                    flex: 1,
                    marginTop: -tokens.spacing.xl,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.xl,
                    gap: tokens.spacing.sm,
                    justifyContent: 'center',
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: tokens.radius.lg,
                    borderTopRightRadius: tokens.radius.lg,
                    opacity: enter.opacity,
                    transform: enter.transform,
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", tone: "onSurface", align: "center", numberOfLines: 2, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", numberOfLines: 3, style: { maxWidth: MEASURE_MAX_WIDTH, alignSelf: 'center' }, children: subtitle })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.md,
                    paddingBottom: tokens.spacing.lg,
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: primaryLabel, onPress: onGetStarted, loading: loading }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: secondaryLabel, onPress: onSecondary, style: { alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "medium", tone: "muted", align: "center", children: secondaryLabel }) })) : null] })] }));
}
//# sourceMappingURL=WelcomeScreenV2.js.map
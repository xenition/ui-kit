"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionPrompt = PermissionPrompt;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: 44 — the minimum tap target for a header control or a text link (§7)
  and the diameter of a feature-row badge (§8) — and the medallion diameters
  below. Every colour, radius, gap and font size on this screen comes from the
  theme.
*/
const TAP_TARGET = 44;
/** The card form's medallion — unchanged from the original screen. */
const MEDALLION_SIZE = 72;
/** The full-screen form's medallion, sized to fill the hero panel (§3). */
const HERO_MEDALLION_SIZE = 88;
/** §3: the hero panel is roughly 4:3 and never eats more than ~38% of the screen. */
const HERO_ASPECT = 4 / 3;
const HERO_MAX_SCREEN_FRACTION = 0.38;
const KIND_GLYPH = {
    notifications: '🔔',
    location: '📍',
    camera: '📷',
    microphone: '🎤',
    photos: '🖼️',
    contacts: '👥',
    generic: '🔒',
};
/**
 * Contextual permission pre-prompt — the in-app "explain, then ask" screen that
 * precedes the real OS dialog so the system prompt only fires once the user has
 * already said yes (design.md §17). **This screen must never trigger an OS
 * dialog on mount**: `onAllow` is what the host hangs the real request on, and
 * it fires only from a deliberate press.
 *
 * Two forms, one set of props. By default it is the inline **card** it has
 * always been — for a settings list, a sheet, a mid-flow nudge. With
 * `fullScreen` it becomes a step screen in the shell from
 * `ONBOARDING-DESIGN-SPEC.md` §1: header (back · progress · dismiss), hero slot,
 * centred headline block, benefit rows, and the sticky CTA footer with the
 * decline link beneath — never beside — the primary action.
 *
 * Reflects `requesting`/`granted`/`denied` (granted replaces the actions with a
 * success line; denied keeps them and adds the recovery hint). Every new prop is
 * optional. No literal colors.
 */
function PermissionPrompt({ kind = 'generic', icon, title, rationale, allowLabel = 'Allow', denyLabel = 'Not now', onAllow, onDeny, state = 'idle', deniedMessage = 'You can enable this later in Settings.', fullScreen = false, illustration, benefits = [], progress, onBack, onDismiss, grantedMessage = "You're all set.", style, }) {
    const { colors, tokens, scheme } = (0, theme_1.useXenitionTheme)();
    /*
      §3 asks for a "tinted ground" and names `primary[50]`. Taken literally that
      is wrong on native in dark mode: `toNativeTokens` copies the LIGHT
      orientation of the ramps into both schemes (unlike the emitted CSS vars,
      which invert), so `primary[50]` paints a near-white panel behind a
      near-black page. Read the dark end of the same ramp instead — still a
      compiled token, still scheme-correct.
    */
    const tintedGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const { height: screenHeight } = (0, react_native_1.useWindowDimensions)();
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';
    const showHeader = fullScreen && (onBack != null || onDismiss != null || progress != null);
    const medallion = (size) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: size,
            height: size,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: granted ? colors.success : colors.primary,
        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: granted ? '✓' : glyph, size: "2xl", color: granted ? 'onSuccess' : 'onPrimary' }) }));
    const headline = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "2xl", weight: "bold", tone: "onSurface", align: "center", numberOfLines: 2, children: title }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", tone: "muted", align: "center", children: rationale })] }));
    const rows = benefits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: benefits.map((benefit) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: TAP_TARGET,
                        height: TAP_TARGET,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: tintedGround,
                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: benefit.icon ?? '✓', size: "base", color: "primary" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "semibold", tone: "onSurface", children: benefit.title }), benefit.description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", children: benefit.description })) : null] })] }, benefit.id))) })) : null;
    const grantedLine = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: "successText", children: grantedMessage })] }));
    const actions = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: allowLabel, trailingArrow: false, loading: state === 'requesting', onPress: onAllow }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: denyLabel, onPress: onDeny, style: { alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "medium", tone: "muted", children: denyLabel }) }), state === 'denied' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "info", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", align: "center", children: deniedMessage })] })) : null] }));
    if (!fullScreen) {
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.md, alignItems: 'stretch' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center' }, children: medallion(MEDALLION_SIZE) }), headline, rows, granted ? (grantedLine) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: actions }))] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface, gap: tokens.spacing.lg }, style], children: [showHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'stretch',
                    aspectRatio: HERO_ASPECT,
                    maxHeight: screenHeight * HERO_MAX_SCREEN_FRACTION,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: tintedGround,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: tokens.spacing.lg,
                }, children: illustration ?? medallion(HERO_MEDALLION_SIZE) }), headline, rows, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginTop: 'auto',
                    alignSelf: 'stretch',
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingTop: tokens.spacing.md,
                    paddingBottom: tokens.spacing.lg,
                    gap: tokens.spacing.sm,
                }, children: granted ? grantedLine : actions })] }));
}
//# sourceMappingURL=PermissionPrompt.js.map
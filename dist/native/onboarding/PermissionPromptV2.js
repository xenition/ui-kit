"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionPromptV2 = PermissionPromptV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const GetStartedButton_1 = require("./GetStartedButton");
/** §10: geometry only — 44 is the tap target and the row badge, 88 the medallion. */
const TAP_TARGET = 44;
const HERO_MEDALLION_SIZE = 88;
/** §3: the hero never eats more than ~38% of the screen, even full-bleed. */
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
 * Permission pre-prompt — V2, the editorial line. The tinted ground runs
 * full-bleed with no inset and the copy rises over it on a sheet: as a card the
 * band spans the card's full width behind the medallion; as a step screen
 * (`fullScreen`) the hero reaches the top edge and the content sheet overlaps
 * the seam.
 *
 * Like the base component it never fires an OS dialog itself — `onAllow` is the
 * host's cue to make the real request.
 *
 * Same props as {@link PermissionPrompt}. Token-pure.
 */
function PermissionPromptV2({ kind = 'generic', icon, title, rationale, allowLabel = 'Allow', denyLabel = 'Not now', onAllow, onDeny, state = 'idle', deniedMessage = 'You can enable this later in Settings.', fullScreen = false, illustration, benefits = [], progress, onBack, onDismiss, grantedMessage = "You're all set.", style, }) {
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
    const medallion = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: HERO_MEDALLION_SIZE,
            height: HERO_MEDALLION_SIZE,
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
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { padding: "none", style: [{ overflow: 'hidden' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        backgroundColor: tintedGround,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: tokens.spacing.xl,
                    }, children: illustration ?? medallion }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: [headline, rows, granted ? grantedLine : (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: actions })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    height: screenHeight * HERO_MAX_SCREEN_FRACTION,
                    backgroundColor: tintedGround,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: [illustration ?? medallion, showHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: TAP_TARGET, height: TAP_TARGET } }))] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flex: 1,
                    marginTop: -tokens.spacing.xl,
                    padding: tokens.spacing.xl,
                    gap: tokens.spacing.lg,
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: tokens.radius.lg,
                    borderTopRightRadius: tokens.radius.lg,
                    ...(0, elevation_1.shadow)('lg', tokens),
                }, children: [headline, rows, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            marginTop: 'auto',
                            alignSelf: 'stretch',
                            borderTopWidth: 1,
                            borderTopColor: colors.border,
                            backgroundColor: colors.surface,
                            paddingTop: tokens.spacing.md,
                            paddingBottom: tokens.spacing.lg,
                            gap: tokens.spacing.sm,
                        }, children: granted ? grantedLine : actions })] })] }));
}
//# sourceMappingURL=PermissionPromptV2.js.map
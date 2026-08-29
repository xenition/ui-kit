"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionPromptV3 = PermissionPromptV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
/** §10: geometry only — 44 is the minimum tap target and the row badge size. */
const TAP_TARGET = 44;
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
 * Permission pre-prompt — V3, the compact line. No hero panel and no medallion
 * stage: a 44pt badge sits beside a left-aligned headline, the rationale runs
 * underneath at the small step, and the benefit rows tighten to a single line
 * each. Sized for a sheet or a mid-flow nudge where a full hero would be
 * theatre.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero.
 *
 * Like the base component it never fires an OS dialog itself — `onAllow` is the
 * host's cue to make the real request.
 *
 * Same props as {@link PermissionPrompt}. Token-pure.
 */
function PermissionPromptV3({ kind = 'generic', icon, title, rationale, allowLabel = 'Allow', denyLabel = 'Not now', onAllow, onDeny, state = 'idle', deniedMessage = 'You can enable this later in Settings.', fullScreen = false, benefits = [], progress, onBack, onDismiss, grantedMessage = "You're all set.", style, }) {
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
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';
    const showHeader = fullScreen && (onBack != null || onDismiss != null || progress != null);
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: TAP_TARGET,
                    height: TAP_TARGET,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: granted ? colors.success : tintedGround,
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: granted ? '✓' : glyph, size: "lg", color: granted ? 'onSuccess' : 'primary' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { accessibilityRole: "header", size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 2, children: title }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", children: rationale })] })] }));
    const rows = benefits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: benefits.map((benefit) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: benefit.icon ?? '✓', size: "sm", color: "primary" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: benefit.title }), benefit.description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "xs", tone: "muted", numberOfLines: 1, children: benefit.description })) : null] })] }, benefit.id))) })) : null;
    const grantedLine = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "sm", color: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: "successText", children: grantedMessage })] }));
    const actions = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: allowLabel, trailingArrow: false, loading: state === 'requesting', onPress: onAllow }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: denyLabel, onPress: onDeny, style: { alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }, children: (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "medium", tone: "muted", children: denyLabel }) }), state === 'denied' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "info", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "xs", tone: "muted", children: deniedMessage })] })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-left", size: "xl", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: progress }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onDismiss, style: { width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "close", size: "lg", color: "muted" }) })) : null] })) : null, header, rows, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginTop: 'auto',
                    alignSelf: 'stretch',
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingTop: tokens.spacing.sm,
                    paddingBottom: tokens.spacing.lg,
                    gap: tokens.spacing.xs,
                }, children: granted ? grantedLine : actions })] }));
    if (!fullScreen) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { padding: "md", style: [{ gap: tokens.spacing.md }, style], children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface, gap: tokens.spacing.md }, style], children: body });
}
//# sourceMappingURL=PermissionPromptV3.js.map
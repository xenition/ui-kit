"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionPrompt = PermissionPrompt;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
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
 * already said yes (design.md §17). Renders a rationale, an `Allow`/`Not now`
 * pair, and reflects `requesting`/`granted`/`denied` states (granted shows a
 * success line; denied shows a recovery hint). Colors come from the success and
 * primary tokens. No literal colors.
 */
function PermissionPrompt({ kind = 'generic', icon, title, rationale, allowLabel = 'Allow', denyLabel = 'Not now', onAllow, onDeny, state = 'idle', deniedMessage = 'You can enable this later in Settings.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.md, alignItems: 'center' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 72,
                    height: 72,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: granted ? colors.success : colors.accent,
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: granted ? '✓' : glyph, size: "2xl", color: granted ? 'onSuccess' : 'onAccent' }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '700',
                    textAlign: 'center',
                }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.base,
                    textAlign: 'center',
                    lineHeight: tokens.typography.scale.base * 1.5,
                }, children: rationale }), granted ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: { color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "You're all set." })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", loading: state === 'requesting', onPress: onAllow, accessibilityLabel: allowLabel, style: { alignSelf: 'stretch' }, children: allowLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: denyLabel, onPress: onDeny, style: { alignItems: 'center', paddingVertical: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '500' }, children: denyLabel }) }), state === 'denied' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: deniedMessage })) : null] }))] }));
}
//# sourceMappingURL=PermissionPrompt.js.map
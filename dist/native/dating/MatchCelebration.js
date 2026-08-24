"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchCelebration = MatchCelebration;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
/**
 * The "It's a Match!" celebration overlay — the native match modal. Presents the
 * two matched avatars with a heart between them and two clear next steps (message
 * / keep swiping). Rendered in a native `Modal` with a token-tinted scrim; the
 * dialog is announced via `accessibilityViewIsModal`. Colors derive from theme
 * tokens and `withAlpha` — no literal colors. Returns nothing when `visible` is
 * false.
 */
function MatchCelebration({ visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (!visible)
        return null;
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle = variant === 'superlike'
        ? `You super liked ${match.name}.`
        : `You and ${match.name} liked each other.`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: true, transparent: true, animationType: "fade", onRequestClose: onClose, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: tokens.spacing.xl,
                backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.6),
            }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityViewIsModal: true, accessibilityRole: "alert", accessibilityLabel: `${heading} ${subtitle}`, style: {
                    width: '100%',
                    maxWidth: 400,
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    padding: tokens.spacing.xl,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.primary,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '800',
                            textAlign: 'center',
                        }, children: heading }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [you ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: you.photoUri, name: you.name, size: "xl", ring: true }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.14),
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.lg }, children: "\u2665" }) }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: match.photoUri, name: match.name, size: "xl", ring: true })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: subtitle }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onMessage, children: messageLabel }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onPress: onKeepSwiping ?? onClose, children: keepSwipingLabel })] })] }) }) }));
}
//# sourceMappingURL=MatchCelebration.js.map
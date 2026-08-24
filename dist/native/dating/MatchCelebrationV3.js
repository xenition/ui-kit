"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchCelebrationV3 = MatchCelebrationV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const primitives_1 = require("../primitives");
/**
 * MatchCelebration — design variant **V3**, a **compact toast**. Rather than
 * taking over the screen, it slides a small horizontal card in from the top: two
 * tiny overlapping avatars, a two-line headline/subtitle, and an inline message
 * button, over a light dismissable scrim. Ideal when a full celebration would be
 * too heavy. Same `MatchCelebrationProps`; token-pure; returns nothing when not
 * visible; announced as a modal alert.
 */
function MatchCelebrationV3({ visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: -12 });
    if (!visible)
        return null;
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle = variant === 'superlike' ? `You super liked ${match.name}.` : `You and ${match.name} liked each other.`;
    const scrim = tokens.ramps.neutral[900] ?? colors.onSurface;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: true, transparent: true, animationType: "slide", onRequestClose: onClose, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: keepSwipingLabel, onPress: onKeepSwiping ?? onClose, style: { flex: 1, padding: tokens.spacing.md, justifyContent: 'flex-start', backgroundColor: (0, color_1.withAlpha)(scrim, 0.28) }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityViewIsModal: true, accessibilityRole: "alert", accessibilityLabel: `${heading} ${subtitle}`, style: {
                    width: '100%',
                    maxWidth: 520,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    padding: tokens.spacing.md,
                    opacity: enter.opacity,
                    transform: enter.transform,
                    ...(0, elevation_1.shadow)('lg', tokens),
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center' }, children: [you ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: you.photoUri, name: you.name, size: "sm", ring: true }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: match.photoUri, name: match.name, size: "sm", ring: true, style: { marginLeft: you ? -10 : 0 } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.primaryText, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: heading }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })] }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onMessage, accessibilityLabel: messageLabel, children: messageLabel })] }) }) }));
}
//# sourceMappingURL=MatchCelebrationV3.js.map
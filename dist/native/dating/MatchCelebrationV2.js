"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchCelebrationV2 = MatchCelebrationV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const primitives_1 = require("../primitives");
/**
 * MatchCelebration — design variant **V2**, an **immersive full-screen** moment.
 * Instead of a small centred dialog, the whole screen becomes a deep tinted
 * stage: two **overlapping ringed avatars** sit above a filled **celebratory
 * band** carrying the headline, with the CTAs anchored below. Same
 * `MatchCelebrationProps`; token-pure (the stage is `withAlpha` of the neutral
 * ramp); returns nothing when `visible` is false; announced as a modal alert.
 */
function MatchCelebrationV2({ visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 12 });
    if (!visible)
        return null;
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle = variant === 'superlike' ? `You super liked ${match.name}.` : `You and ${match.name} liked each other.`;
    const stage = tokens.ramps.neutral[900] ?? colors.onSurface;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: true, transparent: true, animationType: "fade", onRequestClose: onClose, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityViewIsModal: true, accessibilityRole: "alert", accessibilityLabel: `${heading} ${subtitle}`, style: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: tokens.spacing.xl,
                gap: tokens.spacing.lg,
                backgroundColor: (0, color_1.withAlpha)(stage, 0.9),
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: { alignItems: 'center', gap: tokens.spacing.lg, opacity: enter.opacity, transform: enter.transform }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center' }, children: [you ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: you.photoUri, name: you.name, size: "xl", ring: true }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: match.photoUri, name: match.name, size: "xl", ring: true, style: { marginLeft: you ? -18 : 0 } })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                backgroundColor: colors.primary,
                                borderRadius: tokens.radius.full,
                                paddingVertical: tokens.spacing.sm,
                                paddingHorizontal: tokens.spacing.xl,
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', textAlign: 'center' }, children: heading }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, color_1.withAlpha)(colors.surface, 0.92), fontSize: tokens.typography.scale.base, textAlign: 'center' }, children: subtitle })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', maxWidth: 420, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onMessage, children: messageLabel }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onPress: onKeepSwiping ?? onClose, children: keepSwipingLabel })] })] }) }));
}
//# sourceMappingURL=MatchCelebrationV2.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGroupV2 = MessageGroupV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const ReadReceipt_1 = require("./ReadReceipt");
/**
 * MessageGroup — **tailed bubbles** variant (iMessage feel). Rather than the v1
 * stack of uniform rounded `ChatBubble`s, this draws its own bubbles where the
 * *last* bubble in the run grows a directional tail (a squared-off bottom
 * corner) toward the author's side, and the group's avatar sits inline beside
 * the run. Outgoing bubbles use the primary fill; incoming use the surface fill.
 * Same props as `MessageGroup`. No literal colors.
 */
function MessageGroupV2({ side = 'them', messages, authorName, avatarUri, showAvatar, receipt, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const me = side === 'me';
    const withAvatar = showAvatar ?? !me;
    const lastIndex = messages.length - 1;
    const enter = (0, motion_1.useEnter)();
    const bubbleRadius = tokens.radius.lg;
    const tail = tokens.radius.sm;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityLiveRegion: me ? 'none' : 'polite', style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                alignItems: 'flex-end',
                justifyContent: me ? 'flex-end' : 'flex-start',
                opacity: enter.opacity,
                transform: enter.transform,
            },
            style,
        ], children: [withAvatar && !me ? ((0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", src: avatarUri, name: authorName })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexShrink: 1,
                    gap: 3,
                    alignItems: me ? 'flex-end' : 'flex-start',
                    maxWidth: '78%',
                }, children: [authorName && !me ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.accentText,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '700',
                            marginLeft: tokens.spacing.sm,
                        }, children: authorName })) : null, messages.map((msg, i) => {
                        const isLast = i === lastIndex;
                        // The tail is a single squared-off bottom corner on the last bubble,
                        // pointing toward the speaker's edge — the iMessage silhouette.
                        const meTail = me && isLast ? tail : bubbleRadius;
                        const themTail = !me && isLast ? tail : bubbleRadius;
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                borderRadius: bubbleRadius,
                                borderBottomRightRadius: meTail,
                                borderBottomLeftRadius: themTail,
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.sm,
                                backgroundColor: me ? colors.primary : colors.surface,
                                borderWidth: me ? 0 : 1,
                                borderColor: colors.border,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: me ? colors.onPrimary : colors.onSurface,
                                        fontSize: tokens.typography.scale.base,
                                    }, children: msg.text }), isLast && msg.time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        marginTop: 2,
                                        alignSelf: 'flex-end',
                                        color: me ? colors.onPrimary : colors.muted,
                                        opacity: me ? 0.8 : 1,
                                        fontSize: tokens.typography.scale.xs,
                                    }, children: msg.time })) : null] }, msg.id));
                    }), me && receipt ? (0, jsx_runtime_1.jsx)(ReadReceipt_1.ReadReceipt, { status: receipt }) : null] })] }));
}
//# sourceMappingURL=MessageGroupV2.js.map
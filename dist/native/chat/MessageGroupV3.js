"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGroupV3 = MessageGroupV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const ReadReceipt_1 = require("./ReadReceipt");
/**
 * MessageGroup — **flat channel row** variant (Slack feel). No bubbles and no
 * side-alignment: every group is a left-aligned block with the avatar in a
 * gutter, a bold sender name + time header, and the messages as plain flat text
 * lines. A thin vertical **sender rule** runs down the left edge — primary-tinted
 * for your own messages, a hairline border for others — so authorship reads
 * without color-filled bubbles. Same props as `MessageGroup`. No literal colors.
 */
function MessageGroupV3({ side = 'them', messages, authorName, avatarUri, showAvatar, receipt, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const me = side === 'me';
    const withAvatar = showAvatar ?? true;
    const lastIndex = messages.length - 1;
    const enter = (0, motion_1.useEnter)();
    const displayName = authorName ?? (me ? 'You' : undefined);
    const lastTime = messages[lastIndex]?.time;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityLiveRegion: me ? 'none' : 'polite', style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                alignItems: 'flex-start',
                paddingVertical: tokens.spacing.xs,
                paddingLeft: tokens.spacing.sm,
                // The sender rule: a thin left stripe, tinted for `me`.
                borderLeftWidth: 2,
                borderLeftColor: me ? (0, color_1.withAlpha)(colors.primary, 0.55) : colors.border,
                opacity: enter.opacity,
                transform: enter.transform,
            },
            style,
        ], children: [withAvatar ? ((0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", src: avatarUri, name: displayName, shape: "rounded" })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [displayName ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: me ? colors.primaryText : colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '700',
                                }, children: displayName })) : null, lastTime ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: lastTime })) : null] }), messages.map((msg) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            lineHeight: tokens.typography.scale.base * 1.35,
                        }, children: msg.text }, msg.id))), me && receipt ? (0, jsx_runtime_1.jsx)(ReadReceipt_1.ReadReceipt, { status: receipt }) : null] })] }));
}
//# sourceMappingURL=MessageGroupV3.js.map
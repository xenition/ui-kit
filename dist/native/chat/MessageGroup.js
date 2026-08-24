"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGroup = MessageGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const ReadReceipt_1 = require("./ReadReceipt");
/**
 * A run of consecutive messages from a single author, rendered as stacked
 * primitive `ChatBubble`s with a shared avatar + name header. Outgoing groups
 * can show a `ReadReceipt` on the last bubble. Incoming (`them`) groups are a
 * polite live region so new messages are announced. No literal colors.
 */
function MessageGroup({ side = 'them', messages, authorName, avatarUri, showAvatar, receipt, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const me = side === 'me';
    const withAvatar = showAvatar ?? !me;
    const lastIndex = messages.length - 1;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: me ? 'none' : 'polite', style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                justifyContent: me ? 'flex-end' : 'flex-start',
            },
            style,
        ], children: [withAvatar && !me ? ((0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", src: avatarUri, name: authorName })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1, gap: tokens.spacing.xs, alignItems: me ? 'flex-end' : 'flex-start' }, children: [authorName && !me ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: authorName })) : null, messages.map((msg, i) => {
                        const isLast = i === lastIndex;
                        return ((0, jsx_runtime_1.jsx)(primitives_1.ChatBubble, { side: side, meta: isLast && msg.time ? msg.time : undefined, children: msg.text }, msg.id));
                    }), me && receipt ? ((0, jsx_runtime_1.jsx)(ReadReceipt_1.ReadReceipt, { status: receipt })) : null] })] }));
}
//# sourceMappingURL=MessageGroup.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGroupV4 = MessageGroupV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ChatBubbleV4_1 = require("../primitives/ChatBubbleV4");
const TextV4_1 = require("../primitives/TextV4");
const ReadReceiptV4_1 = require("./ReadReceiptV4");
const thread_v4_1 = require("./internal/thread-v4");
/**
 * **V4 message group** — same props as {@link MessageGroup} plus `onRetry`
 * and `retryLabel`.
 *
 * ## Four changes
 *
 * 1. **A failed group can be retried.** The receipt was the only place a
 *    failure showed and it was inert; the handler now reaches it.
 * 2. **The group is announced as one turn.** The base left the author, each
 *    bubble and the receipt as separate stops, so a reader walking a thread
 *    heard "Ada", "hi", "9:04", "Read" as four unrelated things.
 * 3. **The avatar column's width is reserved on every group**, so consecutive
 *    groups from the same author line up instead of shifting when the avatar
 *    is hidden.
 * 4. **The time is tabular**, so a stack of bubbles has a straight right edge.
 *
 * **Renders nothing for an empty `messages`** (§4.5).
 */
function MessageGroupV4({ side = 'them', messages, authorName, avatarUri, showAvatar = true, receipt, onRetry, retryLabel = 'Retry', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const list = messages?.filter((m) => m?.text) ?? [];
    if (list.length === 0)
        return null;
    const me = side === 'me';
    const gutter = tokens.spacing['2xl'];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, thread_v4_1.metaLine)([
            authorName,
            ...list.map((m) => m.text),
            list[list.length - 1]?.time,
        ]), style: [
            {
                flexDirection: me ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: me ? 0 : gutter, alignItems: 'center' }, children: !me && showAvatar ? (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUri, name: authorName, size: "sm" }) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1, gap: tokens.spacing.xs / 2, alignItems: me ? 'flex-end' : 'flex-start' }, children: [!me && authorName ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: authorName })) : null, list.map((message, i) => ((0, jsx_runtime_1.jsx)(ChatBubbleV4_1.ChatBubbleV4, { side: side, meta: i === list.length - 1 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                            }, children: [message.time ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: message.time })) : null, me && receipt ? ((0, jsx_runtime_1.jsx)(ReadReceiptV4_1.ReadReceiptV4, { status: receipt, onRetry: receipt === 'failed' ? onRetry : undefined, retryLabel: retryLabel })) : null] })) : undefined, children: message.text }, message.id)))] })] }));
}
//# sourceMappingURL=MessageGroupV4.js.map
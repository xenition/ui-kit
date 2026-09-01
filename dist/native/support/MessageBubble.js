"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBubble = MessageBubble;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const internal_1 = require("./internal");
// Delivery status → glyph + label. `failed` is the only danger-toned hint.
const STATUS_TEXT = {
    sending: 'Sending…',
    sent: '✓ Sent',
    failed: '⚠ Failed to send',
};
/**
 * MessageBubble — **V4** "calm console" chat bubble. A single message in an
 * agent↔customer thread. Agent messages align right on a soft-primary tint
 * bubble; customer messages align left on a bordered surface bubble — one accent
 * = primary, no second color. Comfortable rounded padding, a muted sender label,
 * an optional avatar, an optional muted timestamp, and an optional delivery hint
 * (`sending`/`sent`/`failed`, the last in danger). The whole row is announced as
 * "{author} said: {body}". Presentational only. Token-only colors via
 * `useXenitionTheme()`; NO gradients. Dark-mode safe.
 */
function MessageBubble({ author, body, time, side = 'customer', avatarUrl, status, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isAgent = side === 'agent';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${author} said: ${body}`, style: [
            { flexDirection: isAgent ? 'row-reverse' : 'row', gap: tokens.spacing.sm, width: '100%' },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "sm", name: author, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1, maxWidth: '80%', gap: 4, alignItems: isAgent ? 'flex-end' : 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500', paddingHorizontal: 4 }, children: author }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.sm,
                            borderRadius: tokens.radius.lg,
                            backgroundColor: isAgent ? (0, internal_1.withAlpha)(colors.primary, 0.12) : colors.surface,
                            borderWidth: isAgent ? 0 : 1,
                            borderColor: colors.border,
                            ...(isAgent
                                ? { borderTopRightRadius: tokens.radius.sm }
                                : { borderTopLeftRadius: tokens.radius.sm }),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: body }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: isAgent ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingHorizontal: 4,
                        }, children: [time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time })) : null, status ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: status === 'failed' ? colors.dangerText : colors.muted,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: status === 'failed' ? '700' : '400',
                                }, children: STATUS_TEXT[status] })) : null] })] })] }));
}
//# sourceMappingURL=MessageBubble.js.map
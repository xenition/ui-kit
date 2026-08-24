"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailThreadRow = EmailThreadRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * Inbox-style row for an email thread tied to a contact / deal: sender avatar,
 * subject, snippet, timestamp and a message-count badge. Unread threads read as
 * a bold subject plus a leading primary dot **and** an "unread" a11y hint (not
 * color alone) over a token-tinted surface. Guards `messageCount` (badge only
 * when > 1). All colors are theme tokens; the unread wash uses `withAlpha`.
 */
function EmailThreadRow({ subject, from, snippet, avatarUrl, timestamp, unread = false, messageCount, hasAttachment = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const showCount = messageCount != null && messageCount > 1;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${unread ? 'Unread, ' : ''}${from}: ${subject}`, disabled: !onPress, onPress: onPress, testID: testID, style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                alignItems: 'center',
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: unread ? (0, color_1.withAlpha)(colors.primary, 0.06) : colors.surface,
            },
            style,
        ], children: [unread ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8 } })), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: from, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: unread ? '700' : '600' }, children: from }), timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timestamp })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: unread ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: unread ? '600' : '400' }, children: subject }), snippet ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: snippet })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }, children: [hasAttachment ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: colors.muted }, children: "\uD83D\uDCCE" })) : null, showCount ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", size: "sm", children: `${messageCount}` })) : null] })] }));
}
//# sourceMappingURL=EmailThreadRow.js.map
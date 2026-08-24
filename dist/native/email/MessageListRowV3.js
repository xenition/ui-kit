"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageListRowV3 = MessageListRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StarButton_1 = require("./StarButton");
const MailLabelChip_1 = require("./MailLabelChip");
/**
 * MessageListRow — design V3. A **dense, Gmail-style line**: a leading unread
 * dot, the sender and subject stacked tight, and the timestamp pinned to the far
 * right. No avatar, minimal padding — built for long, scannable lists. Unread is
 * bold + dot + announced (never color alone). Same props as `MessageListRow`.
 * No literal colors.
 */
function MessageListRowV3({ sender, subject, preview, timestamp, unread = false, starred = false, onToggleStar, hasAttachments = false, threadCount = 1, labels, selected = false, onPress, onLongPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeLabels = labels ?? [];
    const count = threadCount > 1 ? threadCount : 0;
    const a11yLabel = [
        unread ? 'Unread' : 'Read',
        `from ${sender}`,
        subject,
        hasAttachments ? 'has attachment' : undefined,
        starred ? 'starred' : undefined,
        timestamp,
    ]
        .filter(Boolean)
        .join(', ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, accessibilityState: { selected }, onPress: onPress, onLongPress: onLongPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.xs,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: selected || pressed ? colors.border : colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: {
                    width: 8,
                    height: 8,
                    borderRadius: tokens.radius.full,
                    backgroundColor: unread ? colors.primary : 'transparent',
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    flex: 1,
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: unread ? '700' : '500',
                                }, children: sender }), count > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: count > 99 ? '99+' : String(count) })) : null, timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: unread ? colors.primaryText : colors.muted,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: unread ? '700' : '400',
                                }, children: timestamp })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [hasAttachments ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCCE", size: "xs", color: "muted", accessibilityLabel: "Has attachment" }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: {
                                    flex: 1,
                                    color: unread ? colors.onSurface : colors.muted,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: unread ? '600' : '400',
                                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontWeight: unread ? '700' : '500' }, children: subject }), preview ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted }, children: `  —  ${preview}` }) : null] }), onToggleStar ? ((0, jsx_runtime_1.jsx)(StarButton_1.StarButton, { starred: starred, onToggle: onToggleStar, size: "sm" })) : starred ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2605", size: "sm", color: "warn", accessibilityLabel: "Starred" })) : null] }), safeLabels.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, marginTop: 2 }, children: safeLabels.map((l) => ((0, jsx_runtime_1.jsx)(MailLabelChip_1.MailLabelChip, { label: l.label, tone: l.tone ?? 'neutral' }, l.id))) })) : null] })] }));
}
//# sourceMappingURL=MessageListRowV3.js.map
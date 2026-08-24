"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageListRowV2 = MessageListRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const tint_1 = require("./tint");
const StarButton_1 = require("./StarButton");
const MailLabelChip_1 = require("./MailLabelChip");
/**
 * MessageListRow — design V2. A tappable **card row**: a large sender avatar on
 * the left, a two-line body preview, a trailing timestamp, and an "Unread" pill
 * for the unread state (in addition to bold text + a dot, so state is never
 * signalled by color alone). Press-scales on tap and floats on a soft shadow.
 * Same props as `MessageListRow`. No literal colors.
 */
function MessageListRowV2({ sender, subject, preview, timestamp, avatarUri, unread = false, starred = false, onToggleStar, hasAttachments = false, threadCount = 1, labels, selected = false, onPress, onLongPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
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
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ transform: [{ scale: press.scale }] }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, accessibilityState: { selected }, onPress: onPress, onLongPress: onLongPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                margin: tokens.spacing.sm,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: selected ? 1.5 : 0,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? (0, tint_1.withAlpha)(colors.primary, 0.06) : colors.surface,
                ...(0, elevation_1.shadow)('sm', tokens),
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "lg", src: avatarUri, name: sender }), unread ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: {
                                position: 'absolute',
                                top: -2,
                                right: -2,
                                width: 12,
                                height: 12,
                                borderRadius: tokens.radius.full,
                                borderWidth: 2,
                                borderColor: colors.surface,
                                backgroundColor: colors.primary,
                            } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                        flex: 1,
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.base,
                                        fontWeight: unread ? '700' : '600',
                                    }, children: sender }), timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: unread ? colors.primaryText : colors.muted,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: unread ? '700' : '400',
                                    }, children: timestamp })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [hasAttachments ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCCE", size: "xs", color: "muted", accessibilityLabel: "Has attachment" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                        flex: 1,
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: unread ? '700' : '500',
                                    }, children: subject }), onToggleStar ? ((0, jsx_runtime_1.jsx)(StarButton_1.StarButton, { starred: starred, onToggle: onToggleStar, size: "base" })) : starred ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2605", size: "base", color: "warn", accessibilityLabel: "Starred" })) : null] }), preview ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                                color: colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                lineHeight: tokens.typography.scale.sm * 1.4,
                            }, children: preview })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: [unread ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: "New" }) : null, count > 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "outline", size: "sm", children: count > 99 ? '99+' : String(count) })) : null, safeLabels.map((l) => ((0, jsx_runtime_1.jsx)(MailLabelChip_1.MailLabelChip, { label: l.label, tone: l.tone ?? 'neutral' }, l.id)))] })] })] }) }));
}
//# sourceMappingURL=MessageListRowV2.js.map
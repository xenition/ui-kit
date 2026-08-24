"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailThreadV2 = EmailThreadV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const StarButton_1 = require("./StarButton");
const AttachmentChip_1 = require("./AttachmentChip");
const MailLabelChip_1 = require("./MailLabelChip");
/**
 * EmailThread — design V2. The conversation as a stack of **elevated, rounded
 * message cards** with clear gaps between them. Each card is collapsible:
 * expanded shows the body + attachments, collapsed shows sender + a one-line
 * snippet. Handles loading (spinner) and empty (no messages) states. Same props
 * as `EmailThread`. No literal colors.
 */
function EmailThreadV2({ subject, messages, labels, expandedIds, onToggleMessage, onToggleStar, onPressAttachment, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeMessages = messages ?? [];
    const safeLabels = labels ?? [];
    const expanded = new Set(expandedIds ?? (safeMessages.length > 0 ? [safeMessages[safeMessages.length - 1].id] : []));
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading messages", style: [{ padding: tokens.spacing.xl, alignItems: 'center', backgroundColor: colors.surface }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Spinner, {}) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { style: [{ backgroundColor: colors.surface }, style], contentContainerStyle: { padding: tokens.spacing.md, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: subject }), safeLabels.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: safeLabels.map((l) => ((0, jsx_runtime_1.jsx)(MailLabelChip_1.MailLabelChip, { label: l.label, tone: l.tone ?? 'neutral' }, l.id))) })) : null] }), safeMessages.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.xl }, children: (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: "No messages", description: "This conversation is empty." }) })) : (safeMessages.map((m) => {
                const isOpen = expanded.has(m.id);
                const atts = m.attachments ?? [];
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.lg,
                        backgroundColor: colors.surface,
                        padding: tokens.spacing.md,
                        ...(0, elevation_1.shadow)(isOpen ? 'md' : 'sm', tokens),
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${isOpen ? 'Collapse' : 'Expand'} message from ${m.sender}`, accessibilityState: { expanded: isOpen }, onPress: () => onToggleMessage?.(m.id), style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "md", src: m.avatarUri, name: m.sender }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: m.sender }), !isOpen ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: m.body })) : null] }), m.timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: m.timestamp })) : null, (0, jsx_runtime_1.jsx)(StarButton_1.StarButton, { starred: m.starred ?? false, onToggle: onToggleStar ? (s) => onToggleStar(m.id, s) : undefined, size: "base" })] }), isOpen ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                marginTop: tokens.spacing.md,
                                paddingTop: tokens.spacing.md,
                                borderTopWidth: 1,
                                borderTopColor: colors.border,
                                gap: tokens.spacing.sm,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.base,
                                        lineHeight: tokens.typography.scale.base * 1.5,
                                    }, children: m.body }), atts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: atts.map((a) => ((0, jsx_runtime_1.jsx)(AttachmentChip_1.AttachmentChip, { name: a.name, kind: a.kind ?? 'file', size: a.size, onPress: onPressAttachment ? () => onPressAttachment(m.id, a.id) : undefined }, a.id))) })) : null] })) : null] }, m.id));
            }))] }));
}
//# sourceMappingURL=EmailThreadV2.js.map
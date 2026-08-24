"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailThreadV3 = EmailThreadV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const tint_1 = require("./tint");
const StarButton_1 = require("./StarButton");
const AttachmentChip_1 = require("./AttachmentChip");
const MailLabelChip_1 = require("./MailLabelChip");
/**
 * EmailThread — design V3. A **flat, quoted-style conversation**: each message
 * hangs off a colored vertical **sender rail** (like a quote block) instead of a
 * card, with no elevation — a calm, document-like read. Each message is
 * collapsible (body + attachments when open, snippet when closed). Handles
 * loading (spinner) and empty states. Same props as `EmailThread`. No literal
 * colors.
 */
function EmailThreadV3({ subject, messages, labels, expandedIds, onToggleMessage, onToggleStar, onPressAttachment, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeMessages = messages ?? [];
    const safeLabels = labels ?? [];
    const expanded = new Set(expandedIds ?? (safeMessages.length > 0 ? [safeMessages[safeMessages.length - 1].id] : []));
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading messages", style: [{ padding: tokens.spacing.xl, alignItems: 'center', backgroundColor: colors.surface }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Spinner, {}) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { style: [{ backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.md,
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: subject }), safeLabels.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: safeLabels.map((l) => ((0, jsx_runtime_1.jsx)(MailLabelChip_1.MailLabelChip, { label: l.label, tone: l.tone ?? 'neutral' }, l.id))) })) : null] }), safeMessages.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.xl }, children: (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: "No messages", description: "This conversation is empty." }) })) : (safeMessages.map((m, i) => {
                const isOpen = expanded.has(m.id);
                const atts = m.attachments ?? [];
                // Alternate the rail tint per message so adjacent replies read distinctly.
                const railColor = i % 2 === 0 ? colors.primary : colors.accent;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        marginHorizontal: tokens.spacing.md,
                        marginVertical: tokens.spacing.xs,
                        paddingLeft: tokens.spacing.md,
                        borderLeftWidth: 3,
                        borderLeftColor: isOpen ? railColor : (0, tint_1.withAlpha)(railColor, 0.4),
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${isOpen ? 'Collapse' : 'Expand'} message from ${m.sender}`, accessibilityState: { expanded: isOpen }, onPress: () => onToggleMessage?.(m.id), style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", src: m.avatarUri, name: m.sender }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: m.sender }), !isOpen ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: m.body })) : null] }), m.timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: m.timestamp })) : null, (0, jsx_runtime_1.jsx)(StarButton_1.StarButton, { starred: m.starred ?? false, onToggle: onToggleStar ? (s) => onToggleStar(m.id, s) : undefined, size: "sm" })] }), isOpen ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, gap: tokens.spacing.sm, paddingBottom: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.base,
                                        lineHeight: tokens.typography.scale.base * 1.6,
                                    }, children: m.body }), atts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: atts.map((a) => ((0, jsx_runtime_1.jsx)(AttachmentChip_1.AttachmentChip, { name: a.name, kind: a.kind ?? 'file', size: a.size, onPress: onPressAttachment ? () => onPressAttachment(m.id, a.id) : undefined }, a.id))) })) : null] })) : null] }, m.id));
            }))] }));
}
//# sourceMappingURL=EmailThreadV3.js.map
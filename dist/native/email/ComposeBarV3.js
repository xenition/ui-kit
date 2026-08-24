"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposeBarV3 = ComposeBarV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const AttachmentChip_1 = require("./AttachmentChip");
/**
 * ComposeBar — design V3. A **flat, full-width bar** with an edge-to-edge body
 * field over a row of **inline text actions** (Attach · Send) — no pill, no FAB,
 * no elevation. Optional To/Subject fields appear only when their controlled
 * value is supplied. Send stays disabled until there is a body or an attachment
 * (and while `sending`), reading "Sending…" in flight. Same props as
 * `ComposeBar`. No literal colors.
 */
function ComposeBarV3({ to, onChangeTo, subject, onChangeSubject, body = '', onChangeBody, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Write a message', sending = false, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const staged = attachments ?? [];
    const hasAttachments = staged.length > 0;
    const canSend = !disabled && !sending && (body.trim().length > 0 || hasAttachments);
    const submit = () => {
        if (!canSend)
            return;
        onSend?.({ to, subject, body });
    };
    const fieldStyle = {
        color: colors.onSurface,
        fontSize: tokens.typography.scale.base,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface },
            style,
        ], children: [to !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "To", editable: !disabled, value: to, onChangeText: onChangeTo, placeholder: "To", placeholderTextColor: colors.muted, autoCapitalize: "none", keyboardType: "email-address", style: fieldStyle })) : null, subject !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Subject", editable: !disabled, value: subject, onChangeText: onChangeSubject, placeholder: "Subject", placeholderTextColor: colors.muted, style: fieldStyle })) : null, hasAttachments ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, padding: tokens.spacing.sm }, children: staged.map((a) => ((0, jsx_runtime_1.jsx)(AttachmentChip_1.AttachmentChip, { name: a.name, kind: a.kind ?? 'file', size: a.size, onRemove: onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined }, a.id))) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Message body", editable: !disabled, multiline: true, value: body, onChangeText: onChangeBody, placeholder: placeholder, placeholderTextColor: colors.muted, style: {
                    maxHeight: 160,
                    minHeight: 44,
                    color: colors.onSurface,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    fontSize: tokens.typography.scale.base,
                    opacity: disabled ? 0.5 : 1,
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Attach file", accessibilityState: { disabled }, disabled: disabled, onPress: onAttach, style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            opacity: disabled ? 0.5 : 1,
                        }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCCE", color: "muted", size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Attach" })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Send email", accessibilityState: { disabled: !canSend, busy: sending }, disabled: !canSend, onPress: submit, style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.lg,
                            opacity: !canSend ? 0.4 : pressed ? 0.7 : 1,
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.primaryText,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '700',
                                }, children: sending ? 'Sending…' : 'Send' }), (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u27A4", color: "primaryText", size: "base" })] })] })] }));
}
//# sourceMappingURL=ComposeBarV3.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposeBarV2 = ComposeBarV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const AttachmentChip_1 = require("./AttachmentChip");
/**
 * ComposeBar — design V2. A **rounded pill** input carrying the attach button
 * and a growing body field, paired with a **floating circular send FAB** that
 * lifts on a shadow and press-scales on tap. Optional To/Subject fields appear
 * only when their controlled value is supplied. Send stays disabled until there
 * is a body or an attachment (and while `sending`). Same props as `ComposeBar`.
 * No literal colors.
 */
function ComposeBarV2({ to, onChangeTo, subject, onChangeSubject, body = '', onChangeBody, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Write a message', sending = false, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
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
            { backgroundColor: colors.surface, paddingBottom: tokens.spacing.md, paddingTop: tokens.spacing.sm },
            style,
        ], children: [to !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "To", editable: !disabled, value: to, onChangeText: onChangeTo, placeholder: "To", placeholderTextColor: colors.muted, autoCapitalize: "none", keyboardType: "email-address", style: fieldStyle })) : null, subject !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Subject", editable: !disabled, value: subject, onChangeText: onChangeSubject, placeholder: "Subject", placeholderTextColor: colors.muted, style: fieldStyle })) : null, hasAttachments ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, padding: tokens.spacing.sm }, children: staged.map((a) => ((0, jsx_runtime_1.jsx)(AttachmentChip_1.AttachmentChip, { name: a.name, kind: a.kind ?? 'file', size: a.size, onRemove: onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined }, a.id))) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            gap: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: colors.surface,
                            paddingLeft: tokens.spacing.sm,
                            paddingRight: tokens.spacing.md,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Attach file", accessibilityState: { disabled }, disabled: disabled, onPress: onAttach, hitSlop: 8, style: { paddingVertical: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCCE", color: "muted" }) }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Message body", editable: !disabled, multiline: true, value: body, onChangeText: onChangeBody, placeholder: placeholder, placeholderTextColor: colors.muted, style: {
                                    flex: 1,
                                    maxHeight: 140,
                                    color: colors.onSurface,
                                    paddingVertical: tokens.spacing.sm,
                                    fontSize: tokens.typography.scale.base,
                                    opacity: disabled ? 0.5 : 1,
                                } })] }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Send email", accessibilityState: { disabled: !canSend, busy: sending }, disabled: !canSend, onPress: submit, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: {
                                width: 52,
                                height: 52,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.primary,
                                opacity: canSend ? 1 : 0.4,
                                ...(0, elevation_1.shadow)(canSend ? 'md' : 'none', tokens),
                            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: sending ? '…' : '➤', color: "onPrimary", size: "lg" }) }) })] })] }));
}
//# sourceMappingURL=ComposeBarV2.js.map
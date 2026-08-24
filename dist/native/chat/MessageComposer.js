"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposer = MessageComposer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const AttachmentBar_1 = require("./AttachmentBar");
/**
 * Message input bar — an attach button, a growing multiline field, and a send
 * button that is disabled until there's something to send (text or a staged
 * attachment). Staged attachments preview above via `AttachmentBar`. Controlled
 * via `value`/`onChangeText`; emits `onSend`/`onAttach`. No literal colors.
 */
function MessageComposer({ value = '', onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Message', disabled = false, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasAttachments = (attachments?.length ?? 0) > 0;
    const canSend = !disabled && (value.trim().length > 0 || hasAttachments);
    const submit = () => {
        if (!canSend)
            return;
        onSend?.(value);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            // Appearance FIRST; classic keeps the historical surface + top divider.
            appearance === 'classic' ? null : (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                borderTopWidth: 1,
                borderTopColor: colors.border,
                backgroundColor: appearance === 'classic' ? colors.surface : undefined,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [hasAttachments ? ((0, jsx_runtime_1.jsx)(AttachmentBar_1.AttachmentBar, { attachments: attachments ?? [], onRemove: onRemoveAttachment })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Add attachment", accessibilityState: { disabled }, disabled: disabled, onPress: onAttach, hitSlop: 8, style: { paddingBottom: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uFF0B", color: "muted" }) }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Message input", editable: !disabled, multiline: true, value: value, onChangeText: onChangeText, onSubmitEditing: submit, blurOnSubmit: false, placeholder: placeholder, placeholderTextColor: colors.muted, style: {
                            flex: 1,
                            maxHeight: 120,
                            color: colors.onSurface,
                            backgroundColor: colors.surface,
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: tokens.radius.lg,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            fontSize: tokens.typography.scale.base,
                            opacity: disabled ? 0.5 : 1,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Send message", accessibilityState: { disabled: !canSend }, disabled: !canSend, onPress: submit, style: ({ pressed }) => ({
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.primary,
                            opacity: !canSend ? 0.4 : pressed ? 0.85 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u27A4", color: "onPrimary" }) })] })] }));
}
//# sourceMappingURL=MessageComposer.js.map
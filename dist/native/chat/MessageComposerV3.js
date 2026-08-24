"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposerV3 = MessageComposerV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const AttachmentBar_1 = require("./AttachmentBar");
/**
 * MessageComposer — **flat toolbar** variant. No pill and no circular button:
 * a borderless field flanked by a row of flat inline actions (attach + camera)
 * on the left and a plain **"Send"** text button on the right that lights up in
 * the primary text token once there's something to send. The utilitarian,
 * desktop-messenger counterpart to the v1 box and the v2 pill+FAB. Same props as
 * `MessageComposer`. No literal colors.
 */
function MessageComposerV3({ value = '', onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Message', disabled = false, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasAttachments = (attachments?.length ?? 0) > 0;
    const canSend = !disabled && (value.trim().length > 0 || hasAttachments);
    const submit = () => {
        if (!canSend)
            return;
        onSend?.(value);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            appearance === 'classic' ? null : (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                borderTopWidth: 1,
                borderTopColor: colors.border,
                backgroundColor: appearance === 'classic' ? colors.surface : undefined,
                paddingVertical: tokens.spacing.xs,
            },
            style,
        ], children: [hasAttachments ? ((0, jsx_runtime_1.jsx)(AttachmentBar_1.AttachmentBar, { attachments: attachments ?? [], onRemove: onRemoveAttachment })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Add attachment", accessibilityState: { disabled }, disabled: disabled, onPress: onAttach, hitSlop: 8, style: { padding: tokens.spacing.xs, opacity: disabled ? 0.5 : 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uFF0B", color: "muted", size: "lg" }) }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Message input", editable: !disabled, multiline: true, value: value, onChangeText: onChangeText, onSubmitEditing: submit, blurOnSubmit: false, placeholder: placeholder, placeholderTextColor: colors.muted, style: {
                            flex: 1,
                            maxHeight: 120,
                            color: colors.onSurface,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.xs,
                            fontSize: tokens.typography.scale.base,
                            opacity: disabled ? 0.5 : 1,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Send message", accessibilityState: { disabled: !canSend }, disabled: !canSend, onPress: submit, hitSlop: 8, style: ({ pressed }) => ({
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            opacity: !canSend ? 0.4 : pressed ? 0.6 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.primaryText,
                                fontSize: tokens.typography.scale.base,
                                fontWeight: '700',
                            }, children: "Send" }) })] })] }));
}
//# sourceMappingURL=MessageComposerV3.js.map
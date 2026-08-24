"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposerV2 = MessageComposerV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const AttachmentBar_1 = require("./AttachmentBar");
/**
 * MessageComposer — **pill + FAB** variant. The attach button and the growing
 * field live together inside one fully-rounded pill; the send affordance is a
 * separate prominent circular **FAB** that floats to the right of the pill and
 * lifts on a drop shadow once there's something to send. A softer, more modern
 * silhouette than the v1 bordered box + inline send. Same props as
 * `MessageComposer`. No literal colors.
 */
function MessageComposerV2({ value = '', onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Message', disabled = false, appearance = 'classic', style, }) {
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
                backgroundColor: appearance === 'classic' ? colors.surface : undefined,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [hasAttachments ? ((0, jsx_runtime_1.jsx)(AttachmentBar_1.AttachmentBar, { attachments: attachments ?? [], onRemove: onRemoveAttachment })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
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
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06),
                            borderWidth: 1,
                            borderColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                            paddingLeft: tokens.spacing.sm,
                            paddingRight: tokens.spacing.md,
                            paddingVertical: tokens.spacing.xs,
                            opacity: disabled ? 0.5 : 1,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Add attachment", accessibilityState: { disabled }, disabled: disabled, onPress: onAttach, hitSlop: 8, style: { paddingBottom: 6 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uFF0B", color: "primary" }) }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Message input", editable: !disabled, multiline: true, value: value, onChangeText: onChangeText, onSubmitEditing: submit, blurOnSubmit: false, placeholder: placeholder, placeholderTextColor: colors.muted, style: {
                                    flex: 1,
                                    maxHeight: 120,
                                    color: colors.onSurface,
                                    paddingVertical: 6,
                                    fontSize: tokens.typography.scale.base,
                                } })] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Send message", accessibilityState: { disabled: !canSend }, disabled: !canSend, onPress: submit, style: ({ pressed }) => ({
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.primary,
                            opacity: !canSend ? 0.4 : pressed ? 0.85 : 1,
                            ...(canSend ? (0, elevation_1.shadow)('md', tokens) : null),
                        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u27A4", color: "onPrimary", size: "lg" }) })] })] }));
}
//# sourceMappingURL=MessageComposerV2.js.map
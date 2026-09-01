"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyBox = ReplyBox;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * ReplyBox — **V4** "calm console" agent reply composer. A controlled,
 * rounded composer: an optional horizontal row of soft-primary quick-pick chips
 * (canned replies) above a multiline input, with a single primary **Send**
 * button (≥44px tap target) that disables when empty or sending. One accent =
 * primary. Fully controlled — `value` in, `onChangeText` + `onSend` out; nothing
 * fetches. Token-only colors via `useXenitionTheme()`; NO gradients.
 * Dark-mode safe.
 */
function ReplyBox({ value, onChangeText, onSend, placeholder = 'Write a reply…', sending = false, disabled = false, cannedReplies, onPickCanned, sendLabel = 'Send', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const canSend = !disabled && !sending && value.trim().length > 0 && typeof onSend === 'function';
    const chipsDisabled = disabled || sending;
    const hasChips = Array.isArray(cannedReplies) && cannedReplies.length > 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 2,
            },
            style,
        ], children: [hasChips ? ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, accessibilityLabel: "Quick replies", contentContainerStyle: { gap: tokens.spacing.sm, paddingRight: tokens.spacing.sm }, children: cannedReplies.map((reply) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Insert quick reply: ${reply.label}`, accessibilityState: { disabled: chipsDisabled }, disabled: chipsDisabled, onPress: onPickCanned ? () => onPickCanned(reply.id) : undefined, style: ({ pressed }) => ({
                        minHeight: 32,
                        justifyContent: 'center',
                        paddingHorizontal: tokens.spacing.md,
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, internal_1.withAlpha)(colors.primary, 0.12),
                        opacity: chipsDisabled ? 0.5 : pressed ? 0.85 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: reply.label }) }, reply.id))) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Write a reply", value: value, onChangeText: onChangeText, editable: !disabled && !sending, multiline: true, placeholder: placeholder, placeholderTextColor: colors.muted, style: {
                            flex: 1,
                            minHeight: 44,
                            maxHeight: 120,
                            color: colors.onSurface,
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                            borderWidth: 1,
                            borderRadius: tokens.radius.md,
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.sm,
                            fontSize: tokens.typography.scale.sm,
                            opacity: disabled || sending ? 0.5 : 1,
                        } }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "md", accessibilityLabel: sendLabel, disabled: !canSend, onPress: canSend ? () => onSend() : undefined, style: { minHeight: 44 }, children: sending ? 'Sending…' : sendLabel })] })] }));
}
//# sourceMappingURL=ReplyBox.js.map
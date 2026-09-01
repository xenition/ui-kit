"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposeBarV4 = ComposeBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const KeyboardAvoiderV4_1 = require("../layout/KeyboardAvoiderV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const AttachmentChipV4_1 = require("./AttachmentChipV4");
const mail_v4_1 = require("./internal/mail-v4");
/**
 * **V4 compose bar** — same props as {@link ComposeBar} plus `attachLabel`,
 * `sendLabel` and `maxLines`.
 *
 * ## Five changes
 *
 * 1. **Send is dead with an empty recipient.** `canSend` tested the body and
 *    the attachments and never tested `to`, so one character of body — or a
 *    single staged file — fired `onSend({ to: '', … })` and the message went
 *    nowhere with no error. `canSendMail` is the shared rule, so both twins
 *    answer the question the same way. This is the one place V4 is not purely
 *    additive: a bar mounted with **no** `to` prop has no recipient to check
 *    and so cannot send until the caller supplies one.
 * 2. **The bar clears the home indicator.** It read no safe-area inset, so on
 *    a notched phone the send button sat under the home indicator — the one
 *    bug that tells a user this screen was not built for their device.
 * 3. **It gets out of the keyboard's way.** There was no keyboard avoidance of
 *    any kind: raise the keyboard to type and the bar you are typing into is
 *    behind it. `KeyboardAvoiderV4` is the kit's own answer, sized to the bar
 *    rather than to a screen.
 * 4. **The body field's ceiling is `maxLines`, not 140.** A literal height is
 *    a number of lines on exactly one type scale; a dense seed got three lines
 *    where a large one got two.
 * 5. **The attach control clears 44, the field is outlined with `input`, and
 *    press is a state layer.** `hitSlop={8}` around a glyph is not a target;
 *    `border` is the hairline token, not a control outline; and
 *    `opacity: 0.5 / 0.85` mixed M3's *disabled* band into a press. Disabled
 *    is 0.38.
 */
function ComposeBarV4({ to, onChangeTo, subject, onChangeSubject, body = '', onChangeBody, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Write a message', sending = false, disabled = false, attachLabel = 'Add attachment', sendLabel = 'Send', maxLines = 5, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const staged = attachments ?? [];
    const hasAttachments = staged.length > 0;
    // The shared rule, called exactly as the web twin calls it, so the two bars
    // cannot disagree about what a sendable draft is. Note the consequence: a bar
    // mounted with no `to` at all owns no recipient and therefore cannot send —
    // a reply bar passes the address it is replying to.
    const canSend = (0, mail_v4_1.canSendMail)({ to, body, hasAttachments, disabled, sending });
    const submit = () => {
        if (!canSend)
            return;
        onSend?.({ to, subject, body });
    };
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const lineHeight = tokens.typography.scale.base * 1.5;
    // The ceiling in lines, plus the field's own padding, so a dense seed and a
    // large one both stop at `maxLines` rather than at a remembered 140.
    const maxHeight = lineHeight * Math.max(1, maxLines) + tokens.spacing.sm * 2;
    const fieldStyle = {
        color: colors.onSurface,
        fontSize: tokens.typography.scale.base,
        minHeight: tap,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        borderBottomWidth: 1,
        // `input` is the control-outline token; `border` is the hairline between
        // two things, and the base spent it on both.
        borderBottomColor: colors.input,
        opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
    };
    return ((0, jsx_runtime_1.jsx)(KeyboardAvoiderV4_1.KeyboardAvoiderV4
    // A bar, not a screen: it has no height of its own to shrink, so the
    // avoider's `flex: 1` is overridden and the keyboard's height arrives as
    // padding underneath.
    , { 
        // A bar, not a screen: it has no height of its own to shrink, so the
        // avoider's `flex: 1` is overridden and the keyboard's height arrives as
        // padding underneath.
        style: { flex: 0 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                {
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingBottom: tokens.spacing.sm + insets.bottom,
                },
                style,
            ], children: [to !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "To", editable: !disabled, value: to, onChangeText: onChangeTo, placeholder: "To", placeholderTextColor: colors.mutedText, autoCapitalize: "none", keyboardType: "email-address", style: fieldStyle })) : null, subject !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Subject", editable: !disabled, value: subject, onChangeText: onChangeSubject, placeholder: "Subject", placeholderTextColor: colors.mutedText, style: fieldStyle })) : null, hasAttachments ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: tokens.spacing.xs,
                        padding: tokens.spacing.sm,
                    }, children: staged.map((a) => ((0, jsx_runtime_1.jsx)(AttachmentChipV4_1.AttachmentChipV4, { name: a.name, kind: a.kind ?? 'file', size: a.size, onRemove: onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined }, a.id))) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        gap: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        paddingTop: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: attachLabel, accessibilityState: { disabled }, disabled: disabled, onPress: onAttach, style: ({ pressed }) => ({
                                width: tap,
                                height: tap,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: tokens.radius.full,
                                backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
                            }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDCCE", color: "mutedText" }) }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Message body", editable: !disabled, multiline: true, value: body, onChangeText: onChangeBody, placeholder: placeholder, placeholderTextColor: colors.mutedText, style: {
                                flex: 1,
                                minHeight: tap,
                                maxHeight,
                                color: colors.onSurface,
                                backgroundColor: colors.surface,
                                borderWidth: 1,
                                borderColor: colors.input,
                                borderRadius: tokens.radius.lg,
                                paddingVertical: tokens.spacing.sm,
                                paddingHorizontal: tokens.spacing.md,
                                fontSize: tokens.typography.scale.base,
                                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: sendLabel, accessibilityState: { disabled: !canSend, busy: sending }, disabled: !canSend, onPress: submit, style: ({ pressed }) => ({
                                width: tap,
                                height: tap,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // The button owns its fill, so the layer is composited into it.
                                backgroundColor: pressed
                                    ? (0, state_v4_1.pressOver)(theme, colors.primary, colors.onPrimary)
                                    : colors.primary,
                                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, !canSend),
                            }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sending ? '…' : '➤', color: "onPrimary" }) })] })] }) }));
}
//# sourceMappingURL=ComposeBarV4.js.map
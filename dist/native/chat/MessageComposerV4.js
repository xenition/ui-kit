"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageComposerV4 = MessageComposerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const field_v4_1 = require("../primitives/internal/field-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const appearance_1 = require("../primitives/internal/appearance");
const AttachmentBarV4_1 = require("./AttachmentBarV4");
/**
 * **V4 message composer** — same props as {@link MessageComposer} plus
 * `sendLabel`, `attachLabel` and `maxLines`.
 *
 * ## Four changes
 *
 * 1. **Send is disabled when there is nothing to send.** The base rendered a
 *    live control that fired with an empty value — so the first thing a user
 *    does by accident is send an empty message.
 * 2. **The field stops growing.** See `maxLines`; it grew without bound and
 *    pushed the send button off screen.
 * 3. **Both controls clear 44 and carry names.** They were unlabelled glyphs.
 * 4. **The field is on the shared field metrics and focus halo**, so the
 *    composer matches every other input in the product rather than having its
 *    own border and its own focus colour.
 */
function MessageComposerV4({ value = '', onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Message', disabled = false, appearance = 'classic', sendLabel = 'Send', attachLabel = 'Add attachment', maxLines = 5, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [focused, setFocused] = React.useState(false);
    const metrics = (0, field_v4_1.fieldMetrics)(theme);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const lineHeight = tokens.typography.scale.base * 1.4;
    // Empty (or whitespace-only) is not a message. The base sent it anyway.
    const canSend = value.trim().length > 0 && !disabled;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens) }, style], children: [attachments && attachments.length > 0 ? ((0, jsx_runtime_1.jsx)(AttachmentBarV4_1.AttachmentBarV4, { attachments: attachments, onRemove: onRemoveAttachment, appearance: appearance })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.sm,
                }, children: [onAttach ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: attachLabel, disabled: disabled, onPress: onAttach, style: ({ pressed }) => ({
                            width: tap,
                            height: tap,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                            opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
                        }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "attachment", size: "lg", color: "mutedText" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flex: 1 }, (0, field_v4_1.haloStyle)(theme, { showing: focused, accent: colors.ring })], children: (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: placeholder, placeholder: placeholder, placeholderTextColor: colors.mutedText, value: value, editable: !disabled, multiline: true, onChangeText: onChangeText, onFocus: () => setFocused(true), onBlur: () => setFocused(false), style: [
                                {
                                    minHeight: metrics.height,
                                    // Bounded: a long message must not push the send button away.
                                    maxHeight: lineHeight * Math.max(1, maxLines),
                                    paddingHorizontal: metrics.padX,
                                    paddingTop: tokens.spacing.sm,
                                    paddingBottom: tokens.spacing.sm,
                                    borderRadius: tokens.radius.lg,
                                    fontSize: tokens.typography.scale.base,
                                    lineHeight,
                                    color: colors.onSurface,
                                    backgroundColor: colors.surface,
                                },
                                (0, field_v4_1.fieldBorder)(theme, { invalid: false, focused }),
                            ] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: sendLabel, accessibilityState: { disabled: !canSend }, disabled: !canSend, onPress: () => onSend?.(value), style: ({ pressed }) => ({
                            width: tap,
                            height: tap,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: canSend
                                ? pressed
                                    ? colors.primaryText
                                    : colors.primary
                                : colors.muted,
                            opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, !canSend),
                        }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "send", size: "lg", style: { color: canSend ? colors.onPrimary : colors.mutedText } }) })] })] }));
}
//# sourceMappingURL=MessageComposerV4.js.map
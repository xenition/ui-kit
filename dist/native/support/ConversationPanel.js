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
exports.ConversationPanel = ConversationPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
/**
 * A support-ticket conversation thread with an inline reply composer. Renders
 * customer / agent / system / internal-note bubbles (aligned + tinted by author,
 * with the author role in text so it's not color-only), plus a text field and a
 * "Reply" button that reports the trimmed draft via `onReply`. Handles the
 * `loading` and empty-thread states. The composer can be controlled
 * (`replyValue` + `onChangeReply`) or uncontrolled. Token colors only.
 */
function ConversationPanel({ messages, loading = false, emptyText = 'No messages yet.', replyValue, onChangeReply, onReply, sendLabel = 'Reply', hideComposer = false, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const controlled = replyValue !== undefined;
    const [draft, setDraft] = React.useState('');
    const text = controlled ? replyValue : draft;
    const setText = (next) => {
        if (!controlled)
            setDraft(next);
        onChangeReply?.(next);
    };
    const submit = () => {
        const trimmed = text.trim();
        if (!trimmed)
            return;
        onReply?.(trimmed);
        if (!controlled)
            setDraft('');
    };
    const body = loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading conversation", style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                height: 40,
                borderRadius: tokens.radius.md,
                width: i % 2 === 0 ? '60%' : '75%',
                alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.08),
            } }, i))) })) : messages.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyText, style: { padding: tokens.spacing.xl, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyText }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { contentContainerStyle: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: messages.map((m) => {
            const isAgent = m.author === 'agent';
            const isSystem = m.author === 'system';
            const roleLabel = m.internal
                ? 'Internal note'
                : m.author === 'agent'
                    ? 'Agent'
                    : m.author === 'customer'
                        ? 'Customer'
                        : 'System';
            const bubbleBg = m.internal
                ? (0, internal_1.withAlpha)(colors.warn, 0.14)
                : isSystem
                    ? (0, internal_1.withAlpha)(colors.onSurface, 0.06)
                    : isAgent
                        ? (0, internal_1.withAlpha)(colors.primary, 0.14)
                        : colors.surface;
            const fg = colors.onSurface;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${roleLabel}${m.authorName ? ` ${m.authorName}` : ''}: ${m.body}`, style: {
                    alignSelf: isSystem ? 'center' : isAgent ? 'flex-end' : 'flex-start',
                    maxWidth: isSystem ? '90%' : '82%',
                    backgroundColor: bubbleBg,
                    borderColor: colors.border,
                    borderWidth: m.author === 'customer' ? 1 : 0,
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs, marginBottom: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [m.internal ? '🔒 ' : '', m.authorName ?? roleLabel] }), m.timeLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: m.timeLabel })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm }, children: m.body })] }, m.id));
        }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1 }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: body }), hideComposer ? null : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.sm,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Reply message", value: text, onChangeText: setText, editable: !disabled, multiline: true, placeholder: "Write a reply\u2026", placeholderTextColor: colors.muted, style: {
                            flex: 1,
                            minHeight: 40,
                            maxHeight: 120,
                            color: colors.onSurface,
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                            borderWidth: 1,
                            borderRadius: tokens.radius.md,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            fontSize: tokens.typography.scale.sm,
                        } }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", onPress: submit, disabled: disabled || text.trim().length === 0, children: sendLabel })] }))] }));
}
//# sourceMappingURL=ConversationPanel.js.map
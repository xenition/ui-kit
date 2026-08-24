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
exports.ConversationPanelV2 = ConversationPanelV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
function roleLabelFor(author, internal) {
    if (internal)
        return 'Internal note';
    if (author === 'agent')
        return 'Agent';
    if (author === 'customer')
        return 'Customer';
    return 'System';
}
/**
 * ConversationPanel — **V2 (avatar bubble thread)**. Chat-style bubbles with a
 * per-side avatar (customer left, agent right), a system chip in the centre,
 * and a rounded composer with a filled Send button. Same
 * `ConversationPanelProps` as {@link ConversationPanel}. Author role is in text
 * so it is never color-only; all colors trace to tokens. Handles loading and
 * empty threads.
 */
function ConversationPanelV2({ messages, loading = false, emptyText = 'No messages yet.', replyValue, onChangeReply, onReply, sendLabel = 'Reply', hideComposer = false, disabled = false, style, }) {
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
    const body = loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading conversation", style: { padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 28, height: 28, borderRadius: 14, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.08) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: 40,
                        width: 160,
                        borderRadius: tokens.radius.lg,
                        backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.08),
                    } })] }, i))) })) : messages.length === 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyText, style: { padding: tokens.spacing.xl, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: 28, marginBottom: tokens.spacing.sm }, children: "\uD83D\uDCAC" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyText })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { contentContainerStyle: { padding: tokens.spacing.md, gap: tokens.spacing.md }, children: messages.map((m) => {
            const isAgent = m.author === 'agent';
            const isSystem = m.author === 'system';
            const role = roleLabelFor(m.author, m.internal);
            if (isSystem) {
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: `System: ${m.body}`, style: { alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.06),
                            borderRadius: tokens.radius.full,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.md,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: m.body }) }) }, m.id));
            }
            const bubbleBg = m.internal
                ? (0, internal_1.withAlpha)(colors.warn, 0.14)
                : isAgent
                    ? (0, internal_1.withAlpha)(colors.primary, 0.14)
                    : colors.surface;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${role}${m.authorName ? ` ${m.authorName}` : ''}: ${m.body}`, style: {
                    flexDirection: isAgent ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "sm", name: m.authorName ?? role, status: isAgent ? 'online' : undefined }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { maxWidth: '76%' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    gap: tokens.spacing.xs,
                                    marginBottom: 2,
                                    justifyContent: isAgent ? 'flex-end' : 'flex-start',
                                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [m.internal ? '🔒 ' : '', m.authorName ?? role] }), m.timeLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: m.timeLabel })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    backgroundColor: bubbleBg,
                                    borderColor: colors.border,
                                    borderWidth: m.author === 'customer' ? 1 : 0,
                                    borderRadius: tokens.radius.lg,
                                    paddingVertical: tokens.spacing.sm,
                                    paddingHorizontal: tokens.spacing.md,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: m.body }) })] })] }, m.id));
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
                            minHeight: 44,
                            maxHeight: 120,
                            color: colors.onSurface,
                            backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.04),
                            borderColor: colors.border,
                            borderWidth: 1,
                            borderRadius: tokens.radius.full,
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.sm,
                            fontSize: tokens.typography.scale.sm,
                        } }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", tone: "primary", onPress: submit, disabled: disabled || text.trim().length === 0, children: sendLabel })] }))] }));
}
//# sourceMappingURL=ConversationPanelV2.js.map
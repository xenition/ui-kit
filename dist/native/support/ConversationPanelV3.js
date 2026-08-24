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
exports.ConversationPanelV3 = ConversationPanelV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
const AUTHOR = {
    agent: { rail: 'primary', name: 'primaryText', role: 'Agent', glyph: '🎧' },
    customer: { rail: 'accent', name: 'accentText', role: 'Customer', glyph: '👤' },
    system: { rail: 'muted', name: 'muted', role: 'System', glyph: '⚙' },
};
/**
 * ConversationPanel — **V3 (flat quoted thread)**. An email-style transcript:
 * every message is a left sender rail + a role/name header + the body, laid out
 * flat (no bubbles, no side alignment) for a calm, readable log. Internal notes
 * get a warn rail and a lock glyph. Same `ConversationPanelProps` as
 * {@link ConversationPanel}. Sender is carried by rail + text; token colors
 * only. Handles loading and empty threads.
 */
function ConversationPanelV3({ messages, loading = false, emptyText = 'No messages yet.', replyValue, onChangeReply, onReply, sendLabel = 'Reply', hideComposer = false, disabled = false, style, }) {
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
    const body = loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading conversation", style: { padding: tokens.spacing.md, gap: tokens.spacing.md }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 3, height: 44, borderRadius: 2, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.12) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '30%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '85%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.08) } })] })] }, i))) })) : messages.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyText, style: { padding: tokens.spacing.xl, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyText }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { contentContainerStyle: { paddingVertical: tokens.spacing.sm }, children: messages.map((m) => {
            const spec = AUTHOR[m.author] ?? AUTHOR.system;
            const railColor = m.internal ? colors.warn : colors[spec.rail];
            const nameColor = m.internal ? colors.warnText : colors[spec.name];
            const roleText = m.internal ? 'Internal note' : spec.role;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${roleText}${m.authorName ? ` ${m.authorName}` : ''}: ${m.body}`, style: {
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    backgroundColor: m.internal ? (0, internal_1.withAlpha)(colors.warn, 0.06) : 'transparent',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 3, borderRadius: 2, backgroundColor: railColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginBottom: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs }, children: m.internal ? '🔒' : spec.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: nameColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: m.authorName ?? roleText }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", roleText] }), m.timeLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", m.timeLabel] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: m.body })] })] }, m.id));
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
                        } }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", onPress: submit, disabled: disabled || text.trim().length === 0, children: sendLabel })] }))] }));
}
//# sourceMappingURL=ConversationPanelV3.js.map
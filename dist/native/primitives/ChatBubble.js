"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBubble = ChatBubble;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A single themed chat message bubble — the native mirror of the web
 * `ChatBubble`. For chat, support threads, comments. No literal colors.
 */
function ChatBubble({ side = 'them', meta, style, children, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const me = side === 'me';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs, alignItems: me ? 'flex-end' : 'flex-start' }, style], children: [meta != null ? (typeof meta === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : (meta)) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    maxWidth: '75%',
                    borderRadius: tokens.radius.lg,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    backgroundColor: me ? colors.primary : colors.surface,
                    borderWidth: me ? 0 : 1,
                    borderColor: colors.border,
                }, children: typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: me ? colors.onPrimary : colors.onSurface,
                        fontSize: tokens.typography.scale.base,
                    }, children: children })) : (children) })] }));
}
//# sourceMappingURL=ChatBubble.js.map
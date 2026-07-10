"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageList = MessageList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Scrollable vertical stack for `ChatBubble` children — the native mirror of the
 * web `MessageList`, the chat/thread viewport. No literal colors.
 */
function MessageList({ style, contentContainerStyle, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: [{ flex: 1 }, style], contentContainerStyle: [{ gap: tokens.spacing.md, padding: tokens.spacing.lg }, contentContainerStyle], ...rest, children: children }));
}
//# sourceMappingURL=MessageList.js.map
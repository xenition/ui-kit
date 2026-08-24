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
exports.ConversationRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PresenceDot_1 = require("./PresenceDot");
const TypingIndicator_1 = require("./TypingIndicator");
/**
 * A single row in a conversation/inbox list — avatar with presence, name,
 * message preview, timestamp, and unread badge. Supports `unread` (bold +
 * count badge), `muted` (dimmed + mute glyph), and `typing` (live indicator
 * replaces the preview) states. No literal colors.
 */
exports.ConversationRow = React.forwardRef(function ConversationRow({ name, lastMessage, timestamp, avatarUri, presence, unreadCount = 0, muted = false, typing = false, selected = false, onClick, onLongPress, className, ...rest }, ref) {
    const unread = unreadCount > 0;
    const a11yLabel = [
        name,
        typing ? 'typing' : lastMessage,
        unread ? `${unreadCount} unread` : undefined,
        muted ? 'muted' : undefined,
    ]
        .filter(Boolean)
        .join(', ');
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": a11yLabel, "aria-selected": selected, onClick: onClick, onContextMenu: onLongPress
            ? (e) => {
                e.preventDefault();
                onLongPress();
            }
            : undefined, className: (0, cn_1.cn)('flex w-full items-center gap-3 px-4 py-2 text-left transition-colors', selected ? 'bg-neutral-100' : 'bg-surface hover:bg-neutral-100', muted && !unread && 'opacity-70', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "lg", src: avatarUri, name: name }), presence ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-0 right-0", children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence }) })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-base text-on-surface', unread ? 'font-bold' : 'font-medium'), children: name }), muted ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD07", size: "sm", color: "muted", "aria-label": "Muted" }) : null, timestamp ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs', unread ? 'font-semibold text-primary' : 'text-muted'), children: timestamp })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [typing ? ((0, jsx_runtime_1.jsx)(TypingIndicator_1.TypingIndicator, { name: "typing\u2026", bubble: false })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', unread ? 'font-medium text-on-surface' : 'text-muted'), children: lastMessage ?? '' })), unread ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: unreadCount > 99 ? '99+' : String(unreadCount) })) : null] })] })] }));
});
//# sourceMappingURL=ConversationRow.js.map
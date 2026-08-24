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
exports.ConversationRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PresenceDot_1 = require("./PresenceDot");
const TypingIndicator_1 = require("./TypingIndicator");
/**
 * ConversationRow — **dense minimal** variant. A single tight line: a small
 * leading unread dot, a tiny `xs` avatar, the name and message preview flowing
 * inline (name bold, preview muted), and the timestamp pinned far-right. Rows
 * are hairline-separated for high-density inboxes (many on screen) — the
 * opposite of the spacious v2 card. Same props as `ConversationRow`. No literal
 * colors.
 */
exports.ConversationRowV3 = React.forwardRef(function ConversationRowV3({ name, lastMessage, timestamp, avatarUri, presence, unreadCount = 0, muted = false, typing = false, selected = false, onClick, onLongPress, className, ...rest }, ref) {
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
            : undefined, className: (0, cn_1.cn)('flex w-full items-center gap-2 border-b border-border px-4 py-1 text-left transition-colors', selected ? 'bg-primary/10' : 'bg-surface hover:bg-neutral-100', muted && !unread && 'opacity-60', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-1.5 w-1.5 shrink-0 rounded-full', unread ? 'bg-primary' : 'bg-transparent') }), (0, jsx_runtime_1.jsxs)("span", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "xs", src: avatarUri, name: name }), presence ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5", children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence }) })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('max-w-[45%] shrink-0 truncate text-sm text-on-surface', unread ? 'font-bold' : 'font-semibold'), children: name }), typing ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1", children: (0, jsx_runtime_1.jsx)(TypingIndicator_1.TypingIndicator, { name: "typing\u2026", bubble: false }) })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', unread ? 'font-medium text-on-surface' : 'text-muted'), children: lastMessage ?? '' })), muted ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD07", size: "sm", color: "muted", "aria-label": "Muted" }) : null, timestamp ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs', unread ? 'font-semibold text-primary' : 'text-muted'), children: timestamp })) : null] }));
});
//# sourceMappingURL=ConversationRowV3.js.map
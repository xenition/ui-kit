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
exports.ConversationRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PresenceDot_1 = require("./PresenceDot");
const TypingIndicator_1 = require("./TypingIndicator");
/**
 * ConversationRow — **card** variant. A rounded, elevated card (margins +
 * shadow, lifts on hover) with a large `xl` avatar, the name and timestamp on
 * the top line, a bold two-line last-message preview, and a filled **unread
 * pill** in the trailing gutter. Reads as a spacious stacked-card inbox rather
 * than the flat v1 list row. Same props as `ConversationRow`. No literal colors.
 */
exports.ConversationRowV2 = React.forwardRef(function ConversationRowV2({ name, lastMessage, timestamp, avatarUri, presence, unreadCount = 0, muted = false, typing = false, selected = false, onClick, onLongPress, className, ...rest }, ref) {
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
            : undefined, className: (0, cn_1.cn)('flex w-full items-center gap-3 rounded-lg bg-surface p-4 text-left shadow-sm', 'mx-4 my-1 transition hover:-translate-y-0.5 hover:shadow-md active:scale-[.99]', 'motion-reduce:transition-none motion-reduce:hover:transform-none', selected && 'border-2 border-primary', muted && !unread && 'opacity-70', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "xl", src: avatarUri, name: name }), presence ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-0.5 right-0.5", children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence }) })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-lg font-bold text-on-surface", children: name }), muted ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD07", size: "sm", color: "muted", "aria-label": "Muted" }) : null, timestamp ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs', unread ? 'font-bold text-primary' : 'text-muted'), children: timestamp })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [typing ? ((0, jsx_runtime_1.jsx)(TypingIndicator_1.TypingIndicator, { name: "typing\u2026", bubble: false })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('line-clamp-2 min-w-0 flex-1 text-sm', unread ? 'font-semibold text-on-surface' : 'text-muted'), children: lastMessage ?? '' })), unread ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex min-w-6 shrink-0 items-center justify-center rounded-full bg-primary', 'px-2 py-0.5 text-xs font-bold text-on-primary'), children: unreadCount > 99 ? '99+' : String(unreadCount) })) : null] })] })] }));
});
//# sourceMappingURL=ConversationRowV2.js.map
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
exports.CommentItemV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const MentionText_1 = require("./MentionText");
/**
 * CommentItem, design V2 — a **chat bubble**: the avatar sits outside a filled,
 * speech-bubble surface (one squared bottom-left corner) that carries the author
 * + body; timestamp and like/reply actions live below the bubble. Threads via
 * `depth` indentation; `pinned` tints the bubble. Same props as
 * {@link CommentItem}; token-only, media-forward bubble idiom.
 */
exports.CommentItemV2 = React.forwardRef(function CommentItemV2({ author, handle, avatarUrl, text, timestamp, likeCount = 0, liked = false, depth = 0, pinned = false, onLike, onReply, onPressAuthor, onPressMention, onPressHashtag, children, className, style, ...rest }, ref) {
    const safeDepth = Math.max(0, depth);
    const indentStyle = safeDepth > 0 ? { paddingLeft: `calc(${safeDepth} * var(--xen-space-xl))` } : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, style: indentStyle ? { ...indentStyle, ...style } : style, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-sm", children: [onPressAuthor ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": author, onClick: onPressAuthor, className: "shrink-0", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: author, size: "sm" }) })) : ((0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: author, size: "sm", className: "shrink-0" })), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-xs rounded-lg rounded-bl-sm px-md py-sm', pinned ? 'bg-primary/10' : 'bg-neutral-100'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: author }), handle ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["@", handle] }) : null, pinned ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary", children: "\u00B7 Pinned" })) : null] }), (0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, size: "sm", onPressMention: onPressMention, onPressHashtag: onPressHashtag })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-lg px-sm", children: [timestamp ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: timestamp }) : null, (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Like, ${likeCount}`, "aria-pressed": liked, disabled: !onLike, onClick: onLike, className: (0, cn_1.cn)('inline-flex items-center gap-xs text-sm transition-opacity hover:opacity-70', 'disabled:pointer-events-none', liked ? 'text-danger' : 'text-muted'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: liked ? '♥' : '♡' }), likeCount > 0 ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold", children: likeCount }) : null] }), onReply ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Reply", onClick: onReply, className: "text-xs font-semibold text-muted transition-opacity hover:opacity-70", children: "Reply" })) : null] })] })] }), children ? (0, jsx_runtime_1.jsx)("div", { className: "mt-sm flex flex-col gap-sm", children: children }) : null] }));
});
//# sourceMappingURL=CommentItemV2.js.map
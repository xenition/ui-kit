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
exports.CommentItemV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const MentionText_1 = require("./MentionText");
/**
 * CommentItem, design V3 — **flat & threaded** with a thin **indent rail**. No
 * bubble: a tiny inline avatar, a single author line, a tight body, and a
 * compact action row. Nested replies (`depth` > 0) draw a hairline vertical rail
 * on the left to show the thread. Same props as {@link CommentItem}; token-only,
 * minimal/structural idiom.
 */
exports.CommentItemV3 = React.forwardRef(function CommentItemV3({ author, handle, avatarUrl, text, timestamp, likeCount = 0, liked = false, depth = 0, pinned = false, onLike, onReply, onPressAuthor, onPressMention, onPressHashtag, children, className, ...rest }, ref) {
    const nested = Math.max(0, depth) > 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex', className), ...rest, children: [nested ? ((0, jsx_runtime_1.jsx)("div", { className: "flex w-lg shrink-0 justify-center", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("div", { className: "w-0.5 flex-1 rounded-full bg-border" }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col gap-xs rounded-sm', pinned && 'border-l-2 border-primary bg-primary/10 p-sm'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-xs", children: [onPressAuthor ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": author, onClick: onPressAuthor, className: "shrink-0", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: author, size: "xs" }) })) : ((0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: author, size: "xs", className: "shrink-0" })), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: author }), handle ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["@", handle] }) : null, timestamp ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\u00B7 ", timestamp] }) : null, pinned ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary", children: "\u00B7 Pinned" }) : null] }), (0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, size: "sm", onPressMention: onPressMention, onPressHashtag: onPressHashtag }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-lg", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Like, ${likeCount}`, "aria-pressed": liked, disabled: !onLike, onClick: onLike, className: (0, cn_1.cn)('inline-flex items-center gap-xs text-sm transition-opacity hover:opacity-70', 'disabled:pointer-events-none', liked ? 'text-danger' : 'text-muted'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: liked ? '♥' : '♡' }), likeCount > 0 ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold", children: likeCount }) : null] }), onReply ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Reply", onClick: onReply, className: "text-xs font-semibold text-muted transition-opacity hover:opacity-70", children: "Reply" })) : null] }), children ? (0, jsx_runtime_1.jsx)("div", { className: "mt-sm flex flex-col gap-sm", children: children }) : null] })] }));
});
//# sourceMappingURL=CommentItemV3.js.map
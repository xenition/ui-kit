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
exports.PostCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const MentionText_1 = require("./MentionText");
const EngagementBar_1 = require("./EngagementBar");
/**
 * The feed post — one component, four media variants (`text` / `image` /
 * `link` / `video`) sharing an author header, a mention-aware body, and an
 * optional {@link EngagementBar} footer. Has a `loading` skeleton and clickable
 * author/menu/body affordances. Web parity of the native `PostCard`; token-only.
 * When `onClick` is set the root is a keyboard-operable `role="button"` so the
 * nested action buttons remain independently focusable.
 */
exports.PostCard = React.forwardRef(function PostCard({ variant = 'text', author, timestamp, text, imageUrl, imageAlt, link, video, showEngagement = true, likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, onClick, onPressAuthor, onPressMenu, onPressMention, onPressHashtag, loading = false, className, ...rest }, ref) {
    const containerClass = (0, cn_1.cn)('flex flex-col gap-sm rounded-lg border border-border bg-surface p-md', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading post", className: containerClass, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex animate-pulse items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-10 w-10 rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-2/5 rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 w-1/4 rounded-sm bg-neutral-100" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-11/12 rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-3/4 rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-40 rounded-md bg-neutral-100" })] }));
    }
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [onPressAuthor ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": author.name, onClick: onPressAuthor, className: "shrink-0", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: "md" }) })) : ((0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: "md", className: "shrink-0" })), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: author.name }), author.verified ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "primary", "aria-label": "Verified" }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: [author.handle ? `@${author.handle}` : null, timestamp].filter(Boolean).join(' · ') })] }), onPressMenu ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "More options", onClick: onPressMenu, className: "px-xs text-lg font-bold text-muted transition-opacity hover:opacity-60", children: "\u22EF" })) : null] }));
    const body = text ? ((0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, onPressMention: onPressMention, onPressHashtag: onPressHashtag })) : null;
    let media = null;
    if (variant === 'image' && imageUrl) {
        media = ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? 'Post image', loading: "lazy", className: "aspect-[16/10] w-full rounded-md bg-neutral-100 object-cover" }));
    }
    else if (variant === 'video') {
        media = ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-neutral-100", children: [video?.thumbnailUrl ? ((0, jsx_runtime_1.jsx)("img", { src: video.thumbnailUrl, alt: "Video thumbnail", loading: "lazy", className: "h-full w-full object-cover" })) : null, (0, jsx_runtime_1.jsx)("span", { className: "absolute flex h-14 w-14 items-center justify-center rounded-full bg-on-surface text-xl text-surface opacity-80", "aria-hidden": "true", children: "\u25B6" }), video?.duration ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-sm right-sm rounded-sm bg-on-surface px-xs py-px text-xs font-semibold text-surface", children: video.duration })) : null] }));
    }
    else if (variant === 'link' && link) {
        media = ((0, jsx_runtime_1.jsxs)("div", { className: "overflow-hidden rounded-md border border-border", children: [link.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: link.imageUrl, alt: link.title ?? 'Link preview', loading: "lazy", className: "aspect-[2/1] w-full bg-neutral-100 object-cover" })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5 p-sm", children: [link.domain ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: link.domain }) : null, (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm font-bold text-on-surface", children: link.title ?? link.url }), link.description ? ((0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-xs text-muted", children: link.description })) : null] })] }));
    }
    const hasFooterData = onLike || onComment || onShare || onBookmark || likeCount != null || commentCount != null || shareCount != null;
    const footer = showEngagement && hasFooterData ? ((0, jsx_runtime_1.jsx)(EngagementBar_1.EngagementBar, { likeCount: likeCount, commentCount: commentCount, shareCount: shareCount, liked: liked, bookmarked: bookmarked, onLike: onLike, onComment: onComment, onShare: onShare, onBookmark: onBookmark, className: "mt-xs" })) : null;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [header, body, media, footer] }));
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": `Post by ${author.name}`, onClick: onClick, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }, className: (0, cn_1.cn)(containerClass, 'cursor-pointer transition-opacity hover:opacity-[0.98]'), ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: containerClass, ...rest, children: inner }));
});
//# sourceMappingURL=PostCard.js.map
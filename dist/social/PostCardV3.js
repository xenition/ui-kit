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
exports.PostCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const MentionText_1 = require("./MentionText");
const EngagementBar_1 = require("./EngagementBar");
/**
 * PostCard, design V3 — **minimal & borderless** with a colored **left accent
 * rail**. No card fill or shadow: the post reads as a thread entry — header on
 * one line, a tight body, small inline media, and a flat engagement row. Link
 * previews collapse to a side-by-side chip. Same props as {@link PostCard} (all
 * four `variant`s), token-only.
 */
exports.PostCardV3 = React.forwardRef(function PostCardV3({ variant = 'text', author, timestamp, text, imageUrl, imageAlt, link, video, showEngagement = true, likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, onClick, onPressAuthor, onPressMenu, onPressMention, onPressHashtag, loading = false, className, ...rest }, ref) {
    const containerClass = (0, cn_1.cn)('flex flex-col gap-sm rounded-sm border-l-[3px] border-primary bg-transparent py-sm pl-md', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading post", className: containerClass, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex animate-pulse items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-8 w-8 rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-2/5 rounded-sm bg-neutral-100" })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-11/12 animate-pulse rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-3/5 animate-pulse rounded-sm bg-neutral-100" })] }));
    }
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [onPressAuthor ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": author.name, onClick: onPressAuthor, className: "shrink-0", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: "sm" }) })) : ((0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: "sm", className: "shrink-0" })), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: author.name }), author.verified ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "primary", "aria-label": "Verified" }) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: [author.handle ? `@${author.handle}` : null, timestamp].filter(Boolean).join(' · ') })] }), onPressMenu ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "More options", onClick: onPressMenu, className: "px-xs text-base font-bold text-muted transition-opacity hover:opacity-60", children: "\u22EF" })) : null] }));
    const body = text ? ((0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, size: "sm", onPressMention: onPressMention, onPressHashtag: onPressHashtag })) : null;
    let media = null;
    if (variant === 'image' && imageUrl) {
        media = ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? 'Post image', loading: "lazy", className: "aspect-video w-full rounded-md bg-neutral-100 object-cover" }));
    }
    else if (variant === 'video') {
        media = ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-neutral-100", children: [video?.thumbnailUrl ? ((0, jsx_runtime_1.jsx)("img", { src: video.thumbnailUrl, alt: "Video thumbnail", loading: "lazy", className: "h-full w-full object-cover" })) : null, (0, jsx_runtime_1.jsx)("span", { className: "absolute flex h-11 w-11 items-center justify-center rounded-full bg-on-surface text-lg text-surface opacity-80", "aria-hidden": "true", children: "\u25B6" }), video?.duration ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-xs right-xs rounded-sm bg-on-surface px-xs py-px text-xs font-semibold text-surface", children: video.duration })) : null] }));
    }
    else if (variant === 'link' && link) {
        media = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm overflow-hidden rounded-md bg-surface pr-sm", children: [link.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: link.imageUrl, alt: link.title ?? 'Link preview', loading: "lazy", className: "h-14 w-14 shrink-0 bg-neutral-100 object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "h-14 w-14 shrink-0 bg-neutral-100" })), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col py-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: link.title ?? link.url }), link.domain ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: link.domain }) : null] })] }));
    }
    const hasFooterData = onLike || onComment || onShare || onBookmark || likeCount != null || commentCount != null || shareCount != null;
    const footer = showEngagement && hasFooterData ? ((0, jsx_runtime_1.jsx)(EngagementBar_1.EngagementBar, { likeCount: likeCount, commentCount: commentCount, shareCount: shareCount, liked: liked, bookmarked: bookmarked, onLike: onLike, onComment: onComment, onShare: onShare, onBookmark: onBookmark })) : null;
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
//# sourceMappingURL=PostCardV3.js.map
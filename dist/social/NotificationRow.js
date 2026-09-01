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
exports.NotificationRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const FollowButton_1 = require("./FollowButton");
/** Default action phrase per kind, appended after the actor's name. */
const DEFAULT_TEXT = {
    like: 'liked your post',
    comment: 'commented on your post',
    follow: 'started following you',
    mention: 'mentioned you',
    repost: 'reposted your post',
};
/** Small kind glyph shown as a badge overlapping the avatar. */
const KIND_GLYPH = {
    like: '❤',
    comment: '💬',
    follow: '＋',
    mention: '@',
    repost: '🔁',
};
/**
 * A semantic token class for the badge fill per kind — one accent (primary) for
 * the connective kinds, with `like` on danger to read as a heart.
 */
const KIND_BADGE_CLASS = {
    like: 'bg-danger text-on-danger',
    comment: 'bg-primary text-on-primary',
    follow: 'bg-primary text-on-primary',
    mention: 'bg-primary text-on-primary',
    repost: 'bg-success text-on-success',
};
/**
 * NotificationRow — **V4** "feed" design. A single activity/notification item:
 * the actor's big avatar carries a small kind-glyph badge (❤ / 💬 / ＋ / @ / 🔁)
 * tinted by a semantic token, followed by a bold-name action line and a muted
 * time. `unread` paints a soft-primary row tint and a leading primary dot. A
 * trailing slot shows either the referenced post's `thumbnailUrl` or — for the
 * follow kind — a {@link FollowButton}. Presentational; token-only colors via
 * `--xen-*` classes. Web parity of the native `NotificationRow`. When `onPress`
 * is set the root is a keyboard-operable `role="button"`.
 */
exports.NotificationRow = React.forwardRef(function NotificationRow({ kind, actor, text, time, unread = false, thumbnailUrl, onPress, following, onFollow, className, ...rest }, ref) {
    const body = text ?? DEFAULT_TEXT[kind];
    const showFollow = kind === 'follow' && (onFollow != null || following != null);
    const trailing = showFollow ? ((0, jsx_runtime_1.jsx)(FollowButton_1.FollowButton, { state: following ? 'following' : 'follow', size: "sm", onClick: onFollow ? () => onFollow(!following) : undefined })) : thumbnailUrl ? ((0, jsx_runtime_1.jsx)("img", { src: thumbnailUrl, alt: "", loading: "lazy", className: "h-11 w-11 shrink-0 rounded-[var(--xen-radius-md)] bg-on-surface/10 object-cover" })) : null;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [unread ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 shrink-0 self-center rounded-full bg-primary" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 shrink-0 self-center" })), (0, jsx_runtime_1.jsxs)("div", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: actor.avatarUrl, name: actor.name, size: "lg" }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface text-xs leading-none', KIND_BADGE_CLASS[kind]), children: KIND_GLYPH[kind] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-extrabold", children: actor.name }), actor.verified ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": "Verified", className: "pl-xs text-xs text-primary", children: "\u2713" })) : null, (0, jsx_runtime_1.jsxs)("span", { className: "text-muted", children: [" ", body] })] }), time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: time }) : null] }), trailing] }));
    const rowClass = (0, cn_1.cn)('flex items-center gap-sm rounded-[var(--xen-radius-lg)] p-md', unread ? 'bg-primary/10' : 'bg-surface', className);
    const a11yLabel = `${actor.name} ${body}${time ? `, ${time}` : ''}${unread ? ', unread' : ''}`;
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": a11yLabel, onClick: onPress, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onPress();
                }
            }, className: (0, cn_1.cn)(rowClass, 'min-h-[44px] cursor-pointer transition-colors hover:bg-primary/10'), ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "listitem", "aria-label": a11yLabel, className: (0, cn_1.cn)(rowClass, 'min-h-[44px]'), ...rest, children: inner }));
});
//# sourceMappingURL=NotificationRow.js.map
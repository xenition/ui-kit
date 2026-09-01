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
exports.SuggestedUsers = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const FollowButton_1 = require("./FollowButton");
/**
 * SuggestedUsers — **V4** "feed" design. A "who to follow" block: a header
 * (`title` + optional "See all") over a horizontally-scrolling row of user chip
 * cards. Each chip is an elevated rounded card with a big avatar, bold name with
 * a primary verified tick, muted handle/bio, and a {@link FollowButton}; the
 * whole chip (min 44px) opens the profile via `onPressUser`. Presentational;
 * token-only colors via `--xen-*` classes. Web parity of the native
 * `SuggestedUsers`. Exposes `role="list"` with `listitem` chips.
 */
exports.SuggestedUsers = React.forwardRef(function SuggestedUsers({ title = 'Who to follow', users, onFollow, onPressUser, onSeeAll, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm px-md", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-base font-extrabold text-on-surface", children: title }), onSeeAll ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onSeeAll, className: "rounded-full px-sm py-xs text-sm font-semibold text-primary transition-colors hover:bg-primary/10", children: "See all" })) : null] }), (0, jsx_runtime_1.jsx)("ul", { "aria-label": title, className: "flex gap-sm overflow-x-auto px-md pb-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: users.map((user) => {
                    const meta = user.bio ?? (user.handle ? `@${user.handle}` : undefined);
                    return ((0, jsx_runtime_1.jsx)("li", { className: "shrink-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex w-40 flex-col items-center gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-surface p-md shadow-sm", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": user.name, onClick: onPressUser ? () => onPressUser(user.id) : undefined, disabled: !onPressUser, className: "flex min-h-[44px] flex-col items-center gap-xs rounded-[var(--xen-radius-md)] transition-opacity enabled:hover:opacity-90 disabled:cursor-default", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: user.avatarUrl, name: user.name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex max-w-full items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-extrabold text-on-surface", children: user.name }), user.verified ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": "Verified", className: "shrink-0 text-xs text-primary", children: "\u2713" })) : null] }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-center text-xs text-muted", children: meta }) : null] }), (0, jsx_runtime_1.jsx)(FollowButton_1.FollowButton, { state: user.following ? 'following' : 'follow', size: "sm", className: "w-full", onClick: onFollow ? () => onFollow(user.id) : undefined })] }) }, user.id));
                }) })] }));
});
//# sourceMappingURL=SuggestedUsers.js.map
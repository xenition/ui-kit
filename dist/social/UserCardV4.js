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
exports.UserCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const FollowButton_1 = require("./FollowButton");
const ProfileStats_1 = require("./ProfileStats");
/**
 * UserCard — **V4** "feed" design (web parity of the native V4). The clean,
 * airy take on a user block: a larger avatar, a bold name with a primary
 * verified tick, a muted handle, a bio line and {@link ProfileStats} in the
 * `card` variant, plus an inline {@link FollowButton} when a `followState` is
 * given. The `card` variant is an elevated rounded surface with generous
 * whitespace. Same props/behavior as {@link UserCardProps}; all colors from
 * `--xen-*` token classes (no literals). When clickable the root is a
 * keyboard-operable `role="button"` container so the nested follow button
 * stays independently focusable.
 */
exports.UserCardV4 = React.forwardRef(function UserCardV4({ user, variant = 'row', stats, followState, followLoading, onFollow, onClick, className, ...rest }, ref) {
    const isCard = variant === 'card';
    const identity = ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: user.name }), user.verified ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "primary", "aria-label": "Verified" })) : null] }), user.handle ? (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm text-muted", children: ["@", user.handle] }) : null] }));
    const follow = followState != null ? ((0, jsx_runtime_1.jsx)(FollowButton_1.FollowButton, { state: followState, loading: followLoading, onClick: onFollow })) : null;
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: user.avatarUrl, name: user.name, size: isCard ? 'xl' : 'lg' }), identity, follow] }));
    const inner = isCard ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-md", children: [header, user.bio ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm leading-relaxed text-on-surface", children: user.bio }) : null, stats && stats.length > 0 ? (0, jsx_runtime_1.jsx)(ProfileStats_1.ProfileStats, { stats: stats }) : null] })) : (header);
    const classes = (0, cn_1.cn)('bg-surface p-lg', isCard
        ? 'rounded-[var(--xen-radius-lg)] border border-border shadow-sm'
        : 'rounded-[var(--xen-radius-lg)]', onClick && 'cursor-pointer transition-opacity hover:opacity-[0.98]', className);
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": user.name, onClick: onClick, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }, className: classes, ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: classes, ...rest, children: inner }));
});
//# sourceMappingURL=UserCardV4.js.map
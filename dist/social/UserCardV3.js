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
exports.UserCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const FollowButton_1 = require("./FollowButton");
/**
 * UserCard, design V3 — a **compact follow row**: a small avatar, a tight
 * name/handle stack, and a trailing {@link FollowButton}. The `card` variant
 * adds a single-line bio and an inline stats summary
 * (e.g. `12 Posts · 3.4k Followers`) but stays dense and borderless.
 * Minimal/structural. Same props as {@link UserCard}, token-only.
 */
exports.UserCardV3 = React.forwardRef(function UserCardV3({ user, variant = 'row', stats, followState, followLoading, onFollow, onClick, className, ...rest }, ref) {
    const isCard = variant === 'card';
    const statsLine = isCard && stats && stats.length > 0
        ? stats.map((s) => `${String(s.value)} ${s.label}`).join(' · ')
        : null;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: user.avatarUrl, name: user.name, size: "md", className: "shrink-0" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-px", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: user.name }), user.verified ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "primary", "aria-label": "Verified" }) : null, user.handle ? (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted", children: ["@", user.handle] }) : null] }), isCard && user.bio ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-on-surface", children: user.bio })) : null, statsLine ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: statsLine }) : null] }), followState != null ? ((0, jsx_runtime_1.jsx)(FollowButton_1.FollowButton, { state: followState, loading: followLoading, onClick: onFollow, size: "sm", className: "shrink-0" })) : null] }));
    const classes = (0, cn_1.cn)('flex items-center gap-sm bg-transparent px-sm py-sm', onClick && 'cursor-pointer transition-opacity hover:opacity-80', className);
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
//# sourceMappingURL=UserCardV3.js.map
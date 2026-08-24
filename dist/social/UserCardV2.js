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
exports.UserCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const FollowButton_1 = require("./FollowButton");
const ProfileStats_1 = require("./ProfileStats");
/**
 * UserCard, design V2 — a **banner profile card**: a tinted two-tone cover strip
 * with an **overlapping avatar**, centered identity, bio, {@link ProfileStats},
 * and a prominent follow CTA. The `row` variant renders the same banner idiom,
 * minus bio/stats. Bold, media-forward. Same props as {@link UserCard},
 * token-only.
 */
exports.UserCardV2 = React.forwardRef(function UserCardV2({ user, variant = 'row', stats, followState, followLoading, onFollow, onClick, className, ...rest }, ref) {
    const isCard = variant === 'card';
    const banner = ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('relative w-full bg-primary/20', isCard ? 'h-[72px]' : 'h-12'), children: (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-y-0 right-0 w-[55%] bg-accent/20", "aria-hidden": "true" }) }));
    const identity = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: user.name }), user.verified ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "primary", "aria-label": "Verified" }) : null] }), user.handle ? (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm text-muted", children: ["@", user.handle] }) : null] }));
    const inner = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [banner, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col items-center gap-sm px-md pb-md', isCard ? '-mt-7' : '-mt-5'), children: [(0, jsx_runtime_1.jsx)("div", { className: "rounded-full border-[3px] border-surface", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: user.avatarUrl, name: user.name, size: isCard ? 'lg' : 'md' }) }), identity, isCard && user.bio ? ((0, jsx_runtime_1.jsx)("p", { className: "text-center text-sm leading-relaxed text-on-surface", children: user.bio })) : null, isCard && stats && stats.length > 0 ? ((0, jsx_runtime_1.jsx)(ProfileStats_1.ProfileStats, { stats: stats, dividers: true, className: "self-stretch" })) : null, followState != null ? ((0, jsx_runtime_1.jsx)(FollowButton_1.FollowButton, { state: followState, loading: followLoading, onClick: onFollow, size: isCard ? 'md' : 'sm', className: "min-w-[120px]" })) : null] })] }));
    const classes = (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface shadow-md', onClick &&
        'cursor-pointer transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:transform-none', className);
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
//# sourceMappingURL=UserCardV2.js.map
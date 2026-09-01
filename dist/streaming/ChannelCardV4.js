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
exports.ChannelCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const LiveBadge_1 = require("./LiveBadge");
const types_1 = require("./types");
/**
 * ChannelCard — **V4** "spotlight" design (web parity of the native V4). A rounded,
 * elevated live/creator card: the avatar sits inside a subtle brand-gradient glow
 * ring (the V4 signature — gradient reserved for the cover glow), with the name,
 * category, and — when `channel.live` — a `LiveBadge` plus a `formatCount` viewer
 * label. `onFollowToggle(next)` renders a **primary** follow `Button` (the one
 * accent, secondary once following) that stops propagation. `onClick(channel)`
 * opens the card, rendered as a `role="button"` `Card` with Enter/Space support
 * and a ≥44px tap target. Composes `Card` / `Avatar` / `Button`. Same
 * props/behavior as {@link ChannelCardProps}; all colors from `--xen-*` token
 * classes (no literal hex).
 */
exports.ChannelCardV4 = React.forwardRef(function ChannelCardV4({ channel, following = false, variant = 'row', onClick, onFollowToggle, className, ...rest }, ref) {
    const grid = variant === 'grid';
    const featured = variant === 'featured';
    const avatarSize = featured || grid ? 'lg' : 'md';
    const interactive = !!onClick;
    const followBtn = onFollowToggle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: following ? 'secondary' : 'primary', size: "sm", onClick: (e) => {
            e.stopPropagation();
            onFollowToggle(!following);
        }, "aria-label": following ? `Unfollow ${channel.name}` : `Follow ${channel.name}`, children: following ? 'Following' : 'Follow' })) : null;
    const subtitle = [
        channel.category,
        channel.live && channel.viewers != null ? `${(0, types_1.formatCount)(channel.viewers)} watching` : undefined,
    ]
        .filter(Boolean)
        .join(' · ');
    /* Avatar wrapped in a soft brand-gradient glow ring — the V4 cover glow. */
    const glowAvatar = ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex shrink-0 rounded-full bg-gradient-to-br from-accent-400 to-primary-600 p-0.5", children: (0, jsx_runtime_1.jsx)("span", { className: "inline-flex rounded-full bg-surface p-0.5", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: channel.avatarUrl, name: channel.name, size: avatarSize }) }) }));
    const nameRow = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: channel.name }), channel.live ? (0, jsx_runtime_1.jsx)(LiveBadge_1.LiveBadge, { variant: featured ? 'solid' : 'dot' }) : null] }));
    const meta = subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: subtitle }) : null;
    const inner = grid ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[var(--xen-space-sm)]", children: [glowAvatar, nameRow, meta, followBtn] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [glowAvatar, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [nameRow, meta] }), followBtn] }));
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "data-xen-channel-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? channel.name : undefined, onClick: interactive ? () => onClick(channel) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(channel);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)]', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: inner }));
});
//# sourceMappingURL=ChannelCardV4.js.map
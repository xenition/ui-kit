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
exports.EngagementBar = void 0;
exports.formatCount = formatCount;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
function formatCount(n) {
    if (n >= 1000000)
        return `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
    if (n >= 1000)
        return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    return String(n);
}
/**
 * The like / comment / share (+ optional bookmark) action row under a post.
 * Each action is a glyph with an optional count; `liked` turns the heart
 * `danger`, `bookmarked` turns the flag `primary`. Only the handlers you pass
 * become interactive. Web parity of the native `EngagementBar`; token-only.
 * State is announced via `aria-pressed`, not color alone.
 */
exports.EngagementBar = React.forwardRef(function EngagementBar({ likeCount = 0, commentCount = 0, shareCount = 0, liked = false, bookmarked = false, onLike, onComment, onShare, onBookmark, hideZero = true, className, ...rest }, ref) {
    const actions = [
        { key: 'like', glyph: '♡', activeGlyph: '♥', label: 'Like', count: likeCount, active: liked, activeClass: 'text-danger', onClick: onLike },
        { key: 'comment', glyph: '💬', label: 'Comment', count: commentCount, onClick: onComment },
        { key: 'share', glyph: '↗', label: 'Share', count: shareCount, onClick: onShare },
    ];
    if (onBookmark) {
        actions.push({ key: 'bookmark', glyph: '🔖', label: 'Bookmark', active: bookmarked, activeClass: 'text-primary', onClick: onBookmark });
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-lg', className), ...rest, children: actions.map((a) => {
            const tint = a.active ? a.activeClass ?? 'text-primary' : 'text-muted';
            const showCount = a.count != null && !(hideZero && a.count === 0);
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": a.count != null ? `${a.label}, ${a.count}` : a.label, "aria-pressed": a.active ? true : undefined, disabled: !a.onClick, onClick: a.onClick, className: (0, cn_1.cn)('inline-flex items-center gap-xs transition-opacity hover:opacity-70', 'disabled:pointer-events-none', tint), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg leading-none", "aria-hidden": "true", children: a.active && a.activeGlyph ? a.activeGlyph : a.glyph }), showCount ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold", children: formatCount(a.count) })) : null] }, a.key));
        }) }));
});
//# sourceMappingURL=EngagementBar.js.map
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
exports.PodcastCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const ART_SIZE = { grid: 140, list: 64, featured: 120 };
/**
 * PodcastCard — **V4** "spotlight" design (web parity of the native V4). The
 * artwork-forward show card: the cover sits on a subtle brand-gradient **glow**
 * backdrop (`from-accent-400 to-primary-600`) — the signature immersive touch of
 * this line — with title, publisher · episode-count, and (in `featured`) a
 * description plus a `primary` subscribe button. `onClick(podcast)` opens the
 * show (rendered as a `role="button"` `Card` with Enter/Space support). Same
 * props/behavior as {@link PodcastCardProps}; all colors from `--xen-*` token
 * classes + gradient utilities (no literal hex). Composes `Card` / `Button`.
 */
exports.PodcastCardV4 = React.forwardRef(function PodcastCardV4({ podcast, subscribed = false, variant = 'grid', onClick, onSubscribeToggle, className, ...rest }, ref) {
    const list = variant === 'list';
    const featured = variant === 'featured';
    const art = ART_SIZE[variant];
    const interactive = !!onClick;
    const meta = [
        podcast.publisher,
        podcast.episodeCount != null ? `${podcast.episodeCount} episodes` : undefined,
    ]
        .filter(Boolean)
        .join(' · ');
    // Cover on a gradient glow backdrop — the V4 spotlight signature.
    const artwork = ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-sm)]', list ? '' : 'aspect-square w-full'), style: list ? { width: art, height: art } : undefined, children: podcast.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: podcast.artworkUrl, alt: "", "aria-hidden": "true", className: "h-full w-full rounded-[var(--xen-radius-md)] bg-border object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-full w-full items-center justify-center rounded-[var(--xen-radius-md)]", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF99", size: "2xl", color: "onPrimary" }) })) }));
    const subscribeBtn = onSubscribeToggle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: subscribed ? 'secondary' : 'primary', size: "sm", onClick: (e) => {
            e.stopPropagation();
            onSubscribeToggle(!subscribed);
        }, "aria-label": subscribed ? `Unsubscribe from ${podcast.title}` : `Subscribe to ${podcast.title}`, children: subscribed ? 'Subscribed' : 'Subscribe' })) : null;
    const textBlock = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-0.5', list && 'min-w-0 flex-1'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold text-on-surface", children: podcast.title }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: meta }) : null, featured && podcast.description ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-[var(--xen-space-xs)] text-sm text-muted", children: podcast.description })) : null, featured && subscribeBtn ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)] self-start", children: subscribeBtn })) : null] }));
    const inner = list ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [artwork, textBlock, !featured && subscribeBtn ? (0, jsx_runtime_1.jsx)("div", { children: subscribeBtn }) : null] })) : featured ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { style: { width: art }, children: artwork }), textBlock] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: [artwork, textBlock, subscribeBtn ? (0, jsx_runtime_1.jsx)("div", { className: "self-start", children: subscribeBtn }) : null] }));
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, "data-xen-podcast-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? podcast.title : undefined, onClick: interactive ? () => onClick(podcast) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(podcast);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] shadow-lg', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: inner }));
});
//# sourceMappingURL=PodcastCardV4.js.map
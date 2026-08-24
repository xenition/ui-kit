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
exports.PodcastRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * A podcast / audio episode row — artwork, title, show, duration, and a
 * play/pause control. Web (React DOM) mirror of the native `PodcastRow`. The
 * play button is controlled via `playing` + `onPlayToggle(next)`; clicking the
 * rest of the row fires `onClick(episode)`. Two variants (`standard` /
 * `compact`). All colors come from `--xen-*` token classes.
 */
exports.PodcastRow = React.forwardRef(function PodcastRow({ episode, playing = false, onPlayToggle, onClick, variant = 'standard', className, ...rest }, ref) {
    const compact = variant === 'compact';
    const artSize = compact ? 'h-11 w-11' : 'h-16 w-16';
    const meta = [episode.show, episode.duration].filter(Boolean).join('  ·  ');
    const interactive = !!onClick;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? episode.title : undefined, onClick: interactive ? () => onClick?.(episode) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.(episode);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-sm)]', interactive && 'cursor-pointer transition-opacity hover:opacity-90', className), ...rest, children: [episode.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: episode.artworkUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('shrink-0 rounded-[var(--xen-radius-md)] bg-neutral-100 object-cover', artSize) })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-accent', artSize), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-lg leading-none text-on-accent", children: "\uD83C\uDFA7" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('font-bold text-on-surface', compact ? 'line-clamp-1' : 'line-clamp-2'), children: episode.title }), !compact && meta ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-1 text-xs text-muted", children: meta }) : null] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? `Pause ${episode.title}` : `Play ${episode.title}`, "aria-pressed": playing, disabled: !onPlayToggle, onClick: onPlayToggle
                    ? (e) => {
                        e.stopPropagation();
                        onPlayToggle(!playing);
                    }
                    : undefined, className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary transition-opacity hover:opacity-80 disabled:opacity-50", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: playing ? '❙❙' : '▶', size: "sm", color: "onPrimary" }) })] }));
});
//# sourceMappingURL=PodcastRow.js.map
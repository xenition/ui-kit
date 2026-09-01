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
exports.PlaylistRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * PlaylistRow — **V4** "spotlight" design (web parity of the native V4). A calm,
 * clean-surface playlist entry: a rounded cover thumb, title + artist, a trailing
 * duration, and — when `onPlayToggle` is set — a big round **primary** play/pause
 * affordance (the one accent, ≥44px). Selecting the row via `onClick` renders it
 * as a `role="button"` with Enter/Space support and a soft-`primary` hover/press
 * tint; when `active` the title tints `primary` and the row shows a leading
 * now-playing glyph, announced via `aria-current`. The `numbered` variant swaps
 * the artwork for a track number. Same props/behavior as {@link PlaylistRowProps};
 * all colors from `--xen-*` token classes (no literal hex).
 */
exports.PlaylistRowV4 = React.forwardRef(function PlaylistRowV4({ track, index, active = false, state = 'paused', variant = 'standard', onClick, onPlayToggle, onMore, className, ...rest }, ref) {
    const numbered = variant === 'numbered';
    const compact = variant === 'compact';
    const isPlaying = active && state === 'playing';
    const size = compact ? 44 : 48;
    const interactive = !!onClick;
    const lead = numbered ? ((0, jsx_runtime_1.jsx)("span", { className: "flex w-11 items-center justify-center", children: active ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "sm", color: "primary" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: index != null ? index + 1 : '—' })) })) : ((0, jsx_runtime_1.jsxs)("span", { className: "relative shrink-0", style: { width: size, height: size }, children: [track.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: track.artworkUrl, alt: "", "aria-hidden": "true", className: "rounded-[var(--xen-radius-md)] bg-border object-cover", style: { width: size, height: size } })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex items-center justify-center rounded-[var(--xen-radius-md)] bg-accent", style: { width: size, height: size }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "base", color: "onPrimary" }) })), active ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute inset-0 flex items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50/80", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "primary" }) })) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-playlist-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? track.title : undefined, "aria-current": interactive && active ? 'true' : undefined, onClick: interactive ? () => onClick(track, index) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(track, index);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)]', compact ? 'py-[var(--xen-space-xs)]' : 'py-[var(--xen-space-sm)]', active ? 'bg-primary-50' : 'bg-transparent', interactive &&
            'cursor-pointer transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [lead, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('truncate text-base', active ? 'font-bold text-primary' : 'font-semibold text-on-surface'), children: [track.title, active ? (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: " (now playing)" }) : null] }), track.artist && !compact ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: track.artist })) : null] }), track.duration != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: (0, types_1.formatTime)(track.duration) })) : null, onPlayToggle ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": isPlaying ? `Pause ${track.title}` : `Play ${track.title}`, "aria-pressed": isPlaying, onClick: (e) => {
                    e.stopPropagation();
                    onPlayToggle(!isPlaying);
                }, className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "onPrimary" }) })) : null, onMore ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "More options", onClick: (e) => {
                    e.stopPropagation();
                    onMore();
                }, className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u22EF", size: "lg", color: "muted" }) })) : null] }));
});
//# sourceMappingURL=PlaylistRowV4.js.map
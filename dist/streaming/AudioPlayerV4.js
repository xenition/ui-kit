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
exports.AudioPlayerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const ART_SIZE = {
    card: 64,
    compact: 44,
    expanded: 88,
};
/**
 * AudioPlayer — **V4** "spotlight" design (web parity of the native V4). A
 * compact audio transport card: small artwork, title/artist, a clean
 * soft-primary scrubber with time labels, and big round **primary** transport
 * controls (play/pause framed by prev/next in `expanded`). When a cover is
 * present it sits on a subtle brand-gradient glow — the V4 signature — kept
 * light so the card stays a clean surface. Same props/behavior as
 * {@link AudioPlayerProps} (buffering swaps play for a `Spinner`); every color
 * resolves from `--xen-*` token classes — no literal hex.
 */
exports.AudioPlayerV4 = React.forwardRef(function AudioPlayerV4({ track, state = 'paused', position = 0, duration, variant = 'card', onPlayToggle, onSeek, onPrev, onNext, className, ...rest }, ref) {
    const isPlaying = state === 'playing';
    const isBuffering = state === 'buffering';
    const total = duration ?? track.duration;
    const seekMax = total && total > 0 ? total : 1;
    const compact = variant === 'compact';
    const expanded = variant === 'expanded';
    const art = ART_SIZE[variant];
    const meta = [track.artist, track.album].filter(Boolean).join(' · ');
    const playControl = ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-11 w-11 items-center justify-center", children: isBuffering ? ((0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": isPlaying ? 'Pause' : 'Play', "aria-pressed": isPlaying, disabled: !onPlayToggle, onClick: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary shadow-md', 'transition-opacity hover:opacity-90', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none disabled:opacity-50'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "onPrimary" }) })) }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-audio-player": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [track.artworkUrl ? (
                    // Cover on a subtle gradient glow — the V4 spotlight signature.
                    (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-xs)]", style: { width: art, height: art }, children: (0, jsx_runtime_1.jsx)("img", { src: track.artworkUrl, alt: "", "aria-hidden": "true", className: "h-full w-full rounded-[var(--xen-radius-sm)] object-cover" }) })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-accent-400 to-primary-600", style: { width: art, height: art }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "xl", color: "onPrimary" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-extrabold text-on-surface", children: track.title }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: meta }) : null] }), expanded && onPrev ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous", onClick: onPrev, className: "inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23EE", size: "lg", color: "onSurface" }) })) : null, playControl, expanded && onNext ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next", onClick: onNext, className: "inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "lg", color: "onSurface" }) })) : null] }), !compact ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, disabled: !onSeek, onChange: (v) => onSeek?.(v) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: (0, types_1.formatTime)(total) })] })] })) : null] }));
});
//# sourceMappingURL=AudioPlayerV4.js.map
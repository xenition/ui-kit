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
exports.VideoPlayerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const LiveBadge_1 = require("./LiveBadge");
const CastButton_1 = require("./CastButton");
const types_1 = require("./types");
/**
 * VideoPlayer — **V4** "spotlight" design (web parity of the native V4). The
 * video surface shell: a brand-gradient poster/backdrop sits behind the
 * (placeholder) video frame — the V4 signature — with a big centered round
 * **primary** play control and a bottom control bar (scrubber + time labels +
 * mute/cast/fullscreen glyphs) on a subtle scrim. A `posterUrl` overlays the
 * gradient when given. Controls-only, no `<video>` engine: drive a real element
 * from `onPlayToggle(next)`, `onSeek(seconds)`, `onFullscreen`, `onCast`. Same
 * props/behavior as {@link VideoPlayerProps} (buffering swaps play for a
 * `Spinner`); every color resolves from `--xen-*` tokens — no literal hex.
 */
exports.VideoPlayerV4 = React.forwardRef(function VideoPlayerV4({ posterUrl, title, state = 'paused', position = 0, duration, live = false, viewers, aspectRatio = 16 / 9, variant = 'inline', showControls = true, onPlayToggle, onSeek, onFullscreen, onCast, casting, className, style, ...rest }, ref) {
    const isPlaying = state === 'playing';
    const isBuffering = state === 'buffering';
    const seekMax = duration && duration > 0 ? duration : 1;
    const showSeek = variant !== 'minimal' && !live && duration != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-video-player": "", className: (0, cn_1.cn)('relative flex w-full items-center justify-center overflow-hidden', 
        // Gradient poster/backdrop — the V4 spotlight signature.
        'rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600', className), style: { aspectRatio: String(aspectRatio), ...style }, ...rest, children: [posterUrl ? ((0, jsx_runtime_1.jsx)("img", { src: posterUrl, alt: "", "aria-hidden": "true", className: "absolute inset-0 h-full w-full object-cover" })) : null, showControls ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-neutral-900", style: { opacity: 0.3 } }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute left-[var(--xen-space-sm)] right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex items-center gap-[var(--xen-space-sm)]", children: [live ? (0, jsx_runtime_1.jsx)(LiveBadge_1.LiveBadge, { viewers: viewers }) : null, title ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-neutral-50", children: title })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "relative flex items-center justify-center", children: isBuffering ? ((0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "lg" })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": isPlaying ? 'Pause' : 'Play', "aria-pressed": isPlaying, disabled: !onPlayToggle, onClick: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, className: (0, cn_1.cn)('flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary text-on-primary shadow-lg', 'transition-opacity hover:opacity-90', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none disabled:opacity-50'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "2xl", color: "onPrimary" }) })) }), variant !== 'minimal' ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-[var(--xen-space-sm)] left-[var(--xen-space-sm)] right-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-neutral-50", children: live ? 'LIVE' : (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: showSeek ? ((0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, disabled: !onSeek, onChange: (v) => onSeek?.(v) })) : ((0, jsx_runtime_1.jsx)("div", { className: "h-1 w-full rounded-full bg-border" })) }), !live ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-neutral-50", children: (0, types_1.formatTime)(duration) })) : null, onCast ? ((0, jsx_runtime_1.jsx)(CastButton_1.CastButton, { connected: casting, onClick: onCast, size: "sm", className: "text-neutral-50" })) : null, onFullscreen ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Fullscreen", onClick: onFullscreen, className: "inline-flex text-neutral-50 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2922", size: "base", className: "text-neutral-50" }) })) : null] }) })) : null] })) : null] }));
});
//# sourceMappingURL=VideoPlayerV4.js.map
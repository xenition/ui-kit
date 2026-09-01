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
exports.FullScreenPlayer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const media_1 = require("../media");
const WaveformScrubber_1 = require("./WaveformScrubber");
const CastButton_1 = require("./CastButton");
const types_1 = require("./types");
/**
 * FullScreenPlayer — the **V4 "spotlight"** peak moment (web). The immersive,
 * artwork-forward full-screen now-playing surface: a full brand-gradient ground
 * (`from-primary-500 to-primary-700`), a big centered cover in a frosted frame,
 * title/artist in near-white ink, an on-gradient scrubber (linear `Slider`, or a
 * {@link WaveformScrubber} when `peaks` are given), a large near-white round play
 * control framed by prev/next, and secondary glassy tiles (favorite / queue /
 * cast). All colors derive from the brand ramp via `--xen-*` classes + gradient
 * utilities — no literal hex; dark-mode safe.
 */
exports.FullScreenPlayer = React.forwardRef(function FullScreenPlayer({ track, state = 'paused', position = 0, duration, peaks, onPlayToggle, onSeek, onPrev, onNext, onClose, favorite, onFavorite, onQueue, onCast, casting, className, ...rest }, ref) {
    const isPlaying = state === 'playing';
    const total = duration ?? track.duration;
    const seekMax = total && total > 0 ? total : 1;
    const frac = (0, types_1.clamp01)(seekMax > 0 ? position / seekMax : 0);
    const artItem = {
        url: track.artworkUrl ?? '',
        alt: track.album ? `${track.title} — ${track.album}` : track.title,
        width: 1,
        height: 1,
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)] gap-[var(--xen-space-xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-md)]", children: [onClose ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Close player", onClick: onClose, className: "flex h-11 w-11 items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30 text-primary-50 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2304", size: "lg", color: "onPrimary" }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "h-11 w-11", "aria-hidden": true })), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-center text-xs font-semibold uppercase tracking-wide text-primary-100", children: track.album ?? 'Now playing' }), (0, jsx_runtime_1.jsx)("span", { className: "h-11 w-11", "aria-hidden": true })] }), (0, jsx_runtime_1.jsx)("div", { className: "mx-auto w-[80%] overflow-hidden rounded-[var(--xen-radius-lg)] bg-primary-50/15 border border-primary-50/30 p-[var(--xen-space-md)]", children: track.artworkUrl ? ((0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden rounded-[var(--xen-radius-md)]", children: (0, jsx_runtime_1.jsx)(media_1.MediaFigure, { item: artItem, reserveAspect: true }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex aspect-square items-center justify-center", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "3xl", color: "onPrimary" }) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-2xl font-extrabold text-primary-50", children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-base text-primary-100", children: track.artist })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [peaks ? ((0, jsx_runtime_1.jsx)(WaveformScrubber_1.WaveformScrubber, { peaks: peaks, progress: frac, onSeek: onSeek ? (f) => onSeek(f * seekMax) : undefined })) : ((0, jsx_runtime_1.jsx)("div", { className: "rounded-full bg-primary-50/15 px-[var(--xen-space-xs)]", children: (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, disabled: !onSeek, onChange: (v) => onSeek?.(v) }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: (0, types_1.formatTime)(total) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-[var(--xen-space-xl)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous", disabled: !onPrev, onClick: onPrev, className: "inline-flex text-primary-50 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 disabled:pointer-events-none disabled:opacity-40", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23EE", size: "2xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": isPlaying ? 'Pause' : 'Play', "aria-pressed": isPlaying, disabled: !onPlayToggle, onClick: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, className: "flex h-[76px] w-[76px] items-center justify-center rounded-full bg-on-primary text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 disabled:opacity-50", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "2xl", color: "primary" }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next", disabled: !onNext, onClick: onNext, className: "inline-flex text-primary-50 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 disabled:pointer-events-none disabled:opacity-40", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "2xl", color: "onPrimary" }) })] }), onFavorite || onQueue || onCast ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-[var(--xen-space-md)]", children: [onFavorite ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": favorite ? 'Remove from favorites' : 'Add to favorites', "aria-pressed": !!favorite, onClick: () => onFavorite(!favorite), className: (0, cn_1.cn)('flex h-11 min-w-11 items-center justify-center rounded-full border border-primary-50/30 px-[var(--xen-space-md)] text-primary-50 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100', favorite ? 'bg-primary-50/30' : 'bg-primary-50/15'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: favorite ? '♥' : '♡', size: "lg", color: "onPrimary" }) })) : null, onQueue ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Open queue", onClick: onQueue, className: "flex h-11 min-w-11 items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] text-primary-50 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2630", size: "lg", color: "onPrimary" }) })) : null, onCast ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-11 min-w-11 items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)]", children: (0, jsx_runtime_1.jsx)(CastButton_1.CastButton, { connected: casting, onClick: onCast }) })) : null] })) : null] }));
});
//# sourceMappingURL=FullScreenPlayer.js.map
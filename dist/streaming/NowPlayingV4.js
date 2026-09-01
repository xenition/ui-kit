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
exports.NowPlayingV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const media_1 = require("../media");
const WaveformScrubber_1 = require("./WaveformScrubber");
const CastButton_1 = require("./CastButton");
const types_1 = require("./types");
/**
 * NowPlaying — **V4** "spotlight" design (web parity of the native V4). The
 * artwork-forward take on the now-playing surface: the hero cover sits on a
 * brand-gradient glow backdrop (the signature immersive touch), with a big round
 * primary play control framed by prev/next. Same scrubber (linear `Slider`, or a
 * {@link WaveformScrubber} when `peaks` are given), time labels, and optional
 * cast button. Same props/behavior as {@link NowPlayingProps}; all colors from
 * `--xen-*` token classes (no literal hex). `variant="compact"` tightens it.
 */
exports.NowPlayingV4 = React.forwardRef(function NowPlayingV4({ track, state = 'paused', position = 0, duration, peaks, variant = 'full', onPlayToggle, onSeek, onPrev, onNext, onCast, casting, style }, ref) {
    const isPlaying = state === 'playing';
    const total = duration ?? track.duration;
    const seekMax = total && total > 0 ? total : 1;
    const frac = (0, types_1.clamp01)(seekMax > 0 ? position / seekMax : 0);
    const compact = variant === 'compact';
    const artItem = {
        url: track.artworkUrl ?? '',
        alt: track.album ? `${track.title} — ${track.album}` : track.title,
        width: 1,
        height: 1,
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, className: (0, cn_1.cn)('flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-lg', compact ? 'gap-[var(--xen-space-md)] p-[var(--xen-space-md)]' : 'gap-[var(--xen-space-xl)] p-[var(--xen-space-lg)]'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('mx-auto overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600', compact ? 'w-[68%] p-[var(--xen-space-md)]' : 'w-[88%] p-[var(--xen-space-lg)]'), children: track.artworkUrl ? ((0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden rounded-[var(--xen-radius-md)]", children: (0, jsx_runtime_1.jsx)(media_1.MediaFigure, { item: artItem, reserveAspect: true }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex aspect-square items-center justify-center", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "3xl", color: "onPrimary" }) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-extrabold text-on-surface", children: track.title }), track.artist ? (0, jsx_runtime_1.jsx)("span", { className: "text-base text-muted", children: track.artist }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [peaks ? ((0, jsx_runtime_1.jsx)(WaveformScrubber_1.WaveformScrubber, { peaks: peaks, progress: frac, onSeek: onSeek ? (f) => onSeek(f * seekMax) : undefined })) : ((0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, disabled: !onSeek, onChange: (v) => onSeek?.(v) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: (0, types_1.formatTime)(total) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-[var(--xen-space-xl)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous", disabled: !onPrev, onClick: onPrev, className: "inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none disabled:opacity-40", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23EE", size: "2xl", color: "onSurface" }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": isPlaying ? 'Pause' : 'Play', "aria-pressed": isPlaying, disabled: !onPlayToggle, onClick: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, className: "flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary text-on-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:opacity-50", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "2xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next", disabled: !onNext, onClick: onNext, className: "inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none disabled:opacity-40", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "2xl", color: "onSurface" }) })] }), onCast ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsx)(CastButton_1.CastButton, { variant: "labeled", connected: casting, onClick: onCast }) })) : null] }));
});
//# sourceMappingURL=NowPlayingV4.js.map
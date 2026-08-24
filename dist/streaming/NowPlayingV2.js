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
exports.NowPlayingV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
function fmt(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
}
/**
 * NowPlaying, redesigned (v2): a **big hero player**. Large square artwork over
 * centered title/artist/album, a full-width scrubber with time labels, and a
 * prev/play/next transport row with an optional cast — the immersive layout. Same
 * props, token-only.
 */
exports.NowPlayingV2 = React.forwardRef(function NowPlayingV2({ track, state = 'paused', position = 0, duration, peaks, variant, onPlayToggle, onSeek, onPrev, onNext, onCast, casting = false, className, ...rest }, ref) {
    void variant;
    void peaks;
    const playing = state === 'playing';
    const buffering = state === 'buffering';
    const total = duration ?? track.duration ?? 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-now-playing": "", className: (0, cn_1.cn)('flex flex-col items-center gap-4 p-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "aspect-square w-full max-w-xs overflow-hidden rounded-lg bg-neutral-100 shadow-md", children: track.artworkUrl ? (0, jsx_runtime_1.jsx)("img", { src: track.artworkUrl, alt: "", className: "h-full w-full object-cover" }) : (0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center text-5xl", children: "\uD83C\uDFB5" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: track.title }), track.artist ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: track.artist }) : null, track.album ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: track.album }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: position, min: 0, max: total || 1, onChange: (v) => onSeek?.(v) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex justify-between text-xs tabular-nums text-muted", children: [(0, jsx_runtime_1.jsx)("span", { children: fmt(position) }), (0, jsx_runtime_1.jsx)("span", { children: fmt(total) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-6", children: [onPrev ? (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous", onClick: onPrev, className: "text-2xl text-on-surface", children: "\u23EE" }) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? 'Pause' : 'Play', onClick: () => onPlayToggle?.(!playing), className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg text-on-primary", children: buffering ? (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" }) : playing ? '❚❚' : '▶' }), onNext ? (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next", onClick: onNext, className: "text-2xl text-on-surface", children: "\u23ED" }) : null] }), onCast ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Cast", "aria-pressed": casting, onClick: onCast, className: (0, cn_1.cn)('text-sm', casting ? 'text-primary' : 'text-muted'), children: ["\uD83D\uDCFA ", casting ? 'Casting' : 'Cast'] })) : null] }));
});
//# sourceMappingURL=NowPlayingV2.js.map
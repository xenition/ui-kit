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
exports.NowPlayingV3 = void 0;
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
 * NowPlaying, redesigned (v3): a **compact bar player**. Small artwork left, the
 * title/artist and an inline scrubber stacked in the middle, and a single play
 * control on the right — a lean player for a sidebar. The opposite of v2's hero.
 * Same props, token-only.
 */
exports.NowPlayingV3 = React.forwardRef(function NowPlayingV3({ track, state = 'paused', position = 0, duration, peaks, variant, onPlayToggle, onSeek, onPrev, onNext, onCast, casting, className, ...rest }, ref) {
    void variant;
    void peaks;
    void onPrev;
    void onNext;
    void onCast;
    void casting;
    const playing = state === 'playing';
    const buffering = state === 'buffering';
    const total = duration ?? track.duration ?? 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-now-playing": "", className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl", children: track.artworkUrl ? (0, jsx_runtime_1.jsx)("img", { src: track.artworkUrl, alt: "", className: "h-full w-full object-cover" }) : '🎵' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: track.title }), track.artist ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: track.artist }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: position, min: 0, max: total || 1, onChange: (v) => onSeek?.(v) }) }), (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-[10px] tabular-nums text-muted", children: fmt(position) })] })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? 'Pause' : 'Play', onClick: () => onPlayToggle?.(!playing), className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary", children: buffering ? (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" }) : playing ? '❚❚' : '▶' })] }));
});
//# sourceMappingURL=NowPlayingV3.js.map
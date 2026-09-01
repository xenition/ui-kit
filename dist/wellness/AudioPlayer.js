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
exports.AudioPlayer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const primitives_1 = require("../primitives");
function fmt(sec) {
    if (sec == null || !Number.isFinite(sec) || sec < 0)
        return '0:00';
    const s = Math.floor(sec);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r < 10 ? '0' : ''}${r}`;
}
/**
 * AudioPlayer (web parity) — a frosted "glass" transport for a
 * meditation/soundscape track. A `GlassPanel` ground carries a gradient cover
 * tile, the title/teacher, a progress track (`bg-neutral-200` track with a
 * `bg-primary` fill via inline width %), and a gradient play/pause button.
 * `variant='full'` expands to a large cover with skip controls. Only the cover
 * and the play button are colored; everything else stays calm on the glass, on
 * tokens.
 */
exports.AudioPlayer = React.forwardRef(function AudioPlayer({ title, subtitle, coverGlyph = '🎧', isPlaying = false, position = 0, duration = 0, variant = 'bar', onPlayPause, onSkipBack, onSkipForward, className, ...rest }, ref) {
    const pct = duration > 0 ? Math.max(0, Math.min(1, position / duration)) : 0;
    const a11y = `${title}${subtitle ? ', ' + subtitle : ''}, ${isPlaying ? 'playing' : 'paused'}`;
    const Track = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-1 rounded-full bg-neutral-200", children: (0, jsx_runtime_1.jsx)("div", { className: "h-1 rounded-full bg-primary", style: { width: `${pct * 100}%` } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: fmt(position) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: fmt(duration) })] })] }));
    const PlayButton = ({ size }) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": isPlaying ? 'Pause' : 'Play', onClick: onPlayPause, className: "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", style: { width: size, height: size }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: isPlaying ? '⏸' : '▶', size: Math.round(size * 0.42), color: "onPrimary" }) }));
    const Cover = ({ dim }) => ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", style: { width: dim, height: dim }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: coverGlyph, size: Math.round(dim * 0.42), color: "onPrimary" }) }));
    if (variant === 'full') {
        return ((0, jsx_runtime_1.jsxs)(primitives_1.GlassPanel, { ref: ref, intensity: "regular", role: "group", "aria-label": a11y, "data-xen-audio-player": "", className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Cover, { dim: 168 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-extrabold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: subtitle }) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "self-stretch", children: Track }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xl)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Skip back", onClick: onSkipBack, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u23EE", size: "xl", color: "onSurface" }) }), (0, jsx_runtime_1.jsx)(PlayButton, { size: 72 }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Skip forward", onClick: onSkipForward, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u23ED", size: "xl", color: "onSurface" }) })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.GlassPanel, { ref: ref, intensity: "regular", role: "group", "aria-label": a11y, "data-xen-audio-player": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Cover, { dim: 52 }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subtitle }) : null] }), (0, jsx_runtime_1.jsx)(PlayButton, { size: 44 })] }), Track] }));
});
//# sourceMappingURL=AudioPlayer.js.map
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
exports.EpisodeRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * EpisodeRow, redesigned (v2): an **artwork-forward episode card**. Large artwork
 * with a circular play control overlaid on a scrim, the title/show/date/duration
 * beside it, a resume bar, and an optional download — elevated. Distinct from
 * v1's list row. Same props, token-only.
 */
exports.EpisodeRowV2 = React.forwardRef(function EpisodeRowV2({ episode, playing = false, state, variant, onPlayToggle, onClick, onDownload, className, ...rest }, ref) {
    void variant;
    void state;
    const interactive = typeof onClick === 'function';
    const meta = [episode.show, episode.date, episode.duration].filter((s) => !!s).join(' · ');
    const progress = typeof episode.progress === 'number' ? (0, types_1.clamp01)(episode.progress) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-episode-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": episode.title, onClick: interactive ? () => onClick?.(episode) : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(episode);
        } } : undefined, className: (0, cn_1.cn)('flex gap-3 rounded-lg bg-surface p-3 shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100", children: [episode.artworkUrl ? (0, jsx_runtime_1.jsx)("img", { src: episode.artworkUrl, alt: "", className: "h-full w-full object-cover" }) : (0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center text-2xl", children: "\uD83C\uDFA7" }), onPlayToggle ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? 'Pause' : 'Play', onClick: (e) => { e.stopPropagation(); onPlayToggle(!playing); }, className: "absolute inset-0 flex items-center justify-center bg-neutral-900/40", children: (0, jsx_runtime_1.jsx)("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-sm text-on-surface", children: playing ? '❚❚' : '▶' }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col justify-center gap-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm font-semibold text-on-surface", children: episode.title }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta }) : null, progress !== null ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: progress * 100, tone: "primary", size: "sm" }) : null] }), onDownload ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Download", onClick: (e) => { e.stopPropagation(); onDownload(); }, className: "self-center text-lg text-muted hover:text-primary", children: "\u2913" })) : null] }));
});
//# sourceMappingURL=EpisodeRowV2.js.map
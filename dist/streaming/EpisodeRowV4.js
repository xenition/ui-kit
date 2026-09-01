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
exports.EpisodeRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * EpisodeRow — **V4** "spotlight" design (web parity of the native V4). The
 * artwork-forward episode row/card: a rounded artwork thumb, title + show · date
 * · duration meta, a resume bar (soft-`primary` track + `primary` fill), and a
 * big round **primary** play affordance (the one accent, filled with an
 * `onPrimary` glyph). The surface stays clean — the gradient is reserved for the
 * artwork-hero moments. Same props/behavior as {@link EpisodeRowProps}; all
 * colors from `--xen-*` token classes (no literal hex). Two variants
 * (`standard` / `compact`).
 */
exports.EpisodeRowV4 = React.forwardRef(function EpisodeRowV4({ episode, playing = false, state = 'paused', variant = 'standard', onPlayToggle, onClick, onDownload, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const art = 56;
    const buffering = playing && state === 'buffering';
    const isPlaying = playing && state === 'playing';
    const interactive = !!onClick;
    const meta = [episode.show, episode.date, episode.duration].filter(Boolean).join('  ·  ');
    const progress = episode.progress != null ? (0, types_1.clamp01)(episode.progress) : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-episode-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? episode.title : undefined, onClick: interactive ? () => onClick(episode) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(episode);
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-lg', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [!compact ? (episode.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: episode.artworkUrl, alt: "", "aria-hidden": "true", className: "shrink-0 rounded-[var(--xen-radius-md)] bg-border object-cover", style: { width: art, height: art } })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-accent", style: { width: art, height: art }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFA7", size: "lg", color: "onPrimary" }) }))) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold text-on-surface', compact ? 'truncate' : ''), children: episode.title }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: meta }) : null] }), onDownload ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Download ${episode.title}`, onClick: (e) => {
                            e.stopPropagation();
                            onDownload();
                        }, className: "inline-flex text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2913", size: "lg", color: "muted" }) })) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": isPlaying ? `Pause ${episode.title}` : `Play ${episode.title}`, "aria-pressed": isPlaying, "aria-busy": buffering || undefined, disabled: !onPlayToggle, onClick: (e) => {
                            e.stopPropagation();
                            onPlayToggle?.(!isPlaying);
                        }, className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary', 'transition-opacity hover:opacity-90', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none disabled:opacity-50'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: buffering ? '◌' : isPlaying ? '❙❙' : '▶', size: "sm", color: "onPrimary" }) })] }), progress != null && progress > 0 ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuenow": Math.round(progress * 100), "aria-valuemin": 0, "aria-valuemax": 100, className: "h-1 w-full overflow-hidden rounded-full bg-primary-100", children: (0, jsx_runtime_1.jsx)("div", { className: "h-1 rounded-full bg-primary", style: { width: `${progress * 100}%` } }) })) : null] }));
});
//# sourceMappingURL=EpisodeRowV4.js.map
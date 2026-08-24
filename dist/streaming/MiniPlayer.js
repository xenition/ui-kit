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
exports.MiniPlayer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * A docked **mini player** bar (web) — the collapsed now-playing surface that
 * sits above a bottom nav. UI shell only: `onPlayToggle(next)` / `onNext` report
 * intent and `onClick(track)` expands to the full player. When `onClick` is set
 * the body is a `role="button"` with Enter/Space keyboard support, while the
 * play/next controls are real `<button>`s that stop propagation. A thin
 * `primary` progress line rides the top edge; the play control's accessible
 * label reflects `state`. Token-only — no literal hex.
 */
exports.MiniPlayer = React.forwardRef(function MiniPlayer({ track, state = 'paused', progress = 0, variant = 'bar', onPlayToggle, onNext, onClick, className, ...rest }, ref) {
    const isPlaying = state === 'playing';
    const isBuffering = state === 'buffering';
    const floating = variant === 'floating';
    const frac = (0, types_1.clamp01)(progress);
    const interactive = !!onClick;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-mini-player": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Now playing: ${track.title}. Expand` : undefined, onClick: interactive ? () => onClick(track) : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(track);
                }
            }
            : undefined, className: (0, cn_1.cn)('relative flex items-center gap-[var(--xen-space-sm)] border border-border bg-surface', 'px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', floating ? 'rounded-[var(--xen-radius-lg)]' : 'rounded-[var(--xen-radius-sm)]', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-x-0 top-0 h-0.5 bg-border", children: (0, jsx_runtime_1.jsx)("div", { className: "h-0.5 bg-primary", style: { width: `${frac * 100}%` } }) }), track.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: track.artworkUrl, alt: "", "aria-hidden": "true", className: "h-10 w-10 shrink-0 rounded-[var(--xen-radius-sm)] bg-border object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-accent", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "base", color: "onPrimary" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: track.artist })) : null] }), isBuffering ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-9 w-9 items-center justify-center", children: (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" }) })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": isPlaying ? 'Pause' : 'Play', "aria-pressed": isPlaying, disabled: !onPlayToggle, onClick: (e) => {
                    e.stopPropagation();
                    onPlayToggle?.(!isPlaying);
                }, className: "inline-flex h-9 w-9 items-center justify-center text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none disabled:opacity-50", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "lg", color: "primary" }) })), onNext ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next", onClick: (e) => {
                    e.stopPropagation();
                    onNext();
                }, className: "inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "lg", color: "onSurface" }) })) : null] }));
});
//# sourceMappingURL=MiniPlayer.js.map
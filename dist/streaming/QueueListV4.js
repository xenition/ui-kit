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
exports.QueueListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const types_1 = require("./types");
/**
 * QueueList — **V4** "spotlight" design (web parity of the native V4). An ordered
 * now/next queue of calm surface rows: each row is a small rounded artwork plus
 * title/artist, with a trailing duration and per-row remove affordance. The row
 * matching `nowPlayingId` gets a soft-`primary` tint and a leading **primary**
 * now-playing glyph (the one accent), announced via `aria-current`. Rows are
 * clean surface (no gradient — that is reserved for the artwork-hero moments);
 * tap targets are ≥44px. When `tracks` is empty it renders an `EmptyState` (from
 * `commerce`). Same props/behavior as {@link QueueListProps}; all colors from
 * `--xen-*` token classes (no literal hex).
 */
exports.QueueListV4 = React.forwardRef(function QueueListV4({ tracks, nowPlayingId, state = 'paused', title = 'Up Next', rowVariant: _rowVariant = 'standard', onSelect, onRemove, emptyLabel = 'Your queue is empty', className, ...rest }, ref) {
    if (tracks.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-queue-list": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFB5", size: "2xl", color: "muted", "aria-label": "Queue" }), title: emptyLabel, description: "Add songs to build up your queue." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-queue-list": "", role: "list", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsx)("p", { className: "mb-[var(--xen-space-xs)] px-[var(--xen-space-sm)] text-xs font-bold uppercase tracking-wide text-muted", children: title })) : null, tracks.map((track, index) => {
                const active = nowPlayingId != null && track.id === nowPlayingId;
                const isPlaying = active && state === 'playing';
                const interactive = !!onSelect;
                return ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", className: "flex items-stretch", children: [(0, jsx_runtime_1.jsxs)("div", { role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? track.title : undefined, "aria-current": active ? 'true' : undefined, onClick: interactive ? () => onSelect(track, index) : undefined, onKeyDown: interactive
                                ? (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onSelect(track, index);
                                    }
                                }
                                : undefined, className: (0, cn_1.cn)('flex min-h-[44px] flex-1 items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', active ? 'bg-primary-50' : 'bg-transparent', interactive &&
                                'cursor-pointer transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative shrink-0", style: { width: 44, height: 44 }, children: [track.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: track.artworkUrl, alt: "", "aria-hidden": "true", className: "h-11 w-11 rounded-[var(--xen-radius-sm)] bg-border object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-sm)] bg-accent", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "base", color: "onPrimary" }) })), active ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute inset-0 flex items-center justify-center rounded-[var(--xen-radius-sm)] bg-primary-50/80", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "primary" }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('truncate text-base', active ? 'font-bold text-primary' : 'font-semibold text-on-surface'), children: [track.title, active ? (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: " (now playing)" }) : null] }), track.artist ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: track.artist })) : null] }), track.duration != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: (0, types_1.formatTime)(track.duration) })) : null] }), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove ${track.title}`, onClick: (e) => {
                                e.stopPropagation();
                                onRemove(track, index);
                            }, className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u22EF", size: "lg", color: "muted" }) })) : null] }, track.id));
            })] }));
});
//# sourceMappingURL=QueueListV4.js.map
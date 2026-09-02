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
exports.VideoLessonRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * VideoLessonRow — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded row with a soft shadow, a thumbnail with a play / watched
 * overlay, the title, a section · duration meta line, an optional watch-progress
 * bar, and a "Now playing" pill when active. The playing state is carried by a
 * word + pill (never color alone). Rendered as a keyboard-operable `role="button"`
 * when `onPlay` is set. Honors the V4 `variant` — `full` (default) and `compact`
 * (a denser single line that hides the meta + progress). All colors from
 * `--xen-*` token classes (no literals).
 */
exports.VideoLessonRowV4 = React.forwardRef(function VideoLessonRowV4({ title, durationLabel, thumbnail, watchProgress, playing = false, watched = false, meta, variant = 'full', onPlay, className, ...rest }, ref) {
    const stateWord = playing ? 'now playing' : watched ? 'watched' : 'not watched';
    const interactive = !!onPlay;
    const compact = variant === 'compact';
    const handleKeyDown = (e) => {
        if (!interactive)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPlay?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-video-lesson-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `Video: ${title}${durationLabel ? `, ${durationLabel}` : ''}, ${stateWord}`, "aria-current": playing || undefined, onClick: interactive ? onPlay : undefined, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-sm)]', playing && 'ring-2 ring-primary', interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-primary/10', compact ? 'h-10 w-14' : 'h-12 w-[72px]'), children: [thumbnail ? (0, jsx_runtime_1.jsx)("img", { src: thumbnail, alt: "", className: "h-full w-full object-cover" }) : null, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute text-lg', watched ? 'text-success' : 'text-primary'), children: watched ? '✓' : '▶' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm font-semibold text-on-surface", children: title }), !compact && (meta || durationLabel) ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs tabular-nums text-muted", children: [meta, durationLabel].filter(Boolean).join(' · ') })) : null, !compact && watchProgress != null ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: watchProgress, tone: "primary", size: "sm" }) : null] }), playing ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-primary", children: "\u25B6 Now playing" })) : null] }));
});
//# sourceMappingURL=VideoLessonRowV4.js.map
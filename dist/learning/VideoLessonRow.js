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
exports.VideoLessonRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A video lesson list row: a thumbnail with a play overlay, the title, a
 * duration / meta line, an optional watch-progress bar, and playing / watched
 * indicators. Rendered as a `role="button"` element (Enter/Space activation)
 * announced with its play state. Token-only colors (`--xen-*`).
 */
exports.VideoLessonRow = React.forwardRef(function VideoLessonRow({ title, durationLabel, thumbnail, watchProgress, playing = false, watched = false, meta, onPlay, className, ...rest }, ref) {
    const stateWord = playing ? 'now playing' : watched ? 'watched' : 'not watched';
    const interactive = !!onPlay;
    const handleKeyDown = (e) => {
        if (!interactive)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPlay?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `Video: ${title}${durationLabel ? `, ${durationLabel}` : ''}, ${stateWord}`, "aria-current": playing || undefined, onClick: interactive ? onPlay : undefined, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] p-2', playing ? 'bg-accent' : 'bg-surface', interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex h-12 w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-sm)] bg-border", children: [thumbnail ? (0, jsx_runtime_1.jsx)("img", { src: thumbnail, alt: "", className: "h-full w-full object-cover" }) : null, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute text-lg text-on-surface", children: watched ? '✓' : '▶' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm font-semibold text-on-surface", children: title }), meta || durationLabel ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: [meta, durationLabel].filter(Boolean).join(' · ') })) : null, watchProgress != null ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: watchProgress, tone: "primary", size: "sm" }) : null] })] }));
});
//# sourceMappingURL=VideoLessonRow.js.map
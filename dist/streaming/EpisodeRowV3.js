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
exports.EpisodeRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
/**
 * EpisodeRow, redesigned (v3): a **dense playlist line**. A compact play glyph,
 * the title over a show·date·duration line, a thin resume underline, and an
 * optional download — hairline-bordered for a long feed. The opposite of v2's
 * card. Same props, token-only.
 */
exports.EpisodeRowV3 = React.forwardRef(function EpisodeRowV3({ episode, playing = false, state, variant, onPlayToggle, onClick, onDownload, className, ...rest }, ref) {
    void variant;
    void state;
    const interactive = typeof onClick === 'function';
    const meta = [episode.show, episode.date, episode.duration].filter((s) => !!s).join(' · ');
    const progress = typeof episode.progress === 'number' ? (0, types_1.clamp01)(episode.progress) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-episode-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": episode.title, onClick: interactive ? () => onClick?.(episode) : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(episode);
        } } : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [onPlayToggle ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? 'Pause' : 'Play', onClick: (e) => { e.stopPropagation(); onPlayToggle(!playing); }, className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm text-primary", children: playing ? '❚❚' : '▶' })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-medium text-on-surface", children: episode.title }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta }) : null, progress !== null ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 h-0.5 w-full overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary", style: { width: `${progress * 100}%` } }) })) : null] }), onDownload ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Download", onClick: (e) => { e.stopPropagation(); onDownload(); }, className: "text-base text-muted hover:text-primary", children: "\u2913" })) : null] }));
});
//# sourceMappingURL=EpisodeRowV3.js.map
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
exports.SetlistRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
/**
 * SetlistRow, redesigned (v2): an **elevated track card**. A numbered medallion
 * leads (primary-filled when playing), the title/artist head the body over a
 * key·BPM·duration meta line, and a circular play button hangs on the right.
 * Distinct from v1's flat row. Same props, token-only.
 */
exports.SetlistRowV2 = React.forwardRef(function SetlistRowV2({ song, index, playing = false, variant, emptyLabel = 'Empty slot', onClick, onPlay, className, ...rest }, ref) {
    void variant;
    if (!song) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-setlist-row": "", "aria-label": emptyLabel, className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg border border-dashed border-border p-3 opacity-60', className), ...rest, children: [typeof index === 'number' ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-muted", children: index }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel })] }));
    }
    const meta = [song.key, (0, types_1.formatBpm)(song.bpm), (0, types_1.formatDuration)(song.durationSec)].filter((s) => s && s !== '—');
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.(song);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-setlist-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', now playing' : ''}`, onClick: interactive ? () => onClick?.(song) : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm transition-transform', playing && 'ring-2 ring-primary', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [typeof index === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold', playing ? 'bg-primary text-on-primary' : 'bg-neutral-100 text-on-surface'), children: playing ? '♪' : index })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: song.title }), song.artist ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: song.artist }) : null, meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta.join(' · ') }) : null] }), onPlay ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Play ${song.title}`, onClick: (e) => {
                    e.stopPropagation();
                    onPlay(song);
                }, className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary", children: "\u25B6" })) : null] }));
});
//# sourceMappingURL=SetlistRowV2.js.map
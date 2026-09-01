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
exports.SetlistRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const types_1 = require("./types");
/**
 * SetlistRow — **V4** "session" design (web parity of the native V4). The
 * tactile DAW take on a setlist row: a rounded control surface where the playing
 * row lights with a soft-primary fill, a primary ring, and a leading `♪` marker
 * (never color alone), the title reads bold, and the key/BPM/duration meta sits
 * in a tabular-nums line. Honors both `variant`s (`full` / `compact`) and the
 * empty-slot state, identical props/behavior to {@link SetlistRowProps}. The
 * optional play button is a satisfying round control. All colors from `--xen-*`
 * token classes (no literals).
 */
exports.SetlistRowV4 = React.forwardRef(function SetlistRowV4({ song, index, playing = false, variant = 'full', emptyLabel = 'Empty slot', onClick, onPlay, className, ...rest }, ref) {
    const pos = index != null && Number.isFinite(index) ? String(Math.trunc(index)) : '–';
    if (song == null) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "text", "aria-label": `Position ${pos}, ${emptyLabel}`, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-dashed border-border p-[var(--xen-space-sm)] opacity-55', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "w-5 text-sm font-bold text-muted", children: pos }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm italic text-muted", children: emptyLabel })] }));
    }
    const meta = [];
    if (song.key)
        meta.push(song.key);
    if (song.bpm != null)
        meta.push(`${(0, types_1.formatBpm)(song.bpm)} BPM`);
    if (song.durationSec != null)
        meta.push((0, types_1.formatDuration)(song.durationSec));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "flex w-5 items-center justify-center", children: playing ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u266A", size: "sm", color: "primary", "aria-label": "Now playing" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold tabular-nums text-muted", children: pos })) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base text-on-surface', playing ? 'font-bold' : 'font-semibold'), children: song.title }), variant === 'full' && (song.artist || meta.length > 0) ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs tabular-nums text-muted", children: [song.artist, ...meta].filter(Boolean).join('  ·  ') })) : null] })] }));
    const rowClass = (0, cn_1.cn)('relative flex items-center gap-[var(--xen-space-sm)] overflow-hidden rounded-[var(--xen-radius-md)] border p-[var(--xen-space-sm)] transition-colors', playing ? 'border-primary bg-primary/10 shadow-sm' : 'border-border bg-surface');
    // A tactile left accent bar marks the playing row.
    const accentBar = playing ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute inset-y-1 left-0 w-1 rounded-full bg-primary" }) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-xs)]', className), ...rest, children: [onClick ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": playing, "aria-label": `Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`, onClick: () => onClick(song), className: (0, cn_1.cn)(rowClass, 'flex-1 pl-[var(--xen-space-md)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1'), children: [accentBar, body] })) : ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", "aria-label": `Position ${pos}, ${song.title}${playing ? ', playing' : ''}`, className: (0, cn_1.cn)(rowClass, 'flex-1 pl-[var(--xen-space-md)]'), children: [accentBar, body] })), onPlay ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": playing, "aria-label": playing ? `Pause ${song.title}` : `Play ${song.title}`, onClick: () => onPlay(song), className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1', playing ? 'bg-primary text-on-primary' : 'bg-primary/15 hover:bg-primary/25'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: playing ? '⏸' : '▶', size: "sm", color: playing ? 'onPrimary' : 'primary' }) })) : null] }));
});
//# sourceMappingURL=SetlistRowV4.js.map
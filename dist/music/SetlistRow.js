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
exports.SetlistRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const types_1 = require("./types");
/**
 * A setlist row — one song in a performance / practice list, a UI shell only,
 * and the DOM parity of `native/music`'s `SetlistRow`. With a `song` it shows
 * position, title, artist and a key/BPM/duration meta line; with no `song` it
 * renders a dimmed empty slot (so a fixed-length setlist can show gaps).
 * `playing` lights the row via a marker + weight, not color alone. Tapping the
 * body fires `onClick`; an optional play button (a sibling, never a nested
 * button) fires `onPlay`. Meta is guarded against missing fields. Token-only.
 */
exports.SetlistRow = React.forwardRef(function SetlistRow({ song, index, playing = false, variant = 'full', emptyLabel = 'Empty slot', onClick, onPlay, className, ...rest }, ref) {
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
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "flex w-5 items-center justify-center", children: playing ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u266A", size: "sm", color: "primary", "aria-label": "Now playing" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-muted", children: pos })) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base text-on-surface', playing ? 'font-bold' : 'font-semibold'), children: song.title }), variant === 'full' && (song.artist || meta.length > 0) ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: [song.artist, ...meta].filter(Boolean).join('  ·  ') })) : null] })] }));
    const rowClass = (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border p-[var(--xen-space-sm)] transition-colors', playing ? 'border-primary bg-primary/10' : 'border-border bg-surface');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-xs)]', className), ...rest, children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": playing, "aria-label": `Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`, onClick: () => onClick(song), className: (0, cn_1.cn)(rowClass, 'flex-1 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { role: "listitem", "aria-label": `Position ${pos}, ${song.title}${playing ? ', playing' : ''}`, className: (0, cn_1.cn)(rowClass, 'flex-1'), children: body })), onPlay ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": playing, "aria-label": playing ? `Pause ${song.title}` : `Play ${song.title}`, onClick: () => onPlay(song), className: (0, cn_1.cn)('flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-primary/20 transition-colors', 'hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: playing ? '⏸' : '▶', size: "sm", color: "primary" }) })) : null] }));
});
//# sourceMappingURL=SetlistRow.js.map
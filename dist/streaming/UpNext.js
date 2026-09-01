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
exports.UpNext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * UpNext — **V4** "spotlight" design (web parity of the native V4). A compact
 * "playing next" queue preview: a clean elevated card listing the next few
 * tracks (small artwork thumb + title/artist, with the duration via
 * {@link formatTime}), each row tappable to jump ahead. The header carries the
 * label and an optional Clear affordance. The surface stays clean — the V4
 * gradient is reserved for the immersive/artwork moments. Presentational only;
 * all colors from `--xen-*` token classes (no literal hex). Dark-mode safe.
 */
exports.UpNext = React.forwardRef(function UpNext({ tracks, title = 'Up next', onSelect, onClear, className, ...rest }, ref) {
    if (tracks.length === 0)
        return null;
    const thumb = 44;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-up-next": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between px-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: title }), onClear ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Clear up next", onClick: onClear, className: "inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-sm)]", children: "Clear" })) : null] }), (0, jsx_runtime_1.jsx)("ul", { role: "list", className: "flex flex-col gap-[var(--xen-space-xs)]", children: tracks.map((track) => {
                    const interactive = !!onSelect;
                    const meta = track.artist;
                    return ((0, jsx_runtime_1.jsx)("li", { role: "listitem", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: !interactive, "aria-label": track.artist ? `${track.title} — ${track.artist}` : track.title, onClick: interactive ? () => onSelect(track.id) : undefined, className: (0, cn_1.cn)('flex w-full min-h-[44px] items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] p-[var(--xen-space-xs)] text-left', 'transition-colors', interactive &&
                                'hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', !interactive && 'cursor-default'), children: [track.artworkUrl ? ((0, jsx_runtime_1.jsx)("img", { src: track.artworkUrl, alt: "", "aria-hidden": "true", className: "shrink-0 rounded-[var(--xen-radius-sm)] bg-border object-cover", style: { width: thumb, height: thumb } })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-accent", style: { width: thumb, height: thumb }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "sm", color: "onPrimary" }) })), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: track.title }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: meta }) : null] }), track.duration != null ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs tabular-nums text-muted", children: (0, types_1.formatTime)(track.duration) })) : null] }) }, track.id));
                }) })] }));
});
//# sourceMappingURL=UpNext.js.map
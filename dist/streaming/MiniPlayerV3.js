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
exports.MiniPlayerV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * MiniPlayer, redesigned (v3): a **slim docked strip**. A very thin edge-to-edge
 * bar with a hairline progress line, a small artwork chip, a single title·artist
 * line, and a bare play glyph — minimal chrome for a persistent footer. The
 * opposite of v2's floating card. Same props, token-only.
 */
exports.MiniPlayerV3 = React.forwardRef(function MiniPlayerV3({ track, state = 'paused', progress = 0, variant, onPlayToggle, onNext, onClick, className, ...rest }, ref) {
    void variant;
    void onNext;
    const playing = state === 'playing';
    const buffering = state === 'buffering';
    const pct = (0, types_1.clamp01)(progress) * 100;
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-mini-player": "", className: (0, cn_1.cn)('relative border-t border-border bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-x-0 top-0 h-px bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full bg-primary", style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 px-3 py-1.5", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": interactive ? `Expand ${track.title}` : track.title, onClick: interactive ? () => onClick?.(track) : undefined, disabled: !interactive, className: "flex min-w-0 flex-1 items-center gap-2 text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-neutral-100 text-sm", children: track.artworkUrl ? (0, jsx_runtime_1.jsx)("img", { src: track.artworkUrl, alt: "", className: "h-full w-full object-cover" }) : '🎵' }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 truncate text-xs text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: track.title }), track.artist ? (0, jsx_runtime_1.jsxs)("span", { className: "text-muted", children: [" \u00B7 ", track.artist] }) : null] })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? 'Pause' : 'Play', onClick: () => onPlayToggle?.(!playing), className: "shrink-0 text-base text-on-surface", children: buffering ? (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" }) : playing ? '❚❚' : '▶' })] })] }));
});
//# sourceMappingURL=MiniPlayerV3.js.map
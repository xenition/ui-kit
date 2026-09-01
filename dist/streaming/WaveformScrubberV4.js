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
exports.WaveformScrubberV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
const STEP = 0.05;
/**
 * WaveformScrubber — **V4** "spotlight" design (web parity of the native V4). A
 * refined, more tactile waveform: played bars render in **primary**, unplayed
 * bars in soft-muted (`bg-muted`), and a clear primary playhead marks the
 * current position. Seeks by click (x maps to a `[0, 1]` fraction) or keyboard
 * (←/→/↑/↓ nudge in 5% steps), exposed as an ARIA `slider` with `aria-valuenow`
 * (a percentage). Same `peaks`/`onSeek` contract and behavior as
 * {@link WaveformScrubberProps}; every color resolves from `--xen-*` token
 * classes — no literal hex.
 */
exports.WaveformScrubberV4 = React.forwardRef(function WaveformScrubberV4({ peaks = [], progress = 0, variant = 'bars', height = 48, onSeek, disabled = false, className, style, 'aria-label': ariaLabel = 'Seek', ...rest }, ref) {
    const frac = (0, types_1.clamp01)(progress);
    const seekable = !disabled && !!onSeek;
    const handleClick = (e) => {
        if (!seekable)
            return;
        const rect = e.currentTarget.getBoundingClientRect();
        if (rect.width <= 0)
            return;
        onSeek((0, types_1.clamp01)((e.clientX - rect.left) / rect.width));
    };
    const handleKeyDown = (e) => {
        if (!seekable)
            return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            onSeek((0, types_1.clamp01)(frac + STEP));
        }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            onSeek((0, types_1.clamp01)(frac - STEP));
        }
    };
    const count = peaks.length;
    // How many bars fall inside the played region (guarded against empty peaks).
    const playedBars = count > 0 ? Math.round(frac * count) : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-waveform-scrubber": "", role: "slider", "aria-label": ariaLabel, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(frac * 100), "aria-disabled": disabled || undefined, tabIndex: seekable ? 0 : undefined, onClick: handleClick, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('relative w-full', seekable && 'cursor-pointer', disabled && 'opacity-50', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), style: { height, ...style }, ...rest, children: [count === 0 ? (
            // Empty / unanalyzed: a single flat rail with a played fill.
            (0, jsx_runtime_1.jsx)("div", { className: "flex h-full items-center", children: (0, jsx_runtime_1.jsx)("div", { className: "relative h-1.5 w-full rounded-full bg-muted", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-y-0 left-0 rounded-full bg-primary", style: { width: `${frac * 100}%` } }) }) })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex h-full gap-1', variant === 'mirror' ? 'items-center' : 'items-end'), children: peaks.map((raw, i) => {
                    const amp = (0, types_1.clamp01)(raw);
                    const barHeight = Math.max(3, amp * height);
                    const played = i < playedBars;
                    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex-1 rounded-full', played ? 'bg-primary' : 'bg-muted'), style: { height: barHeight } }, i));
                }) })), seekable || frac > 0 ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "pointer-events-none absolute top-0 bottom-0 w-0.5 -translate-x-1/2 rounded-full bg-primary", style: { left: `${frac * 100}%` } })) : null] }));
});
//# sourceMappingURL=WaveformScrubberV4.js.map
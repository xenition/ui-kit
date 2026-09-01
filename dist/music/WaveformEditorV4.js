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
exports.WaveformEditorV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Spinner_1 = require("../primitives/Spinner");
const EmptyState_1 = require("../commerce/EmptyState");
const types_1 = require("./types");
/**
 * WaveformEditor — **V4** "session" design (web parity of the native V4), and the
 * ONE reserved gradient moment of the music V4 line: the signal hero. In `full`
 * the waveform sits on the brand-gradient ground (`from-primary-500 to-primary-700`)
 * with the bars drawn in near-white ink — `bg-primary-50` for played/active,
 * `bg-primary-50/40` for unplayed — the playhead and any labels in
 * `text-primary-50`/`text-primary-100`, and time chips as frosted tiles
 * (`bg-primary-50/15 border border-primary-50/30`). In `mini` it degrades to a
 * clean, compact strip on the plain surface (no gradient): `rounded-md border
 * border-border bg-surface` with bars in `bg-primary`/`bg-primary/30`. Honors
 * every prop of {@link WaveformEditorProps}: the played/unplayed split, playhead
 * position, optional selection region, and the `onSeek` intent — bars stay real
 * seek `<button>`s (≥44px tall in `full`) when interactive. State is never on
 * color alone: the playhead is a real marker. Token-only colors (no literals).
 */
exports.WaveformEditorV4 = React.forwardRef(function WaveformEditorV4({ peaks, progress, selection, variant = 'full', loading = false, emptyLabel = 'No audio loaded', placeholderBars = 48, onSeek, className, ...rest }, ref) {
    const isFull = variant === 'full';
    const heightClass = isFull ? 'h-[72px]' : 'h-8';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "img", "aria-label": "Loading waveform", className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-md)]', isFull
                ? 'bg-gradient-to-br from-primary-500 to-primary-700'
                : 'border border-border bg-surface', heightClass, className), ...rest, children: (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, {}) }));
    }
    const hasPeaks = Array.isArray(peaks) && peaks.length > 0;
    if (!hasPeaks && placeholderBars <= 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u3030\uFE0F", size: "2xl", color: "muted", "aria-label": "Waveform" }), title: emptyLabel, className: className, ...rest }));
    }
    const count = hasPeaks ? peaks.length : Math.max(1, Math.trunc(placeholderBars));
    const playRatio = progress == null ? null : (0, types_1.clamp)(progress, 0, 1);
    const [selStart, selEnd] = selection ?? [null, null];
    const inSelection = (ratio) => {
        if (selStart == null || selEnd == null)
            return false;
        const lo = (0, types_1.clamp)(Math.min(selStart, selEnd), 0, 1);
        const hi = (0, types_1.clamp)(Math.max(selStart, selEnd), 0, 1);
        return ratio >= lo && ratio <= hi;
    };
    /** Deterministic pseudo-random height so the placeholder looks wave-like. */
    const placeholderHeight = (i) => {
        const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453);
        return 0.25 + (v - Math.floor(v)) * 0.7;
    };
    // Gradient signal hero (`full`) draws near-white ink; `mini` is a clean strip.
    const containerClass = isFull
        ? 'relative flex items-center gap-px overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-500 to-primary-700 px-[var(--xen-space-xs)]'
        : 'relative flex items-center gap-px overflow-hidden rounded-md border border-border bg-surface px-[var(--xen-space-xs)]';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": playRatio == null ? 'Waveform' : `Waveform, ${Math.round(playRatio * 100)} percent played`, className: (0, cn_1.cn)(containerClass, heightClass, className), ...rest, children: [Array.from({ length: count }).map((_, i) => {
                const raw = hasPeaks ? peaks[i] : placeholderHeight(i);
                const mag = (0, types_1.clamp)(raw ?? 0, 0, 1);
                const ratio = count > 1 ? i / (count - 1) : 0;
                const played = playRatio != null && ratio <= playRatio;
                const selected = inSelection(ratio);
                // On the gradient ground the bars are near-white "ink"; on the plain
                // surface they use the primary token directly.
                const barColor = isFull
                    ? played || selected
                        ? 'bg-primary-50'
                        : 'bg-primary-50/40'
                    : played || selected
                        ? 'bg-primary'
                        : 'bg-primary/30';
                const bar = ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-full rounded-full', barColor), style: { height: `${Math.max(6, mag * 100)}%` } }));
                // A real seek `<button>` only when interactive; otherwise a plain
                // decorative bar (so an embedded strip never nests buttons).
                return onSeek ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Seek to ${Math.round(ratio * 100)} percent`, onClick: () => onSeek(ratio), className: "flex h-full flex-1 items-center", children: bar }, i)) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-full flex-1 items-center", children: bar }, i));
            }), playRatio != null && isFull ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute bottom-0 top-0 w-0.5 bg-primary-50", style: { left: `${playRatio * 100}%` } })) : null, playRatio != null && isFull ? ((0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: "pointer-events-none absolute bottom-1 right-1 rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold tabular-nums text-primary-100", children: [Math.round(playRatio * 100), "%"] })) : null, !hasPeaks && isFull ? ((0, jsx_runtime_1.jsx)("span", { className: "pointer-events-none absolute self-center text-xs font-semibold text-primary-50", children: emptyLabel })) : null] }));
});
//# sourceMappingURL=WaveformEditorV4.js.map
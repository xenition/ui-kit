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
exports.SamplePadV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Spinner_1 = require("../primitives/Spinner");
const WaveformEditor_1 = require("./WaveformEditor");
const types_1 = require("./types");
/**
 * SamplePad — **V4** "session" design (web parity of the native V4). The clean,
 * tactile take on a sample pad: a rounded token tile that carries the cell
 * accent as a soft tint at rest, and when hit/lit flashes a stronger accent
 * fill + an accent ring + a corner marker (never color alone). `tile` is a
 * square grid cell (glyph stacked over label), `row` is a horizontal pad with
 * an inline mini-`WaveformEditor`; both keep ≥44px tap targets. Empty slots
 * read dimmed with a `＋`, `loading` swaps in a `Spinner` and blocks presses.
 * Identical props/behavior to {@link SamplePadProps}; the accent is preserved
 * via the `ACCENT_*` token slot helpers (no literal colors, no gradient).
 */
exports.SamplePadV4 = React.forwardRef(function SamplePadV4({ name, detail, glyph = '♪', peaks, color, index = 0, variant = 'tile', playing = false, loading = false, disabled = false, onClick, className, ...rest }, ref) {
    const accent = color ?? (0, types_1.padAccentKey)(index);
    const isEmpty = name == null || name.length === 0;
    const isRow = variant === 'row';
    const blocked = isEmpty || loading || disabled;
    const stateNote = loading ? ', loading' : isEmpty ? ', empty' : playing ? ', playing' : '';
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", disabled: blocked || !onClick, "aria-pressed": playing, "aria-busy": loading, "aria-label": `${isEmpty ? 'Empty pad' : name}${stateNote}`, onClick: () => onClick?.(name ?? ''), className: (0, cn_1.cn)('relative flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]', 'rounded-[var(--xen-radius-lg)] border transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1', isRow ? 'min-h-[56px] flex-row justify-start' : 'min-h-[88px] flex-col justify-center', isEmpty
            ? 'border-dashed border-border bg-surface opacity-50'
            : (0, cn_1.cn)(playing
                ? (0, cn_1.cn)('border-2 ring-2 ring-offset-1', types_1.ACCENT_BORDER_CLASS[accent], types_1.ACCENT_STRONG_BG_CLASS[accent])
                : (0, cn_1.cn)('border-border', types_1.ACCENT_SOFT_BG_CLASS[accent]), 'hover:opacity-90'), className), ...rest, children: [loading ? ((0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-8 w-8 items-center justify-center rounded-full', isEmpty ? 'bg-neutral-100' : playing ? types_1.ACCENT_STRONG_BG_CLASS[accent] : types_1.ACCENT_SOFT_BG_CLASS[accent]), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: isEmpty ? '＋' : glyph, size: "base", color: isEmpty ? 'muted' : types_1.ACCENT_ICON_COLOR[accent] }) })), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex min-w-0 flex-col gap-0.5', isRow ? 'flex-1 items-start' : 'items-center'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('max-w-full truncate text-sm', isEmpty ? 'text-muted' : 'text-on-surface', playing ? 'font-bold' : 'font-semibold'), children: isEmpty ? 'Empty' : name }), detail ? (0, jsx_runtime_1.jsx)("span", { className: "max-w-full truncate text-xs text-muted", children: detail }) : null] }), isRow && !isEmpty && !loading ? ((0, jsx_runtime_1.jsx)("span", { className: "w-[72px]", children: (0, jsx_runtime_1.jsx)(WaveformEditor_1.WaveformEditor, { peaks: peaks, variant: "mini", placeholderBars: peaks ? 0 : 20 }) })) : null, playing && !loading ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute right-1 top-1 h-1.5 w-1.5 rounded-full', types_1.ACCENT_BG_CLASS[accent]) })) : null] }));
});
//# sourceMappingURL=SamplePadV4.js.map
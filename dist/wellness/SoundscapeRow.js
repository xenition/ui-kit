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
exports.SoundscapeRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const SOUND_META = {
    rain: { glyph: '🌧️', label: 'Rain', color: 'primary' },
    ocean: { glyph: '🌊', label: 'Ocean', color: 'primary' },
    forest: { glyph: '🌲', label: 'Forest', color: 'success' },
    fire: { glyph: '🔥', label: 'Fireplace', color: 'danger' },
    wind: { glyph: '🍃', label: 'Wind', color: 'accent' },
    stream: { glyph: '🏞️', label: 'Stream', color: 'success' },
    thunder: { glyph: '⛈️', label: 'Thunder', color: 'accent' },
    'white-noise': { glyph: '📻', label: 'White noise', color: 'muted' },
};
/**
 * A soundscape mixer row (web parity of the native block): icon + name, a round
 * play / pause toggle rendered as a real `<button>`, and an optional volume
 * slider that appears only while playing. `playing` fills the toggle, tints the
 * card border, and updates `aria-pressed` + the label (state, not color alone).
 * Token-only colors.
 */
exports.SoundscapeRow = React.forwardRef(function SoundscapeRow({ variant, name, playing = false, volume = 0.5, onToggle, onVolumeChange, className }, ref) {
    const meta = SOUND_META[variant] ?? SOUND_META.rain;
    const displayName = name ?? meta.label;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-soundscape-row": "", className: (0, cn_1.cn)('bg-surface text-on-surface border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)]', 'flex flex-col gap-[var(--xen-space-sm)]', playing ? _tokens_1.SLOT_BORDER[meta.color] : 'border-border', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-10 w-10 items-center justify-center rounded-full text-lg', _tokens_1.SLOT_TINT[meta.color]), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: displayName }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": playing, "aria-label": `${playing ? 'Stop' : 'Play'} ${displayName}`, onClick: () => onToggle?.(!playing), className: (0, cn_1.cn)('flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base transition-opacity', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', playing ? (0, cn_1.cn)(_tokens_1.SLOT_BG[meta.color], _tokens_1.SLOT_ON[meta.color]) : (0, cn_1.cn)(_tokens_1.SLOT_TINT[meta.color], _tokens_1.SLOT_TEXT[meta.color])), children: playing ? '⏸' : '▶' })] }), playing && onVolumeChange ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: "\uD83D\uDD09" }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: volume, min: 0, max: 1, step: 0.05, onChange: onVolumeChange }) })] })) : null] }));
});
//# sourceMappingURL=SoundscapeRow.js.map
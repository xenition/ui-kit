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
exports.SoundscapeRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const Icon_1 = require("../primitives/Icon");
const SOUND_META = {
    rain: { glyph: '🌧️', label: 'Rain' },
    ocean: { glyph: '🌊', label: 'Ocean' },
    forest: { glyph: '🌲', label: 'Forest' },
    fire: { glyph: '🔥', label: 'Fireplace' },
    wind: { glyph: '🍃', label: 'Wind' },
    stream: { glyph: '🏞️', label: 'Stream' },
    thunder: { glyph: '⛈️', label: 'Thunder' },
    'white-noise': { glyph: '📻', label: 'White noise' },
};
/**
 * SoundscapeRowV4 — the calm redesign of {@link SoundscapeRow}. Same props,
 * defaults, toggle a11y state/label, and volume slider (shown only while playing
 * with `onVolumeChange`). Only the visuals change: a clean row with a gradient
 * icon badge and a round gradient play/pause toggle as the calm accents.
 */
exports.SoundscapeRowV4 = React.forwardRef(function SoundscapeRowV4({ variant, name, playing = false, volume = 0.5, onToggle, onVolumeChange, className, ...rest }, ref) {
    const meta = SOUND_META[variant] ?? SOUND_META.rain;
    const displayName = name ?? meta.label;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-soundscape-row": "", className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5', 'flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "lg", color: "onPrimary" }) }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: displayName }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": playing, "aria-label": `${playing ? 'Stop' : 'Play'} ${displayName}`, onClick: () => onToggle?.(!playing), className: (0, cn_1.cn)('flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 transition-opacity', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: playing ? '⏸' : '▶', size: "base", color: "onPrimary" }) })] }), playing && onVolumeChange ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: "\uD83D\uDD09" }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: volume, min: 0, max: 1, step: 0.05, onChange: onVolumeChange }) })] })) : null] }));
});
//# sourceMappingURL=SoundscapeRowV4.js.map
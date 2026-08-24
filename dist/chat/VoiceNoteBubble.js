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
exports.VoiceNoteBubble = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const DEFAULT_WAVE = [0.3, 0.6, 0.9, 0.5, 0.7, 1, 0.4, 0.8, 0.5, 0.6, 0.35, 0.7, 0.9, 0.5, 0.3];
function fmt(sec) {
    const s = Math.max(0, Math.round(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, '0')}`;
}
/**
 * Voice-message bubble — a play/pause control, a waveform whose fill reflects
 * `progress`, and a duration readout, wrapped in the primitive `ChatBubble` so
 * it shares alignment and theming with text messages. Colors adapt to the
 * `me`/`them` side (onPrimary vs. onSurface). No literal colors.
 */
exports.VoiceNoteBubble = React.forwardRef(function VoiceNoteBubble({ side = 'them', durationSec, playing = false, progress = 0, waveform, meta, onPlayToggle, className }, ref) {
    const me = side === 'me';
    const fgClass = me ? 'text-on-primary' : 'text-on-surface';
    const barClass = me ? 'bg-on-primary' : 'bg-on-surface';
    const bars = waveform && waveform.length > 0 ? waveform : DEFAULT_WAVE;
    const clamped = Math.min(1, Math.max(0, progress));
    return ((0, jsx_runtime_1.jsx)(primitives_1.ChatBubble, { ref: ref, side: side, meta: meta, className: className, children: (0, jsx_runtime_1.jsxs)("div", { "aria-label": `Voice message, ${fmt(durationSec)}`, className: (0, cn_1.cn)('flex items-center gap-2', fgClass), style: { minWidth: 160 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": playing, "aria-label": playing ? 'Pause voice message' : 'Play voice message', onClick: onPlayToggle, className: (0, cn_1.cn)('text-lg leading-none focus-visible:outline-none', fgClass), children: playing ? '⏸' : '▶' }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 items-center gap-0.5", style: { height: 24 }, children: bars.map((h, i) => {
                        const filled = i / bars.length <= clamped;
                        return ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 rounded-full', barClass, filled ? 'opacity-100' : 'opacity-40'), style: { height: Math.max(3, h * 24) } }, i));
                    }) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs opacity-90', fgClass), children: fmt(durationSec) })] }) }));
});
//# sourceMappingURL=VoiceNoteBubble.js.map
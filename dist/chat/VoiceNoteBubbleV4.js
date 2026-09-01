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
exports.VoiceNoteBubbleV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ChatBubbleV4_1 = require("../primitives/ChatBubbleV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const thread_v4_1 = require("./internal/thread-v4");
/** A default waveform, when the caller has no samples. Geometric. */
const DEFAULT_WAVE = [0.3, 0.6, 0.4, 0.8, 0.5, 0.9, 0.4, 0.7, 0.35, 0.6, 0.45, 0.8];
/** How solid an unplayed bar sits against a played one. */
const UNPLAYED_ALPHA = '45%';
/**
 * **V4 voice note bubble** — the web twin of the native `VoiceNoteBubbleV4`,
 * same props as {@link VoiceNoteBubble} plus `playLabel`, `pauseLabel` and
 * `formatPosition`.
 *
 * ## Four changes
 *
 * 1. **It reports its position.** The base painted the waveform with
 *    `progress` and announced only "Voice message, 0:42" — so a sighted user
 *    could see how far through they were and a screen-reader user could not.
 *    The bubble is now a `progressbar` carrying elapsed and total, and the
 *    elapsed time is drawn beside the duration.
 * 2. **The transport clears 44.** It was a bare glyph button.
 * 3. **Unplayed bars are a translucent wash of the *same* ink**, not an
 *    `opacity` on the element — 0.38 is the band that means disabled, and an
 *    unplayed second is not disabled.
 * 4. **The waveform is hidden from the reader.** Twelve unlabelled bars are
 *    twelve stops on a tab-through; the bubble's own value carries it.
 */
exports.VoiceNoteBubbleV4 = React.forwardRef(function VoiceNoteBubbleV4({ side = 'them', durationSec, playing = false, progress = 0, waveform, meta, playLabel = 'Play', pauseLabel = 'Pause', formatPosition, onPlayToggle, className, }, ref) {
    const me = side === 'me';
    const bars = waveform && waveform.length > 0 ? waveform : DEFAULT_WAVE;
    const clamped = Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0));
    const total = (0, thread_v4_1.clock)(durationSec);
    const elapsed = (0, thread_v4_1.clock)(durationSec * clamped);
    const position = (formatPosition ?? ((e, t) => `${e} of ${t}`))(elapsed, total);
    // The bubble's own ink, so the waveform never falls to a fixed grey.
    const ink = me ? 'var(--xen-color-on-primary)' : 'var(--xen-color-on-card)';
    return ((0, jsx_runtime_1.jsx)(ChatBubbleV4_1.ChatBubbleV4, { ref: ref, side: side, meta: meta, className: className, children: (0, jsx_runtime_1.jsxs)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(clamped * 100), "aria-label": `Voice message, ${position}`, className: "flex min-w-[12rem] items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? pauseLabel : playLabel, "aria-pressed": playing, onClick: onPlayToggle, "data-xen-v4-chrome": "on-primary", className: (0, cn_1.cn)('inline-flex aspect-square shrink-0 items-center justify-center rounded-full text-lg', chrome_v4_1.MIN_TAP_CLASS), style: { color: ink }, children: playing ? '⏸' : '▶' }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-lg flex-1 items-center gap-[2px]", children: bars.map((h, i) => {
                        const played = i / bars.length <= clamped;
                        return ((0, jsx_runtime_1.jsx)("span", { className: "flex-1 rounded-full", style: {
                                height: `max(2px, ${Math.round(h * 100)}%)`,
                                background: played
                                    ? ink
                                    : `color-mix(in srgb, ${ink} ${UNPLAYED_ALPHA}, transparent)`,
                            } }, i));
                    }) }), (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs tabular-nums", style: { color: ink }, children: clamped > 0 ? `${elapsed} / ${total}` : total })] }) }));
});
//# sourceMappingURL=VoiceNoteBubbleV4.js.map
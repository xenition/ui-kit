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
exports.MetronomeBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const types_1 = require("./types");
/**
 * MetronomeBar — **V4** "session" design (web parity of the native V4). The
 * tactile beat strip: `beatsPerBar` cells sit on a rounded token surface, each
 * ≥44px tall in the `bars` variant / a chunky dot in `dots`. The downbeat
 * (beat 1) is emphasized with an accent ring, and the `currentBeat` lights via
 * a primary fill **and** an inset marker dot (never color alone) — only while
 * `playing`. The optional transport toggle reports through `onToggle`; state is
 * in `aria-pressed`/label. The optional `bpm` shows in bold tabular-nums. No
 * gradient — clean/tactile. All colors from `--xen-*` token classes.
 */
exports.MetronomeBarV4 = React.forwardRef(function MetronomeBarV4({ beatsPerBar = 4, currentBeat, playing = false, bpm, variant = 'dots', disabled = false, onToggle, className, ...rest }, ref) {
    const beats = (0, types_1.clamp)(Math.trunc(Number.isFinite(beatsPerBar) ? beatsPerBar : 4), 1, 16);
    const current = currentBeat == null ? 0 : (0, types_1.clamp)(Math.trunc(currentBeat), 0, beats);
    const isDots = variant === 'dots';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-sm)]', className), ...rest, children: [onToggle ? ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled, "aria-pressed": playing, "aria-label": playing ? 'Stop metronome' : 'Start metronome', onClick: () => onToggle(!playing), className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1', disabled && 'opacity-50', playing ? 'bg-primary' : 'bg-primary/15 hover:bg-primary/25'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: playing ? '⏸' : '▶', size: "sm", color: playing ? 'onPrimary' : 'primary' }) })) : null, (0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": current > 0 ? `Beat ${current} of ${beats}${playing ? ', playing' : ''}` : `${beats} beats per bar`, className: "flex flex-1 items-center justify-center gap-[var(--xen-space-xs)]", children: Array.from({ length: beats }).map((_, i) => {
                    const beat = i + 1;
                    const downbeat = beat === 1;
                    const lit = playing && beat === current;
                    return ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('relative flex items-center justify-center transition-colors', isDots ? 'rounded-full' : 'rounded-[var(--xen-radius-sm)]', downbeat && 'border-2 border-accent', lit ? 'bg-primary shadow-sm' : downbeat ? 'bg-primary/30' : 'bg-border'), style: {
                            width: isDots ? (lit ? 22 : downbeat ? 18 : 14) : lit ? 16 : 12,
                            height: isDots ? (lit ? 22 : downbeat ? 18 : 14) : 44,
                        }, children: lit ? (0, jsx_runtime_1.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-on-primary" }) : null }, beat));
                }) }), bpm != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-bold tabular-nums text-muted", children: [Math.round(bpm), " BPM"] })) : null] }));
});
//# sourceMappingURL=MetronomeBarV4.js.map
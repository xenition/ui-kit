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
exports.PianoKeysV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
const WHITE = [0, 2, 4, 5, 7, 9, 11];
/**
 * PianoKeys, redesigned (v3): a **mini keyboard strip**. Very short, label-less
 * keys for a tight inline control; held keys light with an accent fill + a marker
 * dot (never color alone). The opposite of v2's chunky keyboard. `showLabels`
 * still honored if explicitly set. Same props, token-only.
 */
exports.PianoKeysV3 = React.forwardRef(function PianoKeysV3({ startOctave = 4, octaves = 1, highlightedNotes, variant, showLabels = false, disabled = false, onKeyPress, className, ...rest }, ref) {
    void variant;
    const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
    const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
    const held = new Set(highlightedNotes ?? []);
    const whiteKeys = [];
    for (let o = 0; o < count; o += 1) {
        WHITE.forEach((chroma) => {
            whiteKeys.push({ note: `${types_1.NOTE_NAMES[chroma]}${base + o}`, chroma, octave: base + o });
        });
    }
    const whiteCount = Math.max(1, whiteKeys.length);
    const whiteW = 100 / whiteCount;
    const press = (note) => {
        if (!disabled)
            onKeyPress?.(note);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative flex h-16', disabled && 'opacity-50', className), ...rest, children: [whiteKeys.map((k) => {
                const active = held.has(k.note);
                return ((0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: disabled || !onKeyPress, "aria-pressed": active, "aria-label": `Key ${k.note}`, onClick: () => press(k.note), className: (0, cn_1.cn)('relative flex h-full flex-1 items-end justify-center border-r border-border pb-0.5 transition-colors last:border-r-0', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset', active ? 'bg-accent/30' : 'bg-surface hover:bg-accent/10'), children: [active ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "mb-0.5 h-1 w-1 rounded-full bg-accent" }) : null, showLabels ? (0, jsx_runtime_1.jsx)("span", { className: "text-[10px] text-muted", children: k.note }) : null] }, k.note));
            }), whiteKeys.map((k, wi) => {
                const nextChroma = (k.chroma + 1) % 12;
                if (!(0, types_1.isBlackKey)(nextChroma))
                    return null;
                const note = `${types_1.NOTE_NAMES[nextChroma]}${k.octave}`;
                const active = held.has(note);
                const left = (wi + 1) * whiteW - whiteW * 0.3;
                return ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled || !onKeyPress, "aria-pressed": active, "aria-label": `Key ${note}`, onClick: () => press(note), style: { left: `${left}%`, width: `${whiteW * 0.6}%` }, className: (0, cn_1.cn)('absolute top-0 h-[58%] rounded-b-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent', active ? 'bg-accent' : 'bg-on-surface hover:opacity-90') }, note));
            })] }));
});
//# sourceMappingURL=PianoKeysV3.js.map
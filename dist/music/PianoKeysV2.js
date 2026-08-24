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
exports.PianoKeysV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
const WHITE = [0, 2, 4, 5, 7, 9, 11];
/**
 * PianoKeys, redesigned (v2): a **chunky rounded keyboard**. Taller white keys
 * with a small gap and fully rounded bottoms; held keys fill solid primary (with
 * an on-primary label) rather than a soft tint. Black keys are rounded caps. A
 * bolder, tactile skin vs. v1's flat keys. Same props, token-only.
 */
exports.PianoKeysV2 = React.forwardRef(function PianoKeysV2({ startOctave = 4, octaves = 1, highlightedNotes, variant = 'full', showLabels, disabled = false, onKeyPress, className, ...rest }, ref) {
    const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
    const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
    const held = new Set(highlightedNotes ?? []);
    const labels = showLabels ?? variant === 'full';
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative flex h-[152px] gap-1', disabled && 'opacity-50', className), ...rest, children: [whiteKeys.map((k) => {
                const active = held.has(k.note);
                return ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled || !onKeyPress, "aria-pressed": active, "aria-label": `Key ${k.note}`, onClick: () => press(k.note), className: (0, cn_1.cn)('relative flex h-full flex-1 flex-col items-center justify-end rounded-b-lg pb-2 shadow-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset', active ? 'bg-primary text-on-primary' : 'bg-surface text-muted hover:bg-primary/10'), children: labels ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold", children: k.note }) : null }, k.note));
            }), whiteKeys.map((k, wi) => {
                const nextChroma = (k.chroma + 1) % 12;
                if (!(0, types_1.isBlackKey)(nextChroma))
                    return null;
                const note = `${types_1.NOTE_NAMES[nextChroma]}${k.octave}`;
                const active = held.has(note);
                const left = (wi + 1) * whiteW - whiteW * 0.28;
                return ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled || !onKeyPress, "aria-pressed": active, "aria-label": `Key ${note}`, onClick: () => press(note), style: { left: `${left}%`, width: `${whiteW * 0.56}%` }, className: (0, cn_1.cn)('absolute top-0 flex h-[60%] items-end justify-center rounded-b-lg pb-1 shadow-md transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary', active ? 'bg-primary' : 'bg-on-surface hover:opacity-90'), children: active ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "h-1.5 w-1.5 rounded-full bg-on-primary" }) : null }, note));
            })] }));
});
//# sourceMappingURL=PianoKeysV2.js.map
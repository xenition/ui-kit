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
exports.PianoKeys = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
/** White-key pitch classes in order, with their chromatic index. */
const WHITE = [0, 2, 4, 5, 7, 9, 11];
/**
 * An on-screen keyboard — one or more octaves of piano keys, a UI shell only
 * (it makes no sound), and the DOM parity of `native/music`'s `PianoKeys`. White
 * keys lay out in a row of real `<button>`s with the black keys overlaid at the
 * correct positions; `highlightedNotes` lights held keys via a tint **and** a
 * filled marker (never color alone) plus `aria-pressed`. Pressing a key fires
 * `onKeyPress(note)` with a name like `'C#4'`. Token-only styling.
 */
exports.PianoKeys = React.forwardRef(function PianoKeys({ startOctave = 4, octaves = 1, highlightedNotes, variant = 'full', showLabels, disabled = false, onKeyPress, className, ...rest }, ref) {
    const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
    const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
    const held = new Set(highlightedNotes ?? []);
    const labels = showLabels ?? variant === 'full';
    const heightClass = variant === 'compact' ? 'h-24' : 'h-[140px]';
    // Flatten white keys across the requested octaves, preserving order.
    const whiteKeys = [];
    for (let o = 0; o < count; o += 1) {
        WHITE.forEach((chroma) => {
            whiteKeys.push({ note: `${types_1.NOTE_NAMES[chroma]}${base + o}`, chroma, octave: base + o });
        });
    }
    const whiteCount = Math.max(1, whiteKeys.length);
    const whiteW = 100 / whiteCount;
    const press = (note) => {
        if (disabled)
            return;
        onKeyPress?.(note);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative flex', heightClass, disabled && 'opacity-50', className), ...rest, children: [whiteKeys.map((k) => {
                const active = held.has(k.note);
                return ((0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: disabled || !onKeyPress, "aria-pressed": active, "aria-label": `Key ${k.note}`, onClick: () => press(k.note), className: (0, cn_1.cn)('relative flex h-full flex-1 flex-col items-center justify-end pb-[var(--xen-space-xs)]', 'rounded-b-[var(--xen-radius-sm)] border border-border transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset', active ? 'bg-primary/20' : 'bg-surface hover:bg-primary/10'), children: [active ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute top-[var(--xen-space-xs)] h-[7px] w-[7px] rounded-full bg-primary" })) : null, labels ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: k.note }) : null] }, k.note));
            }), whiteKeys.map((k, wi) => {
                const nextChroma = (k.chroma + 1) % 12;
                if (!(0, types_1.isBlackKey)(nextChroma))
                    return null;
                const note = `${types_1.NOTE_NAMES[nextChroma]}${k.octave}`;
                const active = held.has(note);
                const left = (wi + 1) * whiteW - whiteW * 0.3;
                return ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled || !onKeyPress, "aria-pressed": active, "aria-label": `Key ${note}`, onClick: () => press(note), style: { left: `${left}%`, width: `${whiteW * 0.6}%` }, className: (0, cn_1.cn)('absolute top-0 flex h-[62%] flex-col items-center justify-end pb-1', 'rounded-b-[var(--xen-radius-sm)] transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary', active ? 'bg-primary' : 'bg-on-surface hover:opacity-90'), children: active ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-1.5 w-1.5 rounded-full bg-on-primary" })) : null }, note));
            })] }));
});
//# sourceMappingURL=PianoKeys.js.map
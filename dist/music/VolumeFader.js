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
exports.VolumeFader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Slider_1 = require("../primitives/Slider");
const types_1 = require("./types");
/**
 * A labelled volume fader — a thin wrapper over the `Slider` primitive that adds
 * a name and a live numeric read-out, plus a `muted` state surfaced in both the
 * dimming *and* the a11y label (never color alone). The DOM parity of
 * `native/music`'s `VolumeFader`: it owns no audio; drags report out through
 * `onValueChange`. Token-only styling.
 */
exports.VolumeFader = React.forwardRef(function VolumeFader({ value, min = 0, max = 100, step = 1, label, variant = 'labeled', muted = false, unit, disabled = false, onValueChange, className, ...rest }, ref) {
    const safe = (0, types_1.clamp)(value, min, max);
    const readout = `${Math.round(safe)}${unit ? ` ${unit}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": label ? `${label} volume ${Math.round(safe)}${muted ? ', muted' : ''}` : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', (muted || disabled) && 'opacity-55', className), ...rest, children: [variant === 'labeled' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [label ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: muted ? `${label} (muted)` : label })) : ((0, jsx_runtime_1.jsx)("span", {})), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: readout })] })) : null, (0, jsx_runtime_1.jsx)(Slider_1.Slider, { value: safe, min: min, max: max, step: step, disabled: disabled, onChange: (v) => onValueChange?.(v) })] }));
});
//# sourceMappingURL=VolumeFader.js.map
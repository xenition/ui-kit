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
exports.BPMControl = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const types_1 = require("./types");
/**
 * A tempo (BPM) control — a UI shell only, it drives no clock, and the DOM
 * parity of `native/music`'s `BPMControl`. Shows the tempo read-out with −/＋
 * steppers (clamped to `[min, max]`) and, in the `tap` variant, a "Tap" button
 * that fires `onTap` for an app to time. The `playing` flag adds a non-color
 * "playing" dot beside the value. Token-only styling.
 */
exports.BPMControl = React.forwardRef(function BPMControl({ value, min = 40, max = 300, step = 1, variant = 'stepper', playing = false, disabled = false, onChange, onTap, className, ...rest }, ref) {
    const safe = (0, types_1.clamp)(value, min, max);
    const compact = variant === 'inline';
    const bump = (delta) => {
        if (disabled)
            return;
        onChange?.((0, types_1.clamp)(safe + delta, min, max));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center justify-center gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", size: "sm", "aria-label": "Decrease tempo", disabled: disabled || safe <= min, onClick: () => bump(-step), className: "h-10 w-10 rounded-full p-0 text-lg", children: "\u2212" }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col items-center', compact ? 'min-w-[56px]' : 'min-w-[96px]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [playing ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 rounded-full bg-success" })) : null, (0, jsx_runtime_1.jsx)("span", { "aria-label": `Tempo ${(0, types_1.formatBpm)(safe)} beats per minute${playing ? ', playing' : ''}`, className: (0, cn_1.cn)('font-extrabold text-on-surface', compact ? 'text-lg' : 'text-3xl'), children: (0, types_1.formatBpm)(safe) })] }), !compact ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: "BPM" }) : null] }), (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", size: "sm", "aria-label": "Increase tempo", disabled: disabled || safe >= max, onClick: () => bump(step), className: "h-10 w-10 rounded-full p-0 text-lg", children: "\uFF0B" }), variant === 'tap' ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "secondary", size: "sm", "aria-label": "Tap tempo", disabled: disabled, onClick: () => onTap?.(), children: "Tap" })) : null] }));
});
//# sourceMappingURL=BPMControl.js.map
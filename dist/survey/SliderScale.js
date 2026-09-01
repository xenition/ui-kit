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
exports.SliderScale = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Clamp `v` into `[min, max]` then snap to the nearest `step` stop. */
function clampSnap(v, min, max, step) {
    const clamped = Math.max(min, Math.min(max, v));
    const snapped = Math.round((clamped - min) / step) * step + min;
    return Math.max(min, Math.min(max, snapped));
}
/**
 * SliderScale — **V4** "clean form / focus" numeric slider question. A calm,
 * legible take: a big current-value numeral sits above a primary-filled track
 * with a large (≥44px) draggable thumb, flanked by min/max anchor captions. The
 * single accent is `primary`; the rail is `border`, the surface is neutral — no
 * gradients. Fully keyboard driven (Arrow / Home / End / PageUp / PageDown) and
 * exposed as `role="slider"` with `aria-valuemin/max/now`. Controlled via
 * `value` + `onChange`. All colors come from `--xen-*` token classes.
 */
exports.SliderScale = React.forwardRef(function SliderScale({ value, onChange, min = 0, max = 10, step = 1, minLabel, maxLabel, showValue = true, 'aria-label': ariaLabel = 'Rating', disabled = false, className, }, ref) {
    const safe = clampSnap(value, min, max, step);
    const ratio = max > min ? (safe - min) / (max - min) : 0;
    const pct = `${Math.round(ratio * 100)}%`;
    const emit = (v) => {
        if (disabled)
            return;
        onChange(clampSnap(v, min, max, step));
    };
    const onKeyDown = (e) => {
        if (disabled)
            return;
        const bigStep = Math.max(step, (max - min) / 10);
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                e.preventDefault();
                emit(safe + step);
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                e.preventDefault();
                emit(safe - step);
                break;
            case 'PageUp':
                e.preventDefault();
                emit(safe + bigStep);
                break;
            case 'PageDown':
                e.preventDefault();
                emit(safe - bigStep);
                break;
            case 'Home':
                e.preventDefault();
                emit(min);
                break;
            case 'End':
                e.preventDefault();
                emit(max);
                break;
            default:
                break;
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', disabled && 'opacity-50', className), children: [showValue ? ((0, jsx_runtime_1.jsx)("span", { className: "self-center text-4xl font-extrabold leading-none text-primary tabular-nums", children: safe })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative flex h-11 items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "range", role: "slider", "aria-label": ariaLabel, "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": safe, min: min, max: max, step: step, value: safe, disabled: disabled, onChange: (e) => emit(Number(e.target.value)), onKeyDown: onKeyDown, className: (0, cn_1.cn)('peer absolute inset-0 z-10 h-11 w-full cursor-pointer opacity-0', 'disabled:cursor-not-allowed') }), (0, jsx_runtime_1.jsx)("div", { className: "h-1.5 w-full rounded-full bg-border", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "pointer-events-none absolute left-0 h-1.5 rounded-full bg-primary", style: { width: pct } }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('pointer-events-none absolute h-6 w-6 -translate-x-1/2 rounded-full border-2 border-surface bg-primary shadow-sm', 'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface'), style: { left: pct } })] }), minLabel || maxLabel ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink text-xs text-muted", children: minLabel }), (0, jsx_runtime_1.jsx)("span", { className: "shrink text-right text-xs text-muted", children: maxLabel })] })) : null] }));
});
//# sourceMappingURL=SliderScale.js.map
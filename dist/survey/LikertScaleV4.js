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
exports.LikertScaleV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * LikertScale — **V4** "clean form / focus" design. A calm, legible agreement
 * scale: the N points render as a row of big, tappable pills (min height 44px)
 * that wrap responsively. The selected pill is a solid **primary** fill with
 * on-primary text; unselected pills sit on `bg-surface` with a `border-border`
 * hairline and a soft `bg-primary/10` hover tint. One accent, generous 8-pt air.
 * Same props/behavior as {@link LikertScaleProps} — the `radiogroup`/`radio`
 * roles, `aria-checked`, anchor labels and `onChange` are all preserved; all
 * colors come from `--xen-*` token classes (no literal colors).
 */
exports.LikertScaleV4 = React.forwardRef(function LikertScaleV4({ points = 5, value, onChange, minLabel, maxLabel, 'aria-label': ariaLabel = 'Agreement scale', variant = 'dots', disabled = false, className, }, ref) {
    const count = Math.max(2, Math.floor(points));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [(0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": ariaLabel, className: "flex flex-wrap gap-xs", children: Array.from({ length: count }, (_, i) => {
                    const point = i + 1;
                    const selected = value === point;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `Point ${point} of ${count}`, disabled: disabled, onClick: () => onChange?.(point), className: (0, cn_1.cn)('flex min-h-[44px] min-w-[44px] flex-1 items-center justify-center rounded-[var(--xen-radius-lg)] border px-md py-sm text-sm font-bold transition-colors', 'disabled:pointer-events-none disabled:opacity-50', selected
                            ? 'border-2 border-primary bg-primary text-on-primary'
                            : 'border-border bg-surface text-on-surface hover:bg-primary/10'), children: variant === 'numbered' ? point : null }, point));
                }) }), minLabel || maxLabel ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink text-xs text-muted", children: minLabel ?? '' }), (0, jsx_runtime_1.jsx)("span", { className: "shrink text-right text-xs text-muted", children: maxLabel ?? '' })] })) : null] }));
});
//# sourceMappingURL=LikertScaleV4.js.map
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
exports.NPSScaleV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const NPSScale_1 = require("./NPSScale");
/** Selected-cell classes when `colorByBucket` — semantic tokens per bucket. */
const BUCKET_BG = {
    detractor: 'bg-danger border-danger text-on-danger',
    passive: 'bg-warn border-warn text-on-warn',
    promoter: 'bg-success border-success text-on-success',
};
/**
 * NPSScale — **V4** "clean form / focus" design. Eleven big 0–10 cells (min
 * height 44px, bold 800 numerals) in a calm, legible row that wraps, with the
 * anchor labels underneath. The selected cell is a solid **primary** fill with
 * on-primary numeral by default, or its semantic **bucket** color
 * (detractor→danger, passive→warn, promoter→success) when `colorByBucket`;
 * unselected cells sit on `bg-surface` + `border-border` with a soft
 * `bg-primary/10` hover. One accent otherwise. Same props/behavior as
 * {@link NPSScaleProps} — the `radiogroup`/`radio` roles, `aria-checked`, bucket
 * announcements and `onChange` are all preserved; all colors come from `--xen-*`
 * token classes (no literal colors).
 */
exports.NPSScaleV4 = React.forwardRef(function NPSScaleV4({ value, onChange, minLabel = 'Not at all likely', maxLabel = 'Extremely likely', colorByBucket = false, 'aria-label': ariaLabel = 'Likelihood to recommend, 0 to 10', disabled = false, className, }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [(0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": ariaLabel, className: "flex flex-wrap gap-xs", children: Array.from({ length: 11 }, (_, score) => {
                    const selected = value === score;
                    const bucket = (0, NPSScale_1.npsBucket)(score);
                    const selectedClasses = colorByBucket ? BUCKET_BG[bucket] : 'bg-primary border-primary text-on-primary';
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${score}, ${bucket}`, disabled: disabled, onClick: () => onChange?.(score), className: (0, cn_1.cn)('flex min-h-[44px] min-w-[44px] flex-1 items-center justify-center rounded-[var(--xen-radius-md)] border text-lg font-extrabold transition-colors', 'disabled:pointer-events-none disabled:opacity-50', selected
                            ? (0, cn_1.cn)('border-2', selectedClasses)
                            : 'border-border bg-surface text-on-surface hover:bg-primary/10'), children: score }, score));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink text-xs text-muted", children: minLabel }), (0, jsx_runtime_1.jsx)("span", { className: "shrink text-right text-xs text-muted", children: maxLabel })] })] }));
});
//# sourceMappingURL=NPSScaleV4.js.map
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
exports.SurveyProgressV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * SurveyProgress — **V4** "clean form / focus" design (web parity of the native
 * V4). Deliberately calm — NO gradient — so it never competes with the question:
 * a clean rounded progress bar (track = soft-primary tint `bg-primary/10`, fill =
 * solid `bg-primary`) under a legible "Step N of M" line with a big primary
 * percentage numeral. `steps` swaps the bar for a segmented dot-per-question
 * track; `fraction` shows just the caption. Exposes a `progressbar` role with
 * min/max/now so assistive tech can read completion. `current` is clamped into
 * `[0, total]`. Same props/behavior as {@link SurveyProgressProps}; all colors
 * from `--xen-*` token classes (no literal colors), dark-mode safe.
 */
exports.SurveyProgressV4 = React.forwardRef(function SurveyProgressV4({ current, total, variant = 'bar', showLabel = true, label, className }, ref) {
    const safeTotal = Math.max(1, Math.floor(total));
    const safeCurrent = Math.max(0, Math.min(safeTotal, Math.floor(current)));
    const pct = Math.round((safeCurrent / safeTotal) * 100);
    const caption = label ?? `Step ${safeCurrent} of ${safeTotal}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-survey-progress": "", "aria-label": caption, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [showLabel ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: caption }), variant !== 'fraction' ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xl font-extrabold tabular-nums text-primary", children: [pct, "%"] })) : null] })) : null, variant === 'bar' ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": safeTotal, "aria-valuenow": safeCurrent, "aria-label": caption, className: "h-2 w-full overflow-hidden rounded-full bg-primary/10", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary transition-[width]", style: { width: `${pct}%` } }) })) : variant === 'steps' ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": safeTotal, "aria-valuenow": safeCurrent, "aria-label": caption, className: "flex gap-xs", children: Array.from({ length: safeTotal }, (_, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2 flex-1 rounded-full', i < safeCurrent ? 'bg-primary' : 'bg-primary/10') }, i))) })) : null] }));
});
//# sourceMappingURL=SurveyProgressV4.js.map
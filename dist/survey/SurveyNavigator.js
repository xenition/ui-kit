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
exports.SurveyNavigator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * SurveyNavigator — the survey flow's **footer** (V4 "focus" line). A calm,
 * non-gradient bar: a slim primary progress track with a `Step N of M` caption
 * (exposed as a `progressbar`), a ghost Back button and a primary Next button.
 * On the final step Next becomes Submit (still primary, routed to `onSubmit` and
 * falling back to `onNext`). Both actions are big ≥44px thumb-zone `Button`
 * primitives. Presentational only (step index + callbacks). All colors from
 * `--xen-*` token classes (no literal colors), dark-mode safe.
 */
exports.SurveyNavigator = React.forwardRef(function SurveyNavigator({ step, total, onBack, onNext, onSubmit, backLabel = 'Back', nextLabel = 'Next', submitLabel = 'Submit', nextDisabled = false, className, ...rest }, ref) {
    const safeTotal = Math.max(1, Math.trunc(total));
    const current = Math.min(Math.max(1, Math.trunc(step)), safeTotal);
    const pct = Math.round((current / safeTotal) * 100);
    const isLast = current >= safeTotal;
    const showBack = onBack != null && current > 1;
    const advance = isLast ? onSubmit ?? onNext : onNext;
    const advanceLabel = isLast ? submitLabel : nextLabel;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-survey-navigator": "", className: (0, cn_1.cn)('flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuenow": current, "aria-valuemin": 1, "aria-valuemax": safeTotal, "aria-label": `Step ${current} of ${safeTotal}`, className: "h-1.5 w-full overflow-hidden rounded-full bg-on-surface/10", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary transition-all", style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: ["Step ", current, " of ", safeTotal] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [showBack ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", size: "lg", "aria-label": backLabel, onClick: onBack, className: "min-h-[44px] flex-1", children: backLabel })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", "aria-label": advanceLabel, onClick: advance, disabled: nextDisabled, className: "min-h-[44px] flex-1", children: advanceLabel })] })] }));
});
//# sourceMappingURL=SurveyNavigator.js.map
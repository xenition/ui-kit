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
exports.NPSScaleV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const NPSScale_1 = require("./NPSScale");
const BUCKET_SELECTED = {
    detractor: 'border-danger bg-danger text-on-danger',
    passive: 'border-warn bg-warn text-on-warn',
    promoter: 'border-success bg-success text-on-success',
};
/**
 * NPSScale, redesigned (v2): a **big 0–10 tile grid**. Eleven large square tiles
 * wrap into a grid; when `colorByBucket` is on, a chosen tile fills its bucket
 * tone (detractor/passive/promoter), else primary. Anchors sit beneath. Bolder
 * than v1's strip. Same props, token-only.
 */
exports.NPSScaleV2 = React.forwardRef(function NPSScaleV2({ value, onChange, minLabel = 'Not at all likely', maxLabel = 'Extremely likely', colorByBucket = false, disabled = false, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-nps-scale": "", role: "radiogroup", "aria-label": rest['aria-label'] ?? 'Likelihood to recommend, 0 to 10', className: (0, cn_1.cn)('flex flex-col gap-1.5', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-6 gap-1.5 sm:grid-cols-11", children: Array.from({ length: 11 }).map((_, score) => {
                    const selected = value === score;
                    const selCls = colorByBucket ? BUCKET_SELECTED[(0, NPSScale_1.npsBucket)(score)] : 'border-primary bg-primary text-on-primary';
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${score}`, disabled: disabled, onClick: () => onChange?.(score), className: (0, cn_1.cn)('flex h-10 items-center justify-center rounded-md border-2 text-sm font-bold transition-colors disabled:opacity-50', selected ? selCls : 'border-border bg-surface text-on-surface hover:bg-primary/10'), children: score }, score));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { children: minLabel }), (0, jsx_runtime_1.jsx)("span", { children: maxLabel })] })] }));
});
//# sourceMappingURL=NPSScaleV2.js.map
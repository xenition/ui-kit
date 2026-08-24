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
exports.LikertScale = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A Likert agreement scale — N equally-weighted points rendered as a
 * `radiogroup` of circular `radio` buttons, with optional anchor labels under
 * the extremes ("Strongly disagree" … "Strongly agree"). The selected point
 * fills with the primary token and is announced via `aria-checked` (selection
 * is never color-alone). `numbered` prints each point's ordinal. No literal
 * colors.
 */
exports.LikertScale = React.forwardRef(function LikertScale({ points = 5, value, onChange, minLabel, maxLabel, 'aria-label': ariaLabel = 'Agreement scale', variant = 'dots', disabled = false, className, }, ref) {
    const count = Math.max(2, Math.floor(points));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [(0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": ariaLabel, className: "flex justify-between gap-xs", children: Array.from({ length: count }, (_, i) => {
                    const point = i + 1;
                    const selected = value === point;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `Point ${point} of ${count}`, disabled: disabled, onClick: () => onChange?.(point), className: (0, cn_1.cn)('flex aspect-square max-w-[56px] flex-1 items-center justify-center rounded-full border transition-colors', 'disabled:pointer-events-none disabled:opacity-50', selected
                            ? 'border-2 border-primary bg-primary text-on-primary'
                            : 'border-border bg-surface text-on-surface hover:bg-primary-50'), children: variant === 'numbered' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold", children: point })) : null }, point));
                }) }), minLabel || maxLabel ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink text-xs text-muted", children: minLabel ?? '' }), (0, jsx_runtime_1.jsx)("span", { className: "shrink text-right text-xs text-muted", children: maxLabel ?? '' })] })) : null] }));
});
//# sourceMappingURL=LikertScale.js.map
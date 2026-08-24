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
exports.LikertScaleV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * LikertScale, redesigned (v2): **big labelled buttons**. Each agreement point is
 * a large rounded numbered button that fills primary when chosen, with the min/max
 * anchors printed beneath the ends. A bolder scale than v1's dots. Same props,
 * token-only.
 */
exports.LikertScaleV2 = React.forwardRef(function LikertScaleV2({ points = 5, value, onChange, minLabel, maxLabel, variant, disabled = false, className, ...rest }, ref) {
    void variant;
    const n = Math.max(2, Math.floor(points));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-likert-scale": "", role: "radiogroup", "aria-label": rest['aria-label'] ?? 'Agreement scale', className: (0, cn_1.cn)('flex flex-col gap-1.5', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: Array.from({ length: n }).map((_, i) => {
                    const point = i + 1;
                    const selected = value === point;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${point}`, disabled: disabled, onClick: () => onChange?.(point), className: (0, cn_1.cn)('flex h-11 flex-1 items-center justify-center rounded-lg border-2 text-sm font-bold transition-colors disabled:opacity-50', selected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface hover:bg-primary/10'), children: point }, point));
                }) }), (minLabel || maxLabel) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { children: minLabel }), (0, jsx_runtime_1.jsx)("span", { children: maxLabel })] })) : null] }));
});
//# sourceMappingURL=LikertScaleV2.js.map
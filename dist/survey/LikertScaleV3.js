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
exports.LikertScaleV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * LikertScale, redesigned (v3): a **compact dot strip**. Small circular points
 * pack on one line between the min/max anchors; the chosen point fills primary
 * and grows slightly. The tightest scale for a dense form. The opposite of v2's
 * big buttons. Same props, token-only.
 */
exports.LikertScaleV3 = React.forwardRef(function LikertScaleV3({ points = 5, value, onChange, minLabel, maxLabel, variant, disabled = false, className, ...rest }, ref) {
    void variant;
    const n = Math.max(2, Math.floor(points));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-likert-scale": "", role: "radiogroup", "aria-label": rest['aria-label'] ?? 'Agreement scale', className: (0, cn_1.cn)('flex items-center gap-2', className), children: [minLabel ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: minLabel }) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 items-center justify-between", children: Array.from({ length: n }).map((_, i) => {
                    const point = i + 1;
                    const selected = value === point;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${point}`, disabled: disabled, onClick: () => onChange?.(point), className: (0, cn_1.cn)('rounded-full border transition-all disabled:opacity-50', selected ? 'h-5 w-5 border-primary bg-primary' : 'h-3.5 w-3.5 border-border bg-surface hover:border-primary') }, point));
                }) }), maxLabel ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: maxLabel }) : null] }));
});
//# sourceMappingURL=LikertScaleV3.js.map
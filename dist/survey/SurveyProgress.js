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
exports.SurveyProgress = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * Survey completion indicator — `bar` wraps the token `Progress` primitive,
 * `steps` renders a segmented dot-per-question track, and `fraction` shows just
 * the `"X of Y"` caption. Exposes a `progressbar` role with min/max/now so
 * assistive tech can read completion. `current` is clamped into `[0, total]`.
 * No literal colors.
 */
exports.SurveyProgress = React.forwardRef(function SurveyProgress({ current, total, variant = 'bar', showLabel = true, label, className }, ref) {
    const safeTotal = Math.max(1, Math.floor(total));
    const safeCurrent = Math.max(0, Math.min(safeTotal, Math.floor(current)));
    const caption = label ?? `Question ${safeCurrent} of ${safeTotal}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": caption, className: (0, cn_1.cn)('flex flex-col gap-xs', className), children: [showLabel ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: caption }), variant !== 'fraction' ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-bold text-primary", children: [Math.round((safeCurrent / safeTotal) * 100), "%"] })) : null] })) : null, variant === 'bar' ? ((0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: safeCurrent, max: safeTotal, tone: "primary", size: "md", "aria-label": caption })) : variant === 'steps' ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": safeTotal, "aria-valuenow": safeCurrent, className: "flex gap-xs", children: Array.from({ length: safeTotal }, (_, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 flex-1 rounded-full', i < safeCurrent ? 'bg-primary' : 'bg-border') }, i))) })) : null] }));
});
//# sourceMappingURL=SurveyProgress.js.map
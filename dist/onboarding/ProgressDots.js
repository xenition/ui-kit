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
exports.ProgressDots = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const DOT = {
    sm: { base: 'h-1.5 w-1.5', active: 'h-1.5 w-4' },
    md: { base: 'h-2 w-2', active: 'h-2 w-5' },
};
/**
 * Paged-progress indicator — a row of token-bound dots where the active step is
 * a widened "pill" in the primary color and the rest are muted. Shared by
 * {@link OnboardingSlides} and the welcome/paywall flow so every screen
 * advertises its position identically. Dots are decorative unless `onDotClick`
 * is supplied, in which case each becomes a labelled button. Guards an
 * empty/negative `count`. No literal colors.
 */
exports.ProgressDots = React.forwardRef(function ProgressDots({ count, activeIndex, size = 'md', onDotClick, className, ...rest }, ref) {
    const total = Math.max(0, Math.floor(count));
    const scale = DOT[size];
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": Math.max(0, total - 1), "aria-valuenow": activeIndex, "aria-label": `Step ${Math.min(activeIndex + 1, total)} of ${total}`, className: (0, cn_1.cn)('flex items-center gap-1.5', className), ...rest, children: Array.from({ length: total }, (_, i) => {
            const active = i === activeIndex;
            const dotClass = (0, cn_1.cn)('rounded-full transition-all', active ? (0, cn_1.cn)(scale.active, 'bg-primary') : (0, cn_1.cn)(scale.base, 'bg-border'));
            if (!onDotClick)
                return (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: dotClass }, i);
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Go to step ${i + 1}`, "aria-current": active || undefined, onClick: () => onDotClick(i), className: "inline-flex items-center justify-center p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: dotClass }) }, i));
        }) }));
});
//# sourceMappingURL=ProgressDots.js.map
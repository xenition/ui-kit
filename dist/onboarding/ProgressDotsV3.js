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
exports.ProgressDotsV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Paged progress — V3, the compact line: **rings**. Every step is an outlined
 * circle; the ones already walked are filled and dimmed, the current one is
 * filled solid, the rest stay hollow.
 *
 * Where it earns its place: over artwork. The base's filled bars and V2's
 * track both need a quiet ground to read against, and an onboarding whose hero
 * runs to the top edge does not have one — hollow rings with a stroke survive a
 * busy photograph in a way a low-contrast bar does not.
 *
 * `variant` is accepted and ignored: this line has one treatment, and a
 * `'bars'` request here is an app asking for the base line.
 *
 * Same props as {@link ProgressDots}. Token-pure.
 */
exports.ProgressDotsV3 = React.forwardRef(function ProgressDotsV3({ count, activeIndex, size = 'md', onDotClick, className, ...rest }, ref) {
    const total = Math.max(0, Math.floor(count));
    const diameter = size === 'sm' ? 'h-2 w-2' : 'h-3 w-3';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "progressbar", "aria-valuemin": 1, "aria-valuemax": Math.max(1, total), "aria-valuenow": Math.min(activeIndex + 1, total), "aria-label": `Step ${Math.min(activeIndex + 1, total)} of ${total}`, className: (0, cn_1.cn)('flex items-center gap-xs', className), ...rest, children: Array.from({ length: total }, (_, i) => {
            const walked = i < activeIndex;
            const current = i === activeIndex;
            const ring = ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block rounded-full border-2', diameter, walked || current ? 'border-primary bg-primary' : 'border-border', 
                // "Here" and "done" must be distinguishable without colour
                // alone, so the walked steps recede rather than matching.
                walked && 'opacity-55') }));
            if (!onDotClick)
                return (0, jsx_runtime_1.jsx)(React.Fragment, { children: ring }, i);
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Go to step ${i + 1}`, "aria-current": current || undefined, onClick: () => onDotClick(i), className: "flex items-center p-xs", children: ring }, i));
        }) }));
});
//# sourceMappingURL=ProgressDotsV3.js.map
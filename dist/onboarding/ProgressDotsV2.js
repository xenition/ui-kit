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
exports.ProgressDotsV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Paged progress — V2, the editorial line: **one continuous track with a
 * spoken position beside it**, "2 / 5", instead of a row of segments.
 *
 * The idea the base and V3 cannot express: on a long flow — eight steps, ten —
 * segments stop being countable and the header turns into a row of tick marks
 * nobody reads. A single filled track plus the number says the same thing at
 * any length, and the number is the part a user actually uses to decide
 * whether to keep going.
 *
 * The counter is tabular and fixed-width so the track does not resize as the
 * step number changes, which would make the bar appear to jump backwards on
 * step 10 of 12.
 *
 * `onDotClick` is accepted and **ignored**: a continuous track has no discrete
 * targets, and inventing invisible ones is worse than not offering navigation.
 * An app that needs step navigation wants the base line.
 *
 * Same props as {@link ProgressDots}. Token-pure.
 */
exports.ProgressDotsV2 = React.forwardRef(function ProgressDotsV2({ count, activeIndex, size = 'md', className, ...rest }, ref) {
    const total = Math.max(0, Math.floor(count));
    const position = Math.min(Math.max(0, activeIndex + 1), total);
    const fraction = total === 0 ? 0 : position / total;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuemin": 1, "aria-valuemax": Math.max(1, total), "aria-valuenow": position, "aria-label": `Step ${position} of ${total}`, className: (0, cn_1.cn)('flex w-full items-center gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block min-w-0 flex-1 overflow-hidden rounded-full bg-border', size === 'sm' ? 'h-1' : 'h-1.5'), children: (0, jsx_runtime_1.jsx)("span", { className: "block h-full rounded-full bg-primary", style: { width: `${fraction * 100}%` } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "w-11 text-right text-sm font-semibold text-muted-text [font-variant-numeric:tabular-nums]", children: [position, " / ", total] })] }));
});
//# sourceMappingURL=ProgressDotsV2.js.map
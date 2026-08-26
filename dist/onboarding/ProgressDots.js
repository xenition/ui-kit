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
 * Segment thickness for `'bars'`. Geometric, not a colour or a spacing token
 * (spec §10.1): `h-1` is 4px, `h-1.5` is 6px — the native twin's `BAR` table.
 */
const BAR = { sm: 'h-1', md: 'h-1.5' };
/**
 * Paged-progress indicator — two treatments of the same idea, chosen with
 * `variant`.
 *
 * `'dots'` (the default, and everything that shipped before this prop existed)
 * is a slide-position indicator: a row of token-bound dots where the active
 * step is a widened "pill" in the primary color and the rest are muted.
 *
 * `'bars'` is the onboarding step indicator the design spec calls for (§2):
 * equal-width segments spanning the header, filled up to and including the
 * current step, fully rounded, `gap-xs` apart. It carries no numbers and no
 * captions on purpose — the numbered circles it replaces were the single worst
 * offender on the shipped screens, cramped at the top with labels too small to
 * read.
 *
 * Both treatments are decorative unless `onDotClick` is supplied, in which case
 * each step becomes a labelled button. An empty or negative `count` renders an
 * empty row rather than crashing, and a `count` of one renders a single full
 * bar. No literal colors.
 */
exports.ProgressDots = React.forwardRef(function ProgressDots({ count, activeIndex, size = 'md', variant = 'dots', onDotClick, className, ...rest }, ref) {
    const total = Math.max(0, Math.floor(count));
    const bars = variant === 'bars';
    const scale = DOT[size];
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": Math.max(0, total - 1), "aria-valuenow": activeIndex, "aria-label": `Step ${Math.min(activeIndex + 1, total)} of ${total}`, className: (0, cn_1.cn)('flex items-center gap-xs', bars && 'w-full', className), ...rest, children: Array.from({ length: total }, (_, i) => {
            const active = i === activeIndex;
            // In `'bars'` a step already walked past stays filled — the bar reads
            // as "how far through am I", not "which one is selected".
            const filled = bars ? i <= activeIndex : active;
            const dotClass = bars
                ? (0, cn_1.cn)('block w-full rounded-full transition-colors', BAR[size], filled ? 'bg-primary' : 'bg-border')
                : (0, cn_1.cn)('rounded-full transition-all', active ? (0, cn_1.cn)(scale.active, 'bg-primary') : (0, cn_1.cn)(scale.base, 'bg-border'));
            if (!onDotClick) {
                return bars ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex-1", children: (0, jsx_runtime_1.jsx)("span", { className: dotClass }) }, i)) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: dotClass }, i));
            }
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Go to step ${i + 1}`, "aria-current": active || undefined, onClick: () => onDotClick(i), className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', bars ? 'flex-1 py-1' : 'p-1'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: dotClass }) }, i));
        }) }));
});
//# sourceMappingURL=ProgressDots.js.map
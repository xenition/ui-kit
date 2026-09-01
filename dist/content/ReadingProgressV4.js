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
exports.ReadingProgressV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ProgressV4_1 = require("../primitives/ProgressV4");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * **V4 reading progress** — the web twin of the native `ReadingProgressV4`,
 * same props as {@link ReadingProgress} plus `formatProgress` and `pinned`.
 *
 * ## Four changes
 *
 * 1. **The name reaches the progressbar.** The base hung `aria-label` on a
 *    roleless wrapper — where ARIA ignores it — while the `Progress` primitive
 *    inside, the element that actually *is* a `progressbar`, had no name at
 *    all. The label now goes on the bar.
 * 2. **`pinned` pins it**, which the prop doc has always implied: `sticky` on
 *    web, and the safe-area inset on native.
 * 3. **The percentage is clamped by `readingPercent`**, so a caller
 *    mid-computation cannot push the fill past the track.
 * 4. **The readout is not announced twice.** The `labeled` variant drew "42%"
 *    beside a bar that already says 42, and labelled both.
 */
exports.ReadingProgressV4 = React.forwardRef(function ReadingProgressV4({ progress, variant = 'bar', formatProgress = (value) => `${value} percent read`, pinned = false, className, ...rest }, ref) {
    // The prop is a 0–1 fraction; the bar, the readout and the label are all
    // whole percents, clamped once here rather than three times downstream.
    const pct = Math.round((0, reading_v4_1.readingPercent)(progress * 100));
    const spoken = formatProgress(pct);
    // `z-10` keeps the rail above the article body it is pinned over; a
    // progress rail that the first paragraph scrolls through is not a rail.
    const pin = pinned ? 'sticky top-0 z-10' : null;
    if (variant === 'labeled') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-sm', pin, className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, max: 100, tone: "primary", size: "sm", "aria-label": spoken }) }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('min-w-[calc(var(--xen-space-xl)_+_var(--xen-space-xs))] text-right text-xs font-semibold', reading_v4_1.TONE_INK.muted), children: `${pct}%` })] }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(pin, className), ...rest, children: (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, max: 100, tone: "primary", size: "sm", "aria-label": spoken }) }));
});
//# sourceMappingURL=ReadingProgressV4.js.map
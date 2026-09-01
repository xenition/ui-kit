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
exports.RatingScaleInputV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * RatingScaleInput — **V4** "clean form / focus" design. A big, tappable rating
 * (min 44px targets) that reports a 1-based value: `star` fills glyphs up to the
 * selection with the **warn** star tone (empty = muted); `number` shows big
 * primary-filled chips; `emoji` maps each cell to a face. The chosen value is
 * echoed as a large **primary** numeral (`N / total`) so the answer reads at a
 * glance. Calm, one accent, no gradients. Each cell is a `radio` that announces
 * its value and selection via `aria-checked` — never color-alone. Guards
 * `max`/`emojis` indexing. Same props/behavior as {@link RatingScaleInputProps};
 * all colors from `--xen-*` token classes (no literal colors).
 */
exports.RatingScaleInputV4 = React.forwardRef(function RatingScaleInputV4({ value, onChange, max = 5, variant = 'star', emojis = ['😖', '🙁', '😐', '🙂', '😍'], 'aria-label': ariaLabel = 'Rating', disabled = false, className, }, ref) {
    const total = Math.max(1, Math.floor(max));
    const current = value ?? 0;
    const hasValue = current > 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [(0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": ariaLabel, className: "flex flex-wrap items-center gap-sm", children: Array.from({ length: total }, (_, i) => {
                    const cell = i + 1;
                    const active = cell <= current; // for star: fill up to selection
                    const selected = cell === current;
                    const emojiGlyph = emojis.length > 0 ? emojis[Math.min(i, emojis.length - 1)] : '🙂';
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${cell} of ${total}`, disabled: disabled, onClick: () => onChange?.(cell), className: (0, cn_1.cn)('flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--xen-radius-lg)] leading-none transition-colors', 'disabled:pointer-events-none disabled:opacity-50'), children: variant === 'star' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl leading-none', active ? 'text-warn' : 'text-muted'), children: "\u2605" })) : variant === 'emoji' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl leading-none', selected ? 'opacity-100' : 'opacity-40'), children: emojiGlyph })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-full border text-lg font-bold transition-colors', selected
                                ? 'border-2 border-primary bg-primary text-on-primary'
                                : 'border-border bg-surface text-on-surface hover:bg-primary/10'), children: cell })) }, cell));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-1", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-4xl font-extrabold leading-none', hasValue ? 'text-primary' : 'text-muted'), children: hasValue ? current : '–' }), (0, jsx_runtime_1.jsxs)("span", { className: "text-lg font-semibold text-muted", children: ["/ ", total] })] })] }));
});
//# sourceMappingURL=RatingScaleInputV4.js.map
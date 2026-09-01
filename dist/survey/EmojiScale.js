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
exports.EmojiScale = exports.DEFAULT_EMOJI_OPTIONS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Default 5-face satisfaction set, Terrible → Great. */
exports.DEFAULT_EMOJI_OPTIONS = [
    { emoji: '😡', label: 'Terrible' },
    { emoji: '😞', label: 'Poor' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😍', label: 'Great' },
];
/**
 * EmojiScale — **V4** "clean form / focus" emoji-face satisfaction picker. A row
 * of big (≥44px) emoji buttons on a calm neutral surface; the selected face
 * gets the single signature accent — a `primary` ring plus a soft `primary/10`
 * tint — and scales up slightly, with its label shown beneath the row. The face
 * label carries the meaning so selection is never conveyed by color alone.
 * Exposed as a `radiogroup` of `radio`s with spoken labels. Controlled via
 * `value` + `onChange`. All colors come from `--xen-*` token classes.
 */
exports.EmojiScale = React.forwardRef(function EmojiScale({ value, onChange, options = exports.DEFAULT_EMOJI_OPTIONS, 'aria-label': ariaLabel = 'Satisfaction', disabled = false, className, }, ref) {
    const selectedOption = value != null ? options[value] : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', disabled && 'opacity-50', className), children: [(0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": ariaLabel, className: "flex flex-wrap justify-between gap-xs", children: options.map((opt, index) => {
                    const selected = value === index;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": opt.label, disabled: disabled, onClick: () => onChange(index), className: (0, cn_1.cn)('flex h-12 w-12 items-center justify-center rounded-full border text-2xl transition-transform', 'disabled:pointer-events-none', selected
                            ? 'scale-110 border-2 border-primary bg-primary/10'
                            : 'border-border bg-surface hover:bg-primary/10'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: opt.emoji }) }, index));
                }) }), (0, jsx_runtime_1.jsx)("span", { className: "min-h-[1.25rem] text-center text-sm font-bold text-primary", "aria-hidden": "true", children: selectedOption?.label ?? '' })] }));
});
//# sourceMappingURL=EmojiScale.js.map
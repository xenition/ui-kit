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
exports.ChordChip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
const SIZE = {
    sm: 'px-[var(--xen-space-xs)] py-0.5 text-xs',
    md: 'px-[var(--xen-space-sm)] py-1 text-sm',
    lg: 'px-[var(--xen-space-md)] py-1.5 text-base',
};
/**
 * A chord label chip — a UI shell only, and the DOM parity of `native/music`'s
 * `ChordChip`. Renders a chord's label (from `chord.label` or `root`+`quality`)
 * as a pill; a real `<button>` when `onClick` is given (fires with the chord),
 * a static `<span>` otherwise. `selected` is surfaced in `aria-pressed` and a
 * heavier ring/weight, not color alone. Accent comes from a semantic token
 * class; no literal colors.
 */
exports.ChordChip = React.forwardRef(function ChordChip({ chord, variant = 'soft', size = 'md', selected = false, color = 'primary', disabled = false, onClick, className, ...rest }, ref) {
    const accent = color;
    const label = (0, types_1.chordLabel)(chord);
    let tone;
    if (variant === 'solid') {
        tone = (0, cn_1.cn)(types_1.ACCENT_BG_CLASS[accent], types_1.ACCENT_ON_TEXT_CLASS[accent], selected && 'ring-2 ring-offset-1');
    }
    else if (variant === 'outline') {
        tone = (0, cn_1.cn)('border bg-transparent', types_1.ACCENT_BORDER_CLASS[accent], types_1.ACCENT_TEXT_CLASS[accent], selected && 'border-2');
    }
    else {
        tone = (0, cn_1.cn)(selected ? types_1.ACCENT_STRONG_BG_CLASS[accent] : types_1.ACCENT_SOFT_BG_CLASS[accent], types_1.ACCENT_TEXT_CLASS[accent], selected && (0, cn_1.cn)('border-2', types_1.ACCENT_BORDER_CLASS[accent]));
    }
    const classes = (0, cn_1.cn)('inline-flex items-center self-start rounded-[var(--xen-radius-md)] font-bold transition-colors', SIZE[size], tone, disabled && 'opacity-50', className);
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: "text", "aria-label": `Chord ${label}${selected ? ', selected' : ''}`, className: classes, ...rest, children: label }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", disabled: disabled, "aria-pressed": selected, "aria-label": `Chord ${label}`, onClick: () => onClick(chord), className: (0, cn_1.cn)(classes, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:opacity-90'), ...rest, children: label }));
});
//# sourceMappingURL=ChordChip.js.map
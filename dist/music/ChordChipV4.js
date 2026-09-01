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
exports.ChordChipV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const types_1 = require("./types");
/**
 * `Icon` on-accent color slot for the selected marker on a `solid` fill. The web
 * `Icon` has no `onAccent` slot (accent folds to `primary`, the accent→primary
 * web gotcha); the rest pass through so the `♪` reads on the solid accent fill.
 */
const ACCENT_ON_ICON_COLOR = {
    primary: 'onPrimary',
    accent: 'onPrimary',
    success: 'onSuccess',
    warn: 'onWarn',
    danger: 'onDanger',
};
/**
 * ChordChip — **V4** "session" design (web parity of the native V4). The clean,
 * tactile chord chip: a rounded token pill where `solid` is a strong accent fill
 * with on-accent text, `soft` is a soft accent tint, and `outline` is a bordered
 * surface. `size` (`sm` / `md` / `lg`) scales padding + text on its own chip
 * scale. A selected chip adds an accent ring + a leading `♪` marker (never color
 * alone) and heavier weight. A real `<button>` when `onClick` is given (fires
 * with the chord), a static `<span>` otherwise. Identical props/behavior to
 * {@link ChordChipProps}; the accent is preserved via the `ACCENT_*` token slot
 * helpers (no literal colors, no gradient).
 */
const SIZE = {
    sm: 'gap-1 px-[var(--xen-space-xs)] py-0.5 text-xs',
    md: 'gap-1 px-[var(--xen-space-sm)] py-1 text-sm',
    lg: 'gap-1.5 px-[var(--xen-space-md)] py-1.5 text-base',
};
/** Marker glyph size per chip size — its OWN scale, mapped onto the Icon scale. */
const MARKER_ICON_SIZE = {
    sm: 'xs',
    md: 'sm',
    lg: 'base',
};
exports.ChordChipV4 = React.forwardRef(function ChordChipV4({ chord, variant = 'soft', size = 'md', selected = false, color = 'primary', disabled = false, onClick, className, ...rest }, ref) {
    const accent = color;
    const label = (0, types_1.chordLabel)(chord);
    // Marker uses on-accent color on a solid fill, the accent color otherwise.
    const markerColor = variant === 'solid' ? ACCENT_ON_ICON_COLOR[accent] : types_1.ACCENT_ICON_COLOR[accent];
    let tone;
    if (variant === 'solid') {
        tone = (0, cn_1.cn)(types_1.ACCENT_BG_CLASS[accent], types_1.ACCENT_ON_TEXT_CLASS[accent], selected && 'ring-2 ring-offset-1');
    }
    else if (variant === 'outline') {
        tone = (0, cn_1.cn)('border bg-surface', types_1.ACCENT_BORDER_CLASS[accent], types_1.ACCENT_TEXT_CLASS[accent], selected && 'border-2 ring-2 ring-offset-1');
    }
    else {
        tone = (0, cn_1.cn)(selected ? types_1.ACCENT_STRONG_BG_CLASS[accent] : types_1.ACCENT_SOFT_BG_CLASS[accent], types_1.ACCENT_TEXT_CLASS[accent], selected && (0, cn_1.cn)('border-2 ring-2 ring-offset-1', types_1.ACCENT_BORDER_CLASS[accent]));
    }
    const marker = selected ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u266A", size: MARKER_ICON_SIZE[size], color: markerColor, "aria-hidden": "true" })) : null;
    const classes = (0, cn_1.cn)('inline-flex items-center self-start rounded-[var(--xen-radius-lg)] font-bold transition-colors', SIZE[size], tone, disabled && 'opacity-50', className);
    if (!onClick) {
        return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "text", "aria-label": `Chord ${label}${selected ? ', selected' : ''}`, className: classes, ...rest, children: [marker, label] }));
    }
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", disabled: disabled, "aria-pressed": selected, "aria-label": `Chord ${label}`, onClick: () => onClick(chord), className: (0, cn_1.cn)(classes, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:opacity-90'), ...rest, children: [marker, label] }));
});
//# sourceMappingURL=ChordChipV4.js.map
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
exports.TrackPadV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const EmptyState_1 = require("../commerce/EmptyState");
const types_1 = require("./types");
/**
 * TrackPad — **V4** "session" design (web parity of the native V4). The tactile
 * take on a drum / sample pad grid: pads are rounded token tiles carrying their
 * per-cell accent (position-derived or `pad.color`) as a soft tint, and an
 * `activePadIds` pad lights with a stronger accent fill + a heavier accent ring
 * + a filled corner dot + bold label (never color alone). No gradient —
 * performance surfaces stay clean and tactile; ≥44px tap targets. Honors both
 * `variant`s (`grid` / `compact`), the empty-cell state and
 * `onPadPress(pad, index)` behavior identical to {@link TrackPadProps}. Renders
 * an `EmptyState` when there are no pads. Every accent traces to a `--xen-*`
 * token class (no literals).
 */
exports.TrackPadV4 = React.forwardRef(function TrackPadV4({ pads, columns = 4, variant = 'grid', activePadIds, label, emptyLabel = 'No pads assigned', onPadPress, className, ...rest }, ref) {
    if (pads.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDD41", size: "2xl", color: "muted", "aria-label": "Pads" }), title: emptyLabel, className: className, ...rest }));
    }
    const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
    const active = new Set(activePadIds ?? []);
    const minH = variant === 'compact' ? 'min-h-[44px]' : 'min-h-[64px]';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [label ? ((0, jsx_runtime_1.jsx)("p", { role: "heading", "aria-level": 3, className: "text-base font-bold text-on-surface", children: label })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: pads.map((pad, i) => {
                    // Preserve the per-cell accent exactly as the base: explicit
                    // `pad.color`, else position-derived, resolved through token classes.
                    const accent = pad.color ?? (0, types_1.padAccentKey)(i);
                    const isEmpty = pad.empty === true;
                    const isActive = active.has(pad.id);
                    const name = pad.label ?? pad.note ?? `Pad ${i + 1}`;
                    return ((0, jsx_runtime_1.jsx)("div", { className: "p-0.5", style: { width: `${100 / cols}%` }, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: isEmpty || !onPadPress, "aria-pressed": isActive, "aria-label": isEmpty ? `${name}, empty` : name, onClick: () => onPadPress?.(pad, i), className: (0, cn_1.cn)('relative flex w-full flex-col items-center justify-center gap-1', minH, 'rounded-[var(--xen-radius-md)] border transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1', isEmpty
                                ? 'border-dashed border-border bg-surface opacity-45'
                                : (0, cn_1.cn)(isActive
                                    ? (0, cn_1.cn)('border-2 shadow-sm', types_1.ACCENT_BORDER_CLASS[accent], types_1.ACCENT_STRONG_BG_CLASS[accent])
                                    : (0, cn_1.cn)('border-border', types_1.ACCENT_SOFT_BG_CLASS[accent]), 'hover:opacity-90')), children: [isActive ? (
                                // Non-color "playing" affordance: a filled accent corner dot.
                                (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute right-1 top-1 h-2 w-2 rounded-full', types_1.ACCENT_BG_CLASS[accent]) })) : null, pad.glyph ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: pad.glyph, size: "lg", color: isEmpty ? 'muted' : types_1.ACCENT_ICON_COLOR[accent] })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('max-w-full truncate text-xs', isEmpty ? 'text-muted' : 'text-on-surface', isActive ? 'font-bold' : 'font-semibold', !isEmpty && types_1.ACCENT_TEXT_CLASS[accent]), children: isEmpty ? '—' : name })] }) }, pad.id));
                }) })] }));
});
//# sourceMappingURL=TrackPadV4.js.map
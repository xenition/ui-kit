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
exports.BPMControlV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const types_1 = require("./types");
/**
 * BPMControl — **V4** "session" design (web parity of the native V4). The
 * tactile take on a tempo control: big **bold tabular-nums** numerals on a
 * rounded token surface, flanked by satisfying ≥44px round −/＋ steppers.
 * Honors every `variant` — `stepper` (readout + steppers), `inline` (compact
 * single-row), and `tap` (adds a soft-primary "Tap" tempo button firing
 * `onTap`). Steps clamp to `[min, max]` via `clamp` and render through
 * `formatBpm`; `playing` lights a non-color `♪` marker. No gradient — transport
 * controls stay clean/tactile. All colors from `--xen-*` token classes.
 */
exports.BPMControlV4 = React.forwardRef(function BPMControlV4({ value, min = 40, max = 300, step = 1, variant = 'stepper', playing = false, disabled = false, onChange, onTap, className, ...rest }, ref) {
    const safe = (0, types_1.clamp)(value, min, max);
    const compact = variant === 'inline';
    const bump = (delta) => {
        if (disabled)
            return;
        onChange?.((0, types_1.clamp)(safe + delta, min, max));
    };
    const stepBtn = (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xl font-bold text-on-surface transition-colors', 'hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1', 'disabled:opacity-40');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('inline-flex items-center justify-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-sm)]', disabled && 'opacity-60', className), ...rest, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Decrease tempo", disabled: disabled || safe <= min, onClick: () => bump(-step), className: stepBtn, children: "\u2212" }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col items-center', compact ? 'min-w-[64px]' : 'min-w-[104px]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [playing ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u266A", size: "sm", color: "primary", "aria-label": "playing" }) : null, (0, jsx_runtime_1.jsx)("span", { "aria-label": `Tempo ${(0, types_1.formatBpm)(safe)} beats per minute${playing ? ', playing' : ''}`, className: (0, cn_1.cn)('font-extrabold tabular-nums text-on-surface', compact ? 'text-xl' : 'text-3xl'), children: (0, types_1.formatBpm)(safe) })] }), !compact ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: "BPM" }) : null] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Increase tempo", disabled: disabled || safe >= max, onClick: () => bump(step), className: stepBtn, children: "\uFF0B" }), variant === 'tap' ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Tap tempo", disabled: disabled, onClick: () => onTap?.(), className: (0, cn_1.cn)('flex h-11 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/15 px-[var(--xen-space-md)] text-sm font-bold text-primary transition-colors', 'hover:bg-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-40'), children: "Tap" })) : null] }));
});
//# sourceMappingURL=BPMControlV4.js.map
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
exports.LoopControl = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const types_1 = require("./types");
/**
 * A loop-region control — a UI shell only, it loops no transport, and the DOM
 * parity of `native/music`'s `LoopControl`. Shows a loop on/off toggle (state
 * via `aria-pressed` + fill, not color alone) and, in the `bar` variant, a strip
 * visualizing the `[start, end]` region over `totalBars` with −/＋ steppers that
 * report through `onRegionChange`. All bounds are clamped/guarded. Token-only.
 */
exports.LoopControl = React.forwardRef(function LoopControl({ enabled, start = 1, end = 4, totalBars = 8, variant = 'bar', disabled = false, onToggle, onRegionChange, className, ...rest }, ref) {
    const bars = Math.max(1, Math.trunc(Number.isFinite(totalBars) ? totalBars : 8));
    const s = (0, types_1.clamp)(Math.trunc(start), 1, bars);
    const e = (0, types_1.clamp)(Math.trunc(end), s, bars);
    const setRegion = (ns, ne) => {
        if (disabled)
            return;
        const cs = (0, types_1.clamp)(ns, 1, bars);
        const ce = (0, types_1.clamp)(ne, cs, bars);
        onRegionChange?.(cs, ce);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: disabled, "aria-pressed": enabled, "aria-label": enabled ? 'Turn loop off' : 'Turn loop on', onClick: () => onToggle?.(!enabled), className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1', disabled && 'opacity-50', enabled ? 'border-primary bg-primary/10' : 'border-border bg-transparent hover:bg-primary/10'), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD01", size: "sm", color: enabled ? 'primary' : 'muted' }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-bold', enabled ? 'text-primary' : 'text-muted'), children: ["Loop ", enabled ? 'On' : 'Off'] })] }), variant === 'bar' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": `Loop region bars ${s} to ${e} of ${bars}`, className: "flex h-4 gap-px", children: Array.from({ length: bars }).map((_, i) => {
                            const bar = i + 1;
                            const inRegion = bar >= s && bar <= e;
                            return ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex-1 rounded-[var(--xen-radius-sm)]', inRegion && enabled ? 'bg-primary' : inRegion ? 'bg-primary/30' : 'bg-border') }, bar));
                        }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(Stepper, { label: "Start", value: s, onDec: () => setRegion(s - 1, e), onInc: () => setRegion(s + 1, e), disabled: disabled }), (0, jsx_runtime_1.jsx)(Stepper, { label: "End", value: e, onDec: () => setRegion(s, e - 1), onInc: () => setRegion(s, e + 1), disabled: disabled })] })] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-muted", children: ["Bars ", s, "\u2013", e] }))] }));
});
function Stepper({ label, value, onDec, onInc, disabled, }) {
    const btn = (0, cn_1.cn)('flex h-[26px] w-[26px] items-center justify-center rounded-[var(--xen-radius-sm)] border border-border', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-40');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: label }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Decrease ${label.toLowerCase()} bar`, disabled: disabled, onClick: onDec, className: btn, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2212", size: "sm", color: "onSurface" }) }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-4 text-center text-sm font-bold text-on-surface", children: value }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Increase ${label.toLowerCase()} bar`, disabled: disabled, onClick: onInc, className: btn, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uFF0B", size: "sm", color: "onSurface" }) })] }));
}
//# sourceMappingURL=LoopControl.js.map
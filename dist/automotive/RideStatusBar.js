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
exports.RideStatusBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Canonical stage order + glyph + human label. */
const STAGES = [
    { key: 'requested', label: 'Requested', glyph: '🔍' },
    { key: 'arriving', label: 'Arriving', glyph: '🚗' },
    { key: 'in-trip', label: 'In trip', glyph: '🧭' },
    { key: 'completed', label: 'Completed', glyph: '🏁' },
];
/**
 * A ride lifecycle progress bar — walks `requested → arriving → in-trip →
 * completed`, marking each stage done / active / pending. Completed and active
 * stages are distinguished by a glyph (✓ / the stage icon) and a spelled-out
 * label plus an a11y label, so progress never rests on color alone. A
 * `cancelled` flag overrides with an explicit cancelled state. Colors come from
 * `--xen-*` token classes — no literal colors. The `stage` is matched against a
 * known set and falls back safely if unrecognised. Web parity of the native
 * `RideStatusBar`.
 */
exports.RideStatusBar = React.forwardRef(function RideStatusBar({ stage, detail, cancelled = false, variant = 'stepper', className, ...rest }, ref) {
    const activeIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
    const compact = variant === 'compact';
    if (cancelled) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ride-status": "cancelled", "aria-label": "Ride cancelled", className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-danger bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base text-danger", children: "\u2715" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block text-sm font-bold text-danger", children: "Cancelled" }), detail ? (0, jsx_runtime_1.jsx)("span", { className: "block text-xs text-muted", children: detail }) : null] })] }));
    }
    const current = STAGES[activeIndex] ?? STAGES[0];
    const a11y = `Ride status: ${current.label}, step ${activeIndex + 1} of ${STAGES.length}${detail ? `, ${detail}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ride-status": current.key, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-start", "aria-hidden": "true", children: STAGES.map((s, i) => {
                    const done = i < activeIndex;
                    const active = i === activeIndex;
                    const isLast = i === STAGES.length - 1;
                    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col items-center', compact ? 'w-[30px]' : 'w-16'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold', done
                                            ? 'bg-primary text-on-primary'
                                            : active
                                                ? 'border-2 border-primary bg-primary-50 text-on-surface'
                                                : 'bg-neutral-100 text-on-surface'), children: done ? '✓' : s.glyph }), !compact ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-[var(--xen-space-xs)] truncate text-xs', active ? 'font-bold text-on-surface' : 'font-medium text-muted'), children: s.label })) : null] }), !isLast ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-[13px] h-0.5 flex-1 rounded-full', i < activeIndex ? 'bg-primary' : 'bg-neutral-200') })) : null] }, s.key));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: current.label }), detail ? (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: ["\u00B7 ", detail] }) : null] })] }));
});
//# sourceMappingURL=RideStatusBar.js.map
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
exports.ScanRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * A single scan event row. The kit ships no barcode renderer, so the code is
 * shown as text beside a **token-bar placeholder** that evokes a barcode
 * (alternating neutral-ramp bars, purely decorative and hidden from a11y). The
 * scan kind is carried by a glyph + word chip. Clickable when `onClick` is set.
 * All colors are theme tokens — no literal colors, no scan/barcode dependency.
 * Web parity of the native `ScanRow`.
 */
exports.ScanRow = React.forwardRef(function ScanRow({ code, kind, location, time, operator, onClick, className, ...rest }, ref) {
    const meta = internal_1.SCAN_META[kind] ?? internal_1.SCAN_META.inbound;
    const interactive = (0, internal_1.pressableProps)(onClick);
    // Deterministic pseudo-barcode widths from the code (decorative placeholder).
    const bars = React.useMemo(() => {
        const out = [];
        for (let i = 0; i < 14; i += 1) {
            const ch = code.charCodeAt(i % Math.max(code.length, 1)) || 1;
            out.push((ch % 3) + 1);
        }
        return out;
    }, [code]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${meta.label} scan ${code}${location ? ` at ${location}` : ''}` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-8 w-10 shrink-0 items-center gap-px overflow-hidden rounded-[var(--xen-radius-sm)] bg-neutral-100 px-[3px]", children: bars.map((w, i) => ((0, jsx_runtime_1.jsx)("span", { className: "h-[70%] bg-on-surface", style: { width: `${w}px` } }, i))) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: code }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs', internal_1.TONE_TEXT[meta.tone]), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TONE_TEXT[meta.tone]), children: meta.label }), location ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: `· ${location}` }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-on-surface", children: time }) : null, operator ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: operator }) : null] })] }));
});
//# sourceMappingURL=ScanRow.js.map
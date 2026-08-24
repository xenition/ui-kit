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
exports.SignaturePad = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A signature capture block. Because the kit adds no drawing dependency, this
 * is a dependency-free capture-state surface: an empty state (a dashed baseline
 * + "Click to sign" prompt as a real `<button>` firing `onSign`) and a captured
 * state (the signer name over a baseline, a timestamp, and a Clear action that
 * fires `onClear`). Capture is conveyed by text + a check glyph, not color
 * alone. All colors trace to `--xen-*` tokens — no literals.
 */
exports.SignaturePad = React.forwardRef(function SignaturePad({ label, signed = false, signerName, signedAt, onSign, onClear, disabled = false, className, style }, ref) {
    const header = label != null ? ((0, jsx_runtime_1.jsx)("span", { className: "mb-[var(--xen-space-xs)] block text-xs font-semibold text-muted", children: label })) : null;
    if (signed) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, style: style, children: [header, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-success/[0.06] p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-h-[48px] flex-col justify-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-xl font-semibold italic text-on-surface", children: signerName ?? 'Signed' }), (0, jsx_runtime_1.jsx)("span", { className: "mt-[var(--xen-space-xs)] block h-px w-full bg-border" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "success", "aria-label": "Signed" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Captured", signedAt != null ? ` · ${signedAt}` : ''] })] }), onClear ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "danger", size: "sm", onClick: onClear, disabled: disabled, children: "Clear" })) : null] })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, style: style, children: [header, (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": label != null ? `${label}: click to sign` : 'Click to sign', disabled: disabled || onSign == null, onClick: onSign, className: (0, cn_1.cn)('flex w-full flex-col items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)]', 'border border-dashed border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-xl)]', 'transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50'), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u270D", size: "2xl", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-muted", children: "Click to sign" }), (0, jsx_runtime_1.jsx)("span", { className: "mt-[var(--xen-space-sm)] block h-px w-4/5 bg-border" })] })] }));
});
//# sourceMappingURL=SignaturePad.js.map
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
exports.ClaimRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const pressable_1 = require("./internal/pressable");
/** Tone → status-dot fill (token utility, never a literal color). */
const DOT_BG = {
    neutral: 'bg-on-surface',
    muted: 'bg-muted',
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
};
/** Tone → status-label text slot (neutral reads muted, approved success…). */
const LABEL_TEXT = {
    neutral: 'text-muted',
    muted: 'text-muted',
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
};
/**
 * ClaimRow, redesigned (**V3**) — a **dense one-liner**. A small status dot
 * (colored by the claim tone) sits ahead of the status glyph + label, then the
 * title and claim number share the line, and the amount + date close it on the
 * right. Status is still glyph + text + color (never color-alone). Tight
 * vertical rhythm packs long claims lists. Becomes a keyboard-operable button
 * only when `onClick` is set. Same `ClaimRowProps`; drops in for `ClaimRow`.
 * Token-pure.
 */
exports.ClaimRowV3 = React.forwardRef(function ClaimRowV3({ claimNumber, title, status, amountCents, currency = 'USD', date, formatMoney: format = format_1.formatMoney, onClick, className, ...rest }, ref) {
    const sd = (0, status_1.claimStatus)(status);
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `Claim ${claimNumber}, ${title}, ${sd.label}` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-2 w-2 shrink-0 rounded-full', DOT_BG[sd.tone]) }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('shrink-0 text-xs font-semibold', LABEL_TEXT[sd.tone]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-sm font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: claimNumber })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 items-baseline gap-[var(--xen-space-xs)]", children: [amountCents != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: format(Math.max(0, Math.trunc(amountCents)), currency) })) : null, date != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: date }) : null] })] }));
});
//# sourceMappingURL=ClaimRowV3.js.map
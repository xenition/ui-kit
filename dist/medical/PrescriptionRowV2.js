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
exports.PrescriptionRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS = {
    active: { glyph: '✓', label: 'Active', text: 'text-success', tint: 'bg-success/10' },
    'refill-due': { glyph: '⏰', label: 'Refill due', text: 'text-warn', tint: 'bg-warn/10' },
    paused: { glyph: '⏸', label: 'Paused', text: 'text-muted', tint: 'bg-neutral-100' },
    expired: { glyph: '✕', label: 'Expired', text: 'text-danger', tint: 'bg-danger/10' },
};
/**
 * PrescriptionRow, redesigned (v2): an **elevated medication card**. A pill glyph
 * tile leads, the medication name + dose head the body over a directions line and
 * a refills-left chip, a tinted status pill (glyph + word) sits top-right, and a
 * Refill CTA shows when due. Distinct from v1's flat row. Same props, token-only.
 */
exports.PrescriptionRowV2 = React.forwardRef(function PrescriptionRowV2({ name, dose, frequency, refillsLeft, status = 'active', onRefill, onClick, className, ...rest }, ref) {
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-prescription-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name}${dose ? ` ${dose}` : ''}, ${st.label}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex flex-col gap-2 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xl", children: "\uD83D\uDC8A" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-bold text-on-surface", children: [name, " ", dose ? (0, jsx_runtime_1.jsx)("span", { className: "font-normal text-muted", children: dose }) : null] }), frequency ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: frequency }) : null, typeof refillsLeft === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "mt-1 inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: [refillsLeft, " refill", refillsLeft === 1 ? '' : 's', " left"] })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('rounded-full px-2 py-0.5 text-xs font-semibold', st.tint, st.text), children: [st.glyph, " ", st.label] })] }), status === 'refill-due' && onRefill ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", className: "w-full", onClick: (e) => { e.stopPropagation(); onRefill(); }, children: "Refill" })) : null] }));
});
//# sourceMappingURL=PrescriptionRowV2.js.map
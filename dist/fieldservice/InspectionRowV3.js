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
exports.InspectionRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const RESULT = {
    pass: { label: 'Pass', glyph: '✓', icon: 'success', text: 'text-success' },
    fail: { label: 'Fail', glyph: '✕', icon: 'danger', text: 'text-danger' },
    na: { label: 'N/A', glyph: '–', icon: 'muted', text: 'text-muted' },
    pending: { label: 'Pending', glyph: '○', icon: 'primary', text: 'text-primary' },
};
exports.InspectionRowV3 = React.forwardRef(function InspectionRowV3({ label, result, code, note, onClick, className, style }, ref) {
    const rd = RESULT[result] ?? RESULT.pending;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${label}, ${rd.label}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] border-b border-border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', interactive && 'cursor-pointer transition-colors hover:bg-neutral-100 motion-reduce:transition-none', className), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: rd.glyph, size: "sm", color: rd.icon, "aria-label": rd.label }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm font-semibold text-on-surface", children: [label, code != null ? (0, jsx_runtime_1.jsx)("span", { className: "font-normal text-muted", children: `   ${code}` }) : null] }), note != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: note }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs font-bold', rd.text), children: `${rd.glyph} ${rd.label}` })] }));
});
//# sourceMappingURL=InspectionRowV3.js.map
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
exports.LabResultRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATUS = {
    normal: { glyph: '✓', label: 'Normal', text: 'text-success' },
    low: { glyph: '↓', label: 'Low', text: 'text-warn' },
    high: { glyph: '↑', label: 'High', text: 'text-warn' },
    critical: { glyph: '‼', label: 'Critical', text: 'text-danger' },
};
/**
 * LabResultRow, redesigned (v3): a **dense panel line**. A status glyph leads,
 * the analyte name + reference range stack tight, and the value·unit pin right —
 * hairline-bordered so a full lab panel reads as a compact table. The opposite of
 * v2's card. Status is glyph + text, never color alone. Same props, token-only.
 */
exports.LabResultRowV3 = React.forwardRef(function LabResultRowV3({ name, value, unit, referenceRange, status = 'normal', collectedAt, onClick, className, ...rest }, ref) {
    void collectedAt;
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-lab-result-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name}, ${st.label}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', st.text), "aria-hidden": true, children: st.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-on-surface", children: name }), referenceRange ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["Ref ", referenceRange] }) : null] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', st.text), children: value }), unit ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [" ", unit] }) : null] })] }));
});
//# sourceMappingURL=LabResultRowV3.js.map
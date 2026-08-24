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
exports.LabResultRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATUS = {
    normal: { glyph: '✓', label: 'Normal', text: 'text-success', tint: 'bg-success/10' },
    low: { glyph: '↓', label: 'Low', text: 'text-warn', tint: 'bg-warn/10' },
    high: { glyph: '↑', label: 'High', text: 'text-warn', tint: 'bg-warn/10' },
    critical: { glyph: '‼', label: 'Critical', text: 'text-danger', tint: 'bg-danger/10' },
};
/**
 * LabResultRow, redesigned (v2): an **elevated result card**. The analyte name
 * leads; the measured value is a large figure colored by status with the unit
 * beside it and the reference range beneath; a tinted status pill (glyph + word)
 * anchors the right. Distinct from v1's flat line. Same props, token-only.
 */
exports.LabResultRowV2 = React.forwardRef(function LabResultRowV2({ name, value, unit, referenceRange, status = 'normal', collectedAt, onClick, className, ...rest }, ref) {
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-lab-result-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name}, ${st.label}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("p", { className: "flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold', st.text), children: value }), unit ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: unit }) : null] }), referenceRange ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["Ref: ", referenceRange] }) : null, collectedAt ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: collectedAt }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('rounded-full px-2.5 py-1 text-xs font-semibold', st.tint, st.text), children: [st.glyph, " ", st.label] })] }));
});
//# sourceMappingURL=LabResultRowV2.js.map
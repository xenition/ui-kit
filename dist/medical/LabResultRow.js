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
exports.LabResultRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const STATUS_META = {
    normal: { glyph: '✓', label: 'Normal', tone: 'success' },
    low: { glyph: '▼', label: 'Low', tone: 'warn' },
    high: { glyph: '▲', label: 'High', tone: 'warn' },
    critical: { glyph: '⚠', label: 'Critical', tone: 'danger' },
};
/**
 * A single lab-result row — the web mirror of the native `LabResultRow`. Shows
 * the analyte name, measured value + unit, reference range, and a normal / low
 * / high / critical flag. The flag is rendered as a glyph (`✓ ▼ ▲ ⚠`) plus a
 * text label plus a warn/danger token color, so an abnormal result is never
 * signalled by color alone (accessibility + the token contract). When `onClick`
 * is set the row is a keyboard-activatable `role="button"`. Token-only colors.
 * Informational UI only — not a medical device.
 */
exports.LabResultRow = React.forwardRef(function LabResultRow({ name, value, unit, referenceRange, status = 'normal', collectedAt, onClick, className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.normal;
    const toneClass = internal_1.TEXT_TONE[meta.tone];
    const abnormal = status !== 'normal';
    const interactive = !!onClick;
    const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${referenceRange ? `, reference ${referenceRange}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-lab-result-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: name }), referenceRange ? ((0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted", children: ["Ref ", referenceRange, unit ? ` ${unit}` : ''] })) : null, collectedAt ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: collectedAt }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-lg font-bold', abnormal ? toneClass : 'text-on-surface'), children: [value, unit ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-medium", children: [" ", unit] }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-bold', toneClass), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), meta.label] })] })] }));
});
//# sourceMappingURL=LabResultRow.js.map
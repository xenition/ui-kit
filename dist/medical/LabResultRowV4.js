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
exports.LabResultRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const internal_1 = require("./internal");
const STATUS_META = {
    normal: { glyph: '✓', label: 'Normal', tone: 'success' },
    low: { glyph: '▼', arrow: '↓', label: 'Low', tone: 'warn' },
    high: { glyph: '▲', arrow: '↑', label: 'High', tone: 'warn' },
    critical: { glyph: '⚠', arrow: '↑', label: 'Critical', tone: 'danger' },
};
/** MedicalTone → BadgeTone (identical members). */
const BADGE_TONE = {
    primary: 'primary',
    muted: 'muted',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
    accent: 'accent',
};
/**
 * LabResultRow — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a lab result: an elevated rounded row with a soft shadow, the
 * analyte name, a big legible **tabular-nums** value + unit, and a normal / low /
 * high / critical flag. Out-of-range values are colored by tone and marked with
 * an ↑/↓ arrow plus a labelled status Badge, so an abnormal result is never
 * signalled by color alone (accessibility + the token contract). Honors the V4
 * `variant` — `full` (default, shows the reference range) and `compact` (a denser
 * single line that hides the reference-range detail) — identical props/behavior
 * to {@link LabResultRowProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
exports.LabResultRowV4 = React.forwardRef(function LabResultRowV4({ name, value, unit, referenceRange, status = 'normal', collectedAt, onClick, variant = 'full', className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.normal;
    const toneClass = internal_1.TEXT_TONE[meta.tone];
    const abnormal = status !== 'normal';
    const interactive = !!onClick;
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${referenceRange ? `, reference ${referenceRange}` : ''}`;
    const commonProps = {
        ref,
        'data-xen-lab-result-row': '',
        role: interactive ? 'button' : undefined,
        tabIndex: interactive ? 0 : undefined,
        'aria-label': a11y,
        onClick: interactive ? () => onClick?.() : undefined,
        onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined,
    };
    const valueNode = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('tabular-nums', abnormal ? toneClass : 'text-on-surface'), children: [abnormal && meta.arrow ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "mr-0.5", children: meta.arrow })) : null, value, unit ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-medium", children: [" ", unit] }) : null] }));
    // ── compact: denser single line ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ...commonProps, className: (0, cn_1.cn)(shell, 'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer transition-opacity hover:opacity-80', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "ml-auto text-base font-bold", children: valueNode }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: BADGE_TONE[meta.tone], variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ...commonProps, className: (0, cn_1.cn)(shell, 'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer transition-opacity hover:opacity-80', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: name }), referenceRange ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex w-fit items-center rounded-[var(--xen-radius-sm)] bg-primary/10 px-[var(--xen-space-xs)] text-xs text-muted", children: ["Ref ", referenceRange, unit ? ` ${unit}` : ''] })) : null, collectedAt ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: collectedAt }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold", children: valueNode }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: BADGE_TONE[meta.tone], variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] })] })] }));
});
//# sourceMappingURL=LabResultRowV4.js.map
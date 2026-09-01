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
exports.VitalsPanelV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
const STATUS_META = {
    normal: { glyph: '✓', label: 'Normal', tone: 'success' },
    low: { glyph: '↓', label: 'Low', tone: 'warn' },
    high: { glyph: '↑', label: 'High', tone: 'warn' },
    critical: { glyph: '⚠', label: 'Critical', tone: 'danger' },
};
/**
 * VitalsPanel — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a vitals dashboard: an elevated rounded surface with a soft
 * shadow holding a responsive grid of reading tiles (heart rate, blood pressure,
 * SpO₂, temperature, …). Each tile shows a big legible **tabular-nums** value +
 * unit; when a reading is abnormal it is flagged by an ↑/↓ (or ⚠) glyph + a text
 * label + a warn/danger token tone, so severity is never color alone. Renders a
 * loading skeleton and an empty state (`EmptyState`). Identical props/behavior to
 * {@link VitalsPanelProps}. All colors from `--xen-*` token classes (no literals).
 * Informational UI only — not a medical device.
 */
exports.VitalsPanelV4 = React.forwardRef(function VitalsPanelV4({ vitals, title, loading = false, emptyLabel = 'No vitals recorded', className, ...rest }, ref) {
    const header = title ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: title }) : null;
    const shell = 'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]';
    let body;
    if (loading) {
        body = ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading vitals", "aria-busy": "true", className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-20 min-w-[47%] flex-1 rounded-[var(--xen-radius-md)] bg-neutral-100" }, i))) }));
    }
    else if (vitals.length === 0) {
        body = (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { "data-xen-vitals-empty": "", title: emptyLabel });
    }
    else {
        body = ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: vitals.map((v, i) => {
                const meta = v.status ? STATUS_META[v.status] : undefined;
                const abnormal = v.status != null && v.status !== 'normal';
                const toneClass = meta ? internal_1.TEXT_TONE[meta.tone] : 'text-on-surface';
                return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-vital-tile": "", "aria-label": `${v.label}: ${String(v.value)}${v.unit ? ` ${v.unit}` : ''}${meta ? `, ${meta.label}` : ''}`, className: "flex min-w-[47%] flex-1 flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted", children: [v.glyph ? `${v.glyph} ` : '', v.label] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-2xl font-bold tabular-nums', abnormal ? toneClass : 'text-on-surface'), children: [v.value, v.unit ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-medium", children: [" ", v.unit] }) : null] }), meta ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold', abnormal ? 'bg-primary/10' : 'bg-neutral-100', toneClass), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), meta.label] })) : null] }, `${v.label}-${i}`));
            }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-vitals-panel": "", className: (0, cn_1.cn)(shell, className), ...rest, children: [header, body] }));
});
//# sourceMappingURL=VitalsPanelV4.js.map
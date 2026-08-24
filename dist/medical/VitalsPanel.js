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
exports.VitalsPanel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
const STATUS_META = {
    normal: { glyph: '✓', label: 'Normal', tone: 'success' },
    low: { glyph: '▼', label: 'Low', tone: 'warn' },
    high: { glyph: '▲', label: 'High', tone: 'warn' },
    critical: { glyph: '⚠', label: 'Critical', tone: 'danger' },
};
/**
 * A vitals dashboard panel — the web mirror of the native `VitalsPanel`. A
 * responsive grid of reading tiles (heart rate, blood pressure, SpO₂,
 * temperature, …). Each tile shows value + unit and, when flagged, a normal /
 * low / high / critical marker drawn as a glyph + label + warn/danger token
 * color so it is never color-only. Renders a loading skeleton and an empty
 * state (`EmptyState`). Token-only colors. Informational UI only — not a medical
 * device.
 */
exports.VitalsPanel = React.forwardRef(function VitalsPanel({ vitals, title, loading = false, emptyLabel = 'No vitals recorded', className, ...rest }, ref) {
    const header = title ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: title }) : null;
    let body;
    if (loading) {
        body = ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading vitals", "aria-busy": "true", className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-16 min-w-[47%] flex-1 rounded-[var(--xen-radius-md)] bg-neutral-100" }, i))) }));
    }
    else if (vitals.length === 0) {
        body = (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { "data-xen-vitals-empty": "", title: emptyLabel });
    }
    else {
        body = ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: vitals.map((v, i) => {
                const meta = v.status ? STATUS_META[v.status] : undefined;
                const abnormal = v.status != null && v.status !== 'normal';
                const toneClass = meta ? internal_1.TEXT_TONE[meta.tone] : 'text-on-surface';
                return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-vital-tile": "", "aria-label": `${v.label}: ${String(v.value)}${v.unit ? ` ${v.unit}` : ''}${meta ? `, ${meta.label}` : ''}`, className: "flex min-w-[47%] flex-1 flex-col gap-0.5 rounded-[var(--xen-radius-md)] bg-neutral-100 p-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted", children: [v.glyph ? `${v.glyph} ` : '', v.label] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xl font-bold', abnormal ? toneClass : 'text-on-surface'), children: [v.value, v.unit ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-medium", children: [" ", v.unit] }) : null] }), meta ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-bold', toneClass), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), meta.label] })) : null] }, `${v.label}-${i}`));
            }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-vitals-panel": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [header, body] }));
});
//# sourceMappingURL=VitalsPanel.js.map
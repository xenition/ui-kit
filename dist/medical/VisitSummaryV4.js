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
exports.VisitSummaryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * VisitSummary — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on a visit / encounter summary, and the ONE reserved
 * gradient moment of the medical V4 "clinic" line: the header (visit title,
 * provider, visit date) rides a brand-gradient ground
 * (`bg-gradient-to-br from-primary-500 to-primary-700`) in near-white ink
 * (`text-primary-50`/`text-primary-100`), with the diagnosis carried as a
 * frosted glass chip (`bg-primary-50/15 border border-primary-50/30`). The body
 * — the structured note sections — stays on the plain surface with clear
 * labelled rows. Renders loading and empty (`EmptyState`) states. Identical
 * props/behavior to {@link VisitSummaryProps}. Token-only colors (`--xen-*` /
 * gradient utilities), no literals. Informational UI only — not a medical
 * device.
 */
exports.VisitSummaryV4 = React.forwardRef(function VisitSummaryV4({ title, provider, date, diagnosis, sections, loading = false, emptyLabel = 'No visit notes available', className, ...rest }, ref) {
    const list = sections ?? [];
    const meta = [provider, date].filter(Boolean);
    const shell = 'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-visit-summary": "", "aria-label": "Loading visit summary", "aria-busy": "true", className: (0, cn_1.cn)(shell, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-[55%] rounded-[var(--xen-radius-sm)] bg-primary-50/25" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[70%] rounded-[var(--xen-radius-sm)] bg-primary-50/20" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[80%] rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[65%] rounded-[var(--xen-radius-sm)] bg-neutral-100" })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-visit-summary": "", "aria-label": `Visit summary: ${title}`, className: (0, cn_1.cn)(shell, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] text-primary-50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-primary-50", children: title }), meta.length ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-primary-100", children: meta.join('  ·  ') }) : null] }), diagnosis ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex self-start items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary-50", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83E\uDE7A" }), diagnosis] })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]", children: list.length === 0 ? ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { "data-xen-visit-empty": "", title: emptyLabel })) : (list.map((s, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase text-muted", children: s.heading }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: s.body })] }, `${s.heading}-${i}`)))) })] }));
});
//# sourceMappingURL=VisitSummaryV4.js.map
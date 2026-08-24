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
exports.ReportListing = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A report-a-listing form — a single-select list of reasons plus a details field
 * that becomes required when the chosen reason sets `requiresDetails`. Reasons
 * render as real `<button role="radio">`s (selection carried by an accent ring,
 * a filled dot, and `aria-checked` — not color alone); submit is disabled until
 * a valid reason (and any required details) is present, and an empty `reasons`
 * list degrades to an `EmptyState`. Presentational: a valid submit calls
 * `onSubmit(reasonId, details?)`. Reuses `Input`/`Button`/`EmptyState`;
 * token-only colors.
 */
exports.ReportListing = React.forwardRef(function ReportListing({ reasons, title = 'Report this listing', submitLabel = 'Submit report', loading = false, onSubmit, onCancel, className, ...rest }, ref) {
    const [selectedId, setSelectedId] = React.useState(null);
    const [details, setDetails] = React.useState('');
    const selected = reasons.find((r) => r.id === selectedId) ?? null;
    const detailsRequired = selected?.requiresDetails === true;
    const detailsOk = !detailsRequired || details.trim().length > 0;
    const valid = selected != null && detailsOk;
    const submit = () => {
        if (!valid || loading || selected == null)
            return;
        onSubmit?.(selected.id, details.trim() ? details.trim() : undefined);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: title }), reasons.length === 0 ? ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: "No report reasons available" })) : ((0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": title, className: "flex flex-col gap-[var(--xen-space-xs)]", children: reasons.map((reason) => {
                    const isSel = reason.id === selectedId;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": isSel, "aria-label": reason.label, onClick: () => setSelectedId(reason.id), className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', isSel ? 'border-primary bg-primary-50' : 'border-border bg-surface'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] border-2', isSel ? 'border-primary' : 'border-border'), children: isSel ? (0, jsx_runtime_1.jsx)("span", { className: "h-2 w-2 rounded-[var(--xen-radius-full)] bg-primary" }) : null }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base text-on-surface", children: reason.label })] }, reason.id));
                }) })), selected ? ((0, jsx_runtime_1.jsxs)("label", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-on-surface", children: detailsRequired ? 'Details (required)' : 'Details (optional)' }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { "data-testid": "xen-mkt-report-details", placeholder: "Add any specifics", value: details, onChange: (e) => setDetails(e.target.value), invalid: detailsRequired && !detailsOk && details.length > 0 })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onCancel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onClick: onCancel, className: "flex-1", children: "Cancel" })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "danger", onClick: submit, disabled: !valid || loading, className: "flex-1", children: loading ? 'Submitting…' : submitLabel })] })] }));
});
//# sourceMappingURL=ReportListing.js.map
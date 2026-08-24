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
exports.ClientProofRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const DECISION = {
    pending: { label: 'Pending', tone: 'neutral' },
    approved: { label: 'Approved', tone: 'success' },
    rejected: { label: 'Rejected', tone: 'danger' },
};
/**
 * A client-proofing row — thumbnail, filename, and a decision `Badge`, with
 * approve/reject actions while the proof is `pending`. The row body is a
 * keyboard-operable `checkbox` when `onToggleSelect` is provided (selection
 * carries an `aria-checked` state, never color alone). The action `<button>`s
 * stop propagation. Composes `Button` and `Badge`. Token-only colors.
 */
exports.ClientProofRow = React.forwardRef(function ClientProofRow({ filename, thumbUrl, decision = 'pending', selected = false, onToggleSelect, onApprove, onReject, approveLabel = 'Approve', rejectLabel = 'Reject', className, ...rest }, ref) {
    const meta = DECISION[decision];
    const selectable = typeof onToggleSelect === 'function';
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-11 w-11 shrink-0 overflow-hidden rounded-[var(--xen-radius-sm)] bg-neutral-100', selected && 'ring-2 ring-accent'), children: thumbUrl ? (0, jsx_runtime_1.jsx)("img", { src: thumbUrl, alt: "", className: "h-full w-full object-cover" }) : null }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: filename }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label })] })] }));
    const actions = decision === 'pending' && (onApprove || onReject) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-xs)]", children: [onReject ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "danger", onClick: (e) => {
                    e.stopPropagation();
                    onReject();
                }, children: rejectLabel })) : null, onApprove ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onClick: (e) => {
                    e.stopPropagation();
                    onApprove();
                }, children: approveLabel })) : null] })) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-client-proof-row": "", className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), ...rest, children: [selectable ? ((0, jsx_runtime_1.jsx)("div", { role: "checkbox", "aria-checked": selected, "aria-label": `${filename}, ${meta.label}`, tabIndex: 0, onClick: onToggleSelect, onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onToggleSelect?.();
                    }
                }, className: "flex flex-1 cursor-pointer items-center rounded-[var(--xen-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: body })) : (body), actions] }));
});
//# sourceMappingURL=ClientProofRow.js.map
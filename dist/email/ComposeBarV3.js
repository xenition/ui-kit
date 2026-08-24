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
exports.ComposeBarV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const AttachmentChip_1 = require("./AttachmentChip");
/**
 * ComposeBar — design **V3**. A **flat, full-width bar**: an edge-to-edge body
 * field sits above a hairline-divided row of **inline text actions** (Attach ·
 * Send) — no pill, no floating button, no elevation. Optional To/Subject fields
 * appear only when their controlled value is supplied. Send stays disabled until
 * there is a body or an attachment (and while `sending`), reading "Sending…" in
 * flight. Same props as `ComposeBar`. No literal colors.
 */
exports.ComposeBarV3 = React.forwardRef(function ComposeBarV3({ to, onChangeTo, subject, onChangeSubject, body = '', onChangeBody, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Write a message', sending = false, disabled = false, className, }, ref) {
    const staged = attachments ?? [];
    const hasAttachments = staged.length > 0;
    const canSend = !disabled && !sending && (body.trim().length > 0 || hasAttachments);
    const submit = () => {
        if (!canSend)
            return;
        onSend?.({ to, subject, body });
    };
    const fieldClass = 'w-full border-b border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-base text-on-surface placeholder:text-muted focus:outline-none disabled:opacity-50';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('border-t border-border bg-surface', className), children: [to !== undefined ? ((0, jsx_runtime_1.jsx)("input", { "aria-label": "To", type: "email", autoCapitalize: "none", disabled: disabled, value: to, onChange: (e) => onChangeTo?.(e.target.value), placeholder: "To", className: fieldClass })) : null, subject !== undefined ? ((0, jsx_runtime_1.jsx)("input", { "aria-label": "Subject", disabled: disabled, value: subject, onChange: (e) => onChangeSubject?.(e.target.value), placeholder: "Subject", className: fieldClass })) : null, hasAttachments ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)] p-[var(--xen-space-sm)]", children: staged.map((a) => ((0, jsx_runtime_1.jsx)(AttachmentChip_1.AttachmentChip, { name: a.name, kind: a.kind ?? 'file', size: a.size, onRemove: onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined }, a.id))) })) : null, (0, jsx_runtime_1.jsx)("textarea", { "aria-label": "Message body", rows: 2, disabled: disabled, value: body, onChange: (e) => onChangeBody?.(e.target.value), placeholder: placeholder, className: "max-h-[160px] min-h-[44px] w-full resize-none bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-base text-on-surface placeholder:text-muted focus:outline-none disabled:opacity-50" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center border-t border-border", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Attach file", disabled: disabled, onClick: onAttach, className: "inline-flex items-center gap-[var(--xen-space-xs)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-semibold text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCCE", color: "muted", size: "base" }), (0, jsx_runtime_1.jsx)("span", { children: "Attach" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1" }), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Send email", "aria-busy": sending || undefined, disabled: !canSend, onClick: submit, className: "inline-flex items-center gap-[var(--xen-space-xs)] px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] text-base font-bold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-40", children: [(0, jsx_runtime_1.jsx)("span", { children: sending ? 'Sending…' : 'Send' }), (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u27A4", color: "primary", size: "base" })] })] })] }));
});
//# sourceMappingURL=ComposeBarV3.js.map
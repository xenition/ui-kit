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
exports.ComposeBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const AttachmentChip_1 = require("./AttachmentChip");
/**
 * A mail compose surface — optional "To"/"Subject" fields (shown only when
 * their controlled value is supplied), a growing body `Textarea`, staged
 * attachment chips, an attach button, and a send button that stays disabled
 * until there's something to send (body text or an attachment) and while
 * `sending`. Every interactive element is a real `<button>`/field. Controlled;
 * emits an assembled `{ to, subject, body }` on send. No literal colors.
 */
exports.ComposeBar = React.forwardRef(function ComposeBar({ to, onChangeTo, subject, onChangeSubject, body = '', onChangeBody, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Write a message', sending = false, disabled = false, className, }, ref) {
    const staged = attachments ?? [];
    const hasAttachments = staged.length > 0;
    const canSend = !disabled && !sending && (body.trim().length > 0 || hasAttachments);
    const submit = () => {
        if (!canSend)
            return;
        onSend?.({ to, subject, body });
    };
    const fieldClass = 'w-full border-b border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-base text-on-surface placeholder:text-muted focus:outline-none disabled:opacity-50';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('border-t border-border bg-surface pb-[var(--xen-space-sm)]', className), children: [to !== undefined ? ((0, jsx_runtime_1.jsx)("input", { "aria-label": "To", type: "email", autoCapitalize: "none", disabled: disabled, value: to, onChange: (e) => onChangeTo?.(e.target.value), placeholder: "To", className: fieldClass })) : null, subject !== undefined ? ((0, jsx_runtime_1.jsx)("input", { "aria-label": "Subject", disabled: disabled, value: subject, onChange: (e) => onChangeSubject?.(e.target.value), placeholder: "Subject", className: fieldClass })) : null, hasAttachments ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)] p-[var(--xen-space-sm)]", children: staged.map((a) => ((0, jsx_runtime_1.jsx)(AttachmentChip_1.AttachmentChip, { name: a.name, kind: a.kind ?? 'file', size: a.size, onRemove: onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined }, a.id))) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] pt-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Attach file", disabled: disabled, onClick: onAttach, className: "inline-flex shrink-0 items-center pb-[var(--xen-space-sm)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCCE", color: "muted" }) }), (0, jsx_runtime_1.jsx)(primitives_1.Textarea, { "aria-label": "Message body", rows: 1, disabled: disabled, value: body, onChange: (e) => onChangeBody?.(e.target.value), placeholder: placeholder, className: "max-h-[140px] flex-1 rounded-[var(--xen-radius-lg)]" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Send email", "aria-busy": sending || undefined, disabled: !canSend, onClick: submit, className: (0, cn_1.cn)('inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary transition-opacity', 'hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'disabled:pointer-events-none disabled:opacity-40'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: sending ? '…' : '➤', color: "onPrimary" }) })] })] }));
});
//# sourceMappingURL=ComposeBar.js.map
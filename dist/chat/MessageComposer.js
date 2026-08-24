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
exports.MessageComposer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const AttachmentBar_1 = require("./AttachmentBar");
/**
 * Message input bar — an attach button, a growing multiline field, and a send
 * button that is disabled until there's something to send (text or a staged
 * attachment). Staged attachments preview above via `AttachmentBar`. Controlled
 * via `value`/`onChangeText`; emits `onSend`/`onAttach`. Enter sends (Shift+Enter
 * inserts a newline). No literal colors.
 */
exports.MessageComposer = React.forwardRef(function MessageComposer({ value = '', onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Message', disabled = false, className, ...rest }, ref) {
    const hasAttachments = (attachments?.length ?? 0) > 0;
    const canSend = !disabled && (value.trim().length > 0 || hasAttachments);
    const submit = () => {
        if (!canSend)
            return;
        onSend?.(value);
    };
    const onKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('border-t border-border bg-surface py-2', className), ...rest, children: [hasAttachments ? ((0, jsx_runtime_1.jsx)(AttachmentBar_1.AttachmentBar, { attachments: attachments ?? [], onRemove: onRemoveAttachment })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-2 px-4", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Add attachment", "aria-disabled": disabled || undefined, disabled: disabled, onClick: onAttach, className: "pb-2 disabled:opacity-50", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uFF0B", color: "muted" }) }), (0, jsx_runtime_1.jsx)("textarea", { "aria-label": "Message input", rows: 1, disabled: disabled, value: value, onChange: (e) => onChangeText?.(e.target.value), onKeyDown: onKeyDown, placeholder: placeholder, className: (0, cn_1.cn)('max-h-[120px] flex-1 resize-none bg-surface text-on-surface placeholder:text-muted', 'rounded-[var(--xen-radius-lg)] border border-border px-3 py-2 text-base', 'focus:outline-none focus:ring-1 focus:ring-primary', 'disabled:pointer-events-none disabled:opacity-50') }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Send message", "aria-disabled": !canSend, disabled: !canSend, onClick: submit, className: (0, cn_1.cn)('flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary', 'transition-opacity hover:opacity-85 disabled:opacity-40', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u27A4", color: "onPrimary" }) })] })] }));
});
//# sourceMappingURL=MessageComposer.js.map
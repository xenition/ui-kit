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
exports.MessageComposerV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const AttachmentBar_1 = require("./AttachmentBar");
/**
 * MessageComposer — **pill + FAB** variant. The attach button and the growing
 * field share one fully-rounded, primary-tinted capsule; the send affordance is
 * a separate prominent circular **FAB** that floats to the right of the pill and
 * lifts on a drop shadow once there's something to send. A softer, more modern
 * silhouette than the v1 bordered box + inline send. Same props as
 * `MessageComposer`. No literal colors.
 */
exports.MessageComposerV2 = React.forwardRef(function MessageComposerV2({ value = '', onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Message', disabled = false, className, ...rest }, ref) {
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('bg-surface py-2', className), ...rest, children: [hasAttachments ? ((0, jsx_runtime_1.jsx)(AttachmentBar_1.AttachmentBar, { attachments: attachments ?? [], onRemove: onRemoveAttachment })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-2 px-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 items-end gap-1 rounded-full border border-primary/10 bg-primary/5', 'py-1 pl-2 pr-3', disabled && 'opacity-50'), children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Add attachment", "aria-disabled": disabled || undefined, disabled: disabled, onClick: onAttach, className: "pb-2 disabled:pointer-events-none", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uFF0B", color: "primary" }) }), (0, jsx_runtime_1.jsx)("textarea", { "aria-label": "Message input", rows: 1, disabled: disabled, value: value, onChange: (e) => onChangeText?.(e.target.value), onKeyDown: onKeyDown, placeholder: placeholder, className: (0, cn_1.cn)('max-h-[120px] flex-1 resize-none bg-transparent py-1.5 text-base', 'text-on-surface placeholder:text-muted focus:outline-none', 'disabled:pointer-events-none') })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Send message", "aria-disabled": !canSend, disabled: !canSend, onClick: submit, className: (0, cn_1.cn)('flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary', 'transition hover:opacity-90 disabled:opacity-40', canSend && 'shadow-md hover:-translate-y-0.5', 'motion-reduce:transition-none motion-reduce:hover:transform-none', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u27A4", color: "onPrimary", size: "lg" }) })] })] }));
});
//# sourceMappingURL=MessageComposerV2.js.map
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
exports.MessageComposerV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const AttachmentBar_1 = require("./AttachmentBar");
/**
 * MessageComposer — **flat toolbar** variant. No pill and no circular button: a
 * borderless field flanked by a flat inline attach button on the left and a
 * plain **"Send"** text button on the right that lights up in the primary token
 * once there's something to send. The utilitarian, desktop-messenger
 * counterpart to the v1 bordered box and the v2 pill+FAB. Same props as
 * `MessageComposer`. Enter sends (Shift+Enter inserts a newline). No literal
 * colors.
 */
exports.MessageComposerV3 = React.forwardRef(function MessageComposerV3({ value = '', onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Message', disabled = false, className, ...rest }, ref) {
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('border-t border-border bg-surface py-1', className), ...rest, children: [hasAttachments ? ((0, jsx_runtime_1.jsx)(AttachmentBar_1.AttachmentBar, { attachments: attachments ?? [], onRemove: onRemoveAttachment })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1 px-2", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Add attachment", "aria-disabled": disabled || undefined, disabled: disabled, onClick: onAttach, className: "p-1 disabled:pointer-events-none disabled:opacity-50", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uFF0B", color: "muted", size: "lg" }) }), (0, jsx_runtime_1.jsx)("textarea", { "aria-label": "Message input", rows: 1, disabled: disabled, value: value, onChange: (e) => onChangeText?.(e.target.value), onKeyDown: onKeyDown, placeholder: placeholder, className: (0, cn_1.cn)('max-h-[120px] flex-1 resize-none border-0 bg-transparent px-1 py-2 text-base', 'text-on-surface placeholder:text-muted focus:outline-none focus:ring-0', 'disabled:pointer-events-none disabled:opacity-50') }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Send message", "aria-disabled": !canSend, disabled: !canSend, onClick: submit, className: (0, cn_1.cn)('shrink-0 px-2 py-1 text-base font-bold transition-opacity', canSend ? 'text-primary hover:opacity-70' : 'text-muted opacity-40'), children: "Send" })] })] }));
});
//# sourceMappingURL=MessageComposerV3.js.map
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
exports.ReplyBox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * ReplyBox — **V4** "calm console" agent reply composer. A controlled,
 * rounded composer: an optional row of soft-primary quick-pick chips (canned
 * replies) above a multiline input, with a single primary **Send** button
 * (≥44px tap target) that disables when empty or sending. One accent = primary.
 * ⌘/Ctrl+Enter submits. Fully controlled — `value` in, `onChangeText`/`onChange`
 * + `onSend` out; nothing fetches. All colors from `--xen-*` token classes
 * (no literal hex). Dark-mode safe.
 */
exports.ReplyBox = React.forwardRef(function ReplyBox({ value, onChangeText, onChange, onSend, placeholder = 'Write a reply…', sending = false, disabled = false, cannedReplies, onPickCanned, sendLabel = 'Send', className, ...rest }, ref) {
    const canSend = !disabled && !sending && value.trim().length > 0 && typeof onSend === 'function';
    const handleChange = (event) => {
        onChange?.(event);
        onChangeText(event.target.value);
    };
    const handleKeyDown = (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'Enter' && canSend) {
            event.preventDefault();
            onSend();
        }
    };
    const hasChips = Array.isArray(cannedReplies) && cannedReplies.length > 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 shadow-sm', className), ...rest, children: [hasChips ? ((0, jsx_runtime_1.jsx)("div", { role: "group", "aria-label": "Quick replies", className: "flex flex-wrap gap-2", children: cannedReplies.map((reply) => ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled || sending, onClick: onPickCanned ? () => onPickCanned(reply.id) : undefined, "aria-label": `Insert quick reply: ${reply.label}`, className: (0, cn_1.cn)('inline-flex min-h-[32px] items-center rounded-full bg-primary/10 px-3 text-xs font-bold text-primary', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', disabled || sending ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'), children: reply.label }, reply.id))) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-2", children: [(0, jsx_runtime_1.jsx)("textarea", { "aria-label": "Write a reply", value: value, onChange: handleChange, onKeyDown: handleKeyDown, disabled: disabled || sending, placeholder: placeholder, rows: 2, className: (0, cn_1.cn)('min-h-[44px] flex-1 resize-y rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2 text-sm text-on-surface', 'placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:opacity-50') }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { type: "button", variant: "primary", size: "md", "aria-label": sendLabel, disabled: !canSend, onClick: canSend ? () => onSend() : undefined, className: "min-h-[44px] font-bold", children: sending ? 'Sending…' : sendLabel })] })] }));
});
//# sourceMappingURL=ReplyBox.js.map
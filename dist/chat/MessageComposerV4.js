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
exports.MessageComposerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const AttachmentBarV4_1 = require("./AttachmentBarV4");
/**
 * **V4 message composer** — the web twin of the native `MessageComposerV4`,
 * same props as {@link MessageComposer} plus `sendLabel`, `attachLabel` and
 * `maxLines`.
 *
 * ## Four changes
 *
 * 1. **Send is dead on an empty message.** The base fired `onSend('')` on a
 *    blank field and on whitespace, so an app either sent an empty bubble or
 *    had to re-check the same condition at every call site.
 * 2. **The field stops growing.** See `maxLines`.
 * 3. **Both controls clear 44 and carry names.** They were bare glyphs.
 * 4. **Enter sends, Shift+Enter breaks the line** — the convention every chat
 *    client shares, which the base left to the caller.
 */
exports.MessageComposerV4 = React.forwardRef(function MessageComposerV4({ value = '', onChangeText, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Message', disabled = false, sendLabel = 'Send', attachLabel = 'Add attachment', maxLines = 5, className, ...rest }, ref) {
    // Empty — or whitespace-only — is not a message. The base sent it anyway.
    const canSend = value.trim().length > 0 && !disabled;
    const send = () => {
        if (!canSend)
            return;
        onSend?.(value);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-composer": "", className: (0, cn_1.cn)('flex flex-col gap-xs border-t border-border bg-surface px-md py-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)(AttachmentBarV4_1.AttachmentBarV4, { attachments: attachments ?? [], onRemove: onRemoveAttachment }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-sm", children: [onAttach && ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": attachLabel, disabled: disabled, onClick: onAttach, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('inline-flex aspect-square shrink-0 items-center justify-center rounded-full text-lg text-muted-text disabled:opacity-[0.38]', chrome_v4_1.MIN_TAP_CLASS), children: "\uFF0B" })), (0, jsx_runtime_1.jsx)("textarea", { rows: 1, value: value, disabled: disabled, placeholder: placeholder, "aria-label": placeholder, onChange: (event) => onChangeText?.(event.target.value), onKeyDown: (event) => {
                            // Enter sends, Shift+Enter breaks the line.
                            if (event.key === 'Enter' && !event.shiftKey) {
                                event.preventDefault();
                                send();
                            }
                        }, className: (0, cn_1.cn)('min-h-0 flex-1 resize-none rounded-[var(--xen-radius-lg)] border border-border bg-card px-md py-sm text-sm text-on-card', 'placeholder:text-muted-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', 'disabled:opacity-[0.38]', chrome_v4_1.MIN_TAP_CLASS), 
                        // Bounded growth: a pasted paragraph scrolls inside the field
                        // rather than pushing send off the screen.
                        style: { maxHeight: `calc(${maxLines} * 1.5rem + var(--xen-space-md))` } }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": sendLabel, 
                        // Dead on an empty message, rather than sending one.
                        disabled: !canSend, onClick: send, "data-xen-v4-chrome": "on-primary", className: (0, cn_1.cn)('inline-flex aspect-square shrink-0 items-center justify-center rounded-full bg-primary text-lg text-on-primary', 'disabled:opacity-[0.38]', chrome_v4_1.MIN_TAP_CLASS), children: "\u2191" })] })] }));
});
//# sourceMappingURL=MessageComposerV4.js.map
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
exports.ComposeBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const field_v4_1 = require("../primitives/internal/field-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const AttachmentChipV4_1 = require("./AttachmentChipV4");
const mail_v4_1 = require("./internal/mail-v4");
/** 44 on both axes for a glyph control, composed from the spacing scale. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
/**
 * The To / Subject fields: an underline rule in `input`, not `border`.
 *
 * `border` is the hairline slot — the rule *between* two things. `input` is the
 * slot the theme ships for the edge of a control someone types into, and it is
 * the one that stays visible when the two are tuned apart.
 */
const FIELD_CLASS = [
    'w-full border-b border-input bg-surface px-md py-sm',
    'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
    'text-base text-on-surface placeholder:text-muted-text',
    'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');
/**
 * **V4 compose bar** — same props as {@link ComposeBar} plus `attachLabel`,
 * `sendLabel` and `maxLines`.
 *
 * ## Four changes
 *
 * 1. **Send stops firing with no recipient.** `canSend` tested the body and
 *    the attachments and never tested `to`, so one character of body — or a
 *    single staged file — enabled Send and `onSend({ to: '', … })` went out.
 *    The test is now `canSendMail`, shared with the native twin so the two bars
 *    cannot disagree about what a sendable draft is.
 * 2. **The body actually grows here.** Both docblocks advertised a growing
 *    field and only native had one; the web bar was a one-row `Textarea` with a
 *    `max-h` on it, so a four-line reply was typed through a one-line slot.
 *    It now grows to `maxLines` and scrolls after that.
 * 3. **The attach control clears 44** — it was a glyph with no box beside a
 *    44 send button, and it is the control a user reaches for while holding
 *    the phone one-handed.
 * 4. **Press is a state layer, disabled is 0.38, and the fields are outlined
 *    in `input`** — the bar dimmed its own controls on hover at exactly the
 *    band M3 spends on unavailable.
 */
exports.ComposeBarV4 = React.forwardRef(function ComposeBarV4({ to, onChangeTo, subject, onChangeSubject, body = '', onChangeBody, onSend, onAttach, attachments, onRemoveAttachment, placeholder = 'Write a message', sending = false, disabled = false, attachLabel = 'Add attachment', sendLabel = 'Send', maxLines = 5, className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    const bodyRef = React.useRef(null);
    // The field's height is a measurement, not a class: how tall the text
    // actually is, capped at `maxLines` of the line-height it happens to have.
    React.useLayoutEffect(() => {
        const el = bodyRef.current;
        if (el == null)
            return;
        el.style.height = 'auto';
        if (el.scrollHeight === 0)
            return; // No layout (SSR shim, jsdom) — leave it alone.
        const cs = window.getComputedStyle(el);
        const line = Number.parseFloat(cs.lineHeight);
        const frame = Number.parseFloat(cs.paddingTop) +
            Number.parseFloat(cs.paddingBottom) +
            Number.parseFloat(cs.borderTopWidth) +
            Number.parseFloat(cs.borderBottomWidth);
        const cap = Number.isFinite(line) && Number.isFinite(frame)
            ? line * Math.max(1, maxLines) + frame
            : Number.POSITIVE_INFINITY;
        const next = Math.min(el.scrollHeight, cap);
        el.style.height = `${next}px`;
        el.style.overflowY = el.scrollHeight > cap ? 'auto' : 'hidden';
    }, [body, maxLines]);
    const staged = attachments ?? [];
    const hasAttachments = staged.length > 0;
    const canSend = (0, mail_v4_1.canSendMail)({ to, body, hasAttachments, disabled, sending });
    const submit = () => {
        if (!canSend)
            return;
        onSend?.({ to, subject, body });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('border-t border-border bg-surface pb-sm', className), children: [to !== undefined ? ((0, jsx_runtime_1.jsx)("input", { "aria-label": "To", type: "email", autoCapitalize: "none", disabled: disabled, value: to, onChange: (e) => onChangeTo?.(e.target.value), placeholder: "To", "data-xen-v4-field": "", style: (0, field_v4_1.fieldRingVars)(false), className: FIELD_CLASS })) : null, subject !== undefined ? ((0, jsx_runtime_1.jsx)("input", { "aria-label": "Subject", disabled: disabled, value: subject, onChange: (e) => onChangeSubject?.(e.target.value), placeholder: "Subject", "data-xen-v4-field": "", style: (0, field_v4_1.fieldRingVars)(false), className: FIELD_CLASS })) : null, hasAttachments ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs p-sm", children: staged.map((attachment) => ((0, jsx_runtime_1.jsx)(AttachmentChipV4_1.AttachmentChipV4, { name: attachment.name, kind: attachment.kind ?? 'file', size: attachment.size, onRemove: onRemoveAttachment ? () => onRemoveAttachment(attachment.id) : undefined }, attachment.id))) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-sm px-md pt-sm", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": attachLabel, disabled: disabled, onClick: onAttach, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full', chrome_v4_1.MIN_TAP_CLASS, TAP_SQUARE, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base leading-none', mail_v4_1.TONE_INK.muted), children: "\uD83D\uDCCE" }) }), (0, jsx_runtime_1.jsx)("textarea", { ref: bodyRef, "aria-label": "Message body", rows: 1, disabled: disabled, value: body, onChange: (e) => onChangeBody?.(e.target.value), placeholder: placeholder, "data-xen-v4-field": "", style: (0, field_v4_1.fieldRingVars)(false), className: (0, cn_1.cn)('min-w-0 flex-1 resize-none bg-surface px-md py-sm', 'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', 'rounded-[var(--xen-radius-lg)] border border-input', 'text-base leading-relaxed text-on-surface placeholder:text-muted-text', 'disabled:pointer-events-none disabled:opacity-[0.38]') }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": sendLabel, "aria-busy": sending || undefined, disabled: !canSend, onClick: submit, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-primary)', 'var(--xen-on-primary)'), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full bg-primary text-on-primary', chrome_v4_1.MIN_TAP_CLASS, TAP_SQUARE, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: sending ? '…' : '➤' }) })] })] }));
});
//# sourceMappingURL=ComposeBarV4.js.map
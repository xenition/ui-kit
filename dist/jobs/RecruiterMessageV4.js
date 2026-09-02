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
exports.RecruiterMessageV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const cn_1 = require("../primitives/cn");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Said before everything else when a message has not been read. */
const UNREAD_WORD = 'Unread';
/**
 * **V4 recruiter message** — same props as {@link RecruiterMessage} plus
 * `replyLabel`, `formatRelative` and `last`.
 *
 * ## Five changes
 *
 * 1. **Reply works from the keyboard.** It was a `<button>` inside a
 *    `<div role="button">` that ran `preventDefault(); onClick()` on the
 *    bubbled keydown — cancelling Reply's own activation and opening the
 *    thread instead. Tab to Reply, press Enter, and you are reading the
 *    message you meant to answer. The row is a plain container now and Reply
 *    is a **sibling** of the activation.
 * 2. **The message is announced.** The base's `aria-label` sat on a bare
 *    `<div>`, which ARIA forbids naming, so on Chrome and Firefox the sender,
 *    the company and the unread state reached nobody — and the preview, the
 *    part that decides whether the message is worth opening, was never in the
 *    label at all. It is now one sentence: unread, sender, company, preview,
 *    age.
 * 3. **Reply is a real tap target.** It was a bare `text-xs` word — roughly 16
 *    CSS pixels tall — and it is one of two controls on the row.
 * 4. **The sent age stops rounding up.** A message sent 90 minutes ago read
 *    "2h ago", which is a different afternoon.
 * 5. **It joins the shared row family**, and the preview and meta lines take
 *    `muted-text` rather than `muted` — a fill slot with no contrast promise —
 *    with press as a state layer rather than `hover:opacity-95`.
 */
exports.RecruiterMessageV4 = React.forwardRef(function RecruiterMessageV4({ message, onClick, onReply, replyLabel = 'Reply', formatRelative, last = false, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    const sent = (0, tone_v4_1.relativeLabel)(message.sentAt, formatRelative);
    const unread = !!message.unread;
    const name = (0, tone_v4_1.spokenLine)([
        unread ? UNREAD_WORD : undefined,
        message.senderName,
        message.company,
        message.preview,
        sent,
    ]);
    const summary = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_LEADING_CLASS, 'relative'), children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: message.senderAvatarUrl, name: message.senderName, size: "md", alt: "" }), unread ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-v4-unread-dot": "", className: (0, cn_1.cn)('absolute right-0 top-0 h-sm w-sm rounded-[var(--xen-radius-full)]', 'border border-card bg-primary') })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm text-on-card', unread ? 'font-bold' : 'font-semibold'), children: [message.senderName, message.company ? ((0, jsx_runtime_1.jsx)("span", { className: "font-normal text-muted-text", children: ` · ${message.company}` })) : null] }), sent ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted-text", children: sent }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('line-clamp-2 text-sm', unread ? 'font-medium text-on-card' : 'font-normal text-muted-text'), children: message.preview })] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-recruiter-message": "", "data-xen-v4-row": "", className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, 'items-start', (0, row_v4_1.rowHeightClass)(true), !last && (0, row_v4_1.rowEdgeClass)(), className), ...rest, children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onClick(message), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-start gap-md rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-start gap-md", children: summary })), onReply ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", size: "sm", onClick: () => onReply(message), "aria-label": (0, tone_v4_1.spokenLine)([replyLabel, message.senderName]), className: (0, cn_1.cn)('shrink-0 self-start', tone_v4_1.MIN_TAP_CLASS), children: replyLabel })) : null] }));
});
//# sourceMappingURL=RecruiterMessageV4.js.map
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
exports.EmailThreadRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 email thread row** — the web twin of the native `EmailThreadRowV4`,
 * same props as {@link EmailThreadRow} plus `unreadLabel` and
 * `formatMessageCount`.
 *
 * ## Five changes
 *
 * 1. **Unread bolds the subject.** Both docblocks always said "unread → bold
 *    subject"; both twins bolded the **sender**. The subject is the thing a
 *    user scans an inbox for, and it is what changes weight now.
 * 2. **The unread wash is one colour on both twins.** Web painted
 *    `bg-primary-50` — a ramp step, so a pale band on a dark page — while
 *    native mixed `primary` at 6%. `selected`/`on-selected` is the theme's own
 *    slot for a highlighted or unread row, and it ships with a guaranteed ink.
 * 3. **The message count carries a unit.** `4` on its own says nothing; the
 *    badge still shows the numeral and the reader hears "4 messages".
 * 4. **The row is a `button` only when it is interactive.** The base wrapped
 *    every row in the same activation, so on native a plain, non-tappable row
 *    announced as a **disabled button**.
 * 5. **One accessible name, and a press is a state layer** — the base's
 *    `Unread, Ada: Renewal` dropped the snippet, the timestamp and the count.
 */
exports.EmailThreadRowV4 = React.forwardRef(function EmailThreadRowV4({ subject, from, snippet, avatarUrl, timestamp, unread = false, messageCount, hasAttachment = false, unreadLabel = 'Unread', formatMessageCount, onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    // A thread row with no subject is the blank frame the line rules out.
    if (!subject)
        return null;
    const count = messageCount != null && messageCount > 1 ? messageCount : undefined;
    const countText = count != null ? (formatMessageCount ?? ((n) => `${n} messages`))(count) : undefined;
    const label = (0, crm_v4_1.spokenLine)([
        unread ? unreadLabel : undefined,
        from,
        subject,
        snippet,
        timestamp,
        countText,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [unread ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-sm w-sm shrink-0 rounded-[var(--xen-radius-full)] bg-primary" })) : null, (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "sm", name: from, src: avatarUrl, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center justify-between gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: from }), timestamp ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted-text", children: timestamp })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm', unread ? 'font-bold text-on-surface' : 'text-muted-text'), children: subject }), snippet ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: snippet }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex shrink-0 flex-col items-end gap-xs", children: [hasAttachment ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-muted-text", children: "\uD83D\uDCCE" })) : null, count != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: "neutral", "aria-hidden": "true", children: count })) : null] })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full', className), ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-state": "", style: 
            // The pair this row actually wears, so the layer is opaque and
            // the row's own contrast promise stays measurable.
            (0, v4_state_1.stateGroundVars)(unread ? 'var(--xen-selected)' : 'var(--xen-surface)', unread ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'), className: (0, cn_1.cn)('focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', 'flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] px-sm py-sm text-left', chrome_v4_1.MIN_TAP_CLASS, unread ? 'bg-selected text-on-selected' : 'bg-surface'), children: body })) : ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] px-sm py-sm', unread ? 'bg-selected text-on-selected' : 'bg-surface'), children: [unread ? (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: unreadLabel }) : null, body, countText ? (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: countText }) : null] })) }));
});
//# sourceMappingURL=EmailThreadRowV4.js.map
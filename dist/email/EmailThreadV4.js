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
exports.EmailThreadV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const AvatarV4_1 = require("../primitives/AvatarV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const AttachmentChipV4_1 = require("./AttachmentChipV4");
const MailLabelChipV4_1 = require("./MailLabelChipV4");
const StarButtonV4_1 = require("./StarButtonV4");
const mail_v4_1 = require("./internal/mail-v4");
/** How many placeholder messages a loading thread draws. */
const SKELETON_MESSAGES = 3;
/**
 * **V4 email thread** — same props as {@link EmailThread} plus
 * `defaultExpandedId`, `loadingLabel` and `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **Expansion works when nobody is driving it.** The base computed
 *    `new Set(expandedIds ?? [lastId])` fresh on every render and held **no
 *    state at all**, while `expandedIds` is an *optional* prop. Mounted the way
 *    the module's own barrel doc shows it — `<EmailThread subject messages />`
 *    — every header click fired `onToggleMessage` into a callback nobody was
 *    listening to: the newest message stayed open, every earlier one stayed a
 *    clipped one-line snippet, and `aria-expanded` never flipped. A user tapped
 *    the third reply, saw nothing happen, tapped again, and concluded the app
 *    was broken; a screen-reader user heard "Expand message from Priya,
 *    collapsed" every single time they activated it. `useThreadExpansion` —
 *    shared with the native twin — leaves the controlled path exactly as it
 *    was and gives the uncontrolled path somewhere to put its state.
 * 2. **The header toggle is a real `<button>`**, not a `div` with
 *    `role="button"`, a `tabIndex` and a hand-written Enter/Space handler —
 *    three approximations of what a button already does. The timestamp and the
 *    star stay outside it, so neither collapses the message.
 * 3. **Loading draws the messages it is about to show** and announces itself.
 *    A centred spinner collapsed the thread to a dot and then jumped to full
 *    height.
 * 4. **The empty state is `EmptyStateV4`**, not the base primitive re-exported
 *    through the deprecated `../commerce` shim the base imported it from.
 * 5. **A failed fetch has a representation.** `errorLabel` gives one; there
 *    was none, so a thread that failed to load and a thread with no messages
 *    were the same screen.
 */
exports.EmailThreadV4 = React.forwardRef(function EmailThreadV4({ subject, messages, labels, expandedIds, onToggleMessage, onToggleStar, onPressAttachment, loading = false, defaultExpandedId, loadingLabel = 'Loading messages', errorLabel, className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const safeMessages = messages ?? [];
    const safeLabels = labels ?? [];
    const lastId = safeMessages.length > 0 ? safeMessages[safeMessages.length - 1].id : undefined;
    const expansion = (0, mail_v4_1.useThreadExpansion)(expandedIds, defaultExpandedId ?? lastId);
    const uid = React.useId();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: (0, cn_1.cn)('flex flex-col bg-surface', className), children: Array.from({ length: SKELETON_MESSAGES }).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-sm border-b border-border px-md py-md", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2xl w-2xl shrink-0 rounded-full', mail_v4_1.PLACEHOLDER_CLASS), "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-sm w-1/3', mail_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-sm w-2/3', mail_v4_1.PLACEHOLDER_CLASS) })] })] }, index))) }));
    }
    if (errorLabel) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "alert", className: (0, cn_1.cn)('bg-surface p-xl', className), children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: errorLabel }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('bg-surface', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm border-b border-border px-md py-md", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-on-surface", children: subject }), safeLabels.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs", children: safeLabels.map((one) => ((0, jsx_runtime_1.jsx)(MailLabelChipV4_1.MailLabelChipV4, { label: one.label, tone: one.tone ?? 'neutral' }, one.id))) })) : null] }), safeMessages.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "p-xl", children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: "No messages", description: "This conversation is empty." }) })) : (safeMessages.map((message) => {
                const isOpen = expansion.isOpen(message.id);
                const atts = message.attachments ?? [];
                const bodyId = `${uid}-${message.id}`;
                return ((0, jsx_runtime_1.jsxs)("div", { className: "border-b border-border px-md py-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${isOpen ? 'Collapse' : 'Expand'} message from ${message.sender}`, "aria-expanded": isOpen, "aria-controls": isOpen ? bodyId : undefined, onClick: () => {
                                        // The hook is a no-op on the controlled path, so a caller
                                        // driving `expandedIds` still sees exactly what it saw.
                                        expansion.toggle(message.id);
                                        onToggleMessage?.(message.id);
                                    }, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-sm rounded-[var(--xen-radius-sm)] px-xs text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "md", src: message.avatarUri, name: message.sender, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-base font-semibold text-on-surface", children: message.sender }), !isOpen ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block truncate text-sm', mail_v4_1.TONE_INK.muted), children: message.body })) : null] })] }), message.timestamp ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs', mail_v4_1.TONE_INK.muted), children: message.timestamp })) : null, (0, jsx_runtime_1.jsx)(StarButtonV4_1.StarButtonV4, { starred: message.starred ?? false, onToggle: onToggleStar ? (next) => onToggleStar(message.id, next) : undefined, size: "base", className: "shrink-0" })] }), isOpen ? ((0, jsx_runtime_1.jsxs)("div", { id: bodyId, className: "mt-sm flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base leading-relaxed text-on-surface", children: message.body }), atts.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs", children: atts.map((attachment) => ((0, jsx_runtime_1.jsx)(AttachmentChipV4_1.AttachmentChipV4, { name: attachment.name, kind: attachment.kind ?? 'file', size: attachment.size, onClick: onPressAttachment
                                            ? () => onPressAttachment(message.id, attachment.id)
                                            : undefined }, attachment.id))) })) : null] })) : null] }, message.id));
            }))] }));
});
//# sourceMappingURL=EmailThreadV4.js.map
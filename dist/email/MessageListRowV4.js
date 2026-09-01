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
exports.MessageListRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const MailLabelChipV4_1 = require("./MailLabelChipV4");
const StarButtonV4_1 = require("./StarButtonV4");
const mail_v4_1 = require("./internal/mail-v4");
/** Above this the pill reads `99+` — three digits push the timestamp out. */
const COUNT_CAP = 99;
/** How long a touch has to be held to count as a long press, in ms. */
const LONG_PRESS_MS = 500;
/**
 * **V4 message list row** — same props as {@link MessageListRow} plus
 * `formatThreadCount` and `unreadLabel`.
 *
 * ## Six changes
 *
 * 1. **The row's content reaches a screen reader again.** `role="button"` on a
 *    `div` makes every child **presentational**: the preview, the thread count
 *    and every label chip were removed from the accessibility tree outright,
 *    and the row's hand-written six-item `aria-label` — which mentioned none of
 *    them — was all a reader ever got. The row is a real `<button>` carrying
 *    one deliberate spoken name built with `spokenLine`, and that name contains
 *    what the row shows.
 * 2. **Selected and hovered are different things.** Both resolved to
 *    `bg-neutral-100`, so in a split-view inbox the mouse repainted every row
 *    it passed over as "the open one" and the actual open one was
 *    indistinguishable from wherever the pointer happened to be. Selected is
 *    the `selected` container; hover is the M3 state layer over it.
 * 3. **The star is reachable.** It sat inside the row's own pressable, which
 *    on the native twin meant the only way to star a message was to open it.
 *    It is now a sibling of the row's button, not a child of it.
 * 4. **The thread count carries a unit and is drawn as the pill its own prop
 *    doc promises.** A bare "4" beside a sender says nothing; a reader now
 *    hears "4 messages".
 * 5. **Long press works with a finger.** `onLongPress` was wired to
 *    `onContextMenu` only, so on touch web — a tablet inbox — the multi-select
 *    gesture the prop exists for did not exist.
 * 6. **`unread` is inked with `primaryText`, not the `primary` fill**, and the
 *    row announces `selected` rather than reporting itself as a pressed toggle.
 */
exports.MessageListRowV4 = React.forwardRef(function MessageListRowV4({ sender, subject, preview, timestamp, avatarUri, unread = false, starred = false, onToggleStar, hasAttachments = false, threadCount = 1, labels, selected = false, onClick, onLongPress, formatThreadCount = (value) => `${value} messages`, unreadLabel = 'Unread', className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const timer = React.useRef(null);
    const fired = React.useRef(false);
    React.useEffect(() => () => {
        if (timer.current != null)
            clearTimeout(timer.current);
    }, []);
    const safeLabels = labels ?? [];
    const count = threadCount > 1 ? threadCount : 0;
    const countText = count > COUNT_CAP ? `${COUNT_CAP}+` : String(count);
    // One name, and it contains what the row draws — the parts `role="button"`
    // was silently deleting.
    const label = (0, mail_v4_1.spokenLine)([
        unread ? unreadLabel : undefined,
        `from ${sender}`,
        subject,
        preview,
        count > 0 ? formatThreadCount(count) : undefined,
        ...safeLabels.map((one) => one.label),
        hasAttachments ? 'has attachment' : undefined,
        starred ? 'starred' : undefined,
        timestamp,
    ]);
    const cancelHold = () => {
        if (timer.current != null) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full items-start gap-xs', selected ? mail_v4_1.ROW_SELECTED_CLASS : 'bg-surface', className), children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": label, "aria-current": selected ? 'true' : undefined, onClick: () => {
                    // A long press already did the work; the release must not open it.
                    if (fired.current) {
                        fired.current = false;
                        return;
                    }
                    onClick?.();
                }, onPointerDown: onLongPress
                    ? () => {
                        fired.current = false;
                        timer.current = setTimeout(() => {
                            fired.current = true;
                            onLongPress();
                        }, LONG_PRESS_MS);
                    }
                    : undefined, onPointerUp: onLongPress ? cancelHold : undefined, onPointerLeave: onLongPress ? cancelHold : undefined, onPointerCancel: onLongPress ? cancelHold : undefined, onContextMenu: onLongPress
                    ? (e) => {
                        e.preventDefault();
                        onLongPress();
                    }
                    : undefined, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(selected ? 'var(--xen-selected)' : 'var(--xen-surface)', selected ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-start gap-md px-md py-sm text-left', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('mt-sm inline-block h-xs w-xs shrink-0 rounded-full', unread ? 'bg-primary' : 'bg-transparent') }), (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "md", src: avatarUri, name: sender, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-base', unread ? 'font-bold' : 'font-medium'), children: sender }), count > 0 ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full px-xs text-xs font-bold', 'min-w-[calc(var(--xen-space-md)_+_var(--xen-space-xs))]', 'bg-muted text-on-surface'), children: countText })) : null, timestamp ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs', unread ? (0, cn_1.cn)('font-bold', mail_v4_1.TONE_INK.primary) : (0, cn_1.cn)('font-normal', mail_v4_1.TONE_INK.muted)), children: timestamp })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [hasAttachments ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('shrink-0 text-xs leading-none', mail_v4_1.TONE_INK.muted), children: "\uD83D\uDCCE" })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', unread ? 'font-semibold' : 'font-normal'), children: subject })] }), preview ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm', mail_v4_1.TONE_INK.muted), children: preview })) : null, safeLabels.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex flex-wrap gap-xs", children: safeLabels.map((one) => ((0, jsx_runtime_1.jsx)(MailLabelChipV4_1.MailLabelChipV4, { label: one.label, tone: one.tone ?? 'neutral' }, one.id))) })) : null] })] }), onToggleStar ? ((0, jsx_runtime_1.jsx)(StarButtonV4_1.StarButtonV4, { starred: starred, onToggle: onToggleStar, size: "base", className: "mt-sm mr-xs shrink-0" })) : starred ? (
            // Decorative: "starred" is already in the row's one spoken name.
            (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('mt-md mr-md shrink-0 text-base leading-none', mail_v4_1.TONE_INK.warn), children: "\u2605" })) : null] }));
});
//# sourceMappingURL=MessageListRowV4.js.map
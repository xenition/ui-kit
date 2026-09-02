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
exports.DirectoryRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/**
 * **V4 directory row** — the web twin of the native `DirectoryRowV4`, same
 * props as {@link DirectoryRow} plus `messageLabel` and `testID`.
 *
 * ## Six changes
 *
 * 1. **Pressing Enter on the message button no longer opens the profile
 *    instead.** The row was a `<div role="button">` with a hand-written
 *    Enter/Space handler, and the message `<button>` lived inside it. The
 *    click was guarded with `stopPropagation`; the *keydown* was not. So the
 *    row's handler caught the bubbled Enter, called `preventDefault()` — which
 *    cancels the button's own activation, because Enter's default action on a
 *    button **is** the click — and ran `onClick`. A keyboard user aiming at
 *    "Message Ada" navigated to Ada's profile and sent nothing, with no sign
 *    anything had gone wrong. The fix is structural: the row is a plain
 *    `<div>`, the activation is a real `<button>` around the avatar and the
 *    text, and the message button is its **sibling**. There is no ancestor
 *    handler left to fire, so no guard is needed and none is written.
 * 2. **The row is one accessible name.** `Open Ada Lovelace` replaced the
 *    whole subtree, so the title, the department, the email and the presence
 *    were never announced at all. They now join the name, comma-separated.
 * 3. **The message button is a 44 target.** It was a bare glyph with padding
 *    on one side — the conventions call a control that relies on `hitSlop`
 *    alone a defect, and the web twin did not even have that.
 * 4. **Press and hover are a state layer.** `hover:bg-neutral-100` on the row
 *    and `hover:opacity-70` on the glyph: the first is a ramp step that
 *    inverts under `[data-theme="dark"]` and paints a near-white slab on a
 *    dark page, the second dims the control's own content, which is the signal
 *    M3 spends on **disabled**. A hovered ✉ and a dead ✉ looked alike.
 * 5. **Presence is inked with an ink slot**, not `text-success` / `text-muted`
 *    — fill tokens, and `muted` has no contrast promise as text at all.
 * 6. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a directory scrolled into a conversation list does not
 *    change rhythm halfway down. The ground and the radius the base painted on
 *    the row itself go with it: a row lives inside a container, and a row that
 *    paints its own card is what stopped four list components looking like one.
 */
exports.DirectoryRowV4 = React.forwardRef(function DirectoryRowV4({ name, title, department, avatarUrl, email, phone, presence, variant = 'default', onClick, onMessage, messageLabel = 'Message', testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    // A directory row with nobody on it is the blank bordered strip the line
    // rules out.
    if (!name)
        return null;
    const compact = variant === 'compact';
    const presenceMeta = presence ? internal_1.PRESENCE_META[presence] : undefined;
    const subtitle = (0, tone_v4_1.metaLine)([title, department]);
    const contact = (0, tone_v4_1.metaLine)([email, phone]);
    const interactive = onClick != null;
    const identity = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl, alt: "" }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: name }), subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: subtitle }) : null, !compact && contact ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: contact })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(Boolean(subtitle) || (!compact && Boolean(contact))), className), children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([name, title, department, presenceMeta?.label, email, phone]), onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: identity })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-md", children: identity })), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: [presenceMeta ? (
                    // Already inside the activation's name when there is one, so it is
                    // a second stop for no gain; on a static row it speaks for itself.
                    (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", "aria-hidden": interactive || undefined, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs', (0, tone_v4_1.toneInkClass)(presenceMeta.tone)), children: presenceMeta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: presenceMeta.label })] })) : null, onMessage ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${messageLabel} ${name}`, onClick: onMessage, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', 'text-lg text-primary-text', tone_v4_1.MIN_TAP_SQUARE_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2709" }) })) : null] })] }));
});
//# sourceMappingURL=DirectoryRowV4.js.map
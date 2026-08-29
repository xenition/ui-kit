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
exports.NotificationItemV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const StatusDotV4_1 = require("../primitives/StatusDotV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("./internal/row-v4");
/**
 * The category badge a notification wears when the caller names none.
 *
 * §4.3 retires the bare 8px dot outright and §5 says the dot "becomes a 44
 * tinted circular badge carrying a category `icon`" — so the replacement has to
 * be the *default*, not an opt-in, or every caller that renders a notification
 * today loses its leading treatment and the list's titles go ragged. `bell` is
 * the set's name for "a notification", which is what an unlabelled one is.
 *
 * §4.7's warning against "a list of twenty identical badges" is real and the
 * answer to it is `icon` — a notification list that knows its categories should
 * pass them. A caller that wants the slot genuinely empty passes
 * `leading={null}`; see {@link NotificationItemV4Props.leading}.
 */
const DEFAULT_ICON = 'bell';
/**
 * **V4 notification row** — the notification member of the V4 row family.
 *
 * Every metric, class and state recipe comes from `internal/row-v4.ts`; this
 * file decides *content* and nothing else. That is the point of the pass: the
 * base row, `ListRow`, `SettingsRow` and `ActivityFeed` were four components
 * with three paddings, two min-heights, two press feedbacks and three leading
 * treatments between them, and a user scrolling from a people list into a
 * notification list could see the seam. Not one metric is typed here.
 *
 * What changes against the base row:
 *
 * 1. **The dot becomes a badge.** The base painted an `h-2 w-2` dot with a
 *    `mt-1.5` — three literals brief §1 names outright — as its entire leading
 *    treatment. §4.3 retires the bare dot: the leading slot is the family's
 *    fixed 44 square ({@link ROW_V4_LEADING_CLASS}) holding an
 *    `IconV4 badge="soft"` for a category or the caller's own `leading` node
 *    for a person.
 *
 * 2. **The unread ground is the compiler's `selected` pair.** `bg-neutral-100`
 *    — a raw Tailwind ramp step, and the one the native twin had already fixed
 *    — is deleted, not translated. {@link rowGroundClass} paints
 *    `--xen-selected` with `--xen-on-selected` beside it, so the title keeps a
 *    *guaranteed* contrast pair rather than inheriting `on-surface` onto a tint
 *    nobody measured. One token now covers both senses the family needs: an
 *    unread notification and a persistently highlighted row.
 *
 * 3. **Unread is said three ways, none of them a colour on the title.** A bold
 *    title, the `selected` ground, and a trailing `StatusDotV4` — a *state*
 *    mark, which §4.7 says is exactly what a dot is for, at the trailing edge
 *    where §4.3's anatomy puts an affordance. The accessible name still carries
 *    ", unread" for a reader that sees none of the three.
 *
 * 4. **Text is typeset, not styled.** Title `TextV4 size="base"
 *    weight="semibold"` (`bold` while unread) `tone="onSurface"`, body
 *    `size="sm" tone="mutedText"`, timestamp `size="xs" tone="mutedText"`.
 *    `mutedText`, not `muted`: `muted` is a *fill*, and using it as an ink is
 *    the bug the shadcn pass closed and this module kept.
 *
 * 5. **The timestamp top-aligns on a two-line row** (§4.3). It is a stamp on
 *    the row's first line, not a value centred against a paragraph — centred,
 *    it drifts below the title exactly when the body arrives and the list's
 *    right edge goes ragged.
 *
 * 6. **Press is the state layer.** `hover:opacity-80` is deleted, not
 *    translated. The row carries `data-xen-v4-state` and the opaque
 *    `card`/`on-card` pair from {@link rowStateVars}, so the layer tints the
 *    container and leaves the title at full strength — dimming the *content* is
 *    what M3 spends 0.38 on to mean **disabled**, which is what `hover:opacity`
 *    was accidentally saying.
 *
 * 7. **The ground is otherwise transparent and the radius is gone.** The base
 *    painted its own `rounded-[var(--xen-radius-md)]` card on `bg-surface`, so
 *    a notification list was a stack of little cards with the page showing
 *    through the gaps. §4.3: the *container* owns the card.
 *
 * Renders `null` when there is nothing to show (§4.5) — no title, no body, no
 * timestamp. A row with an empty title is a blank 56px band in the middle of a
 * list, and a blank box is the one thing §4.5 forbids. A default badge does not
 * count as content: a bell over nothing is not a notification.
 */
exports.NotificationItemV4 = React.forwardRef(function NotificationItemV4({ title, body, time, unread = false, onClick, className, icon = DEFAULT_ICON, iconTone = 'primary', leading, selected = false, }, ref) {
    // Both sheets, from the one import — a row's press feedback IS the shared
    // state layer, so `V4_STATE_CSS` is not optional for a row.
    (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    const navigates = onClick !== undefined;
    const supporting = body !== undefined && body !== '';
    const titled = title.trim() !== '';
    const stamped = time !== undefined && time !== '';
    // §4.5: nothing to show, so show nothing.
    if (!titled && !supporting && !stamped)
        return null;
    const leadingNode = leading !== undefined ? (leading) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, color: iconTone, badge: "soft", size: "base" }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [leadingNode != null ? ((0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: leadingNode })) : null, (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [titled ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: unread ? 'bold' : 'semibold', tone: "onSurface", numberOfLines: 1, children: title })) : null, supporting ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: body })) : null] }), stamped || unread ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 
                // §4.3: a timestamp top-aligns on a two-line row. On a one-line
                // row there is only one line to align to, so centring is correct
                // and `self-start` would push the stamp against the padding.
                supporting && 'self-start'), children: [stamped ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: time })) : null, unread ? (0, jsx_runtime_1.jsx)(StatusDotV4_1.StatusDotV4, { tone: "primary", pulse: false }) : null] })) : null] }));
    const classes = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(supporting), (0, row_v4_1.rowGroundClass)(unread || selected), className);
    const label = `${title}${unread ? ', unread' : ''}`;
    if (!navigates) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-row": "", "data-interactive": "false", "aria-label": label, className: classes, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", "aria-label": label, onClick: onClick, className: classes, 
        // Inline rather than left to the sheet: `ROW_V4_STYLE_ID` is shared by
        // every row in the family, so whichever injects first wins the
        // document. Naming the pair here is both the precise spelling the
        // module documents and immune to that race.
        style: (0, row_v4_1.rowStateVars)(), children: inner }));
});
//# sourceMappingURL=NotificationItemV4.js.map
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
exports.ActivityFeedV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const ListSeparatorV4_1 = require("../layout/ListSeparatorV4");
const row_v4_1 = require("./internal/row-v4");
/**
 * The badge an activity wears when the caller names no `icon`.
 *
 * §4.3 retires the bare 8px dot and §5 says the dot "becomes a 44 tinted
 * circular badge" — so the replacement is the *default*, not an opt-in, or
 * every feed rendered today loses its leading treatment and the list's titles
 * go ragged. `bolt` is the set's name for "something happened", which is what
 * an unclassified activity is. A feed that knows its event types should pass
 * `icon` per item — §4.7 is right that twenty identical badges are noise, and
 * the per-item `icon` is the answer to it.
 */
const DEFAULT_ICON = 'bolt';
/**
 * **V4 activity feed** — a list of V4 rows in one grouped container.
 *
 * Every metric, class and state recipe comes from `internal/row-v4.ts`; this
 * file decides *content* and *grouping* and nothing else.
 *
 * What changes against the base feed:
 *
 * 1. **Each entry is a row of the family.** The base laid out its own flex box
 *    with `gap-sm`, `gap-0.5` and an `mt-1.5` dot — literals brief §1 names
 *    outright — so a feed entry and a settings row shared nothing but a
 *    resemblance. Now they share {@link ROW_V4_BASE_CLASS},
 *    {@link rowHeightClass}, the 44 leading slot and the state layer.
 *
 * 2. **The dot becomes a badge.** §4.3 is explicit that a bare 8px dot is not a
 *    leading treatment. Each row gets `IconV4 badge="soft"` — the §4.7 44
 *    circle — from the item's own `icon`/`tone`.
 *
 * 3. **One container, with inset separators.** §4.3: the row's ground is
 *    transparent and the *container* owns the card, so the feed is one
 *    `CardV4` (`padding="none"`, so rows run flush to its edge and clip to
 *    `radius.lg`) with `ListSeparatorV4 inset="leading"` between rows — §4.4's
 *    rule, starting where the titles start so the list reads as a list rather
 *    than as a table cut through the middle of its avatars. That inset
 *    separator is what §5 asks the vertical rail for — "what makes a feed read
 *    as one list rather than fragments" — expressed with the primitive the row
 *    family already shares instead of a second kind of rule; §4.4 allows one
 *    weight of separator and no more.
 *
 * 4. **The empty state is the primitive.** §4.5: the web twin hand-rolled its
 *    own centred block with a `max-w-[340px]` literal; the native twin already
 *    composed `EmptyState`. Both now route through `EmptyStateV4`, and the
 *    measure is the primitive's job rather than a number here.
 *
 * 5. **Text is typeset, not styled.** Title `TextV4 size="base"
 *    weight="semibold" tone="onSurface"`, meta `size="sm" tone="mutedText"`,
 *    timestamp `size="xs" tone="mutedText"` top-aligned on a two-line row
 *    (§4.3). `mutedText`, not `muted` — `muted` is a fill.
 *
 * 6. **Press, when a row acts, is the state layer** and never an opacity.
 *
 * 7. **The heading-to-body gap is `md`.** §4.1's step between a card header and
 *    its body; the base's `sm` read as a caption stuck to the list.
 *
 * `items: []` renders `EmptyStateV4` and never a blank bordered box (§4.5) —
 * with or without a heading, and with no CTA unless the caller supplies one.
 */
exports.ActivityFeedV4 = React.forwardRef(function ActivityFeedV4({ items, title, emptyMessage = 'Activity will appear here as things happen.', action, emptyTitle = 'No activity yet', emptyIcon, emptyAction, onItemClick, className, ...rest }, ref) {
    // Both sheets, from the one import — a row's press feedback IS the shared
    // state layer, so `V4_STATE_CSS` is not optional for a row.
    (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    const heading = title !== undefined && title !== '';
    const hasHeader = heading || action != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [hasHeader ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-start justify-between gap-md", children: [heading ? (
                    // `m-0` kills the user-agent heading margin, which would
                    // otherwise sit inside the gap and widen it — the same spelling
                    // `SectionV4` uses for the same reason.
                    (0, jsx_runtime_1.jsx)("h3", { className: "m-0 min-w-0 flex-1", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onSurface", children: title }) })) : null, action != null ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: action }) : null] })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyTitle, description: emptyMessage, icon: emptyIcon, action: emptyAction })) : (
            // The container owns the card (§4.3), the rows do not. `padding="none"`
            // plus `overflow-hidden` is what lets a row run flush to the card edge
            // and still clip to its radius.
            //
            // `bg-card`/`text-on-card` over the top because `CardV4` still paints
            // `surface` — §4.2's "most visible bug in the dashboard module", the
            // page colour used for a raised surface. It is not decoration here:
            // the row's state layer mixes `card` with `on-card`
            // ({@link rowStateVars}), so a pressed row on a `surface` container
            // would tint towards a fill it is not sitting on.
            (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { padding: "none", radius: "lg", className: "overflow-hidden bg-card text-on-card", children: (0, jsx_runtime_1.jsx)("ul", { role: "list", className: "m-0 flex list-none flex-col p-0", children: items.map((item, index) => ((0, jsx_runtime_1.jsxs)("li", { children: [index > 0 ? (0, jsx_runtime_1.jsx)(ListSeparatorV4_1.ListSeparatorV4, { inset: "leading" }) : null, (0, jsx_runtime_1.jsx)(ActivityRow, { item: item, onItemClick: onItemClick })] }, item.id))) }) }))] }));
});
/**
 * One entry, drawn as a member of the row family.
 *
 * Kept local rather than exported: it is the feed's row, and a second exported
 * row component is exactly the drift §4.3 is closing. Everything structural is
 * `row-v4`'s.
 */
function ActivityRow({ item, onItemClick, }) {
    const supporting = item.meta !== undefined && item.meta !== '';
    const stamped = item.time !== undefined && item.time !== '';
    const label = `${item.title}${supporting ? `, ${item.meta}` : ''}${stamped ? `, ${item.time}` : ''}`;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: item.icon ?? DEFAULT_ICON, color: item.tone ?? 'primary', badge: "soft", size: "base" }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: item.title }), supporting ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: item.meta })) : null] }), stamped ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 
                // §4.3: a timestamp top-aligns on a two-line row.
                supporting && 'self-start'), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: item.time }) })) : null] }));
    const classes = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(supporting), (0, row_v4_1.rowGroundClass)(false));
    if (onItemClick === undefined) {
        return ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-row": "", "data-interactive": "false", "aria-label": label, className: classes, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", "aria-label": label, onClick: () => onItemClick(item), className: classes, 
        // Inline rather than left to the sheet: the row sheet's id is shared by
        // the whole family, so whichever injects first wins the document.
        style: (0, row_v4_1.rowStateVars)(), children: inner }));
}
//# sourceMappingURL=ActivityFeedV4.js.map
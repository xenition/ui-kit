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
exports.ListRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("./internal/row-v4");
/**
 * **V4 list row** — the canonical member of the V4 row family, and the row the
 * other three follow.
 *
 * Everything structural comes from `internal/row-v4.ts`; this file decides
 * *content* and nothing else. That is the whole point of the pass: the base
 * row, `SettingsRow`, `NotificationItem` and `ActivityFeed` were four
 * components with three paddings, two min-heights, two press feedbacks and
 * three leading treatments between them, and a user scrolling from a people
 * list into a settings screen could see the seam. Not one metric is typed
 * here.
 *
 * What changes against the base row:
 *
 * 1. **The metric is the family's.** `min-h-[56px]` — a literal brief §1 names
 *    outright — becomes {@link rowHeightClass}, which is 56 composed as
 *    `2xl + sm` for a row with a title alone and 72 as `2xl + lg` for one that
 *    also carries `meta`. A re-scaled seed now re-scales the row.
 *
 *    The height turns on *the supporting line* and nothing else, which is what
 *    `rowHeightClass` documents and what §4.3's table says. §5's SettingsRow
 *    note also sends a row with a leading slot to 72; that is not adopted,
 *    because it would leave a settings row wearing a badge at 72 while a people
 *    row wearing an avatar sat at 56, which is the exact family seam §4.3 is
 *    closing. A 44 leading slot grows the row past 56 on its own anyway — the
 *    metric is a `min-height`, a floor rather than a size.
 *
 * 2. **The leading slot is a real slot.** A fixed 44 square
 *    ({@link ROW_V4_LEADING_CLASS}) holding an `AvatarV4` for a person or an
 *    `IconV4 badge="soft"` for a kind of thing — never a bare dot (§4.3). It is
 *    fixed on both axes so twenty rows put their titles on one vertical line
 *    whichever of the three a given row happens to hold.
 *
 * 3. **Text is typeset, not styled.** Title `TextV4 size="base"
 *    weight="semibold" tone="onSurface"`, supporting line `size="sm"
 *    tone="mutedText"`. `mutedText`, not `muted`: `muted` is a *fill*, and
 *    using it as an ink is the bug the shadcn pass closed and this module kept.
 *
 * 4. **The chevron exists.** The base row had no navigation affordance at all,
 *    so a row that pushed a screen and a row that did nothing looked identical.
 *
 * 5. **Press is the state layer.** `hover:bg-neutral-100` is deleted, not
 *    translated. The row carries `data-xen-v4-state` and the opaque
 *    `card`/`on-card` pair from {@link rowStateVars}, so the layer tints the
 *    container and leaves the title at full strength — a dimmed row reads as
 *    *disabled* (M3 spends 0.38 on exactly that), which is what
 *    `hover:opacity-*` was accidentally saying.
 *
 * 6. **The ground is transparent.** The container owns the card, so a list of
 *    these is one card with rows in it rather than a stack of little cards.
 *
 * Renders `null` when there is nothing to show (§4.5): no title, no supporting
 * line, no leading slot, no action. A row with an empty title is a blank 56px
 * band in the middle of a list, and a blank box is the one thing §4.5 forbids.
 * A default avatar does not count as content — it would be a monogram of
 * nothing.
 */
exports.ListRowV4 = React.forwardRef(function ListRowV4({ title, meta, avatarUrl, showAvatar = true, leading, action, onClick, className, icon, iconTone = 'primary', chevron, selected = false, }, ref) {
    // Both sheets, from the one import — a row's press feedback IS the shared
    // state layer, so `V4_STATE_CSS` is not optional for a row.
    (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    const navigates = onClick !== undefined;
    const showChevron = chevron ?? navigates;
    const supporting = meta !== undefined && meta !== '';
    const titled = title.trim() !== '';
    const leadingNode = leading ??
        (icon !== undefined ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, color: iconTone, badge: "soft", size: "base" })) : showAvatar && titled ? ((0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: title, size: "md" })) : null);
    // §4.5: nothing to show, so show nothing. The default avatar is excluded on
    // purpose — see the component doc.
    if (!titled && !supporting && leading == null && icon === undefined && action == null) {
        return null;
    }
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [leadingNode != null ? (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: leadingNode }) : null, (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [titled ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: title })) : null, supporting ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: meta })) : null] }), action != null || showChevron ? ((0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: [action, showChevron ? (
                    // `muted` and not `mutedText`: a chevron is a UI mark held to
                    // 1.4.11's 3:1, not a run of text — the same reading `AccordionV4`
                    // records for its disclosure mark. `IconColor` has no `mutedText`
                    // slot on the web twin in any case.
                    (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "chevron-right", size: "base", color: "muted" })) : null] })) : null] }));
    const classes = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(supporting), (0, row_v4_1.rowGroundClass)(selected), className);
    if (!navigates) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-row": "", "data-interactive": "false", "aria-label": title, className: classes, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", "aria-label": title, onClick: onClick, className: classes, 
        // Inline rather than left to the sheet: `ROW_V4_STYLE_ID` shares its id
        // with the primitives' own row sheet, so whichever injects first wins the
        // document. Naming the pair here is both the precise spelling the module
        // documents and immune to that race.
        style: (0, row_v4_1.rowStateVars)(), children: inner }));
});
//# sourceMappingURL=ListRowV4.js.map
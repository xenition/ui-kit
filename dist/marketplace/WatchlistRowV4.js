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
exports.WatchlistRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const PriceTagV4_1 = require("../commerce/PriceTagV4");
const ConditionBadgeV4_1 = require("./ConditionBadgeV4");
const internal_1 = require("./internal");
const row_v4_1 = require("../dashboard/internal/row-v4");
/**
 * **V4 watchlist row** — a saved listing: what it is, what it costs now, and
 * the one control that removes it.
 *
 * The anatomy is §4.3's, in §4.3's order — `[44 leading] [title / supporting]
 * [trailing value] [affordance]` — which for a watchlist means the thumbnail,
 * the title over its condition chips, **the price in the trailing column**, and
 * the watch toggle. Putting the price where the family puts its value is what
 * makes a watchlist scannable: brief rule 2 asks for tabular figures so a
 * column of prices has an edge, and a price buried mid-row under the title has
 * no column to be tabular *in*. `PriceTagV4` already sets tabular figures and
 * announces the struck compare-at price as "Was …", so it is composed rather
 * than redrawn (rules 1 and 7).
 *
 * What else changes against the base:
 *
 * 1. **The row metric, and no card of its own.** `rounded border bg-surface
 *    p-md` goes; the container owns the card. The thumbnail moves from a
 *    hand-written 64 square to the family's 44 leading slot, so a watchlist row
 *    and a settings row put their text on the same vertical line.
 * 2. **`bg-neutral-100` goes** — a ramp step used as a placeholder ground, and
 *    a literal brief §1 names outright. The empty thumbnail is an `IconV4`
 *    soft badge instead.
 * 3. **The heart is not `danger`.** The base painted the watched heart in the
 *    error tone. Brief rule 3: `danger` means danger, and a saved item is not a
 *    problem — it is the most positive thing on the row. Watched is `primary`
 *    and **filled**; unwatched is `muted` and **hollow**, so the state survives
 *    a colour-blind reading (rule 6) as it did not before. The glyphs are
 *    `IconV4`, not the bare `♥`/`♡` characters §1 rules out; `♡` has no name in
 *    the kit's set, so it takes the documented `glyph` escape hatch.
 * 4. **The toggle clears 44.** It was `p-xs` around a text glyph — roughly 24
 *    square, for the one destructive-ish control on the row.
 * 5. **`ended` stops being an opacity.** `opacity-60` on the whole row dims the
 *    *price* too, which is the fact a watcher came back for. A sold item now
 *    reads through its "Sold" chip and a `mutedText` title, and the price stays
 *    at full strength.
 * 6. **The title keeps two lines.** The family truncates a title at one, but a
 *    listing title *is* the identity of a watchlist row and one line of it is
 *    often nothing but the brand. The row metric is a `min-height` — a floor —
 *    so the row grows rather than clipping.
 *
 * The toggle stays outside the row's press target, as in the base, so
 * un-watching never also navigates.
 */
exports.WatchlistRowV4 = React.forwardRef(function WatchlistRowV4({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, watched = true, ended = false, onToggleWatch, onClick, placeholderIcon = 'image', selected = false, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    // §4.5: an untitled listing is a thumbnail and a price with nothing to say
    // what they are.
    if (title.trim() === '')
        return null;
    const interactive = onClick != null;
    const ink = ended ? 'mutedText' : 'onSurface';
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_LEADING_CLASS, 'overflow-hidden rounded-[var(--xen-radius-md)]'), children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: placeholderIcon, badge: "soft", badgeShape: "rounded", size: "base", color: "muted" })) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: ink, numberOfLines: 2, children: title }), condition !== undefined || ended ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-sm", children: [condition !== undefined ? (0, jsx_runtime_1.jsx)(ConditionBadgeV4_1.ConditionBadgeV4, { condition: condition, size: "sm" }) : null, ended ? (
                            // Rule 6: a sold-out badge ships a mark AND a word.
                            (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "xs" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "medium", tone: "onSurface", children: "Sold" })] }) })) : null] })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(PriceTagV4_1.PriceTagV4, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "sm" }) })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-row": "", "data-xen-watchlist-row": "", className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(true), (0, row_v4_1.rowGroundClass)(selected), className), ...rest, children: [interactive ? ((0, jsx_runtime_1.jsx)("div", { role: "button", tabIndex: 0, "data-xen-v4-state": "", onClick: onClick, onKeyDown: internal_1.activateOnKey, "aria-label": title, className: (0, cn_1.cn)('flex min-w-0 flex-1 cursor-pointer items-center gap-md rounded-[var(--xen-radius-md)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), style: (0, row_v4_1.rowStateVars)(), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-md", children: body })), onToggleWatch != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-state": "", "data-xen-watch-toggle": "", "aria-label": watched ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`, "aria-pressed": watched, onClick: (e) => {
                    e.stopPropagation();
                    onToggleWatch(!watched);
                }, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-full)]', nav_v4_1.MIN_TAP_SQUARE_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), style: (0, row_v4_1.rowStateVars)(), children: watched ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "heart", size: "lg", color: "primary" })) : (
                // The hollow heart has no name in the kit's set; `glyph` is the
                // documented escape hatch for exactly that.
                (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2661", size: "lg", color: "muted" })) })) : null] }));
});
//# sourceMappingURL=WatchlistRowV4.js.map
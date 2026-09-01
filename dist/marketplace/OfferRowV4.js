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
exports.OfferRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const commerce_1 = require("../commerce");
const row_v4_1 = require("../dashboard/internal/row-v4");
const STATUS = {
    pending: { tone: 'neutral', ink: 'onSurface', glyph: 'onSurface', icon: 'clock', label: 'Pending' },
    accepted: { tone: 'success', ink: 'successText', glyph: 'success', icon: 'check', label: 'Accepted' },
    declined: { tone: 'danger', ink: 'dangerText', glyph: 'danger', icon: 'close', label: 'Declined' },
    countered: { tone: 'primary', ink: 'primaryText', glyph: 'primary', icon: 'refresh', label: 'Countered' },
    expired: { tone: 'neutral', ink: 'mutedText', glyph: 'muted', icon: 'error', label: 'Expired' },
};
/**
 * **V4 offer row** — a buyer's offer on a listing: who, how much, where it
 * stands, and the three answers the seller can give.
 *
 * The row proper takes the family metric from `dashboard/internal/row-v4.ts`
 * (§4.3); the optional note and the action bar hang beneath it inside the same
 * gutters, because a row that grows a second block is still a row and must not
 * suddenly acquire a second horizontal inset. The base gave the whole thing a
 * border, a radius and a `surface` ground — a card in a list of cards — which
 * is the treatment brief §4.3 takes away from every row.
 *
 * What changes:
 *
 * 1. **Row metric, transparent ground, `md` gutters.** The container owns the
 *    card.
 * 2. **Tabular money** (rule 2), still through `formatMoney` (rule 1). The
 *    amount is the decision on this row, so it sits one step up the scale at
 *    `lg` — the same step `PriceTagV4` gives a price at `md`.
 * 3. **The status chip carries a glyph and a word** (rule 6), and its tone is
 *    re-mapped so `warn` is not spent on "waiting" — see {@link STATUS}.
 * 4. **The row says who and what out loud.** Neither twin had an accessible
 *    name at all: a screen reader met an avatar, a name, a chip and a figure as
 *    four unrelated fragments. It now announces party, status and amount as one
 *    thing.
 * 5. **Decline is `ghost`/`danger` on both twins.** The web base used the
 *    filled `danger` button, native used the quiet one — the same choice made
 *    two ways. Declining an offer is reversible and private; the filled
 *    destructive button belongs to `ReportListingV4`, which is neither.
 *
 * Renders `null` when there is no party to attribute the offer to (§4.5).
 */
exports.OfferRowV4 = React.forwardRef(function OfferRowV4({ party, amountCents, currency = 'USD', avatarUrl, status = 'pending', timeLabel, note, onAccept, onDecline, onCounter, showAvatar = true, className, ...rest }, ref) {
    // §4.5: no party, no row.
    if (party.trim() === '')
        return null;
    const look = STATUS[status] ?? STATUS.pending;
    const supporting = timeLabel !== undefined && timeLabel !== '';
    const amount = (0, commerce_1.formatMoney)(amountCents, currency);
    const showActions = status === 'pending' && (onAccept != null || onDecline != null || onCounter != null);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-offer-row": "", "aria-label": `${party}, ${look.label}, ${amount}`, className: (0, cn_1.cn)('flex w-full flex-col', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-row": "", className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(supporting)), children: [showAvatar ? ((0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: party, size: "md" }) })) : null, (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, className: "min-w-0", children: party }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: look.tone, variant: "soft", size: "sm", children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: look.icon, size: "xs", color: look.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "medium", tone: look.ink, children: look.label })] }) })] }), supporting ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: timeLabel })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onSurface", numeric: "tabular", children: amount }) })] }), note !== undefined && note !== '' ? (
            // The same `md` gutter the row above uses, so the note lines up under
            // the name rather than starting its own inset.
            (0, jsx_runtime_1.jsx)("div", { className: "px-md pb-sm", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 3, children: note }) })) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-sm px-md pb-sm", children: [onAccept != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", tone: "success", size: "sm", onClick: onAccept, className: "flex-1", children: "Accept" })) : null, onCounter != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "sm", onClick: onCounter, className: "flex-1", children: "Counter" })) : null, onDecline != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", tone: "danger", size: "sm", onClick: onDecline, className: "flex-1", children: "Decline" })) : null] })) : null] }));
});
//# sourceMappingURL=OfferRowV4.js.map
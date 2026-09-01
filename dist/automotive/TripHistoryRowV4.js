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
exports.TripHistoryEmptyV4 = exports.TripHistoryRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const fleet_v4_1 = require("./internal/fleet-v4");
const OUTCOME_META = {
    completed: { label: 'Completed', tone: 'success' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
    'no-show': { label: 'No-show', tone: 'warn' },
};
/**
 * **V4 trip history row** — the web twin of the native `TripHistoryRowV4`,
 * same props as {@link TripHistoryRow} plus `outcomeLabels`, `routeSeparator`
 * and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line**, so its height, padding, hover
 *    fill and separator inset are the kit's decisions rather than its own.
 * 2. **The fare is tabular** — a trip history is a column of money and the
 *    base left it proportional.
 * 3. **The route reads as one string to a screen reader** — "Bank St to
 *    Airport" — rather than two labels either side of an arrow announced as
 *    "rightwards arrow".
 * 4. **The rating carries its number.**
 *
 * **Renders nothing without both endpoints** (§4.5).
 */
exports.TripHistoryRowV4 = React.forwardRef(function TripHistoryRowV4({ from, to, dateLabel, fareCents, currency = 'USD', outcome = 'completed', rating, variant = 'default', outcomeLabels, routeSeparator = '→', last = false, onClick, className, ...rest }, ref) {
    if (!from || !to)
        return null;
    const meta = OUTCOME_META[outcome];
    const word = outcomeLabels?.[outcome] ?? meta.label;
    const compact = variant === 'compact';
    const caption = (0, fleet_v4_1.metaLine)([dateLabel, compact ? null : word]);
    const name = (0, fleet_v4_1.metaLine)([
        `${from} to ${to}`,
        dateLabel,
        word,
        typeof fareCents === 'number' ? (0, money_1.formatMoney)(fareCents, currency) : null,
    ]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-trip-history-row": outcome, "data-xen-v4-chrome": onClick ? 'on-surface' : undefined, role: onClick ? 'button' : undefined, onClick: onClick, "aria-label": name, className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(Boolean(caption)), !last && (0, row_v4_1.rowEdgeClass)(), className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: from }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-sm text-muted-text", children: routeSeparator }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: to })] }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-0'), children: [typeof fareCents === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]", children: (0, money_1.formatMoney)(fareCents, currency) })) : null, typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true }) : null] }), compact ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })) : null] }));
});
/**
 * **V4 empty trip history** — the web twin of the native
 * `TripHistoryEmptyV4`, same props as {@link TripHistoryEmpty} plus `glyph`.
 *
 * The base centred a title and a message in `text-muted`. V4 gives it the
 * glyph the rest of the kit's empty states carry and moves the message to
 * `muted-text` — the slot with a contrast promise, on the only copy the
 * screen has.
 */
exports.TripHistoryEmptyV4 = React.forwardRef(function TripHistoryEmptyV4({ title = 'No trips yet', message = 'Your completed rides will appear here.', glyph = '🚗', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "status", "data-xen-trip-history-empty": "", className: (0, cn_1.cn)('flex flex-col items-center gap-sm p-xl text-center', className), ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "3xl" }), (0, jsx_runtime_1.jsx)("p", { className: "text-base font-semibold text-on-surface", children: title }), message ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: message }) : null] }));
});
//# sourceMappingURL=TripHistoryRowV4.js.map
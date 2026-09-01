"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripHistoryRowV4 = TripHistoryRowV4;
exports.TripHistoryEmptyV4 = TripHistoryEmptyV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const fleet_v4_1 = require("./internal/fleet-v4");
/** Outcome → tone and default word. Genuinely a status, so the tones stay. */
const OUTCOME_META = {
    completed: { label: 'Completed', tone: 'success' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
    'no-show': { label: 'No-show', tone: 'warn' },
};
/**
 * **V4 trip history row** — same props as {@link TripHistoryRow} plus
 * `outcomeLabels`, `routeSeparator` and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line** (`dashboard/internal/row-v4`),
 *    so its height, padding, press fill and separator inset are the decisions
 *    every other row in the kit makes rather than this component's own.
 * 2. **The fare is tabular.** A trip history is a column of money and the base
 *    left it proportional, so there was no edge to scan down.
 * 3. **The route reads as one string to a screen reader** — "Bank St to
 *    Airport" — rather than two loose labels either side of an arrow glyph
 *    that is announced as "rightwards arrow".
 * 4. **The rating carries its number**, via `RatingV4 showValue`.
 *
 * **Renders nothing without both endpoints** (§4.5).
 */
function TripHistoryRowV4({ from, to, dateLabel, fareCents, currency = 'USD', outcome = 'completed', rating, variant = 'default', outcomeLabels, routeSeparator = '→', last = false, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!from || !to)
        return null;
    const meta = OUTCOME_META[outcome];
    const word = outcomeLabels?.[outcome] ?? meta.label;
    const compact = variant === 'compact';
    const caption = (0, fleet_v4_1.metaLine)([dateLabel, compact ? null : word]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: Boolean(caption) }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: from }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", accessibilityElementsHidden: true, children: routeSeparator }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: to })] }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [typeof fareCents === 'number' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: (0, money_1.formatMoney)(fareCents, currency) })) : null, typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true }) : null] }), compact ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })) : null] }));
    const name = (0, fleet_v4_1.metaLine)([
        `${from} to ${to}`,
        dateLabel,
        word,
        typeof fareCents === 'number' ? (0, money_1.formatMoney)(fareCents, currency) : null,
    ]);
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
/**
 * **V4 empty trip history** — same props as {@link TripHistoryEmpty} plus
 * `glyph`.
 *
 * The base centred a title and a message in muted text. V4 gives it the glyph
 * the rest of the kit's empty states carry, and moves the message to
 * `mutedText` — the slot with a contrast promise, on the only copy the screen
 * has.
 */
function TripHistoryEmptyV4({ title = 'No trips yet', message = 'Your completed rides will appear here.', glyph = '🚗', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: (0, fleet_v4_1.metaLine)([title, message]), style: [
            { alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.xl },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "3xl" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", align: "center", children: title }), message ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: message })) : null] }));
}
//# sourceMappingURL=TripHistoryRowV4.js.map
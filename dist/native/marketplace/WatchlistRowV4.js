"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchlistRowV4 = WatchlistRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const PriceTagV4_1 = require("../commerce/PriceTagV4");
const ConditionBadgeV4_1 = require("./ConditionBadgeV4");
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
 * 1. **The row metric, and no card of its own.** The bordered, rounded box
 *    goes; the container owns the card. The thumbnail moves from a hand-written
 *    64 square to the family's 44 leading slot, so a watchlist row and a
 *    settings row put their text on the same vertical line.
 * 2. **`colors.border` stops being a fill.** The base used the divider token as
 *    the placeholder ground. The empty thumbnail is an `IconV4` soft badge.
 * 3. **The heart is not `danger`.** The base painted the watched heart in the
 *    error tone. Brief rule 3: `danger` means danger, and a saved item is not a
 *    problem — it is the most positive thing on the row. Watched is `primary`
 *    and **filled**; unwatched is `muted` and **hollow**, so the state survives
 *    a colour-blind reading (rule 6) as it did not before. The glyphs are
 *    `IconV4`, not the bare `♥`/`♡` characters §1 rules out; `♡` has no name in
 *    the kit's set, so it takes the documented `glyph` escape hatch.
 * 4. **The toggle clears 44** on its own rather than borrowing `hitSlop` to
 *    cover a target that is painted at about 24.
 * 5. **`ended` stops being an opacity.** `opacity: 0.6` on the whole row dims
 *    the *price* too, which is the fact a watcher came back for. A sold item
 *    now reads through its "Sold" chip and a `mutedText` title, and the price
 *    stays at full strength.
 * 6. **The title keeps two lines.** The family truncates a title at one, but a
 *    listing title *is* the identity of a watchlist row and one line of it is
 *    often nothing but the brand. The row metric is a `minHeight` — a floor —
 *    so the row grows rather than clipping.
 * 7. **Press is the state layer, not a fade.** `opacity: pressed ? 0.85` and
 *    `pressed ? 0.7` both go: a dimmed row reads as disabled, which is what M3
 *    spends 0.38 to mean.
 */
function WatchlistRowV4({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, watched = true, ended = false, onToggleWatch, onPress, placeholderIcon = 'image', selected = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    // §4.5: an untitled listing is a thumbnail and a price with nothing to say
    // what they are.
    if (title.trim() === '')
        return null;
    const { spacing } = theme.tokens;
    const { leading, gap } = (0, row_v4_1.rowMetrics)(theme);
    const ink = ended ? 'mutedText' : 'onSurface';
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [(0, row_v4_1.rowLeadingStyle)(theme), { overflow: 'hidden', borderRadius: theme.tokens.radius.md }], children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { width: leading, height: leading }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: placeholderIcon, badge: "soft", badgeShape: "rounded", size: "base", color: "muted" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: ink, numberOfLines: 2, children: title }), condition !== undefined || ended ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, children: [condition !== undefined ? (0, jsx_runtime_1.jsx)(ConditionBadgeV4_1.ConditionBadgeV4, { condition: condition, size: "sm" }) : null, ended ? (
                            // Rule 6: a sold-out badge ships a mark AND a word.
                            (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "xs" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "medium", tone: "onSurface", children: "Sold" })] }) })) : null] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(PriceTagV4_1.PriceTagV4, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "sm" }) })] }));
    const bodyStyle = {
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { selected }) },
            style,
        ], children: [onPress != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => [
                    bodyStyle,
                    { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed, selected }) },
                ], children: body })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: bodyStyle, children: body })), onToggleWatch != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: watched }, accessibilityLabel: watched ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`, testID: "xen-watch-toggle", onPress: () => onToggleWatch(!watched), style: ({ pressed }) => [
                    {
                        width: leading,
                        height: leading,
                        flexShrink: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: theme.tokens.radius.full,
                        backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }),
                    },
                ], children: watched ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "heart", size: "lg", color: "primary" })) : (
                // The hollow heart has no name in the kit's set; `glyph` is the
                // documented escape hatch for exactly that.
                (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2661", size: "lg", color: "muted" })) })) : null] }));
}
//# sourceMappingURL=WatchlistRowV4.js.map
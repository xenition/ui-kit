"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidRowV4 = BidRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("../commerce/money");
const row_v4_1 = require("../dashboard/internal/row-v4");
/**
 * **V4 bid row** — one bid in an auction's history, on the shared row metric,
 * with the amounts in a column that actually lines up.
 *
 * Everything structural comes from `dashboard/internal/row-v4.ts`, the file the
 * dashboard pass wrote so the row metric could be decided once (§4.3, and
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` open question 3). A bid row is a row; it is
 * not a small card, and the base drew it as one — its own border, its own
 * radius, its own ground. Reusing the family's file rather than restating 56 /
 * 72 / 16 / 44 here is the whole reason those numbers cannot drift again.
 *
 * What changes against the base:
 *
 * 1. **The metric is the family's.** A bordered, rounded box becomes the 56
 *    one-line / 72 two-line floor, `md` gutters and a transparent ground — the
 *    container owns the card, so a bid history reads as one list rather than a
 *    stack of little boxes with the page showing between them.
 * 2. **The money is tabular** (brief rule 2). `TextV4 numeric="tabular"`: with
 *    proportional figures `$9.99` and `$11.11` are different widths, so a
 *    history has no right edge to scan down — which is the one thing a bid
 *    history is *for*. Every amount still goes through `formatMoney` (rule 1).
 * 3. **The leading bid is emphasis, not status** (brief rule 3). The base
 *    painted a `success` border, a `success`-tinted ground, a `success` badge
 *    and a `success` amount. Being the top bid is not "good" in the sense
 *    `success` promises — it is the row that matters most, which is emphasis.
 *    So the highlight is the row family's own `selected` pair (the compiler's
 *    slot for "the container behind a selected row", shipped with a guaranteed
 *    `onSelected` ink) plus a `primary` soft badge that says the word.
 *    `danger` means danger and `success` means good; spending either on
 *    emphasis is how a reader learns to distrust the tone everywhere else
 *    (§35.4). It also retires this file's last use of `withAlpha` — a hand-mixed
 *    tint whose contrast nobody had measured.
 * 4. **The rank is not a hand-measured column.** `width: 20` — a literal brief
 *    §1 forbids — becomes the 44 leading slot, holding a tabular numeral. One
 *    slot, one thing in it.
 * 5. **Text is typeset, not styled.** Name `TextV4 size="base"
 *    weight="semibold"`, time `size="sm" tone="mutedText"` — `mutedText`, the
 *    slot with a contrast promise, not `colors.muted`, which is a fill and is
 *    what this file used as an ink.
 *
 * On a leading row all three runs take `onSelected`, the ink the compiler
 * guarantees against that ground; the hierarchy is carried by size and weight
 * instead, which is §10's typography-before-containers in the one place where
 * keeping `mutedText` would mean a contrast nobody has measured.
 *
 * Renders `null` when there is no one to attribute the bid to — `bidder` empty
 * and `isYou` false (§4.5: a component with nothing to show renders nothing,
 * never a blank band in the middle of a list).
 */
function BidRowV4({ bidder, amountCents, currency = 'USD', avatarUrl, timeLabel, leading = false, isYou = false, rank, showAvatar = true, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const name = isYou ? 'You' : bidder;
    const named = name.trim() !== '';
    // §4.5: nobody to attribute the bid to, so nothing to draw.
    if (!named)
        return null;
    const supporting = timeLabel !== undefined && timeLabel !== '';
    const amount = (0, money_1.formatMoney)(amountCents, currency);
    // The ink the compiler guarantees against whichever ground the row wears.
    const ink = leading ? 'onSelected' : 'onSurface';
    const leadingNode = typeof rank === 'number' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: leading ? 'onSelected' : 'mutedText', numeric: "tabular", children: rank })) : showAvatar ? ((0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: "md" })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${leading ? 'Leading bid, ' : ''}${name}, ${amount}`, style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: supporting }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { selected: leading }) },
            style,
        ], children: [leadingNode != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: leadingNode }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: theme.tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: ink, numberOfLines: 1, style: { flexShrink: 1 }, children: name }), leading ? (
                            // `primary`, not `success`: brief rule 3. The word is what carries
                            // the state; the tone only emphasises it.
                            (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", variant: "soft", size: "sm", children: "Leading" })) : null] }), supporting ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: leading ? 'onSelected' : 'mutedText', numberOfLines: 1, children: timeLabel })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: ink, numeric: "tabular", children: amount }) })] }));
}
//# sourceMappingURL=BidRowV4.js.map
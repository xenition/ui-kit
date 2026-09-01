"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketTypeRowV4 = TicketTypeRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const event_v4_1 = require("./internal/event-v4");
/**
 * **V4 ticket type row** — same props as {@link TicketTypeRow} plus
 * `lowStockAt`, `formatRemaining` and `soldOutLabel`.
 *
 * ## Five changes
 *
 * 1. **Negative inventory is sold out, not purchasable.** `remaining === 0`
 *    was a strict equality, so a tier at `-3` — an oversold count, which is
 *    exactly the state a ticketing backend produces under load — was neither
 *    sold out nor low stock: the row rendered normal, enabled, and `onSelect`
 *    fired. `remainingParts()` treats anything at or below zero as sold out.
 * 2. **`lowStockAt` replaces the hard-coded `<= 10`**, which was the same
 *    threshold for a 40-seat workshop and a 40,000-seat stadium.
 * 3. **The row announces its scarcity.** The name was `"General, $49"` and
 *    replaced the subtree, so "2 left" — the one fact that changes whether
 *    someone buys now — was drawn and never spoken.
 * 4. **The row clears 44 and a press is a state layer**, where the base
 *    pressed to `tokens.ramps.neutral[50]`, a light-oriented ramp step that
 *    flashes white on a dark page.
 * 5. **Disabled is M3's 0.38**, not the 0.6 the base guessed at.
 *
 * **Renders nothing without a `name`.**
 */
function TicketTypeRowV4({ name, price, description, remaining, soldOut, lowStockAt = 10, formatRemaining, soldOutLabel = 'Sold out', selected = false, onSelect, disabled = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const stock = (0, event_v4_1.remainingParts)(remaining, soldOut, lowStockAt);
    const isDisabled = disabled || stock.soldOut;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const scarcity = stock.lowStock && stock.remaining != null
        ? (formatRemaining ?? ((n) => `${n} left`))(stock.remaining)
        : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled: isDisabled }, accessibilityLabel: (0, event_v4_1.spokenLine)([
            name,
            price,
            description,
            stock.soldOut ? soldOutLabel : scarcity,
        ]), disabled: isDisabled, onPress: onSelect, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: tap,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: pressed && !isDisabled ? (0, state_v4_1.pressFill)(theme) : colors.card,
                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, isDisabled),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            flexWrap: 'wrap',
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: name }), stock.soldOut ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "danger", children: soldOutLabel })) : scarcity ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "warn", children: scarcity })) : null] }), description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: description })) : null] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: price }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: tokens.spacing.lg,
                    height: tokens.spacing.lg,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: selected ? colors.primary : colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: tokens.spacing.sm,
                        height: tokens.spacing.sm,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                    } })) : null })] }));
}
//# sourceMappingURL=TicketTypeRowV4.js.map
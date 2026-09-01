"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableReservationRowV4 = TableReservationRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const menu_v4_1 = require("./internal/menu-v4");
const STATUS_META = {
    requested: { label: 'Requested', tone: 'warn' },
    confirmed: { label: 'Confirmed', tone: 'primary' },
    seated: { label: 'Seated', tone: 'success' },
    completed: { label: 'Completed', tone: 'neutral' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
};
/**
 * **V4 table reservation row** — same props as {@link TableReservationRow}
 * plus `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **The table number is announced.** The row's name was guest, party,
 *    date/time and status; `tableLabel` — the one thing a host is looking for
 *    when they scan the list — was drawn on screen and pruned out of the tree
 *    by the `button` role above it.
 * 2. **The party glyph stops being a reader stop.** `👥` carried
 *    `accessibilityLabel={"Party of 4"}`, which the row's own name already
 *    says, so a reader heard the party size twice — and on a row that is a
 *    single leaf it was a label competing with the row's.
 * 3. **A neutral badge resolves the same way on both twins.** Native's solid
 *    `neutral` fills with the **border** token — a hairline colour used as a
 *    fill — where web gives it a ramp step. Both take the module's one badge
 *    shape now, which is a soft tint composited into the surface.
 * 4. **Press is a state layer**, not `opacity: 0.9` — the band M3 spends on
 *    disabled.
 * 5. **The text and trailing slots come from the shared row family** — only
 *    those two, because the family's container is transparent and border-less
 *    by design, and this row draws its own frame. The party tile stops being a
 *    `tokens.ramps.neutral[100]` block that does not invert.
 *
 * **Renders nothing without a `name`.**
 */
function TableReservationRowV4({ name, partySize, dateText, timeText, tableLabel, status = 'requested', statusLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const tile = (0, chrome_v4_1.minTap)(tokens.spacing);
    const meta = STATUS_META[status] ?? STATUS_META.requested;
    const statusWord = statusLabels?.[status] ?? meta.label;
    const when = (0, tone_v4_1.metaLine)([dateText, timeText]);
    const party = `Party of ${partySize}`;
    // Change 1: the table number belongs in the name, not only on the screen.
    const spoken = (0, menu_v4_1.spokenLine)([name, party, when, tableLabel, statusWord]);
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
        },
        style,
    ];
    const inner = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: tile,
                    height: tile,
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, menu_v4_1.placeholderGround)(theme),
                }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDC65", size: "sm" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", tone: "onCard", style: menu_v4_1.TABULAR, children: partySize })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: name }), when ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", style: menu_v4_1.TABULAR, children: when })) : null, tableLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: tableLabel })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: menu_v4_1.BADGE_V4.variant, size: menu_v4_1.BADGE_V4.size, children: statusWord }) })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: containerStyle, children: inner(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: containerStyle, children: ({ pressed }) => inner(pressed) }));
}
//# sourceMappingURL=TableReservationRowV4.js.map
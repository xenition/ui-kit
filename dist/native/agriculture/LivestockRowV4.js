"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivestockRowV4 = LivestockRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const farm_v4_1 = require("./internal/farm-v4");
/** Health → tone and default label. Genuinely a status, so the tones stay. */
const HEALTH_META = {
    healthy: { label: 'Healthy', tone: 'success' },
    monitor: { label: 'Monitor', tone: 'warn' },
    sick: { label: 'Sick', tone: 'danger' },
};
/**
 * **V4 livestock row** — same props as {@link LivestockRow} plus
 * `healthLabels`, `unknownCountLabel` and `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line** (`dashboard/internal/row-v4`),
 *    so its height, padding, press fill and separator inset are the same
 *    decisions every other row in the kit makes.
 * 2. **Press is a state layer**, not `opacity: 0.85` on the row's content.
 * 3. **The head count is tabular and formattable.** A column of pen counts
 *    that does not line up is a column nobody can scan, and `1,240` is not
 *    `1.240` everywhere.
 * 4. **Type comes from `TextV4`**, with the caption on `mutedText`.
 *
 * **Renders nothing without a `species`** (§4.5).
 */
function LivestockRowV4({ species, count, icon = '🐄', location, health = 'healthy', detail, healthLabels, unknownCountLabel = '—', formatCount, last = false, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!species)
        return null;
    const meta = HEALTH_META[health];
    const label = healthLabels?.[health] ?? meta.label;
    const shownCount = typeof count === 'number' ? (formatCount ?? String)(count) : unknownCountLabel;
    const caption = (0, farm_v4_1.metaLine)([location, detail]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: Boolean(caption) }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: species }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: shownCount }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })] }));
    if (!onPress)
        return content(false);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: [species, shownCount, caption, label].filter(Boolean).join(', '), onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=LivestockRowV4.js.map
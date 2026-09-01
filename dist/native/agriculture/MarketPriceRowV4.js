"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketPriceRowV4 = MarketPriceRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const farm_v4_1 = require("./internal/farm-v4");
/**
 * Direction → glyph and default spoken label.
 *
 * The colours are **not** here: a price movement genuinely is good or bad news
 * to the person reading it, so `up` keeps `successText` and `down` keeps
 * `dangerText` — but the glyph and the word carry it too, because a
 * red-green-only signal is the single most common accessibility defect in a
 * markets table.
 */
const DIR_META = {
    up: { glyph: '▲', label: 'up', sign: '+' },
    down: { glyph: '▼', label: 'down', sign: '' },
    flat: { glyph: '▪', label: 'unchanged', sign: '' },
};
/**
 * **V4 market price row** — same props as {@link MarketPriceRow} plus
 * `formatChange` and `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **Direction is not carried by colour alone.** The glyph was already
 *    there; the spoken label is new, so a screen reader says "up 2.4 percent"
 *    rather than reading a triangle.
 * 2. **The change is formattable** — see `formatChange`.
 * 3. **It is a row from the shared row line**, and press is a state layer
 *    rather than `opacity: 0.85`.
 * 4. **The price and the change are tabular**, which is the whole point of a
 *    column of prices: with proportional figures `9.99` and `11.11` are
 *    different widths and the column has no edge to scan down.
 *
 * **Renders nothing without a `commodity`** (§4.5).
 */
function MarketPriceRowV4({ commodity, price, unit, changePct, direction, icon = '🌽', market, formatChange, directionLabels, last = false, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!commodity)
        return null;
    const dir = direction ??
        (typeof changePct === 'number' ? (changePct > 0 ? 'up' : changePct < 0 ? 'down' : 'flat') : 'flat');
    const meta = DIR_META[dir];
    const dirLabel = directionLabels?.[dir] ?? meta.label;
    const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
    const changeText = hasChange
        ? (formatChange ?? ((n, d) => `${DIR_META[d].sign}${n.toFixed(1)}%`))(changePct, dir)
        : null;
    const changeInk = dir === 'up' ? colors.successText : dir === 'down' ? colors.dangerText : colors.mutedText;
    const caption = (0, farm_v4_1.metaLine)([market, unit]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: Boolean(caption) }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: commodity }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: String(price) }), changeText ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: changeInk }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numeric: "tabular", style: { color: changeInk }, children: changeText })] })) : null] })] }));
    const name = [commodity, String(price), unit, changeText ? `${dirLabel} ${changeText}` : null]
        .filter(Boolean)
        .join(', ');
    if (!onPress) {
        // Not pressable, but still one announced object rather than five loose
        // strings a screen reader reads in isolation.
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=MarketPriceRowV4.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasFeeRowV4 = GasFeeRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../../commerce/money");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/**
 * The tier's mark and its default word.
 *
 * The base's third field — a `slot` of `muted` / `primary` / `success` — is
 * gone. A fee tier is an identity, not a health reading, and spending the
 * success slot on "Fast" is exactly the substitution the tone rules forbid.
 * The glyph carries the identity instead.
 */
const SPEED_V4 = {
    slow: { label: 'Slow', glyph: '🐢' },
    average: { label: 'Average', glyph: '🚶' },
    fast: { label: 'Fast', glyph: '⚡' },
};
/**
 * **V4 gas-fee tier** — same props as {@link GasFeeRow} plus `speedLabels`.
 *
 * ## Four changes
 *
 * 1. **The radio announces whether it is chosen.** The base set
 *    `accessibilityState={{ selected }}`, and a radio's state key is
 *    `checked` — so all three tiers announced identically and a screen-reader
 *    user could not tell which fee they were about to pay.
 * 2. **The name carries the numbers.** `"Average gas"` was the whole
 *    announcement: the gwei price, the ETA and the fiat cost — the only things
 *    that distinguish one tier from another — were never spoken. The row is
 *    now one name built from all four.
 * 3. **A press is a state layer.** `opacity: pressed ? 0.8 : 1` faded the
 *    row's own content toward M3's disabled band; the layer tints the
 *    container and leaves the label at full strength.
 * 4. **The tier stops borrowing status colour**, the selected ground comes
 *    from `selected`/`onSelected` rather than a raw ramp step, and the row
 *    sits on the shared row metrics so a fee list and a settings list are one
 *    family.
 */
function GasFeeRowV4({ speed, gwei, costCents, currency = 'USD', eta, selected = false, speedLabels, onSelect, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const meta = SPEED_V4[speed];
    const label = speedLabels?.[speed] ?? meta.label;
    const gweiText = (0, format_1.formatToken)(gwei, { decimals: 2, symbol: 'gwei' });
    // The three figures a user is actually choosing between, in the order they
    // are drawn. Commas, because a reader says "middle dot" out loud.
    const name = (0, market_v4_1.spokenLine)([
        label,
        gweiText,
        eta,
        costCents != null ? (0, money_1.formatMoney)(costCents, currency) : null,
    ]);
    const ground = selected ? colors.selected : colors.surface;
    const ink = selected ? colors.onSelected : colors.onSurface;
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme),
            {
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : ground,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, style: { color: ink }, children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", numberOfLines: 1, children: (0, tone_v4_1.metaLine)([gweiText, eta]) })] }), costCents != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: costCents, currency: currency, tone: "neutral", size: "sm" }) })) : null] }));
    if (!onSelect) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", 
        // `checked`, not `selected`. This is the whole defect.
        accessibilityState: { checked: selected }, accessibilityLabel: name, onPress: () => onSelect(speed), style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=GasFeeRowV4.js.map
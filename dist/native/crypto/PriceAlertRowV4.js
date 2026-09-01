"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceAlertRowV4 = PriceAlertRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const SwitchV4_1 = require("../primitives/SwitchV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/**
 * The condition's mark and its default word.
 *
 * The base's third field — `above → success`, `below → danger` — is gone.
 * "Alert me when BTC drops below $50,000" is a condition the holder chose, not
 * an error state, and the danger slot is the one colour in the theme that has
 * to keep meaning "something went wrong".
 */
const CONDITION_V4 = {
    above: { label: 'Above', glyph: '▲' },
    below: { label: 'Below', glyph: '▼' },
};
/**
 * **V4 price alert** — same props as {@link PriceAlertRow} plus
 * `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A disarmed alert is not drawn as an unavailable one.** The base put the
 *    whole row — the Switch included — at `opacity: 0.6`, which sits inside
 *    M3's disabled band: a live, toggleable control rendered as dead. The
 *    Switch already says on or off, in words, to everyone.
 * 2. **Direction is identity, not status.** See {@link CONDITION_V4}.
 * 3. **The Switch clears 44.** It carried `hitSlop` and a 24pt track; it now
 *    sits in a real target.
 * 4. **The row is two stops, not five.** The symbol, the condition, the target
 *    and the current price are one spoken line; the ▲/▼ mark is decoration
 *    beside a word and is hidden from the reader.
 */
function PriceAlertRowV4({ symbol, condition, targetPrice, currentPrice, currencySymbol = '$', decimals = 2, enabled = false, directionLabels, onToggle, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!symbol)
        return null;
    const meta = CONDITION_V4[condition];
    const word = (condition === 'above' ? directionLabels?.above : directionLabels?.below) ?? meta.label;
    const targetText = (0, format_1.formatPrice)(targetPrice, { symbol: currencySymbol, decimals });
    const nowText = currentPrice != null
        ? `Now ${(0, format_1.formatPrice)(currentPrice, { symbol: currencySymbol, decimals })}`
        : null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }), style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, market_v4_1.spokenLine)([symbol, word, targetText, nowText]), style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: symbol }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: meta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: word }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", numeric: "tabular", children: targetText })] }), nowText != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: nowText })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                    (0, row_v4_1.rowTrailingStyle)(theme),
                    { minWidth: tap, minHeight: tap, alignItems: 'center', justifyContent: 'center' },
                ], children: (0, jsx_runtime_1.jsx)(SwitchV4_1.SwitchV4, { checked: enabled, onCheckedChange: onToggle, accessibilityLabel: (0, market_v4_1.spokenLine)([symbol, 'alert', word, targetText]) }) })] }));
}
//# sourceMappingURL=PriceAlertRowV4.js.map